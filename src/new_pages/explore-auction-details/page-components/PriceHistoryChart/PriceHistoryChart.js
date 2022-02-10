import { useRef, useLayoutEffect } from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import classes from "./PriceHistoryChart.module.scss"

export const PriceHistoryChart = ({ history }) => {
  const chart = useRef(null)

  useLayoutEffect(() => {
    if (history.length === 0) return
    const x = am4core.create("chartdiv", am4charts.XYChart)
    x.logo.visible = false
    if (history && history.length > 0) {
      history.forEach((tx) => {
        const date = new Date(tx.time)
        x.data.push({
          date: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes()
          ),
          value: tx.amount,
        })
      })
    }

    // Create axes
    const dateAxis = x.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0
    dateAxis.renderer.minGridDistance = 30
    dateAxis.renderer.labels.template.fill = am4core.color("#66668B")
    dateAxis.renderer.labels.template.fontSize = 11
    dateAxis.baseInterval = {
      timeUnit: "minute",
      count: 1,
    }

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
  }, [history])

  return (
    <section className={classes.container}>
      <h2 className={classes.title}>Price History</h2>
      {history.length > 0 ? (
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
