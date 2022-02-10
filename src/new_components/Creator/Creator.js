import classes from "./Creator.module.scss"
import { formatCreator } from "utils/helper"
import { useState } from "react"
import { Link } from "react-router-dom"

export const Creator = ({ img, id, artworks, creator, creatorAddress }) => {
  const [imgLoadFailed, setLoadFailed] = useState(false)
  return (
    <div className={classes.creator}>
      <span className={classes.artworks}>{artworks} Artworks</span>
      <Link to={`/creators/${creatorAddress}`}>
        {!imgLoadFailed ? (
          <img
            src={img}
            alt={id}
            className={classes.img}
            onError={() => setLoadFailed(true)}
          />
        ) : (
          <video className={classes.img} preload="none" autoPlay muted>
            <source src={img} />
          </video>
        )}
      </Link>
      <span className={classes.id}>@{formatCreator(creator)}</span>
    </div>
  )
}
