/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
import { useState, useEffect } from "react"
import { Icon } from "@blueprintjs/core"
import { NFT, NFTMetadata } from "utils/nft"
import { useParams } from "react-router-dom"
import { validateArc3 } from "utils/validator"
import classes from "./index.module.scss"
import { LoadingIndicator } from "components"
import { Layout } from "new_components"
import { Hero } from "./page-components"

const NFTViewer = () => {
  const { index } = useParams()
  const [nft, setNFT] = useState(new NFT(new NFTMetadata()))
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(false)

    let subscribed = true
    NFT.fromAssetId(index).then((nft) => {
      if (!subscribed) return

      setNFT(nft)
      setLoaded(true)
    })

    return () => {
      subscribed = false
    }
  }, [index])

  let metaData = <div />
  let arc3Tests = <div />

  if (loaded) {
    const mdProps = nft.metadata
      ? Object.keys(nft.metadata).map((key, idx) => {
          let prop = nft.metadata[key]
          if (prop === undefined) {
            prop = ""
          }
          if (typeof prop === "object") {
            prop = JSON.stringify(prop)
          }
          return (
            <li key={idx}>
              <b>{key}: </b>
              {prop.toString()}
            </li>
          )
        })
      : [<li key="none">No metadata</li>]

    const arc3Invalids = validateArc3(nft).map((test) => {
      if (test.pass)
        return (
          <li key={test.name}>
            <div>
              <Icon icon="tick" intent="success" /> <b>{test.name}</b>
            </div>
          </li>
        )

      return (
        <li key={test.name}>
          <div>
            <Icon icon="cross" intent="danger" /> <b>{test.name}</b>
          </div>
        </li>
      )
    })

    metaData = (
      <div className={classes["list-container"]}>
        <h5 className={classes["list-title"]}>Metadata</h5>
        <ul className={classes.list}>{mdProps}</ul>
      </div>
    )

    arc3Tests = (
      <div className={classes["list-container"]}>
        <h5 className={classes["list-title"]}>ARC3 tests</h5>
        <ul className={classes.list}>{arc3Invalids}</ul>
      </div>
    )

    return (
      <Layout>
        <Hero nft={nft} />
        <div className={classes.container}>
          <div className={classes.meta}>{metaData}</div>
          <div className={classes.meta}>{arc3Tests}</div>
        </div>
      </Layout>
    )
  }
  return <LoadingIndicator />
}

export default NFTViewer
