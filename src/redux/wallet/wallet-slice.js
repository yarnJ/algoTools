import { createSlice } from "@reduxjs/toolkit"
import { SessionWallet } from "algorand-session-wallet"
import { config } from "utils/config"

const sw = new SessionWallet(config.network)

const initialState = {
  sessionWallet: sw,
  connected: sw.connected(),
  accts: sw.accountList(),
}
export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setSessionWallet(state, action) {
      state.sessionWallet = action.payload
    },
    setAccounts(state, action) {
      state.accts = action.payload
    },
    setConnectedStatus(state, action) {
      state.connected = action.payload
    },
  },
  extraReducers: () => {},
})

export const { setSessionWallet, setAccounts, setConnectedStatus } =
  walletSlice.actions

export const walletReducer = walletSlice.reducer
