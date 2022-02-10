import classes from "./Breadcrumb.module.scss"
import { Link } from "react-router-dom"
import { ReactComponent as VerifiedIcon } from "assets/icons/verified.svg"
import { Tooltip } from "@blueprintjs/core"

export const Breadcrumb = ({ paths, className, showVerifiedIcon }) => (
  <nav className={className}>
    <ul className={classes.list}>
      {paths.map((path, index) => {
        if (index + 1 !== paths.length) {
          return (
            <li className={classes.item} key={index}>
              <Link to={path.to}>{path.label}</Link>
            </li>
          )
        }

        return (
          <li className={classes.item} key={index}>
            {path.label}
            {showVerifiedIcon && (
              <Tooltip
                content={
                  <span className={classes.tooltip_content}>
                    This creator has been verified by nftexplorer.app
                  </span>
                }
                minimal
                position="bottom-left"
                popoverClassName={classes.popover_custom}
              >
                <VerifiedIcon />
              </Tooltip>
            )}
          </li>
        )
      })}
    </ul>
  </nav>
)
