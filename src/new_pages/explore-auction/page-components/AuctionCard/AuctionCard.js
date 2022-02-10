import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { formatDuration, formatURL, timeDiffAsSec } from "utils/helper"
import { LazyLoadImage } from "react-lazy-load-image-component"
import classNames from "classnames"
import { Button } from "new_components"
import { ReactComponent as AlgoIcon } from "new_assets/icons/algo.svg"
import classes from "./AuctionCard.module.scss"
import { animateScroll as scroll } from "react-scroll"

export const AuctionCard = ({ appId, nft, currentPrice, endTime, noHover }) => {
  const history = useHistory()

  const [timeCounter, setTimeCounter] = useState(0)
  const [imgURL, setImgURL] = useState("")

  useEffect(() => {
    const format = async () => {
      const response = await formatURL(nft.metadata?.image)
      setImgURL(response)
    }
    format()
  }, [])

  useEffect(() => {
    const diff = timeDiffAsSec(endTime)
    if (diff > 0) setTimeCounter(diff)
  }, [endTime])

  useEffect(() => {
    if (!timeCounter) return

    const intervalId = setInterval(() => {
      setTimeCounter(timeCounter - 1)
    }, 1000)

    if (timeCounter < 0) clearInterval(intervalId)

    return () => clearInterval(intervalId)
  }, [timeCounter])

  const openAuction = () => {
    history.push(`/explore-auction/${appId}`)
    scroll.scrollToTop()
  }

  return (
    <div className={classNames(classes.asset, noHover && classes["no-hover"])}>
      <div className={classes.figure}>
        <LazyLoadImage
          className={classes.img}
          src={imgURL}
          alt={nft.metadata?.image}
        />

        <div className={classes.overlay}>
          <Button onClick={openAuction}>Bid on this NFT</Button>
        </div>
      </div>
      <div className={classes.info}>
        <span className={classes.title}>{nft.metadata?.name}</span>
        {(currentPrice || endTime) && (
          <div className={classes.details}>
            {currentPrice && (
              <div className={classes.detail}>
                <span>Current Bid</span>
                <span>
                  <AlgoIcon />
                  {currentPrice}&nbsp;ALGO
                </span>
              </div>
            )}
            {endTime && (
              <div className={classes.detail}>
                {timeCounter > 0 ? (
                  <>
                    <span>Ending In</span>
                    <span>{formatDuration(timeCounter)}</span>
                  </>
                ) : (
                  <span className={classes.closed}>Auction Closed</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
