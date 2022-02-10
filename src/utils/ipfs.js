/* eslint-disable no-undef */
import { ipfsURL, NFTMetadata } from "./nft"
import { config } from "./config"

/*
 Currently an issue with resolving ipfs-car module in web3.storage when using react-scripts
 We just use the prebuilt one but with no types we have to just ignore the issue for now
//import { Web3Storage } from 'web3.storage'
*/
// @ts-ignore
// eslint-disable-next-line import/extensions
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js"
// import { Web3Storage } from 'web3.storage'
const storage = new Web3Storage({ token: config.storageToken })

export const putToIPFS = async (file, md, setProgressStatus) => {
  try {
    const imgAdded = await storage.put([file], { wrapWithDirectory: false })
    setProgressStatus(40)
    md.image = ipfsURL(imgAdded)

    return await storage.put([md.toFile()], { wrapWithDirectory: false })
  } catch (err) {
    console.error(err)
  }
  return ""
}

export const getMimeTypeFromIpfs = async (url) => {
  const req = new Request(url, { method: "HEAD" })
  const resp = await fetch(req)
  return resp.headers.get("Content-Type")
}

export const getMetaFromIpfs = async (url) => {
  const req = new Request(url)
  const resp = await fetch(req)
  const body = await resp.blob()
  return new NFTMetadata(JSON.parse(await body.text()))
}
