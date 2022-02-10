import {
  Layout,
  AssetsGrid,
  CollectionsGrid,
  CreatorsGrid,
} from "new_components"
import { Hero } from "./page-components"
import classes from "./index.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { asyncGetCollectionsAll } from "redux/collection/collection-slice"
import { asyncSomeAssets } from "redux/indexer/indexer-slice"
// import Asset1Image from "new_assets/images/asset-1.png"
// import Asset2Image from "new_assets/images/asset-2.png"
// import Asset3Image from "new_assets/images/asset-3.png"
// import Asset4Image from "new_assets/images/asset-4.png"
// import Asset5Image from "new_assets/images/asset-5.png"
// import Asset6Image from "new_assets/images/asset-6.png"
// import Asset7Image from "new_assets/images/asset-7.png"
// import Asset8Image from "new_assets/images/asset-8.png"

const Home = () => {
  const dispatch = useDispatch()
  const allCollections = useSelector(
    (state) => state.collection.all_collections
  )
  const homeAssets = useSelector((state) => state.indexer.homeAssets)

  useEffect(() => {
    dispatch(asyncGetCollectionsAll())
    dispatch(asyncSomeAssets({ limit: 10 }))
  }, [])

  return (
    <Layout>
      <Hero />
      <div className={classes.container}>
        <AssetsGrid assets={homeAssets.slice(0, 8)} header />

        <CollectionsGrid
          collections={allCollections.slice(0, 5)}
          layout="home"
          header
        />

        <CreatorsGrid creatorsData={allCollections.slice(0, 6)} />
      </div>
    </Layout>
  )
}

export default Home
