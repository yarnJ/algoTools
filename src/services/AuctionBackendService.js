import axios from "axios"
import { config } from "../utils/config"

const getAuctions = async () => {
  const response = {}
  try {
    const res = await axios.get(`${config.auctionBackendUrl}/auctions`)
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

const getAuction = async (appId) => {
  const response = {}
  try {
    const res = await axios.get(`${config.auctionBackendUrl}/auctions/${appId}`)
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

const createAuction = async (appId) => {
  const response = {}
  try {
    const res = await axios.post(
      `${config.auctionBackendUrl}/auctions/${appId}`
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

const deleteAuction = async (appId) => {
  const response = {}
  try {
    const res = await axios.delete(
      `${config.auctionBackendUrl}/auctions/${appId}`
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

const updateAuction = async (appId) => {
  const response = {}
  try {
    const res = await axios.put(`${config.auctionBackendUrl}/auctions/${appId}`)
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

export const AuctionBackendService = {
  getAuctions,
  getAuction,
  createAuction,
  deleteAuction,
  updateAuction,
}
