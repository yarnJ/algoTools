import classes from "./Table.module.scss"

export const Table = ({ header, rows }) => (
  <table className={classes.table}>
    <thead>
      <tr>
        {header.map((head) => (
          <th key={head}>{head}</th>
        ))}
      </tr>
    </thead>

    <tbody>
      {rows.map((row, ind) => (
        <tr key={ind}>
          {row.map((col, index) => (
            <td key={index}>{col}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)
