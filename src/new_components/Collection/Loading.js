import classes from "./Collection.module.scss"
import ContentLoader from "react-content-loader"

export const CollectionLoading = ({ large }) => (
  <div className={classes["collection-loading"]}>
    {large ? (
      <ContentLoader
        speed={2}
        width={window.innerWidth > 1264 ? 526 : 395}
        height={window.innerWidth > 1264 ? 586 : 282}
        viewBox={window.innerWidth > 1264 ? "0 0 526 586" : "0 0 395 282"}
        backgroundColor="#787878"
        foregroundColor="#333333"
        style={{ width: "100%" }}
      >
        <rect x="0" y="0" rx="4" ry="4" width="526" height="586" />
      </ContentLoader>
    ) : (
      <ContentLoader
        speed={2}
        width={395}
        height={282}
        viewBox="0 0 395 282"
        backgroundColor="#787878"
        foregroundColor="#333333"
        style={{ width: "100%" }}
      >
        <rect x="0" y="0" rx="4" ry="4" width="395" height="282" />
      </ContentLoader>
    )}
  </div>
)
