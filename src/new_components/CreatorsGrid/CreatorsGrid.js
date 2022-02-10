import { Link } from "react-router-dom"
import { Creator, CreatorLoading } from "new_components"
import { useSelector } from "react-redux"
import { IndexerLoadingId } from "redux/indexer/indexer-slice"
import { CollectionLoadingId } from "redux/collection/collection-slice"
import classes from "./CreatorsGrid.module.scss"
import { ReactComponent as ArrowRightIcon } from "new_assets/icons/arrow-right.svg"

export const CreatorsGrid = ({ creatorsData }) => {
  const { loading: indexerLoading } = useSelector((state) => state.indexer)
  const { loading: collectionLoading } = useSelector(
    (state) => state.collection
  )
  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <h2>Featured Creators</h2>
        <Link to="/">
          <ArrowRightIcon />
        </Link>
      </div>

      <div className={classes.grid}>
        {indexerLoading.includes(IndexerLoadingId.LOOKUP_ACCOUNT_BY_ID) ||
        collectionLoading.includes(CollectionLoadingId.GET_ALL_COLLECTIONS)
          ? [...Array(6).keys()].map((key) => <CreatorLoading key={key} />)
          : creatorsData &&
            creatorsData.map((creator) => (
              <Creator
                key={creator.img}
                img={creator.collection_dashboard.image1}
                {...creator}
              />
            ))}
      </div>
    </section>
  )
}
