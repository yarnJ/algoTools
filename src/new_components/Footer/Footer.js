import { Button } from "new_components"
import classes from "./Footer.module.scss"
import { ReactComponent as GroundShape } from "new_assets/shapes/ground.svg"
import { ReactComponent as CircleShape } from "new_assets/shapes/circle.svg"
import { useHistory } from "react-router-dom"
import { animateScroll as scroll } from "react-scroll"

export const Footer = () => {
  const history = useHistory()

  const exploreCollections = () => {
    history.push(`/explore-collections`)
    scroll.scrollToTop()
  }

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <h3 className={classes.title}>GM</h3>
        <p className={classes.desc}>
          Mint, list, auction & trade NFTs. Enter the&nbsp;
          <span> new creator economy</span> on Algorand.
        </p>

        <Button onClick={exploreCollections}>Explore Market</Button>

        {/* <span className={classes.copyright}>
        Sabregen Explorer 2021, All right received
      </span> */}
      </div>

      <CircleShape className={classes["circle-svg"]} />
      <div className={classes["ground-svg"]}>
        <div />
        <GroundShape />
      </div>
    </footer>
  )
}
