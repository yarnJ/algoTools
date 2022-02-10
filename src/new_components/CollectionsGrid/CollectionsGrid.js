import { Link } from "react-router-dom"
import { Collection, CollectionLoading, AssetLoading } from "new_components"
import { CollectionLoadingId } from "redux/collection/collection-slice"
import { useSelector } from "react-redux"
import InfiniteScroll from "react-infinite-scroll-component"
import classes from "./CollectionsGrid.module.scss"
import { ReactComponent as ArrowRightIcon } from "new_assets/icons/arrow-right.svg"
import classNames from "classnames"
import { useEffect, useState } from "react"
import { LoadingIndicator } from "../../components"

export const CollectionsGrid = ({ collections = [], layout, header }) => {
  const { loading: collectionLoading } = useSelector(
    (state) => state.collection
  )
  const [displayCollections, setDisplayCollections] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    if (collections.length < 20) {
      setDisplayCollections(collections.slice(0, 20))
      setHasMore(false)
    } else {
      if (collections.length > 0) {
        setDisplayCollections(collections.slice(0, 20))
      }
      setHasMore(true)
    }
  }, [collections])

  const fetchMoreCollections = () => {
    if (displayCollections.length >= collections.length) {
      setHasMore(false)
      return
    }

    setTimeout(() => {
      setDisplayCollections(
        collections.slice(0, displayCollections.length + 20)
      )
    }, 1500)
  }

  return (
    <section className={classes.container}>
      {header && (
        <div className={classes.header}>
          <h2>Collections</h2>
          <Link to="/">
            <ArrowRightIcon />
          </Link>
        </div>
      )}

      <InfiniteScroll
        dataLength={displayCollections.length}
        next={fetchMoreCollections}
        hasMore={hasMore}
        loader={<LoadingIndicator />}
      >
        <div
          className={classNames(
            classes.grid,
            layout && classes[`grid--${layout}`]
          )}
        >
          {collectionLoading.includes(CollectionLoadingId.GET_ALL_COLLECTIONS)
            ? header
              ? [...Array(5).keys()].map((key) => (
                  <CollectionLoading key={key} large={key === 2} />
                ))
              : [...Array(8).keys()].map((key) => (
                  <AssetLoading key={key} large={key === 2} />
                ))
            : displayCollections.map((collection, index) => (
                <Collection key={index} {...collection} />
              ))}
          {/* {isLoading
            ? [...Array(5).keys()].map((key) => (
                <CollectionLoading key={key} large={key === 2} />
              ))
            : displayCollections.map((collection, index) => (
                <Collection key={index} {...collection} />
              ))} */}
        </div>
      </InfiniteScroll>
    </section>
  )
}
