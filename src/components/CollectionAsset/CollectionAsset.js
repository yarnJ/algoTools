import { Link } from "react-router-dom"
// import { Button } from "components"
import classes from "./CollectionAsset.module.scss"
import { formatURL } from "utils/helper"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useEffect, useState } from "react"

export const CollectionAsset = ({
  index,
  name,
  url,
  // creator,
  price,
  total,
  collectionName,
}) => {
  const [imgURL, setImgURL] = useState()
  const [imgLoadFailed, setLoadFailed] = useState(false)
  useEffect(() => {
    const format = async () => {
      const response = await formatURL(url)
      setImgURL(response)
    }
    // setImgURL(await format(asset.params.url))
    format()
  }, [])
  return (
    <div className={classes.asset}>
      {collectionName ? (
        <Link to={`/v1/asset/${index}?collectionName=${collectionName}`}>
          {!imgLoadFailed ? (
            <img
              src={imgURL}
              alt={url}
              loading="lazy"
              onError={() => setLoadFailed(true)}
            />
          ) : (
            <video preload="none" controls>
              <source src={imgURL} />
            </video>
          )}
        </Link>
      ) : (
        <Link to={`/v1/asset/${index}`}>
          <img src={imgURL} alt={url} />
        </Link>
      )}

      <div className={classes.info}>
        <span className={classes.title}>{name}</span>
        <div className={classes.owner}>
          <LazyLoadImage
            src="https://unsplash.it/100/100"
            alt={`${index} asset`}
          />
          <span className={classes.price}>{price}</span>
          <span className={classes.number}>1 of {total}</span>
        </div>
        {/* <Button
          size="small"
          type="anchor"
          to={`https://ab2.gallery/asset/${index}`}
        >
          Buy Asset
        </Button> */}
      </div>
    </div>
  )
}
