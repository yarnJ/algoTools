/* eslint-disable camelcase */
import classes from "./Collection.module.scss"
import { OwnerBadge } from "new_components"
import { animateScroll as scroll } from "react-scroll"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { formatCreator } from "utils/helper"

export const Collection = ({
  // eslint-disable-next-line camelcase
  collection_dashboard,
  name,
  artworks,
  creator,
  creatorAddress,
}) => {
  const history = useHistory()
  const [imgLoadFailed, setLoadFailed] = useState(false)
  const displayCreator = formatCreator(creator)

  const handleClickMedia = () => {
    history.push(`/explore-collection/${name}`)
    scroll.scrollToTop()
  }
  const handleOwnerClick = (e) => {
    e.stopPropagation()
    history.push(`/creators/${creatorAddress}`)
    scroll.scrollToTop()
  }
  return (
    <div className={classes.collection} onClick={handleClickMedia}>
      {collection_dashboard && (
        <OwnerBadge
          className={classes.owner}
          img={collection_dashboard.image1}
          onClick={handleOwnerClick}
          id={displayCreator}
        />
      )}
      {!imgLoadFailed ? (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <img
          src={collection_dashboard?.image1}
          alt={name}
          loading="lazy"
          className={classes.img}
          onError={() => setLoadFailed(true)}
        />
      ) : (
        <video
          className={classes.img}
          onClick={handleClickMedia}
          preload="none"
          autoPlay
          muted
        >
          <source src={collection_dashboard?.image1} />
        </video>
      )}
      <div className={classes.info}>
        <span className={classes.title}>{name}</span>
        <span className={classes.artworks}>{artworks} Artworks</span>
      </div>
    </div>
  )
}
