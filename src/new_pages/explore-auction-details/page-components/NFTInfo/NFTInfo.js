import classes from "./NFTInfo.module.scss"
import { BidNFTModal, Button } from "new_components"

import { ReactComponent as AlgoIcon } from "new_assets/icons/algo.svg"
import { ReactComponent as HomeHeroGround } from "new_assets/shapes/ground.svg"
import { ReactComponent as ArrowRightIcon } from "new_assets/icons/arrow-right.svg"
import { ReactComponent as ShareIcon } from "new_assets/icons/share.svg"
import { ReactComponent as HeartIcon } from "new_assets/icons/heart.svg"
import { formatDuration, formatURL } from "utils/helper"
import { useEffect, useState } from "react"
import classNames from "classnames"
import { useSelector } from "react-redux"

export const NFTInfo = ({
  asset,
  currentPrice,
  assetId,
  timeCounter,
  onBid,
  onClose,
  highestBidder,
}) => {
  const [isBidModalOpen, setIsBidModalOpen] = useState(false)
  const [imgURL, setImgURL] = useState("")
  const [share, setShare] = useState(false)
  const [love, setLove] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const { accts } = useSelector((state) => state.wallet)

  useEffect(() => {
    const format = async () => {
      const response = await formatURL(asset?.metadata?.image)
      setImgURL(response)
    }
    format()
  }, [asset])

  useEffect(() => {
    if (accts.includes(highestBidder)) {
      setIsOwner(true)
    }
  }, [accts])

  return (
    <div className={classes.container}>
      <div className={classes.hero}>
        <div className={classes.info}>
          <h1
            className={classes.info__title}
          >{`${asset?.token?.name} #${assetId}`}</h1>
          <p className={classes.info__text}>{asset.metadata.description}</p>
          <div className={classes.info__divider} />
          <div className={classes.info__details}>
            <div className={classes.info__detail}>
              <span>Current Bid</span>
              <span>
                <AlgoIcon />
                {currentPrice} ALGO
              </span>
            </div>
            <div className={classes.info__detail}>
              {timeCounter > 0 && (
                <>
                  <span>Ending In</span>
                  <span>{formatDuration(timeCounter)}</span>
                </>
              )}
            </div>
          </div>
          {timeCounter > 0 ? (
            <Button
              onClick={() => setIsBidModalOpen(true)}
              className={classes.info__btn}
            >
              Place a Bid
            </Button>
          ) : (
            <>
              {isOwner ? (
                <Button onClick={onClose} className={classes.info__btn}>
                  Close a Bid
                </Button>
              ) : null}
            </>
          )}
        </div>

        <div className={classes.figures}>
          <ArrowRightIcon />
          <div className={classes["figures__image-container"]}>
            <div className={classes.figures__image}>
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img src={imgURL} alt={asset?.metadata?.image} />
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img src={imgURL} alt={asset?.metadata?.image} />
            </div>

            <div className={classes.figures__actions}>
              <button
                type="button"
                className={classNames(
                  classes.figures__action,
                  classes.hover_blue_button,
                  share && classes.blue_button
                )}
                onClick={() => setShare(!share)}
              >
                <ShareIcon />
              </button>
              <button
                type="button"
                className={classNames(
                  classes.figures__action,
                  classes.hover_pink_button,
                  love && classes.pink_button
                )}
                onClick={() => setLove(!love)}
              >
                <HeartIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={classes["ground-shape"]}>
        <div />
        <HomeHeroGround />
      </div>

      <BidNFTModal
        isOpen={isBidModalOpen}
        nft={imgURL}
        minBid={(currentPrice * 1.1).toFixed(2)}
        onBid={onBid}
        onClose={() => setIsBidModalOpen(false)}
      />
    </div>
  )
}
