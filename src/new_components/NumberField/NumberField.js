/* eslint-disable react/jsx-no-duplicate-props */
import classNames from "classnames"
import classes from "./NumberField.module.scss"

export const NumberField = ({
  placeholder,
  value,
  onChange = () => {},
  onEnterPress = () => {},
  className,
  label,
  required,
  error,
  icon,
  name,
  type = "text",
  labelAccent,
  disabled,
}) => {
  const inputRandomId = `text-field-${Math.random()}`

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
        disabled && classes.disabled,
        className
      )}
    >
      {label && (
        <label
          htmlFor={inputRandomId}
          className={classNames(
            classes.label,
            labelAccent && classes["label-accent-pink"]
          )}
        >
          {label} {required && <span style={{ color: "#ff39b0" }}>*</span>}
        </label>
      )}
      <div className={classes["input-container"]}>
        {icon && icon}
        <input
          className={classes.input}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          id={inputRandomId}
          name={name}
          disabled={disabled}
        />
      </div>
      <div className={classes["error-container"]}>{error}</div>
    </div>
  )
}
