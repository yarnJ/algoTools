import classes from "./Creator.module.scss"
import ContentLoader from "react-content-loader"

export const CreatorLoading = () => (
  <div className={classes["creator-loading"]}>
    <ContentLoader
      speed={2}
      width={205}
      height={160}
      viewBox="0 0 205 160"
      backgroundColor="#787878"
      foregroundColor="#333333"
      style={{ width: "100%" }}
    >
      <rect x="0" y="0" rx="4" ry="4" width="205" height="160" />
    </ContentLoader>
  </div>
)
