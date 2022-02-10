import moment from "moment"

import classes from "./BidHistory.module.scss"
import { Button } from "../../components"
import { config } from "../../utils/config"
import { formatAddress } from "../../utils/helper"
import { Icon } from "@blueprintjs/core"

export const BidHistory = ({ items }) => {
  const header = ["Transaction ID", "Date/Time", "Sender", "Price"]

  return (
    <section className={classes.container}>
      <h2 className={classes.title}>Bid History</h2>
      <table className={classes.table}>
        <thead>
          <tr>
            {header.map((head) => (
              <th>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((row, key) => (
            <tr key={key}>
              <td>
                <Button
                  type="anchor-link"
                  to={`${config.blockExplorer}/tx/${row.txid}`}
                >
                  <span className={classes["bid-link"]}>
                    {formatAddress(row.txid)}
                    <Icon
                      icon="share"
                      size={12}
                      className={classes["share-icon"]}
                    />
                  </span>
                </Button>
              </td>
              <td>{moment(row.time).format("M/DD/YYYY, HH:mm A")}</td>
              <td>
                <Button
                  type="anchor-link"
                  to={`${config.blockExplorer}/address/${row.sender}`}
                >
                  <span className={classes["bid-link"]}>
                    {formatAddress(row.sender)}
                    <Icon
                      icon="share"
                      size={12}
                      className={classes["share-icon"]}
                    />
                  </span>
                </Button>
              </td>
              <td>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
