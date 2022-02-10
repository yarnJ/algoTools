import { useEffect, useState } from "react"
import classNames from "classnames"
import { formatURL } from "utils/helper"
import classes from "../SelectAssetDropdown.module.scss"

export const SelectAssetOption = ({
  image = "",
  name = "",
  selected = false,
  onClick,
}) => {
  const [imgURL, setImgURL] = useState()
  const [imgLoadFailed, setLoadFailed] = useState(false)
  useEffect(() => {
    const format = async () => {
      const response = await formatURL(image)
      setImgURL(response)
    }
    format()
  }, [])

  return (
    <li
      className={classNames(
        classes.dropdown__item,
        selected && classes["dropdown__item--active"]
      )}
    >
      <button type="button" onClick={() => onClick(imgURL)}>
        {imgLoadFailed ? (
          <video preload="none" controls>
            <source src={`${imgURL}#t=0.1`} />
          </video>
        ) : (
          <img
            src={imgURL}
            alt={image}
            loading="lazy"
            onError={() => setLoadFailed(true)}
          />
        )}
        {name}
      </button>
    </li>
  )
}
