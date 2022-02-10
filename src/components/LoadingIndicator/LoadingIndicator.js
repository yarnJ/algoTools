import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import classes from "./LoadingIndicator.module.scss"

export const LoadingIndicator = () => (
  <div className={classes.container}>
    <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
  </div>
)
