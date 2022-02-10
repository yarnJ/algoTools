import { Layout, CollectionAsset, CollectionAssetLoading } from "components"
import { Info } from "./page-components"
import classes from "./index.module.scss"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import {
  // asyncGetAssets,
  asyncLookupAccountByID,
  IndexerLoadingId,
} from "redux/indexer/indexer-slice"
import { asyncGetCollectionsAll } from "redux/collection/collection-slice"

const CollectionDetails = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { loading: indexerLoading } = useSelector((state) => state.indexer)
  const selectedCollection = useSelector((state) =>
    state.collection.all_collections.find(
      (collection) => collection.name === id
    )
  )
  const address = selectedCollection?.creatorAddress
  // const assets = useSelector((state) => state.indexer.assets)
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
    // dispatch(asyncGetAssets({ collectionName: id }))
  }, [])
  // useEffect(() => {
  //   dispatch(asyncGetAssets({ collectionName: id }))
  // }, [selectedCollection])

  return (
    <Layout
      breadcrumb={[
        {
          label: "Home",
          to: "/v1/home",
        },
        {
          label: "Collections",
          to: "/v1/all-collections",
        },
        {
          label: selectedCollection?.name,
        },
      ]}
    >
      {selectedCollection && <Info collection={selectedCollection} />}

      <div className={classes["assets-grid"]}>
        {indexerLoading.includes(IndexerLoadingId.LOOKUP_ACCOUNT_BY_ID) ? (
          [...Array(9).keys()].map((key) => (
            <CollectionAssetLoading key={key} />
          ))
        ) : (
          <>
            {/* {assets &&
              assets.length > 0 &&
              Array.from(assets)
                .sort((a, b) => a.index - b.index)
                .map((asset, key) => (
                  <CollectionAsset
                    {...asset}
                    index={asset.index}
                    collectionName={selectedCollection?.name}
                    key={key}
                  />
                ))} */}
            {lookupAccountInfo &&
              lookupAccountInfo.length > 0 &&
              Array.from(lookupAccountInfo)
                .sort((a, b) => a.index - b.index)
                .map((asset, key) => (
                  <CollectionAsset
                    {...asset}
                    index={asset.index}
                    collectionName={selectedCollection?.name}
                    key={key}
                  />
                ))}
          </>
        )}
      </div>
    </Layout>
  )
}

export default CollectionDetails
