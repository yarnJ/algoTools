import { useState } from "react"
import { Link } from "react-router-dom"
import { Snackbar } from "components"
import { ReactComponent as HomeHeroGround } from "new_assets/shapes/ground.svg"
import { ReactComponent as ArrowRightIcon } from "new_assets/icons/arrow-right.svg"
import { ReactComponent as ShareIcon } from "new_assets/icons/share.svg"
import { ReactComponent as HeartIcon } from "new_assets/icons/heart.svg"
import { ReactComponent as CopyIcon } from "assets/icons/duplicate.svg"
// import HeroImage from "../../page-assets/hero.png"
// import { ReactComponent as AlgoIcon } from "../../page-assets/algo-logo.svg"
// import ProfileLogo from "../../../../assets/logos/profile.png"
import classes from "./Hero.module.scss"
import classNames from "classnames"
import { formatAddress } from "utils/helper"
import { getAsaUrl } from "utils/config"

export const Hero = ({ nft }) => {
  // const assetParams = asset?.params || {}
  const { name, unitName, total, creator } = nft.token
  const { description } = nft.metadata
  const imgURL = nft.imgURL()
  const asaURL = getAsaUrl(nft.token.id)
  const snackbarInitValues = {
    isActive: false,
    text: "",
    color: "",
    timeout: 3000,
  }
  const [snackbar, setSnackbar] = useState(snackbarInitValues)
  const [share, setShare] = useState(false)
  const [love, setLove] = useState(false)

  const [imgLoadFailed, setLoadFailed] = useState(false)
  const showMessage = ({ text, color, timeout }) => {
    setSnackbar({ isActive: true, text, color, timeout })
  }

  const handleCopyValue = (value) => {
    navigator.clipboard.writeText(value)
    showMessage({ text: "Copied to clipboard", color: "success" })
  }
  const details = [
    {
      title: "Unit Name",
      value: unitName,
    },
    {
      title: "Creator",
      address: creator,
      value: formatAddress(creator),
      clipboard: true,
    },
    {
      title: "Current Owner",
      address: creator,
      value: formatAddress(creator),
      clipboard: true,
    },
    {
      title: "Total",
      value: total,
    },
    // {
    //   title: "Mint Date",
    //   value: "N/A",
    // },
    // {
    //   title: "Last Sold Price",
    //   value: "100 Algo",
    // },
  ]
  return (
    <div className={classes.container}>
      <div className={classes.hero}>
        <div className={classes.info}>
          {/* <Link to={`creators/${selectedCollectionInfo?.creatorAddress}`}>
            <OwnerBadge
              id={formatCreator(selectedCollectionInfo?.creator)}
              img={url}
              className={classes.info__owner}
            />
          </Link> */}
          <h1 className={classes.info__title}>
            <Link to={asaURL}>{name}</Link>
          </h1>
          <p className={classes.info__text}>{description}</p>
          <div className={classes.info__divider} />
          <div className={classes.info__details}>
            {details.map((detail, idx) => (
              <div key={idx} className={classes.info__detail}>
                <span>{detail.title}</span>
                <span>
                  {detail.value}
                  {detail.clipboard && (
                    <button
                      type="button"
                      onClick={() => handleCopyValue(detail.address)}
                    >
                      <CopyIcon />
                    </button>
                  )}
                </span>
              </div>
            ))}
          </div>
          {/* <div className={classes.info__details}>
            <div className={classes.info__detail}>
              <span>Current Bid</span>
              <span>
                <AlgoIcon /> {price || 0}
              </span>
            </div>
            <div className={classes.info__detail}>
              <span>Ending In</span>
              <CountDown time={1638386291000} />
            </div>
          </div> */}
        </div>

        <div className={classes.figures}>
          <ArrowRightIcon />
          <div className={classes["figures__image-container"]}>
            {!imgLoadFailed ? (
              <a href={imgURL}>
                <div className={classes.figures__image}>
                  <img src={imgURL} alt="" />
                  <img
                    src={imgURL}
                    alt=""
                    onError={() => setLoadFailed(true)}
                  />
                </div>
              </a>
            ) : (
              <a href={imgURL}>
                <div className={classes.figures__image}>
                  <video preload="none" autoPlay muted>
                    <source src={imgURL} />
                  </video>
                  <video preload="none" autoPlay muted>
                    <source src={imgURL} />
                  </video>
                </div>
              </a>
            )}
            <div className={classes.figures__actions}>
              <button
                type="button"
                className={classNames(
                  classes.figures__action,
                  classes.hover_blue_button,
                  share && classes.blue_button
                )}
                onClick={() => setShare(!share)}
              >
                <ShareIcon />
              </button>
              <button
                type="button"
                className={classNames(
                  classes.figures__action,
                  classes.hover_pink_button,
                  love && classes.pink_button
                )}
                onClick={() => setLove(!love)}
              >
                <HeartIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={classes["ground-shape"]}>
        <div />
        <HomeHeroGround />
      </div>

      {/* <BidNFTModal
        isOpen={isNftModalOpen}
        onClose={() => setIsNftModalOpen(false)}
        nft={url}
      /> */}
      <Snackbar
        text={snackbar.text}
        active={snackbar.isActive}
        color={snackbar.color}
        timeout={snackbar.timeout}
        onClose={() => setSnackbar({ ...snackbar, isActive: false })}
      />
    </div>
  )
}
