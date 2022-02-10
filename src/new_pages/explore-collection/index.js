import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Layout, CollectionsGrid } from "new_components"
import { asyncGetCollectionsAll } from "redux/collection/collection-slice"
import { Hero } from "./page-components"
import classes from "./index.module.scss"

const ExploreCollection = () => {
  const dispatch = useDispatch()
  const [searchStatus, setSearchStatus] = useState(false)
  const allCollections = useSelector(
    (state) => state.collection.all_collections
  )
  const collections = useSelector((state) => state.collection.collections)
  const newCollect = allCollections.length
    ? Array.from(allCollections).sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
        return 0
      })
    : []

  useEffect(() => {
    dispatch(asyncGetCollectionsAll())
  }, [])

  return (
    <Layout>
      <Hero newCollect={newCollect} setSearchStatus={setSearchStatus} />
      <div className={classes.container}>
        {!searchStatus ? (
          <CollectionsGrid collections={newCollect} />
        ) : (
          <CollectionsGrid collections={collections} />
        )}
        {/* {collectionLoading.includes(CollectionLoadingId.GET_ALL_COLLECTIONS) ? (
          <ListLoading />
        ) : !searchStatus ? (
          <CollectionsGrid collections={newCollect} />
        ) : (
          <CollectionsGrid collections={collections} />
        )} */}
      </div>
    </Layout>
  )
}

export default ExploreCollection
