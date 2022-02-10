import { useState, useEffect, useRef } from "react"
import classNames from "classnames"
import { SelectAssetOption } from "./SelectAssetOption/SelectAssetOption"
import classes from "./SelectAssetDropdown.module.scss"

export const SelectAssetDropdown = ({
  className,
  required,
  error,
  labelAccent,
  assets = [],
  onChange = () => {},
}) => {
  const inputRandomId = `select-asset-drop-down-${Math.random()}`
  const inputRef = useRef(false)

  const [isDropdownShown, setIsDropdownShown] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [shownAssets, setShownAssets] = useState([])
  const [selectedAsset, setSelectedAsset] = useState({
    isShown: false,
    data: {},
  })

  useEffect(() => {
    if (searchValue.length === 0) {
      // show all available assets
      setShownAssets(assets)
    } else {
      const filteredAssets = assets.filter((asset) => {
        if (asset.metadata?.name) {
          return asset.metadata.name
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        }
        return false
      })
      setShownAssets(filteredAssets)
    }
  }, [searchValue])

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOnDocument)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOnDocument)
    }
  })

  const handleClickOnDocument = (e) => {
    if (!e.target.closest(`.${classes["input-container"]}`)) {
      if (selectedAsset.data?.img) {
        setSelectedAsset({ isShown: true, data: selectedAsset.data })
      }

      setIsDropdownShown(false)
    }
  }

  const handleShowInputAndDropdown = () => {
    setSelectedAsset({ isShown: false, data: selectedAsset.data })
    setIsDropdownShown(true)
    setTimeout(() => {
      inputRef.current.focus()
    }, 50)
  }

  const handleSelectAsset = (asset, url) => {
    setSelectedAsset({ isShown: true, data: { ...asset, url } })
    onChange({ ...asset, url })
    setIsDropdownShown(false)
  }

  return (
    <div
      className={classNames(
        classes.container,
        error && classes.error,
        className
      )}
    >
      <label
        htmlFor={inputRandomId}
        className={classNames(
          classes.label,
          labelAccent && classes["label-accent-pink"]
        )}
      >
        NFT {required && <span style={{ color: "#ff39b0" }}>*</span>}
      </label>
      <div className={classes["input-container"]}>
        <input
          className={classNames(
            classes.input,
            selectedAsset.isShown && classes["input--hidden"]
          )}
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Start typing to search"
          value={searchValue}
          id={inputRandomId}
          onFocus={() => setIsDropdownShown(true)}
          ref={inputRef}
        />

        {selectedAsset.isShown && (
          <div
            className={classes["selected-asset"]}
            onClick={handleShowInputAndDropdown}
          >
            {selectedAsset.data?.metadata?.image_mimetype === "video/mp4" ? (
              <video preload="none" controls>
                <source src={`${selectedAsset.data?.url}#t=0.1`} />
              </video>
            ) : (
              <img src={selectedAsset.data?.url} alt="nft-asset" />
            )}
            <span>{selectedAsset.data?.metadata?.name}</span>
          </div>
        )}

        {isDropdownShown &&
          (shownAssets && shownAssets.length > 0 ? (
            <ul className={classes.dropdown}>
              {shownAssets.map((e) => (
                <SelectAssetOption
                  key={e.token.id}
                  name={e.metadata.name}
                  image={e.metadata.image}
                  selected={e.token.id === selectedAsset.data?.token?.id}
                  onClick={(img) => handleSelectAsset(e, img)}
                />
              ))}
            </ul>
          ) : (
            <ul
              className={classNames(
                classes.dropdown,
                classes["dropdown--no-item"]
              )}
            >
              <li className={classes.dropdown__item}>No assets found!</li>
            </ul>
          ))}
      </div>
      <div className={classes["error-container"]}>{error}</div>
    </div>
  )
}
