import React, { useState, useEffect } from "react"
import classNames from "classnames"
import { Link } from "react-router-dom"

import classes from "./Header.module.scss"
// import { TextField } from "new_components"
// import HeaderLogo from "new_assets/logos/header-logo.png"
// import { ReactComponent as MagnifyIcon } from "new_assets/icons/magnify.svg"
// import { ReactComponent as CartIcon } from "new_assets/icons/cart.svg"
// import { ReactComponent as UserIcon } from "new_assets/icons/user.svg"
import { ReactComponent as MenuIcon } from "new_assets/icons/menu.svg"
import { ReactComponent as CloseIcon } from "new_assets/icons/close.svg"
import { ReactComponent as HeaderLogo } from "new_assets/logos/logo.svg"
import {
  setSessionWallet,
  setAccounts,
  setConnectedStatus,
} from "redux/wallet/wallet-slice"
import { useSelector, useDispatch } from "react-redux"
import { AlgorandConnectorWallet } from "components"
import { SessionWallet } from "algorand-session-wallet"
import { config } from "utils/config"

export const Header = () => {
  const navItems = [
    {
      label: "Discover",
      to: "/explore-collections",
    },
    {
      label: "Buy",
      to: "/explore-auctions",
    },
    {
      label: "Sell",
      to: "/create-auction",
    },
    {
      label: "Mint",
      to: "/mint-nft",
    },
  ]

  const dispatch = useDispatch()
  const sw = new SessionWallet(config.network)

  const [connected, setConnected] = useState(sw.connected())
  const [isAsideMenuOpen, setIsAsideMenuOpen] = useState(false)

  const { sessionWallet, accts } = useSelector((state) => state.wallet)

  useEffect(() => {
    setConnected(connected)
  }, [connected])

  useEffect(() => {
    setConnected(sessionWallet.connected())
  }, [sessionWallet])

  useEffect(() => {
    // remove scroll from page when sidebar is open
    const html = document.querySelector("html")

    if (isAsideMenuOpen) {
      html.style.overflow = "hidden"
    } else {
      html.style.overflow = "auto"
    }
  }, [isAsideMenuOpen])

  const updateWallet = (swk) => {
    dispatch(setSessionWallet(swk))
    dispatch(setAccounts(swk.accountList()))
    dispatch(setConnectedStatus(swk.connected()))
    setConnected(swk.connected())
  }

  return (
    <>
      <header className={classes["header-container"]}>
        <div className={classes.header}>
          <Link to="/" className={classes.logo}>
            <HeaderLogo />
          </Link>

          <nav className={classes.nav}>
            {navItems.map((item) => (
              <Link
                to={item.to}
                key={item.label}
                className={classes["nav-item"]}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={classes.actions}>
            {/* <TextField
              icon={<MagnifyIcon />}
              placeholder="Search Marketplace"
              className={classes["search-input"]}
            /> */}

            {/* <button className={classes.action} type="button">
              <CartIcon />
            </button>

            <button className={classes.action} type="button">
              <UserIcon style={{ transform: "scale(.8)" }} />
            </button> */}

            <AlgorandConnectorWallet
              darkMode={false}
              sessionWallet={sessionWallet}
              accts={accts}
              connected={connected}
              updateWallet={updateWallet}
            />

            <button
              className={classNames(classes.action, classes["mobile-menu"])}
              type="button"
              onClick={() => setIsAsideMenuOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        <aside
          className={classNames(
            classes.aside,
            isAsideMenuOpen && classes["aside--open"]
          )}
        >
          <div className={classes.aside__header}>
            <button type="button" onClick={() => setIsAsideMenuOpen(false)}>
              <CloseIcon />
            </button>
          </div>

          <div className={classes.aside__content}>
            {/* <TextField
              icon={<MagnifyIcon />}
              placeholder="Search Marketplace"
              className={classes["aside__search-input"]}
            /> */}

            <nav className={classes.aside__nav}>
              {navItems.map((item) => (
                <Link
                  to={item.to}
                  key={item.label}
                  className={classes["aside__nav-item"]}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      </header>
    </>
  )
}
