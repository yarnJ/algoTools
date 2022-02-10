import { useRef, useLayoutEffect } from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import classes from "./PriceHistoryChart.module.scss"
import { useSelector } from "react-redux"

export const PriceHistoryChart = () => {
  const priceHistoryTransactions = useSelector(
    (state) => state.indexer.priceHistoryTransactions
  )
  const chart = useRef(null)

  useLayoutEffect(() => {
    if (priceHistoryTransactions.length === 0) return
    const x = am4core.create("chartdiv", am4charts.XYChart)
    x.logo.visible = false
    if (priceHistoryTransactions && priceHistoryTransactions.length > 0) {
      priceHistoryTransactions.forEach((tx) => {
        const date = new Date(tx.round)
        x.data.push({
          date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          value: tx.price / 100000,
        })
      })
    }
    // x.data.push({
    //   date: new Date(2021, 5, 12).getTime(),
    //   value: 10,
    // })
    // console.log("x.data", x.data)
    // x.data = [
    //   {
    //     date: new Date(2021, 5, 12).getTime(),
    //     value: 50,
    //   },
    //   {
    //     date: new Date(2021, 5, 13).getTime(),
    //     value: 53,
    //   },
    //   {
    //     date: new Date(2021, 5, 14).getTime(),
    //     value: 56,
    //   },
    //   {
    //     date: new Date(2021, 5, 15).getTime(),
    //     value: 52,
    //   },
    //   {
    //     date: new Date(2021, 5, 16).getTime(),
    //     value: 48,
    //   },
    //   {
    //     date: new Date(2021, 5, 17).getTime(),
    //     value: 47,
    //   },
    //   {
    //     date: new Date(2021, 5, 18).getTime(),
    //     value: 59,
    //   },
    // ]

    // Create axes
    const dateAxis = x.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0
    dateAxis.renderer.minGridDistance = 30
    dateAxis.renderer.labels.template.fill = am4core.color("#66668B")
    dateAxis.renderer.labels.template.fontSize = 11

    const valueAxis = x.yAxes.push(new am4charts.ValueAxis())
    valueAxis.renderer.labels.template.fill = am4core.color("#66668B")
    valueAxis.renderer.labels.template.fontSize = 11

    // Create series
    function createSeries(field, name) {
      const series = x.series.push(new am4charts.LineSeries())
      const shadow = series.filters.push(new am4core.DropShadowFilter())
      shadow.dx = 0
      shadow.dy = 0
      shadow.opacity = 1
      shadow.color = am4core.color("#ff39b0")
      series.smoothing = "monotoneX"
      series.dataFields.valueY = field
      series.dataFields.dateX = "date"
      series.name = name
      series.tooltipText = "{dateX}: [b]{valueY}[/]"
      series.strokeWidth = 2
      series.stroke = am4core.color("#ff39b0")

      const bullet = series.bullets.push(new am4charts.CircleBullet())
      bullet.circle.stroke = am4core.color("#fff")
      bullet.circle.strokeWidth = 2

      return series
    }

    createSeries("value", "Asset price")

    x.cursor = new am4charts.XYCursor()

    chart.current = x

    return () => {
      x.dispose()
    }
  }, [priceHistoryTransactions])

  return (
    <section className={classes.container}>
      <h2 className={classes.title}>Price History</h2>
      {priceHistoryTransactions.length > 0 ? (
        <div id="chartdiv" style={{ width: "100%", height: "240px" }} />
      ) : (
        <div
          style={{
            width: "100%",
            height: "240px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span className={classes["blue-glow-text"]}>No price history</span>
        </div>
      )}
    </section>
  )
}
