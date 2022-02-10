import { useState, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"

import classes from "./Header.module.scss"
import { AlgorandConnectorWallet } from "components"
import { SessionWallet } from "algorand-session-wallet"
import { config } from "utils/config"
import {
  setSessionWallet,
  setAccounts,
  setConnectedStatus,
} from "redux/wallet/wallet-slice"
import { useSelector, useDispatch } from "react-redux"

export const Header = () => {
  const dispatch = useDispatch()
  const sw = new SessionWallet(config.network)
  // const [sessionWallet, setSessionWallet] = useState(sw)
  // const [accts, setAccounts] = useState(sw.accountList())
  const [connected, setConnected] = useState(sw.connected())
  const { sessionWallet, accts } = useSelector((state) => state.wallet)
  useEffect(() => {
    setConnected(connected)
  }, [connected])
  const updateWallet = (swk) => {
    dispatch(setSessionWallet(swk))
    dispatch(setAccounts(swk.accountList()))
    dispatch(setConnectedStatus(swk.connected()))
    setConnected(swk.connected())
  }
  const navItems = [
    {
      label: "Collections",
      to: "/v1/all-collections",
    },
    {
      label: "Creators",
      to: "/v1/creators",
    },
    {
      label: "Create Auction",
      to: "/v1/create-auction",
    },
    {
      label: "View Auctions",
      to: "/v1/all-auctions",
    },
    {
      label: "Mint",
      to: "/v1/mint",
    },
  ]
  return (
    <header className={classes.header}>
      <Link to="/v1/home" className={classes.logo}>
        &nbsp;YNFT <span>CLUB</span>
      </Link>

      <nav className={classes.nav}>
        {navItems.map((item) => (
          <NavLink
            to={item.to}
            key={item.to}
            className={classes["nav-item"]}
            activeClassName={classes["nav-item--active"]}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <AlgorandConnectorWallet
        darkMode={false}
        sessionWallet={sessionWallet}
        accts={accts}
        connected={connected}
        updateWallet={updateWallet}
      />
    </header>
  )
}
