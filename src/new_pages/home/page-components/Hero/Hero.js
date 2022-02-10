import { useRef, useEffect } from "react"
import classNames from "classnames"
import classes from "./Hero.module.scss"
import { Button, OwnerBadge } from "new_components"
import { Link, useHistory } from "react-router-dom"
import { ReactComponent as ArrowRightIcon } from "new_assets/icons/arrow-right.svg"
import { ReactComponent as HomeHeroCircle } from "new_assets/shapes/circle.svg"
import { ReactComponent as HomeHeroGround } from "new_assets/shapes/ground.svg"
// import HeroImage from "../../page-assets/home-hero.png"
import HeroImage1 from "../../page-assets/home-hero-1.png"
import ProfileLogo from "../../../../assets/logos/profile.png"
import { animateScroll as scroll } from "react-scroll"

export const Hero = () => {
  const cardRef = useRef(null)
  const containerRef = useRef(null)
  const history = useHistory()

  useEffect(() => {
    handleResize()
    // Bind the event listener
    window.addEventListener("resize", handleResize)
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  const handleBidClick = () => {
    history.push("/explore-auctions")
  }
  const handleResize = () => {
    if (window.innerWidth < 600) {
      containerRef.current.style.paddingBottom = `${
        (60 / 100) * cardRef.current.offsetHeight
      }px`
    } else {
      containerRef.current.style.paddingBottom = "unset"
    }
  }

  const exploreCollections = () => {
    history.push(`/explore-collections`)
    scroll.scrollToTop()
  }

  const stitchbobAddress =
    "MNGOLDXO723TDRM6527G7OZ2N7JLNGCIH6U2R4MOCPPLONE3ZATOBN7OQM"

  return (
    <div className={classes.container} ref={containerRef}>
      <section className={classes.hero}>
        <div className={classes.info}>
          <h1 className={classes.info__title}>
            <span
              className={classNames(
                classes.info__title,
                classes["info__title--pink"]
              )}
            >
              GM
            </span>
            <span
              className={classNames(
                classes.info__title,
                classes["info__title--blue"]
              )}
            >
              To Beautiful
            </span>
            <span
              className={classNames(
                classes.info__title,
                classes["info__title--pink"]
              )}
            >
              NFT Commerce
            </span>
          </h1>

          <p className={classes.info__subtitle}>
            The premier NFT marketplace on Algorand. Simplifying how you
            discover, buy and sell NFTs starts <a href="/">here</a>.
          </p>

          <Button onClick={exploreCollections}>Explore Market</Button>
        </div>

        <div className={classes.figures}>
          <div className={classes["figures__image-container"]}>
            <ArrowRightIcon />

            <div className={classes.figures__image}>
              <Link
                to={`creators/${stitchbobAddress}`}
                className={classes.creator_link}
              >
                <OwnerBadge
                  img={ProfileLogo}
                  id="stitchbob"
                  className={classes["figures__image-owner"]}
                />
              </Link>
              <img src={HeroImage1} alt="" />
              <img src={HeroImage1} alt="" />
            </div>
          </div>

          <div className={classes.card} ref={cardRef}>
            <div className={classes.card__header}>
              <span className={classes.card__title}>Yieldling Rare #017</span>
              <Link
                to={`creators/${stitchbobAddress}`}
                className={classes.creator_link}
              >
                <OwnerBadge img={ProfileLogo} id="stitchbob" />
              </Link>
            </div>

            <p className={classes.card__text}>
              Hatching 1 at a time. 500 Flamingo Flock. All Yieldlings are 1 of
              1s excluding the 'Originals' and 'Yields'. There are no vaulted
              Yieldlings.
            </p>

            <div className={classes.card__actions}>
              <Button onClick={handleBidClick}>Bid</Button>
              <div className={classes.card__action}>
                <span>Current Bid</span>
                <span>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0015 16.023H13.4928L11.8635 9.96234L8.36058 16.0237H5.55985L10.974 6.64134L10.1026 3.38411L2.80208 16.0257H0L9.25209 0H11.7051L12.7792 3.98158H15.3101L13.5821 6.98639L16.0015 16.023Z"
                      fill="#00EBFF"
                    />
                  </svg>
                  3.20 ALGO
                </span>
              </div>
              <div className={classes.card__action}>
                <span>Ending In</span>
                <span>8h 14m 24s</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeHeroCircle className={classes["circle-shape"]} />
      <div className={classes["ground-shape"]}>
        <div />
        <HomeHeroGround />
      </div>
    </div>
  )
}
