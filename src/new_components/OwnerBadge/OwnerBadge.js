import classNames from "classnames"
import classes from "./OwnerBadge.module.scss"
import { useState } from "react"

export const OwnerBadge = ({ img, id, className, accent, onClick }) => {
  const [imgLoadFailed, setLoadFailed] = useState(false)
  return (
    <div
      className={classNames(
        classes.owner,
        className,
        accent && classes[accent]
      )}
      onClick={onClick}
    >
      {!imgLoadFailed ? (
        <img
          src={img}
          alt={img}
          loading="lazy"
          onError={() => setLoadFailed(true)}
        />
      ) : (
        <video preload="none" autoPlay muted>
          <source src={img} />
        </video>
      )}
      <span>@{id}</span>
    </div>
  )
}
