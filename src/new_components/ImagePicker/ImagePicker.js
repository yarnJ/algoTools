import classNames from "classnames"
import { useState } from "react"
import classes from "./ImagePicker.module.scss"

export const ImagePicker = ({ name, setFile, error }) => {
  const inputRandomId = `image-picker-${Math.random()}`

  const [img, setImg] = useState(null)

  const handleOnChange = (event) => {
    const file = event.target.files.item(0)
    setFile(file)
    const reader = new FileReader()

    reader.onload = (e) => {
      setImg(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className={classNames(classes.container, error && classes.error)}>
      <div
        className={classNames(
          classes["image-preview-container"],
          img && classes["image-preview-container--visible"]
        )}
      >
        <img src={img} alt="" />
      </div>

      <label htmlFor={inputRandomId} className={classes.label}>
        <div className={classes.label__shape}>
          <svg
            viewBox="0 0 37 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.25 3.75L15.8571 11.275L25.1071 0L37 15H0L9.25 3.75V3.75Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <span className={classes.label__text}>Click here to select file</span>
      </label>

      <input
        type="file"
        id={inputRandomId}
        onChange={handleOnChange}
        name={name}
        style={{ display: "none" }}
      />
    </div>
  )
}
