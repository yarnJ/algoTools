import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "components"
import { formatURL } from "utils/helper"
import { LazyLoadImage } from "react-lazy-load-image-component"
import * as AuctionService from "../../services/AuctionService"
import { AuctionBackendService } from "../../services/AuctionBackendService"
import classes from "./AuctionAsset.module.scss"

export const AuctionAsset = ({ index, image, total, account }) => {
  const history = useHistory()
  const [imgURL, setImgURL] = useState()
  const [imgLoadFailed, setLoadFailed] = useState(false)
  useEffect(() => {
    const format = async () => {
      const response = await formatURL(image)
      setImgURL(response)
    }
    // setImgURL(await format(asset.params.url))
    format()
  }, [])

  const handleDeploy = async () => {
    const ctc = account.contract(AuctionService)
    try {
      await AuctionService.Auctioneer(ctc, {
        getParams: () => ({
          token: +index,
        }),
        signal: async () => {
          const ctcInfo = await ctc.getInfo()
          await AuctionBackendService.createAuction(ctcInfo)
          history.push(`/all-auctions`)
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={classes.asset}>
      <div className={classes["image-container"]}>
        {!imgLoadFailed ? (
          <img
            src={imgURL}
            alt={image}
            loading="lazy"
            onError={() => setLoadFailed(true)}
          />
        ) : (
          <video preload="none" controls>
            <source src={imgURL} />
          </video>
        )}
      </div>

      <div className={classes.info}>
        <span className={classes.title}>#{index}</span>
        <div className={classes.owner}>
          <LazyLoadImage
            src="https://unsplash.it/100/100"
            alt={`${index} asset`}
          />
          <span className={classes.number}>Total Supply: {total}</span>
        </div>
        <Button size="small" onClick={handleDeploy}>
          Open Auction
        </Button>
      </div>
    </div>
  )
}
