import classNames from "classnames"
import { OwnerBadge } from "new_components"
import { ReactComponent as AlgoIcon } from "new_assets/icons/algo.svg"
import { formatDuration } from "utils/helper"
import classes from "./AssetCard.module.scss"

export const AssetCard = ({
  owner,
  token,
  metadata,
  currentBid,
  endingIn,
  noHover,
  url,
}) => (
  <div className={classNames(classes.asset, noHover && classes["no-hover"])}>
    {owner && (
      <OwnerBadge className={classes.owner} img={owner.img} id={owner.id} />
    )}
    <div className={classes.figure}>
      {metadata?.image_mimetype === "video/mp4" ? (
        <video preload="none" controls className={classes.img}>
          <source src={`${url}#t=0.1`} />
        </video>
      ) : (
        <img
          className={classes.img}
          loading="lazy"
          src={url}
          alt={metadata?.name}
        />
      )}
    </div>
    <div className={classes.info}>
      <span className={classes.title}>{`${metadata?.name} ${
        token ? `#${token.id}` : ""
      }`}</span>
      {(currentBid || endingIn) && (
        <div className={classes.details}>
          {currentBid && (
            <div className={classes.detail}>
              <span>Current Bid</span>
              <span>
                <AlgoIcon />
                {currentBid}&nbsp;ALGO
              </span>
            </div>
          )}
          {endingIn && (
            <div className={classes.detail}>
              <span>Ending In</span>
              <span>{formatDuration(endingIn * 60)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
)
