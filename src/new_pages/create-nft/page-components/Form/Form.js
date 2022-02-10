/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
import { useState } from "react"
import { useHistory } from "react-router-dom"
import classNames from "classnames"
import {
  TextField,
  NumberField,
  Textarea,
  Button,
  ImagePicker,
  AlertModal,
} from "new_components"
import { putToIPFS } from "utils/ipfs"
import { imageIntegrity, NFT, NFTMetadata } from "utils/nft"
import { ReactComponent as PlusIcon } from "new_assets/icons/plus-circle.svg"
import classes from "./Form.module.scss"
// import { Dialog, Classes } from "@blueprintjs/core"

export const Form = (props) => {
  const { className, sw, connected } = props
  const history = useHistory()

  const [meta, setMeta] = useState(new NFTMetadata())
  const [loading, setLoading] = useState(false)
  // const [imgSrc, setImgSrc] = useState()
  const [fileObj, setFileObj] = useState()
  // const [decimal, setDecimal] = useState(0)
  // const [extraProps, setExtraProps] = useState([])
  // const [extraPropsVisible, setExtraPropsVisible] = useState(false)

  const [progressStatus, setProgressStatus] = useState()

  const [mints, setMints] = useState([])
  const [errors, setErrors] = useState({
    image: false,
    name: false,
    unitName: false,
    decimal: false,
    description: false,
    mints: [],
  })

  const initInfoDialog = {
    isOpen: false,
    data: { title: "", desc: "" },
  }

  const [infoDialog, setInfoDialog] = useState(initInfoDialog)
  const [decimal, setDecimal] = useState(0)

  const handleNumberChange = (e) => {
    console.log("e", e.target.value)
    setDecimal(e.target.value)
  }

  const createRandomId = () => {
    const id = Math.random()
    if (mints.some((mint) => mint.id === id)) {
      createRandomId()
    } else {
      return id
    }
  }

  const handleAddMint = () => {
    const existingMints = [...mints]
    existingMints.push({
      id: createRandomId(),
      name: "",
      value: "",
    })

    setMints(existingMints)
  }

  const handleOnChangeMintInput = ({ event, type, id }) => {
    const existingMints = [...mints]
    // find target input
    const targetIndex = existingMints.findIndex((mint) => mint.id === id)

    if (targetIndex !== -1) {
      // update value
      if (type === "name") {
        existingMints[targetIndex].name = event.target.value
      } else if (type === "value") {
        existingMints[targetIndex].value = event.target.value
      }
    }

    setMints(existingMints)
  }

  const handleValidateForm = (e) => {
    e.preventDefault()

    const elements = e.target.elements

    const formValues = {
      image: elements.image.files.item(0),
      name: elements.name.value,
      unitName: elements.unitName.value,
      decimal: elements.decimal.value
        ? Number(elements.decimal.value)
        : undefined,
      description: elements.description.value,
    }

    const errorsObj = {
      image: !formValues.image,
      name: !!(!formValues.name.trim() && formValues.name.trim().length < 3),
      unitName: !!(
        !formValues.unitName.trim() && formValues.unitName.trim().length < 3
      ),
      // eslint-disable-next-line no-restricted-globals
      decimal: isNaN(formValues.decimal),
      description: !!(
        !formValues.description.trim() &&
        formValues.description.trim().length < 3
      ),
      mints: [],
    }

    // check for mint validations
    mints.forEach((mint) => {
      const isNameNotValid = !!(
        !mint.name.trim() && mint.name.trim().length < 3
      )
      const isValueNotValid = !!(
        !mint.value.trim() && mint.value.trim().length < 3
      )

      if (isNameNotValid || isValueNotValid) {
        errorsObj.mints.push({
          id: mint.id,
          name: isNameNotValid,
          value: isValueNotValid,
        })
      }
    })

    setErrors(errorsObj)

    const isAllFormValuesValid = Object.values(errorsObj).every((field) => {
      if (Array.isArray(field)) {
        return field.length === 0
      }

      return !field
    })

    if (isAllFormValuesValid) {
      // all fields are valid
      mintNft({ ...formValues, mints })
    }
  }

  const captureMetadata = (values) => {
    const eprops = values.mints.reduce(
      (all, ep) => ({ ...all, [ep.name]: ep.value }),
      {}
    )
    return new NFTMetadata({
      name: values.name,
      unitName: values.unitName,
      description: values.description,
      image_mimetype: values.image.type,
      decimals: values.decimal,
      properties: { ...eprops, ...meta.properties },
    })
  }

  const mintNft = async (values) => {
    setLoading(true)
    setProgressStatus(10)
    const md = captureMetadata(values)
    md.image_integrity = await imageIntegrity(fileObj)
    setProgressStatus(30)
    setMeta(md)

    const cid = await putToIPFS(fileObj, md, setProgressStatus)
    if (cid) {
      setProgressStatus(50)
      try {
        const nft = await NFT.create(sw.wallet, md, cid, setProgressStatus)
        setLoading(false)
        handleSetNFT(nft)
      } catch (err) {
        if (connected) {
          if (JSON.stringify(err).includes("PopupOpenError")) {
            handleShowInfoDialog({
              title: "Wallet Popup Blocked",
              desc: "Your browser has blocked popups. Please allow popups to create an NFT.",
            })
          } else {
            handleShowInfoDialog({
              title: "Unexpected Error",
              desc: `Failed to create nft: ${err}`,
            })
          }
        } else {
          handleShowInfoDialog({
            title: "Connect a wallet",
            desc: "Please connect a wallet",
          })
        }
        setProgressStatus(0)
        setLoading(false)
      }
    } else {
      setLoading(false)
      setProgressStatus(0)
    }
  }

  const isMintInputHasError = (mintId, type) => {
    const existingMintErrors = [...errors.mints]

    // find target input
    const targetIndex = existingMintErrors.findIndex(
      (mint) => mint.id === mintId
    )

    if (targetIndex !== -1) {
      if (type === "name" && existingMintErrors[targetIndex].name) {
        return "Mint name is required"
      } else if (type === "value" && existingMintErrors[targetIndex].value) {
        return "Mint value is required"
      }
    }

    return false
  }

  const setFile = (file) => {
    setFileObj(file)

    // const reader = new FileReader()
    // reader.onload = (e) => {
    //   setImgSrc(e.target.result)
    // }
    // reader.readAsDataURL(file)

    setMeta(
      (meta) =>
        new NFTMetadata({
          ...meta,
          image: file.name,
          image_mimetype: file.type,
          properties: { ...meta.properties, size: file.size },
        })
    )
  }
  // function clearFile() {
  //   setFileObj(null)
  //   setImgSrc("")
  //   setMeta(new NFTMetadata())
  // }
  const handleShowInfoDialog = ({ title, desc }) => {
    setInfoDialog({ isOpen: true, data: { title, desc } })
  }

  const handleCloseInfoModal = () => {
    setInfoDialog(initInfoDialog)
  }

  const handleSetNFT = (nft) => history.push(`/mint-nft/${nft.token.id}`)

  return (
    <>
      <AlertModal
        isOpen={infoDialog.isOpen}
        data={infoDialog.data}
        onClose={handleCloseInfoModal}
      />
      {/* <Dialog
        isOpen={infoDialog.isOpen}
        title={infoDialog.data.title}
        className={classes.dialog}
      >
        <div className={Classes.DIALOG_BODY}>
          <p>{infoDialog.data.desc}</p>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={handleCloseInfoModal}>I understand</Button>
          </div>
        </div>
      </Dialog> */}
      <form
        className={classNames(classes.container, className)}
        onSubmit={handleValidateForm}
      >
        <div className={classes.left}>
          <h1 className={classes.title}>Create new NFT</h1>
          <span className={classes.subtitle}>
            Image, video, audio or 3D model
          </span>
          <span className={classes.info}>
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
            GLB, GLTF. Max size: 40 MB
          </span>

          <div className={classes.left__inputs}>
            <TextField
              label="Name"
              required
              name="name"
              error={errors.name && "Name is required"}
            />
            <TextField
              label="Unit name"
              required
              name="unitName"
              error={errors.unitName && "Unit name is required"}
            />
            <NumberField
              label="Decimals (A value > 0 is considered a 'Fractional NFT')"
              type="number"
              name="decimal"
              value={decimal}
              onChange={handleNumberChange}
              error={errors.decimal && "Decimal should be a number"}
            />
          </div>
        </div>

        <div className={classes.right}>
          <ImagePicker name="image" setFile={setFile} error={errors.image} />
        </div>

        <div className={classes.bottom}>
          <Textarea
            label="Description"
            required
            className={classes.description}
            name="description"
            error={errors.description && "Description is required"}
          />

          <div className={classes.mint}>
            <div className={classes.mint__header}>
              <span>Traits</span>
              <button type="button" onClick={handleAddMint}>
                + Add
              </button>
            </div>

            {mints.length > 0 ? (
              mints.map((mint) => (
                <div className={classes.mint__row} key={mint.id}>
                  <TextField
                    value={mint.name}
                    placeholder="Traits Type"
                    onChange={(e) =>
                      handleOnChangeMintInput({
                        event: e,
                        type: "name",
                        id: mint.id,
                      })
                    }
                    error={isMintInputHasError(mint.id, "name")}
                  />
                  <TextField
                    value={mint.value}
                    placeholder="Traits Value"
                    onChange={(e) =>
                      handleOnChangeMintInput({
                        event: e,
                        type: "value",
                        id: mint.id,
                      })
                    }
                    error={isMintInputHasError(mint.id, "value")}
                  />
                </div>
              ))
            ) : (
              <p className={classes["mint__no-mint-message"]}>
                No traits added, click on "Add" to add a trait.
              </p>
            )}
          </div>
          {loading && (
            <div className={classes["mint-progress-bar"]}>
              <div
                className={classes["mint-progress"]}
                style={{ width: `${progressStatus}%` }}
              />
            </div>
          )}
          <div className={classes.actions}>
            <Button accent="pink" minimal icon={<PlusIcon />} type="submit">
              {loading ? "Creating..." : "Create NFT"}
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}
