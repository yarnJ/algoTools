import { ARC3_URL_SUFFIX } from "utils/nft"
import axios from "axios"
import { config } from "utils/config"

export const formatURL = async (url) => {
  if (url && url.includes("ipfs://")) {
    const urlArr = url.split("://")
    if (url.endsWith(ARC3_URL_SUFFIX)) {
      const response = await axios.get(`https://ipfs.io/ipfs/${urlArr[1]}`)
      if (response.data.image) {
        const respURL = await formatURL(response.data.image)
        return respURL
      }
    } else {
      const returnURL = `https://yieldly.mypinata.cloud/ipfs/${urlArr[1]}`
      return returnURL
    }
  } else if (url && url.includes("ipfs.io")) {
    const replaceURL = url.replace("ipfs.io", "yieldly.mypinata.cloud")
    return replaceURL
  } else if (url && url.includes("tinyurl.com")) {
    const res = await axios.get(url)
    if (res.request.responseURL) {
      // const respURL = await formatURL(res.request.responseURL)
      const replaceURL = res.request.responseURL.replace(
        "gateway.pinata.cloud",
        "yieldly.mypinata.cloud"
      )
      return replaceURL
    } else if (res.request.res.responseUrl) {
      // const respURL = await formatURL(res.request.res.responseUrl)
      const replaceURL = res.request.res.responseUrl.replace(
        "gateway.pinata.cloud",
        "yieldly.mypinata.cloud"
      )
      return replaceURL
    }
    return url
  } else if (url && url.includes("rebrand.ly")) {
    const res = await axios.get(`https://${url}`)
    if (res.request.responseURL) {
      const respURL = await formatURL(res.request.responseURL)
      return respURL
    } else if (res.request.res.responseUrl) {
      const respURL = await formatURL(res.request.res.responseUrl)
      return respURL
    }
    return url
  } else if (url && url.includes("gateway.pinata.cloud")) {
    const replaceURL = url.replace(
      "gateway.pinata.cloud",
      "yieldly.mypinata.cloud"
    )
    return replaceURL
  } else if (url && url.includes("bit.ly")) {
    const res = await axios.get(`${config.apiUrl}/format-url?url=${url}`)
    return res.data
  } else {
    return url
  }
}

export const calculate = (content, trait, totalLength) => {
  const filteredContent = content.filter((li) =>
    li.attributes?.some(
      (attr) =>
        attr.trait_type === trait.trait_type && attr.value === trait.value
    )
  )
  const filteredContentLength = filteredContent.length
  const percentage = (filteredContentLength * 100) / totalLength
  return percentage.toFixed(1)
}

export const formatPrice = (itemPrices, row) => {
  const selectedItemPrice = itemPrices.find(
    (li) => li.roundtime === row["round-time"] && li.sender === row.sender
  )
  if (selectedItemPrice) {
    return Number(selectedItemPrice.price / 100000)
  } else {
    return "-"
  }
}

export const formatDuration = (value) => {
  const sec = parseInt(value, 10) // convert value to number if it's string
  let hours = Math.floor(sec / 3600) // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60) // get minutes
  let seconds = sec - hours * 3600 - minutes * 60 //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = `0${hours}`
  }
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (seconds < 10) {
    seconds = `0${seconds}`
  }
  return `${hours}h ${minutes}m ${seconds}s`
}

export const formatAddress = (e) => {
  if (e && typeof e === "string") {
    return `${e.substr(0, 5)}....${e.substr(e.length - 5, e.length - 1)}`
  }
  return e
}

export const formatCreator = (value) => {
  const returnVal = value?.replace("By ", "")
  if (returnVal && returnVal.charAt(0) === "@") {
    return returnVal.replace("@", "")
  }
  return returnVal
}

export const formatDate = (value) => {
  const date = new Date(value * 1000).toString()
  const position = date.search("GMT")
  const formatStr = date.slice(0, position)
  return formatStr
}
// get time difference from now as a second
export const timeDiffAsSec = (time) => {
  const start = new Date()
  const end = new Date(time)
  return (end.getTime() - start.getTime()) / 1000
}
