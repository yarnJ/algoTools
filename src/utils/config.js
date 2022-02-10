export const config = {
  apiUrl: process.env.REACT_APP_API_URL,
  storageToken: process.env.REACT_APP_STORAGE_TOKEN,
  ipfsGateway: process.env.REACT_APP_IPFS_GATEWAY,
  blockExplorer: process.env.REACT_APP_BLOCK_EXPLORER,
  explorerApi: process.env.REACT_APP_ALGO_EXPLORER_API,
  baseServer: process.env.REACT_APP_ALGO_BASE_SERVER,
  network: process.env.REACT_APP_ALGO_NETWORK,
  algodToken: {
    "X-API-key": process.env.REACT_APP_PURESTAKE_KEY,
  },
  auctionBackendUrl: process.env.REACT_APP_AUCTION_BACKEND_URL,
}

export const getAddrUrl = (addr) => `${config.blockExplorer}address/${addr}`

export const getAsaUrl = (id) => `${config.blockExplorer}asset/${id}`

export const LOADING_STATUS = {
  IDLE: -1,
  PENDING: 0,
  COMPLETED: 1,
}
