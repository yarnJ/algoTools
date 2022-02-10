import { useState } from "react"
import { BaseModal, TextField, Button } from "new_components"
import classes from "./BidNFT.module.scss"

export const BidNFTModal = ({ isOpen, nft, minBid = 0, onBid, onClose }) => {
  const [bidPrice, setBidPrice] = useState(0)
  const [errorMsg, setErrorMsg] = useState(null)
  const [imgLoadFailed, setLoadFailed] = useState(false)

  const handleBidChange = (e) => {
    setBidPrice(e.target.value)
    setErrorMsg(null)
  }

  const handleSubmitBid = () => {
    if (bidPrice < minBid) {
      setErrorMsg("Your price should be greater than the minimum price.")
    } else {
      onBid(bidPrice)
      onClose()
    }
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className={classes.container}>
        <h2 className={classes.title}>Bid on this NFT</h2>
        {!imgLoadFailed ? (
          <img
            src={nft}
            alt={nft}
            loading="lazy"
            className={classes.nft}
            onError={() => setLoadFailed(true)}
          />
        ) : (
          <video preload="none" autoPlay muted>
            <source src={nft} />
          </video>
        )}
        {/* <img src={nft} alt="" className={classes.nft} /> */}
        <TextField
          type="number"
          label={`Minimum Bid ${minBid} ALGO`}
          labelAccent="pink"
          value={bidPrice}
          error={errorMsg}
          onChange={handleBidChange}
        />
        <Button className={classes.cta} onClick={handleSubmitBid}>
          Place a Bid
        </Button>
        <span className={classes.info}>
          Bid will be held in escrow until there is a higher bid or until the
          auction ends
        </span>
      </div>
    </BaseModal>
  )
}
