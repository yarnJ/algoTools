import { Link } from "react-router-dom"
import classes from "./RecentTable.module.scss"
import AlgorandLogo from "assets/logos/algorand-logo-400x400.jpg"

export const RecentTable = () => {
  const header = [
    "Transaction ID",
    "Date/Time",
    "Sender",
    "Receiver",
    "Quantity",
    "Sell Price",
  ]
  const historyItems = []

  for (let i = 0; i < 20; i++) {
    historyItems.push([
      {
        value: "M3UZA...REEXQ",
        to: "/",
      },
      {
        value: "9/21/2021, 3:27 PM",
      },
      {
        value: "KK3B7...KXM3M",
        to: "/",
      },
      {
        value: "JC4KK...KKVA4",
        to: "/",
      },
      {
        value: "1",
      },
      {
        value: "100",
      },
    ])
  }
  return (
    <div className={classes["table-container"]}>
      <table className={classes.table}>
        <thead>
          <tr>
            {header.map((item) => (
              <th>
                {item === "Sell Price" ? (
                  <div>
                    {item}
                    <img
                      src={AlgorandLogo}
                      alt="algorand logo"
                      draggable="false"
                    />
                  </div>
                ) : (
                  item
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {historyItems.map((row) => (
            <tr>
              {row.map((col) => (
                <td>
                  {col.to ? <Link to={col.to}>{col.value}</Link> : col.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tbody>
        {historyItems &&
          historyItems.length > 0 &&
          historyItems.map((row, key) => (
            <tr key={key}>
              <td>
                <Button
                  type="anchor-link"
                  to={`https://algoexplorer.io/tx/${row.id}`}
                >
                  {`${row.id.substr(0, 5)}....${row.id.substr(
                    row.id.length - 5,
                    row.id.length - 1
                  )}`}
                </Button>
              </td>
              <td>{new Date(row["round-time"] * 1000).toString()}</td>
              <td>
                <Button
                  type="anchor-link"
                  to={`https://algoexplorer.io/address/${row.sender}`}
                >
                  {`${row.sender.substr(0, 5)}....${row.sender.substr(
                    row.sender.length - 5,
                    row.sender.length - 1
                  )}`}
                </Button>
              </td>
              <td>
                <Button
                  type="anchor-link"
                  to={`https://algoexplorer.io/address/${row["asset-transfer-transaction"].receiver}`}
                >
                  {`${row["asset-transfer-transaction"].receiver.substr(
                    0,
                    5
                  )}....${row["asset-transfer-transaction"].receiver.substr(
                    row["asset-transfer-transaction"].receiver.length - 5,
                    row["asset-transfer-transaction"].receiver.length - 1
                  )}`}
                </Button>
              </td>
              <td>{row["asset-transfer-transaction"].amount}</td>
            </tr>
          ))}
      </tbody> */}
      </table>
    </div>
  )
}
