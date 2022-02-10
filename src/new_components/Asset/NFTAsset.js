/* eslint-disable react/destructuring-assignment */
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { animateScroll as scroll } from "react-scroll"
import { OwnerBadge } from "new_components"
import { formatURL } from "utils/helper"
import { ReactComponent as AlgoIcon } from "new_assets/icons/algo.svg"
import classNames from "classnames"
import classes from "./Asset.module.scss"

export const NFTAsset = ({
  owner,
  name,
  // metadata,
  currentBid,
  endingIn,
  total,
  noHover,
  url,
  index,
}) => {
  //   const [imgLoadFailed, setLoadFailed] = useState(false)
  const [imgURL, setImgURL] = useState(url)

  useEffect(() => {
    const format = async () => {
      const response = await formatURL(url)
      setImgURL(response)
    }
    // setImgURL(await format(asset.params.url))
    format()
  }, [url])
  // const [isNftModalOpen, setIsNftModalOpen] = useState(false)
  const bidStatus = false
  return (
    <div className={classNames(classes.asset, noHover && classes["no-hover"])}>
      {owner && (
        <OwnerBadge className={classes.owner} img={owner.img} id={owner.id} />
      )}
      <Link
        to={`/mint-nft/${index}`}
        onClick={() => {
          scroll.scrollToTop()
        }}
      >
        <div className={classes.figure}>
          <img
            src={imgURL}
            alt={name}
            loading="lazy"
            className={classes.img}
            //   onError={() => setLoadFailed(true)}
          />
          {/* {!imgLoadFailed ? (
            <img
              src={url}
              alt={name}
              loading="lazy"
              className={classes.img}
              onError={() => setLoadFailed(true)}
            />
          ) : (
            <video className={classes.img} preload="none" autoPlay muted>
              <source src={url} />
            </video>
          )} */}
          {/* {metadata?.image_mimetype === "video/mp4" ? (
          <video preload="none" controls className={classes.img}>
            <source src={`${img}#t=0.1`} />
          </video>
        ) : (
          <img
            className={classes.img}
            loading="lazy"
            src={img}
            alt={name}
            onError={() => setLoadFailed(true)}
          />
        )} */}

          {/* <div className={classes.overlay}>
          <Button onClick={() => setIsNftModalOpen(!isNftModalOpen)}>
            Bid on this NFT
          </Button>
        </div> */}
        </div>

        <div className={classes.info}>
          <span className={classes.title}>{name}</span>

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
                  <span>{endingIn}</span>
                </div>
              )}
            </div>
          )}
          {!bidStatus && (
            <div className={classes.details}>
              <div className={classes.detail}>
                <span>Last Price</span>
                <span>
                  <AlgoIcon />
                  {currentBid}&nbsp;ALGO
                </span>
              </div>
              <div className={classes.detail}>
                <span>Total</span>
                <span>{total}</span>
              </div>
            </div>
          )}
        </div>
      </Link>
      {/* <BidNFTModal
        isOpen={isNftModalOpen}
        onClose={() => setIsNftModalOpen(false)}
        nft={url}
      /> */}
    </div>
  )
}
