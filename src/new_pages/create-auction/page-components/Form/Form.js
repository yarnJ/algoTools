import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { loadStdlib } from "@reach-sh/stdlib"
import MyAlgoConnect from "@reach-sh/stdlib/ALGO_MyAlgoConnect"
import { SessionWallet } from "algorand-session-wallet"
import classNames from "classnames"

import { LoadingIndicator } from "components"
import {
  AlertModal,
  Button,
  SelectAssetDropdown,
  TextField,
} from "new_components"
import { AssetCard } from "new_pages/create-auction/page-components"
import { config, LOADING_STATUS } from "utils/config"
import { getAccountInfo } from "utils/algorand"
import { NFT } from "utils/nft"
import {
  setSessionWallet,
  setAccounts,
  setConnectedStatus,
} from "redux/wallet/wallet-slice"
import { ReactComponent as PlusIcon } from "new_assets/icons/plus-circle.svg"
import * as AuctionService from "../../../../services/AuctionService"
import { AuctionBackendService } from "../../../../services/AuctionBackendService"
import classes from "./Form.module.scss"

const stdlib = loadStdlib("ALGO")
stdlib.setWalletFallback(
  stdlib.walletFallback({
    providerEnv: config.network,
    MyAlgoConnect,
  })
)

export const Form = ({ className }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { sessionWallet } = useSelector((state) => state.wallet)

  const [assetList, setAssetList] = useState([])
  const [loading, setLoading] = useState(LOADING_STATUS.IDLE)
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [startingBid, setStartingBid] = useState(0)
  const [endIn, setEndIn] = useState("")
  const [alertMessage, setAlertMessage] = useState({})
  const [errors, setErrors] = useState({
    bid: false,
    duration: false,
    asset: false,
  })

  useEffect(() => {
    if (sessionWallet.connected()) {
      const defaultAddress = sessionWallet.getDefaultAccount()
      setLoading(LOADING_STATUS.PENDING)
      fetchAssets(defaultAddress)
    } else {
      setLoading(LOADING_STATUS.IDLE)
      setSelectedAsset(null)
      setAssetList([])
      setStartingBid(0)
      setEndIn("")
      setAlertMessage({})
      setErrors({
        bid: false,
        duration: false,
        asset: false,
      })
    }
  }, [sessionWallet])

  useEffect(() => {
    if (selectedAsset) {
      setSelectedAsset({
        ...selectedAsset,
        currentBid: startingBid,
        endingIn: endIn,
      })
    }
  }, [startingBid, endIn])

  const fetchAssets = async (addr) => {
    try {
      const { assets } = await getAccountInfo(addr)
      const getAssetPromises = []
      assets.map((asset) =>
        getAssetPromises.push(NFT.fromAssetId(asset["asset-id"]))
      )
      Promise.all([...getAssetPromises])
        .then((list) => setAssetList(list))
        .catch((error) => console.log(error))
        .finally(() => setLoading(LOADING_STATUS.COMPLETED))
    } catch (error) {
      console.log(error)
    }
  }

  const handleConnect = async () => {
    try {
      const sw = new SessionWallet(
        sessionWallet.network,
        sessionWallet.permissionCallback,
        "my-algo-connect"
      )
      const res = await sw.connect()
      if (res) {
        dispatch(setSessionWallet(sw))
        dispatch(setAccounts(sw.accountList()))
        dispatch(setConnectedStatus(sw.connected()))
      } else {
        setAlertMessage({
          title: "Wallet Connection Failed",
          desc: "Please try it again.",
        })
      }
    } catch (error) {
      setAlertMessage({
        title: "Wallet Connection Error",
        desc: "Please try it again.",
      })
    }
  }

  const handleValidateForm = () => {
    const values = {
      asset: selectedAsset,
      bid: startingBid ? Number(startingBid) : undefined,
      duration: endIn,
    }
    const errorsObj = {
      asset: !values.asset,
      bid: Number.isNaN(values.bid),
      duration: !!(
        !values.duration.trim() && values.duration.trim().length < 3
      ),
    }

    setErrors(errorsObj)

    const isAllValuesValid = Object.values(errorsObj).every((field) => !field)

    if (isAllValuesValid) {
      // all fields are valid
      createAuction(values)
    }
  }

  const createAuction = async (values) => {
    const { asset } = values
    const defaultAccount = await stdlib.getDefaultAccount()

    const ctc = defaultAccount.contract(AuctionService)
    try {
      await AuctionService.Auctioneer(ctc, {
        getSale: () => ({
          token: +asset?.token?.id,
          reservePrice: stdlib.parseCurrency(startingBid),
          timeout: +endIn * 60,
        }),
        signal: async () => {
          const ctcInfo = await ctc.getInfo()
          await AuctionBackendService.createAuction(ctcInfo)
          history.push(`/explore-auctions`)
        },
      })
    } catch (error) {
      console.log(error)
      setAlertMessage({
        title: "Auction creation failed",
        desc: "Please try it again.",
      })
    }
  }

  return (
    <section className={classNames(classes.container, className)}>
      <div className={classes.left}>
        <h1 className={classes.title}>Create Auction</h1>
        <span className={classes.subtitle}>
          Choose an NFT you own to auction on the marketplace.
        </span>
        {loading === LOADING_STATUS.IDLE && (
          <Button onClick={handleConnect} className={classes["connect-btn"]}>
            Connect Wallet
          </Button>
        )}
        {loading === LOADING_STATUS.PENDING ? (
          <LoadingIndicator />
        ) : (
          loading === LOADING_STATUS.COMPLETED && (
            <>
              <div className={classes.left__inputs}>
                <SelectAssetDropdown
                  required
                  assets={assetList}
                  error={errors.asset && "Please Select An NFT First"}
                  onChange={(asset) => setSelectedAsset(asset)}
                />

                <TextField
                  label="Starting bid"
                  required
                  error={errors.bid && "Starting bid is required"}
                  type="number"
                  value={startingBid}
                  onChange={(e) => setStartingBid(e.target.value)}
                  disabled={!selectedAsset}
                />

                <TextField
                  label="Auction duration (mins)"
                  required
                  error={errors.duration && "Auction duration is required"}
                  value={endIn}
                  onChange={(e) => setEndIn(e.target.value)}
                  disabled={!selectedAsset}
                />
              </div>

              <Button
                accent="pink"
                minimal
                icon={<PlusIcon />}
                onClick={handleValidateForm}
                className={classes["submit-btn"]}
              >
                Create Auction
              </Button>
            </>
          )
        )}
      </div>

      {loading !== LOADING_STATUS.IDLE && (
        <div className={classes.right}>
          {selectedAsset ? (
            <AssetCard {...selectedAsset} noHover />
          ) : (
            loading === LOADING_STATUS.COMPLETED && (
              <div className={classes.right__placeholder}>
                Please Select An NFT First
              </div>
            )
          )}
        </div>
      )}

      <AlertModal
        isOpen={!!alertMessage.title}
        data={alertMessage}
        onClose={() => setAlertMessage({})}
      />
    </section>
  )
}
