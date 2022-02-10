import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import MyAlgoConnect from "@reach-sh/stdlib/ALGO_MyAlgoConnect"
import { loadStdlib } from "@reach-sh/stdlib"
import { BidHistory, Layout } from "new_components"
import * as AuctionService from "../../services/AuctionService"
import { config } from "utils/config"
import { NFTInfo, PriceHistoryChart } from "./page-components"
import classes from "./index.module.scss"
import { timeDiffAsSec } from "utils/helper"
import { LoadingIndicator } from "../../components"
import { AuctionBackendService } from "../../services/AuctionBackendService"

const stdlib = loadStdlib("ALGO")

stdlib.setWalletFallback(
  stdlib.walletFallback({
    providerEnv: config.network,
    MyAlgoConnect,
  })
)

const NewExploreAuctionDetails = () => {
  const { id } = useParams()
  const history = useHistory()
  const auctions = useSelector((state) => state.auction.auctions)
  const [loading, setLoading] = useState(false)
  const [timeCounter, setTimeCounter] = useState(0)
  const [bids, setBids] = useState([])
  const [currentPrice, setCurrentPrice] = useState(0)
  const [asset, setAsset] = useState(null)
  const [assetId, setAssetId] = useState(0)
  const [highestBidder, setHighestBidder] = useState("")

  useEffect(() => {
    const auction = auctions.find((app) => Number(app.appId) === Number(id))

    if (typeof auction === "undefined") setLoading(true)
    else {
      setLoading(false)
      // eslint-disable-next-line no-shadow
      const { bids, currentPrice, nft: asset, endTime, highestBidder } = auction

      setBids(bids)
      setCurrentPrice(currentPrice)
      setAsset(asset)
      setAssetId(asset.token.id)
      setHighestBidder(highestBidder)

      const diff = timeDiffAsSec(endTime)
      if (diff > 0) setTimeCounter(diff)
    }
  }, [auctions])

  useEffect(() => {
    if (!timeCounter) return

    const intervalId = setInterval(() => {
      setTimeCounter(timeCounter - 1)
    }, 1000)

    if (timeCounter < 0) clearInterval(intervalId)

    return () => clearInterval(intervalId)
  }, [timeCounter])

  const onBid = async (e) => {
    const account = await stdlib.getDefaultAccount()
    await account.tokenAccept(assetId)

    const ctc = account.contract(AuctionService, id)
    await ctc.a.Bidder.getBid(stdlib.parseCurrency(e))
    await AuctionBackendService.updateAuction(id)
  }

  const onClose = async () => {
    const account = await stdlib.getDefaultAccount()
    await account.tokenAccept(assetId)

    const ctc = account.contract(AuctionService, id)
    await ctc.a.Bidder.close(1)

    await AuctionBackendService.deleteAuction(id)
    history.push("/explore-auctions")
  }

  return (
    <Layout>
      {loading && <LoadingIndicator />}
      {asset ? (
        <>
          <NFTInfo
            asset={asset}
            currentPrice={currentPrice}
            assetId={assetId}
            timeCounter={timeCounter}
            onBid={onBid}
            onClose={onClose}
            highestBidder={highestBidder}
          />
          <div className={classes.container}>
            <div className={classes.row}>
              <PriceHistoryChart history={bids} />
            </div>
            <BidHistory items={bids} />
          </div>
        </>
      ) : null}
    </Layout>
  )
}

export default NewExploreAuctionDetails
