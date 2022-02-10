import { combineReducers } from "@reduxjs/toolkit"
import { indexerReducer } from "./indexer/indexer-slice"
import { collectionReducer } from "./collection/collection-slice"
import { walletReducer } from "./wallet/wallet-slice"
import { auctionReducer } from "./auction/auction-slice"

const reducers = {
  indexer: indexerReducer,
  collection: collectionReducer,
  wallet: walletReducer,
  auction: auctionReducer,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
