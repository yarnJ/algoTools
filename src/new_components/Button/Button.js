/* eslint-disable react/button-has-type */
import classNames from "classnames"
import classes from "./Button.module.scss"

export const Button = ({
  children,
  type,
  className,
  accent,
  minimal,
  icon,
  to,
  onClick = () => {},
}) => {
  if (type === "anchor") {
    // for external links only
    return (
      <a
        href={to}
        className={classNames(
          classes.button,
          accent && classes[accent],
          minimal && classes.minimal,
          className
        )}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    )
  }
  return (
    <button
      type={type}
      className={classNames(
        classes.button,
        accent && classes[accent],
        minimal && classes.minimal,
        className
      )}
      onClick={onClick}
    >
      {icon && icon} {children}
    </button>
  )
}
