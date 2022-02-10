import { Layout, AssetsGrid } from "new_components"
import { CreatorInfo } from "./page-components"
import classes from "./index.module.scss"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { asyncGetCollectionsAll } from "redux/collection/collection-slice"
import {
  // asyncGetAssets,
  asyncLookupAccountByID,
  asyncLookupMyAccount,
} from "redux/indexer/indexer-slice"
import { useParams } from "react-router-dom"

const CreatorDetails = () => {
  const dispatch = useDispatch()
  const { address } = useParams()
  const { accts, connected } = useSelector((state) => state.wallet)
  const [ownerAddress, setOwnerAddress] = useState(false)

  // useEffect(() => {
  //   if (address === accts[0]) {
  //     setOwnerAddress(true)
  //   }
  // }, [accts, connected])
  const allCollections = useSelector(
    (state) => state.collection.all_collections
  )
  // const { loading: collectionLoading } = useSelector(
  //   (state) => state.collection
  // )
  const selectedCollection = allCollections.find((collection) =>
    collection.creatorAddress.includes(address)
  )
  // const [creatorInfo, setCreatorInfo] = useState(selectedCollection)
  // const address = selectedCollection?.creatorAddress
  const lookupAccountInfo = useSelector(
    (state) => state.indexer.lookupAccountInfo
  )

  // useEffect(() => {
  //   setCreatorInfo(selectedCollection)
  // }, [selectedCollection])

  useEffect(() => {
    if (address) {
      if (address === accts[0]) {
        dispatch(
          asyncLookupMyAccount({
            address,
          })
        )
        setOwnerAddress(true)
      } else {
        dispatch(
          asyncLookupAccountByID({
            address,
            collectionName: undefined,
          })
        )
      }
    }
  }, [address, selectedCollection, accts, connected])
  useEffect(() => {
    dispatch(asyncGetCollectionsAll())
  }, [])

  return (
    <Layout>
      {/* <CollectionInfo /> */}
      <CreatorInfo
        collection={selectedCollection}
        ownerAddress={address}
        isOwnerAddress={ownerAddress}
      />
      <div className={classes.container}>
        <AssetsGrid assets={lookupAccountInfo} ownerAddress={ownerAddress} />
        {/* <AssetsFilters selectedCollection={selectedCollection} /> */}
        {/* {indexerLoading.includes(IndexerLoadingId.LOOKUP_ACCOUNT_BY_ID) ? (
          [...Array(9).keys()].map((key) => (
            <CollectionAssetLoading key={key} />
          ))
        ) : lookupAccountInfo && lookupAccountInfo.length > 0 ? (
          <AssetsGrid assets={lookupAccountInfo} />
        ) : (
          lookupAccountInfo &&
          lookupAccountInfo.length === 0 && <h1>No Assets</h1>
        )} */}
      </div>
    </Layout>
  )
}

export default CreatorDetails
