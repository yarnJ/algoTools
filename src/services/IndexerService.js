import axios from "axios"
import { config } from "utils/config"
import { getAccountInfo } from "utils/algorand"

const getSomeAssets = async (params) => {
  const { limit } = params
  const response = {}
  try {
    const res = await axios.get(
      `${config.apiUrl}/indexer/someAssets?limit=${limit}`
    )
    response.data = res.data
    response.status = res.status
  } catch (err) {
    response.error = {
      errorMessage: err.response?.data,
      status: err.response?.status,
    }
  }
  return response
}

const getAssets = async (params) => {
  const { collectionName, collectionIndex, limit } = params
  const response = {}
  try {
    const res = await axios.get(
      `${config.apiUrl}/indexer/algoAssets?assetName=${collectionName}&limit=${limit}&assetIndex=${collectionIndex}`
    )
    response.data = res.data
    response.status = res.status
  } catch (err) {
    response.error = {
      errorMessage: err.response?.data,
      status: err.response?.status,
    }
  }
  return response
}

const getPriceHistoryTransactions = async (params) => {
  const response = {}

  try {
    const res = await axios.post(
      `${config.apiUrl}/indexer/price-history`,
      params
    )
    response.data = res.data
    response.status = res.status
  } catch (err) {
    response.error = {
      errorMessage: err.response?.data,
      status: err.response?.status,
    }
  }
  return response
}
const getTransactions = async (params) => {
  const response = {}
  try {
    const res = await axios.get(
      `${config.apiUrl}/indexer/transactions/${params.index}?txn_type=${params.txn_type}&min_amount=${params.min_amount}`
    )
    response.data = res.data
    response.status = res.status
  } catch (err) {
    response.error = {
      errorMessage: err.response?.data,
      status: err.response?.status,
    }
  }
  return response
}

const getRecentTransactions = async (params) => {
  const response = {}
  try {
    const res = await axios.get(
      `${config.apiUrl}/indexer/recent-transactions?limit=${params.limit}`
    )
    response.data = res.data
    response.status = res.status
  } catch (err) {
    response.error = {
      errorMessage: err.response?.data,
      status: err.response?.status,
    }
  }
  return response
}

const lookupAssetBalances = async (params) => {
  const response = {}
  try {
    const res = await axios.get(
      `${config.apiUrl}/indexer/lookupAssetsBalances/${params.assetID}`
    )
    response.data = res.data
    response.status = res.status
  } catch (err) {
    response.error = {
      errorMessage: err.response?.data,
      status: err.response?.status,
    }
  }
  return response
}

const lookupAssetByID = async (params) => {
  const response = {}
  try {
    const res = await axios.get(
      `${config.apiUrl}/indexer/lookupAssets/${params.assetID}`
    )
    response.data = res.data
    response.status = res.status
  } catch (err) {
    response.error = {
      errorMessage: err.response?.data,
      status: err.response?.status,
    }
  }
  return response
}

const lookupMyAccount = async (address) => {
  const response = {}
  try {
    const res = await getAccountInfo(address)
    // console.log("res", res)
    response.data = res
    response.status = res.status
  } catch (err) {
    response.error = {
      errorMessage: err.response?.data,
      status: err.response?.status,
    }
  }
  return response
}

const lookupAccountByID = async (address, collectionName) => {
  const response = {}
  try {
    const addressArr = address.split(", ")
    const res = await axios.get(
      `${config.apiUrl}/indexer/account/${addressArr[0]}?collectionName=${collectionName}`
    )
    response.data = res.data
    response.status = res.status
  } catch (err) {
    response.error = {
      errorMessage: err.response?.data,
      status: err.response?.status,
    }
  }
  return response
}
export const IndexerService = {
  getAssets,
  getSomeAssets,
  getTransactions,
  lookupAssetBalances,
  lookupAssetByID,
  lookupAccountByID,
  lookupMyAccount,
  getPriceHistoryTransactions,
  getRecentTransactions,
}
