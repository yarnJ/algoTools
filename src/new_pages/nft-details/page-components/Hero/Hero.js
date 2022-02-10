import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { BidNFTModal, Button, OwnerBadge } from "new_components"
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
import { formatCreator, formatAddress } from "utils/helper"

export const Hero = ({ asset, currentOwner }) => {
  const history = useHistory()
  // const assetParams = asset?.params || {}
  const { name, url } = asset
  const selectedCollectionInfo = asset.collection
  const description = `Hatching 1 at a time. 500 Flamingo Flock. All ${selectedCollectionInfo?.name} are 1 of 1s excluding the 'Originals' and '${selectedCollectionInfo?.name}'. There are no vaulted ${selectedCollectionInfo?.name}.`
  const [isNftModalOpen, setIsNftModalOpen] = useState(false)
  const snackbarInitValues = {
    isActive: false,
    text: "",
    color: "",
    timeout: 3000,
  }
  const [snackbar, setSnackbar] = useState(snackbarInitValues)
  const [share, setShare] = useState(false)
  const [love, setLove] = useState(false)
  const showMessage = ({ text, color, timeout }) => {
    setSnackbar({ isActive: true, text, color, timeout })
  }

  const handleCopyValue = (value) => {
    navigator.clipboard.writeText(value)
    showMessage({ text: "Copied to clipboard", color: "success" })
  }

  const handleClickAddress = (value) => {
    console.log("value", value)
    history.push(`/creators/${value}`)
  }
  const details = [
    {
      title: "Unit Name",
      value: asset?.unitName,
    },
    {
      title: "Creator",
      address: asset?.creator,
      value: formatAddress(asset.creator),
      clipboard: true,
    },
    {
      title: "Current Owner",
      address: currentOwner,
      value: formatAddress(currentOwner),
      clipboard: true,
    },
    {
      title: "Total",
      value: asset?.total,
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
          <Link
            to={`/creators/${selectedCollectionInfo?.creatorAddress}`}
            className={classes.info__link}
          >
            <OwnerBadge
              id={formatCreator(selectedCollectionInfo?.creator)}
              img={url}
              className={classes.info__owner}
            />
          </Link>
          <h1 className={classes.info__title}>{name}</h1>
          <p className={classes.info__text}>{description}</p>
          <div className={classes.info__divider} />
          <div className={classes.info__details}>
            {details.map((detail, idx) => (
              <div key={idx} className={classes.info__detail}>
                {detail.clipboard ? (
                  <>
                    <span
                      className={classes.info__address}
                      onClick={() => handleClickAddress(detail.address)}
                    >
                      {detail.title}
                    </span>
                    <span className={classes.info__address}>
                      <span onClick={() => handleClickAddress(detail.address)}>
                        {detail.value}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyValue(detail.address)}
                      >
                        <CopyIcon />
                      </button>
                    </span>
                  </>
                ) : (
                  <>
                    <span>{detail.title}</span>
                    <span>{detail.value}</span>
                  </>
                )}
                {/* <span>{detail.title}</span>
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
                </span> */}
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
          <Button
            // type="anchor"
            className={classes.info__btn}
            // onClick={() => setIsNftModalOpen(true)}
            // to={`https://ab2.gallery/asset/${index}`}
          >
            Buy Asset
          </Button>
        </div>

        <div className={classes.figures}>
          <ArrowRightIcon />
          <div className={classes["figures__image-container"]}>
            <a href={url}>
              <div className={classes.figures__image}>
                <img src={url} alt="" />
                <img src={url} alt="" />
              </div>
            </a>
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

      <BidNFTModal
        isOpen={isNftModalOpen}
        onClose={() => setIsNftModalOpen(false)}
        nft={url}
      />
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
