/* eslint-disable react/jsx-no-bind */
import * as React from "react"

import { SessionWallet, allowedWallets } from "algorand-session-wallet"

import {
  Dialog,
  Button,
  Classes,
  Menu,
  Popover,
  Position,
} from "@blueprintjs/core"
import { useHistory, useParams } from "react-router-dom"
import { formatAddress } from "utils/helper"
import classes from "./AlgorandConnectorWallet.module.scss"
import classNames from "classnames"

export const AlgorandConnectorWallet = ({
  sessionWallet,
  updateWallet,
  darkMode,
  connected,
  accts,
}) => {
  const history = useHistory()
  const [selectorOpen, setSelectorOpen] = React.useState(false)
  const { address } = useParams()
  const [selectedWallet, setSelectedWallet] = React.useState()

  React.useEffect(() => {
    if (accts.includes(address)) {
      setSelectedWallet(address)
    } else {
      setSelectedWallet(accts[0])
    }
  }, [address, accts])

  React.useEffect(() => {
    if (sessionWallet.connected()) return

    let interval
    sessionWallet.connect().then((success) => {
      if (!success) return

      // Check every 500ms to see if we've connected then kill the interval
      // This is most useful in the case of walletconnect where it may be several
      // seconds before the user connects
      interval = setInterval(() => {
        if (sessionWallet.connected()) {
          clearInterval(interval)
          updateWallet(sessionWallet)
        }
      }, 500)
    })

    return () => {
      clearInterval(interval)
    }
  }, [sessionWallet, updateWallet])

  function disconnectWallet() {
    sessionWallet.disconnect()
    updateWallet(
      new SessionWallet(sessionWallet.network, sessionWallet.permissionCallback)
    )
  }

  function handleDisplayWalletSelection() {
    setSelectorOpen(true)
  }

  async function handleSelectedWallet(e) {
    const choice = e.currentTarget.id

    if (!(choice in allowedWallets)) {
      if (sessionWallet.wallet !== undefined) sessionWallet.disconnect()
      return setSelectorOpen(false)
    }

    const sw = new SessionWallet(
      sessionWallet.network,
      sessionWallet.permissionCallback,
      choice
    )

    if (!(await sw.connect())) {
      sw.disconnect()
    }

    updateWallet(sw)

    setSelectorOpen(false)
  }

  // function handleChangeAccount(e) {
  //   sessionWallet.setAccountIndex(parseInt(e.target.value, 10))
  //   updateWallet(sessionWallet)
  // }
  // const handleAddrClick = (e) => {
  //   const address = e.target.value
  //   history.push(`/creators/${address}`)
  // }
  const walletOptions = []
  // eslint-disable-next-line no-restricted-syntax
  for (const [k, v] of Object.entries(allowedWallets)) {
    walletOptions.push(
      <li key={k}>
        <Button
          id={k}
          large
          fill
          minimal
          outlined
          // eslint-disable-next-line react/jsx-no-bind
          onClick={handleSelectedWallet}
          className={classes.buttonPink}
        >
          <div className={classes["wallet-option"]}>
            <img
              alt="wallet-branding"
              className={classes["wallet-branding"]}
              src={v.img(darkMode)}
            />
            <h5>{v.displayName()}</h5>
          </div>
        </Button>
      </li>
    )
  }

  // eslint-disable-next-line react/destructuring-assignment
  if (!connected)
    return (
      <div>
        <Button
          minimal
          rightIcon="selection"
          intent="warning"
          outlined
          className={classes.buttonPink}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={handleDisplayWalletSelection}
        >
          Connect Wallet
        </Button>

        <Dialog
          isOpen={selectorOpen}
          title=""
          // eslint-disable-next-line react/jsx-no-bind
          onClose={handleSelectedWallet}
          className={classes.dialog}
        >
          <h2 className={classes["dialog-title"]}>Select Wallet</h2>
          <div className={Classes.DIALOG_BODY}>
            <ul className={classes["wallet-option-list"]}>{walletOptions}</ul>
          </div>
        </Dialog>
      </div>
    )

  const handleWalletChange = (addr) => {
    setSelectedWallet(addr)
    sessionWallet.setAccountIndex(parseInt(addr, 10))
    updateWallet(sessionWallet)
    history.push(`/creators/${addr}`)
  }

  return (
    <div>
      <Popover
        minimal="true"
        position={Position.BOTTOM}
        className={classes["wallet-popover"]}
      >
        <Button
          text={formatAddress(selectedWallet)}
          className={classes["wallets-dropdown"]}
          rightIcon="symbol-circle"
          intent="success"
        />
        <div className={classes["popover-content"]}>
          {accts.map((addr, idx) => (
            <Menu
              text={addr}
              key={idx}
              onClick={() => handleWalletChange(addr)}
              className={classNames(
                classes.walletMenu,
                addr === selectedWallet && classes.blueGlowText
              )}
            >
              {formatAddress(addr)}
            </Menu>
          ))}
        </div>
      </Popover>
      <Button
        icon="log-out"
        minimal
        onClick={disconnectWallet}
        className={classes.buttonPink}
      />
    </div>
  )
}
