import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Layout, AssetsGrid } from "new_components"
import { asyncGetCollectionsAll } from "redux/collection/collection-slice"
import { AssetsFilters, Hero } from "./page-components"
import classes from "./index.module.scss"
import {
  // asyncGetAssets,
  asyncLookupAccountByID,
} from "redux/indexer/indexer-slice"
import { useParams } from "react-router-dom"

const ExploreCollectionDetails = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const allCollections = useSelector(
    (state) => state.collection.all_collections
  )
  // const { loading: collectionLoading } = useSelector(
  //   (state) => state.collection
  // )

  const selectedCollection = allCollections.find(
    (collection) => collection.name === id
  )
  const address = selectedCollection?.creatorAddress
  const lookupAccountInfo = useSelector(
    (state) => state.indexer.lookupAccountInfo
  )

  useEffect(() => {
    if (address && selectedCollection.name) {
      dispatch(
        asyncLookupAccountByID({
          address,
          collectionName: selectedCollection.name,
        })
      )
    }
  }, [address, selectedCollection])
  useEffect(() => {
    dispatch(asyncGetCollectionsAll())
  }, [])

  return (
    <Layout>
      {/* <CollectionInfo /> */}
      <Hero collection={selectedCollection} />
      <div className={classes.container}>
        <AssetsFilters selectedCollection={selectedCollection} />
        <AssetsGrid
          assets={Array.from(lookupAccountInfo).sort(
            (a, b) => a.index - b.index
          )}
        />
        {/* {indexerLoading.includes(IndexerLoadingId.LOOKUP_ACCOUNT_BY_ID)
          ? [...Array(9).keys()].map((key) => (
              <CollectionAssetLoading key={key} />
            ))
          : lookupAccountInfo &&
            lookupAccountInfo.length > 0 && (
              <AssetsGrid assets={lookupAccountInfo} />
            )} */}
      </div>
    </Layout>
  )
}

export default ExploreCollectionDetails
