import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  asyncGetCollectionsAll,
  asyncGetSelectedCollectionTraits,
  setEmptySelectedCollectionTraits,
  CollectionLoadingId,
} from "redux/collection/collection-slice"
import {
  asyncGetTransactions,
  asyncLookupAssetByID,
} from "redux/indexer/indexer-slice"
import {
  Layout,
  Traits,
  // PriceHistoryChart,
  // Provenance,
  TransactionHistory,
  AboutCreator,
} from "new_components"
import { Hero } from "./page-components"
import classes from "./index.module.scss"
import { useParams } from "react-router-dom"
import { TraitsLoading } from "components"

const NftDetails = () => {
  const dispatch = useDispatch()
  const { index } = useParams()
  const { loading: collectionLoading } = useSelector(
    (state) => state.collection
  )
  const [currentOwner, setCurrentOwner] = useState("")
  // const queryParams = new URLSearchParams(window.location.search)
  // const collectionName = queryParams.get("collectionName")

  const selectedAsset = useSelector((state) => state.indexer.selectedAsset)
  const selectedCollection = useSelector(
    (state) => state.indexer.selectedAsset.collection
  )
  // eslint-disable-next-line prefer-const
  const assetTransactionInfo = useSelector(
    (state) => state.indexer.selectedAssetTransactions.transactions
  )
  const priceHistoryTransactions = useSelector(
    (state) => state.indexer.priceHistoryTransactions
  )
  useEffect(() => {
    if (assetTransactionInfo && assetTransactionInfo.length >= 2) {
      Array.from(assetTransactionInfo).sort(
        (tx1, tx2) => tx2["round-time"] - tx1["round-time"]
      )
      const ownerAddr =
        assetTransactionInfo[0]["asset-transfer-transaction"].receiver
      setCurrentOwner(ownerAddr)
    } else if (assetTransactionInfo && assetTransactionInfo.length > 0) {
      const ownerAddr =
        assetTransactionInfo[0]["asset-transfer-transaction"].receiver
      setCurrentOwner(ownerAddr)
    } else {
      const ownerAddr = selectedAsset?.creator
      setCurrentOwner(ownerAddr)
    }
  }, [assetTransactionInfo])

  const selectedCollectionTraitsData = useSelector(
    (state) => state.collection.selectedCollectionTraits
  )
  useEffect(() => {
    dispatch(asyncGetCollectionsAll())
  }, [])
  useEffect(() => {
    dispatch(asyncLookupAssetByID({ assetID: index }))
    if (index) {
      dispatch(
        asyncGetTransactions({
          index,
          txn_type: "axfer",
          min_amount: 0,
        })
      )
    }
  }, [index])
  useEffect(() => {
    if (selectedCollection?.traits_url) {
      dispatch(
        asyncGetSelectedCollectionTraits({ url: selectedCollection.traits_url })
      )
    } else {
      dispatch(setEmptySelectedCollectionTraits())
    }
  }, [selectedAsset])

  // const id = 326189642

  // const traits = []

  // for (let i = 0; i < 10; i++) {
  //   traits.push({
  //     id: i,
  //     title: "Background",
  //     color: "Grey",
  //     progress: 17.5,
  //     count: 527,
  //   })
  // }

  // useEffect(() => {
  //   dispatch(asyncGetCollectionsAll())
  //   dispatch(asyncLookupAssetByID({ assetID: id }))
  // }, [])

  // useEffect(() => {
  //   if (selectedCollection?.traits_url) {
  //     dispatch(
  //       asyncGetSelectedCollectionTraits({ url: selectedCollection.traits_url })
  //     )
  //   } else {
  //     dispatch(setEmptySelectedCollectionTraits())
  //   }
  // }, [selectedCollection])

  // useEffect(() => {
  //   if (selectedAsset) {
  //     dispatch(
  //       asyncGetTransactions({
  //         index: selectedAsset.index,
  //         txn_type: "axfer",
  //         min_amount: 0,
  //       })
  //     )
  //   }
  // }, [selectedAsset])
  return (
    <Layout>
      <Hero asset={selectedAsset} currentOwner={currentOwner} />
      <div className={classes.container}>
        {selectedCollectionTraitsData &&
          selectedCollectionTraitsData.length > 0 && (
            <>
              {collectionLoading.includes(
                CollectionLoadingId.GET_SELECTED_COLLECTION_TRAITS
              ) ? (
                <TraitsLoading />
              ) : (
                <Traits items={selectedCollectionTraitsData} />
              )}
            </>
          )}
        {/* <div className={classes.row}>
          <PriceHistoryChart />
          <Provenance />
        </div> */}
        <TransactionHistory
          assetTransactions={assetTransactionInfo}
          assetPrices={priceHistoryTransactions}
        />
        <AboutCreator info={selectedAsset} />
      </div>
    </Layout>
  )
}

export default NftDetails
