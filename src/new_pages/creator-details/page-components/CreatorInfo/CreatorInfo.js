import { Breadcrumb } from "new_components"
import classes from "./CreatorInfo.module.scss"
import { formatCreator, formatAddress } from "utils/helper"
// import { ReactComponent as MagnifyIcon } from "new_assets/icons/magnify.svg"
import { ReactComponent as WaveShape } from "new_assets/shapes/collection-wave.svg"

export const CreatorInfo = ({ collection, ownerAddress, isOwnerAddress }) => (
  <section className={classes.container}>
    <div className={classes.content}>
      {!isOwnerAddress ? (
        <>
          <h1 className={classes.title}>
            {formatCreator(collection?.creator)}
          </h1>
          <Breadcrumb
            paths={[
              {
                label: "Home",
                to: "/",
              },
              {
                label: "Creators",
                // to: "/creators",
              },
              {
                label: formatAddress(ownerAddress),
              },
            ]}
            className={classes.breadcrumb}
          />
        </>
      ) : (
        <h1 className={classes.title}>My NFTs</h1>
      )}
      {/* <TextField
        icon={<MagnifyIcon />}
        placeholder="Search Collections"
        className={classes["search-input"]}
      /> */}
    </div>

    <div className={classes.wave}>
      <div />
      <WaveShape />
    </div>
  </section>
)
