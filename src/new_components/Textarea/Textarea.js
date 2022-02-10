import classNames from "classnames"

import classes from "./Textarea.module.scss"

export const Textarea = ({
  placeholder,
  value,
  onChange = () => {},
  onEnterPress = () => {},
  className,
  label,
  required,
  error,
  name,
  icon,
}) => {
  const inputRandomId = `textarea-${Math.random()}`

  const handleKeyDown = (e) => {
    if (e.code === "Enter" && onEnterPress) {
      onEnterPress(e)
    }
  }

  return (
    <div
      className={classNames(
        classes.container,
        error && classes.error,
        className
      )}
    >
      {label && (
        <label htmlFor={inputRandomId} className={classes.label}>
          {label} {required && <span style={{ color: "#ff39b0" }}>*</span>}
        </label>
      )}
      <div className={classes["input-container"]}>
        {icon && icon}

        <textarea
          className={classes.input}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          onKeyDown={handleKeyDown}
          id={inputRandomId}
          rows="7"
          name={name}
        />
      </div>

      <div className={classes["error-container"]}>{error}</div>
    </div>
  )
}
