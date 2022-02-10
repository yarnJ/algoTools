import { io } from "socket.io-client"
import {
  setAuctions,
  addAuction,
  deleteAuction,
  updateAuction,
} from "./auction/auction-slice"
import { config } from "../utils/config"
import { AuctionBackendService } from "../services/AuctionBackendService"

function initWebsocket(store) {
  const socket = io(config.auctionBackendUrl)

  socket.on("auctionCreated", (data) => {
    store.dispatch(addAuction(data))
  })

  socket.on("auctionUpdated", (data) => {
    store.dispatch(updateAuction(data))
  })

  socket.on("auctionDeleted", (data) => {
    store.dispatch(deleteAuction(data))
  })
}

async function initAuctions(store) {
  const { data } = await AuctionBackendService.getAuctions()
  store.dispatch(setAuctions(data))
}

export async function initApp(store) {
  await initAuctions(store)
  initWebsocket(store)
}
