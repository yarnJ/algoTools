import { Link } from "react-router-dom"
import { Asset, AssetLoading, NFTAsset } from "new_components"
import classes from "./AssetsGrid.module.scss"
import { ReactComponent as ArrowRightIcon } from "new_assets/icons/arrow-right.svg"
import { useSelector } from "react-redux"
import InfiniteScroll from "react-infinite-scroll-component"
import { useState, useEffect } from "react"
import { LoadingIndicator } from "../../components"
import { IndexerLoadingId } from "redux/indexer/indexer-slice"

export const AssetsGrid = ({ assets = [], header, ownerAddress }) => {
  const [displayAssets, setDisplayAssets] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const { loading: indexerLoading } = useSelector((state) => state.indexer)
  // console.log("assets", assets, "ownerAddress", ownerAddress)
  useEffect(() => {
    if (assets && assets.length > 20) {
      setDisplayAssets(assets.slice(0, 20))
      setHasMore(true)
    } else {
      if (assets.length > 0) {
        setDisplayAssets(assets.slice(0, 20))
      }
      setHasMore(false)
    }
  }, [assets])

  const fetchMoreAssets = () => {
    if (displayAssets.length >= assets.length) {
      setHasMore(false)
      return
    }

    setTimeout(() => {
      setDisplayAssets(assets.slice(0, displayAssets.length + 20))
    }, 1500)
  }

  return (
    <section className={classes.container}>
      {header && (
        <div className={classes.header}>
          <h2>Popular</h2>
          <Link to="/">
            <ArrowRightIcon />
          </Link>
        </div>
      )}
      <InfiniteScroll
        dataLength={displayAssets.length}
        next={fetchMoreAssets}
        hasMore={hasMore}
        loader={<LoadingIndicator />}
      >
        <div className={classes.grid}>
          {indexerLoading.includes(IndexerLoadingId.LOOKUP_ACCOUNT_BY_ID) ||
          indexerLoading.includes(IndexerLoadingId.SOME_ASSETS)
            ? [...Array(9).keys()].map((key) => <AssetLoading key={key} />)
            : assets &&
              assets.length > 0 &&
              displayAssets.map((asset, index) =>
                ownerAddress ? (
                  <NFTAsset key={index} {...asset} />
                ) : (
                  <Asset key={index} {...asset} />
                )
              )}
          {/* {isLoading
            ? [...Array(8).keys()].map((key) => <AssetLoading key={key} />)
            : displayAssets.map((asset, index) =>
                ownerAddress ? (
                  <NFTAsset key={index} {...asset} />
                ) : (
                  <Asset key={index} {...asset} />
                )
              )} */}
          {/* {assets.map((asset, index) => (
        <Asset key={index} {...asset} />
      ))} */}
          {/* assets.map((asset, index) =>
              ownerAddress ? (
                <NFTAsset key={index} {...asset} />
              ) : (
                <Asset key={index} {...asset} />
              )
            )} */}
        </div>
      </InfiniteScroll>
      {assets && assets.length === 0 && (
        <div className={classes["no-assets"]}>
          <h1>No Assets</h1>
        </div>
      )}
    </section>
  )
}
