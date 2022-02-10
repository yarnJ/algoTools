import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  auctions: [],
}

export const auctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {
    setAuctions(state, action) {
      state.auctions = action.payload
    },

    addAuction(state, action) {
      state.auctions = [...state.auctions, action.payload]
    },

    updateAuction(state, action) {
      const idx = state.auctions.findIndex(
        (auction) => auction.appId === action.payload.appId
      )

      state.auctions[idx] = action.payload
    },

    deleteAuction(state, action) {
      const idx = state.auctions.findIndex(
        (auction) => auction.appId === action.payload
      )
      state.auctions.splice(idx, 1)
    },
  },
})

export const { setAuctions, addAuction, updateAuction, deleteAuction } =
  auctionSlice.actions

export const auctionReducer = auctionSlice.reducer
