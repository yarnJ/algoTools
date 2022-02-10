import moment from "moment"

import { Link, Table } from "new_components"
import { config } from "utils/config"
import { formatAddress, formatPrice } from "utils/helper"
import classes from "./TransactionHistory.module.scss"
import { Icon } from "@blueprintjs/core"

export const TransactionHistory = ({ assetTransactions, assetPrices }) => {
  const header = [
    "Transaction ID",
    "Date/Time",
    "Sender",
    "Receiver",
    "Quantity",
    "Sell Price",
  ]

  const items = assetTransactions
    ? assetTransactions.map((e) => [
        <Link
          to={`${config.blockExplorer}/tx/${e.id}`}
          type="anchor-link"
          className={classes["history-link"]}
        >
          <span className={classes["history-link__span"]}>
            {formatAddress(e.id)}{" "}
            <Icon
              icon="share"
              size={12}
              className={classes["history-link__icon"]}
            />
          </span>
        </Link>,
        moment.unix(e["round-time"]).format("M/DD/YYYY, HH:mm A"),
        <Link
          to={`${config.blockExplorer}/address/${e.sender}`}
          type="anchor-link"
          className={classes["history-link"]}
        >
          <span className={classes["history-link__span"]}>
            {formatAddress(e.sender)}
            <Icon
              icon="share"
              size={12}
              className={classes["history-link__icon"]}
            />
          </span>
        </Link>,
        <Link
          to={`${config.blockExplorer}/address/${e["asset-transfer-transaction"]?.receiver}`}
          type="anchor-link"
          className={classes["history-link"]}
        >
          <span className={classes["history-link__span"]}>
            {formatAddress(e["asset-transfer-transaction"].receiver)}
            <Icon
              icon="share"
              size={12}
              className={classes["history-link__icon"]}
            />
          </span>
        </Link>,
        e["asset-transfer-transaction"]?.amount ?? 0,
        assetPrices && formatPrice(assetPrices, e),
      ])
    : []

  return (
    <section className={classes.container}>
      <h2 className={classes.title}>Transaction History</h2>
      <Table header={header} rows={items} />
    </section>
  )
}
