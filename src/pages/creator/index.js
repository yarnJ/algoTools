import { Layout, BlockTitle } from "components"
import { List, ListLoading } from "./page-components"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {
  asyncGetCollectionsAll,
  CollectionLoadingId,
} from "redux/collection/collection-slice"

const CreatorPage = () => {
  const [allCreators, setAllCreators] = useState([])
  const dispatch = useDispatch()
  const allCollections = useSelector(
    (state) => state.collection.all_collections
  )
  const { loading: collectionLoading } = useSelector(
    (state) => state.collection
  )
  // const { sessionWallet } = useSelector((state) => state.wallet)

  // let address
  // if (sessionWallet?.wallet?.accounts?.length > 0) {
  //   address = sessionWallet.wallet.accounts[0]
  // }

  useEffect(() => {
    dispatch(asyncGetCollectionsAll())
  }, [])
  useEffect(() => {
    const addressSet = new Set()
    allCollections.forEach((li) => {
      addressSet.add(li.creatorAddress)
    })
    const addressArr = Array.from(addressSet)
    setAllCreators(addressArr)
  }, [allCollections])
  // useEffect(() => {
  //   if (address) {
  //     dispatch(asyncLookupAccountByID({ address }))
  //   }
  // }, [])
  return (
    <Layout
      breadcrumb={[
        {
          label: "Home",
          to: "/v1/home",
        },
        {
          label: "Creators",
        },
      ]}
    >
      {/* <Creator /> */}
      <BlockTitle title="All Creators">
        {collectionLoading.includes(CollectionLoadingId.GET_ALL_COLLECTIONS) ? (
          <ListLoading />
        ) : (
          <List creators={allCreators} />
        )}
      </BlockTitle>
    </Layout>
  )
}

export default CreatorPage
