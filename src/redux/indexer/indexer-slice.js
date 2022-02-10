import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IndexerService } from "services/IndexerService"

export const IndexerLoadingId = {
  ASSETS: "assets",
  SOME_ASSETS: "someAssets",
  TRANSACTIONS: "transactions",
  LOOKUP_ASSET_BALLANCES: "lookupAssetBallances",
  LOOKUP_ASSET_BY_ID: "lookupAssetByID",
  LOOKUP_MY_ACCOUNT: "lookupMyAccount",
  LOOKUP_ACCOUNT_BY_ID: "lookupAccountByID",
  PRICE_HISTORY_TRANSACTIONS: "priceHistoryTransactions",
  RECENT_TRANSACTIONS: "recentTransactions",
}

const initialState = {
  assets: [],
  homeAssets: [],
  selectedAsset: {},
  transactions: [],
  selectedAssetTransactions: [],
  selectedAddressTransactions: [],
  selectedAssetBalances: [],
  priceHistoryTransactions: [],
  recent_transactions: [],
  lookupAccountInfo: {},
  loading: [],
}

export const asyncGetPriceTransactions = createAsyncThunk(
  "indexer/asyncGetPriceHistoryTransactions",
  async (params, thunkOptions) => {
    const { rejectWithValue } = thunkOptions
    const response = await IndexerService.getPriceHistoryTransactions(params)
    if (response.error !== null && response.error !== undefined) {
      return rejectWithValue(response.error.errorMessage)
    }

    return response
  }
)

export const asyncSomeAssets = createAsyncThunk(
  "indexer/asyncSomeAssets",
  async (params, thunkOptions) => {
    const { rejectWithValue } = thunkOptions
    const response = await IndexerService.getSomeAssets(params)
    if (response.error !== null && response.error !== undefined) {
      return rejectWithValue(response.error.errorMessage)
    }

    return response
  }
)

export const asyncGetAssets = createAsyncThunk(
  "indexer/asyncGetAssets",
  async (params, thunkOptions) => {
    const { rejectWithValue } = thunkOptions
    const response = await IndexerService.getAssets(params)
    if (response.error !== null && response.error !== undefined) {
      return rejectWithValue(response.error.errorMessage)
    }

    return response
  }
)

export const asyncGetTransactions = createAsyncThunk(
  "indexer/asyncGetTransactions",
  async (params, thunkOptions) => {
    const { rejectWithValue } = thunkOptions
    const response = await IndexerService.getTransactions(params)

    if (response.error !== null && response.error !== undefined) {
      return rejectWithValue(response.error.errorMessage)
    }

    return response
  }
)

export const asyncGetRecentTransactions = createAsyncThunk(
  "indexer/asyncGetRecentTransactions",
  async (params, thunkOptions) => {
    const { rejectWithValue } = thunkOptions
    const response = await IndexerService.getRecentTransactions(params)

    if (response.error !== null && response.error !== undefined) {
      return rejectWithValue(response.error.errorMessage)
    }

    return response
  }
)

export const asyncLookupAssetBalances = createAsyncThunk(
  "indexer/asyncLookupAssetBalance",
  async (params, thunkOptions) => {
    const { rejectWithValue } = thunkOptions
    const response = await IndexerService.lookupAssetBalances(params)

    if (response.error !== null) {
      return rejectWithValue(response.error.errorMessage)
    }

    return response
  }
)

export const asyncLookupAssetByID = createAsyncThunk(
  "indexer/asyncLookupAssetByID",
  async (params, thunkOptions) => {
    const { rejectWithValue } = thunkOptions
    const response = await IndexerService.lookupAssetByID(params)

    if (response.error !== null && response.error !== undefined) {
      return rejectWithValue(response.error.errorMessage)
    }

    return response
  }
)

export const asyncLookupMyAccount = createAsyncThunk(
  "indexer/asyncLookupMyAccount",
  async (params, thunkOptions) => {
    const { rejectWithValue } = thunkOptions
    const response = await IndexerService.lookupMyAccount(params.address)

    if (response.error !== null && response.error !== undefined) {
      return rejectWithValue(response.error.errorMessage)
    }

    return response
  }
)

export const asyncLookupAccountByID = createAsyncThunk(
  "indexer/asyncLookupAccountByID",
  async (params, thunkOptions) => {
    const { rejectWithValue } = thunkOptions
    const response = await IndexerService.lookupAccountByID(
      params.address,
      params.collectionName
    )

    if (response.error !== null && response.error !== undefined) {
      return rejectWithValue(response.error.errorMessage)
    }

    return response
  }
)

export const indexerSlice = createSlice({
  name: "indexer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Assets
    builder.addCase(asyncGetAssets.fulfilled, (state, action) => {
      state.assets = action.payload.data
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.ASSETS
      )
    })
    builder.addCase(asyncGetAssets.pending, (state) => {
      state.loading.push(IndexerLoadingId.ASSETS)
    })
    builder.addCase(asyncGetAssets.rejected, (state) => {
      state.assets = []
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.ASSETS
      )
    })

    // Get Some Assets For Homepage
    builder.addCase(asyncSomeAssets.fulfilled, (state, action) => {
      state.homeAssets = action.payload.data
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.SOME_ASSETS
      )
    })
    builder.addCase(asyncSomeAssets.pending, (state) => {
      state.loading.push(IndexerLoadingId.SOME_ASSETS)
    })
    builder.addCase(asyncSomeAssets.rejected, (state) => {
      state.homeAssets = []
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.SOME_ASSETS
      )
    })

    // Get Transactions
    builder.addCase(asyncGetTransactions.fulfilled, (state, action) => {
      state.selectedAssetTransactions = action.payload.data
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.TRANSACTIONS
      )
    })
    builder.addCase(asyncGetTransactions.pending, (state) => {
      state.loading.push(IndexerLoadingId.TRANSACTIONS)
    })
    builder.addCase(asyncGetTransactions.rejected, (state) => {
      state.selectedAssetTransactions = []
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.TRANSACTIONS
      )
    })

    // Get Recent Transactions
    builder.addCase(asyncGetRecentTransactions.fulfilled, (state, action) => {
      state.recent_transactions = action.payload.data
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.RECENT_TRANSACTIONS
      )
    })
    builder.addCase(asyncGetRecentTransactions.pending, (state) => {
      state.loading.push(IndexerLoadingId.RECENT_TRANSACTIONS)
    })
    builder.addCase(asyncGetRecentTransactions.rejected, (state) => {
      state.recent_transactions = []
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.RECENT_TRANSACTIONS
      )
    })

    // Lookup Asset Balances
    builder.addCase(asyncLookupAssetBalances.fulfilled, (state) => {
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.LOOKUP_ASSET_BALLANCES
      )
    })
    builder.addCase(asyncLookupAssetBalances.pending, (state) => {
      state.loading.push(IndexerLoadingId.LOOKUP_ASSET_BALLANCES)
    })
    builder.addCase(asyncLookupAssetBalances.rejected, (state) => {
      // state.assets = []
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.LOOKUP_ASSET_BALLANCES
      )
    })

    // Lookup Asset By ID
    builder.addCase(asyncLookupAssetByID.fulfilled, (state, action) => {
      state.selectedAsset = action.payload.data
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.LOOKUP_ASSET_BY_ID
      )
    })
    builder.addCase(asyncLookupAssetByID.pending, (state) => {
      state.loading.push(IndexerLoadingId.LOOKUP_ASSET_BY_ID)
    })
    builder.addCase(asyncLookupAssetByID.rejected, (state) => {
      state.selectedAsset = {}
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.LOOKUP_ASSET_BY_ID
      )
    })

    // Price History Transactions
    builder.addCase(asyncGetPriceTransactions.fulfilled, (state, action) => {
      state.priceHistoryTransactions = action.payload.data
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.PRICE_HISTORY_TRANSACTIONS
      )
    })
    builder.addCase(asyncGetPriceTransactions.pending, (state) => {
      state.loading.push(IndexerLoadingId.PRICE_HISTORY_TRANSACTIONS)
    })
    builder.addCase(asyncGetPriceTransactions.rejected, (state) => {
      state.priceHistoryTransactions = []
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.PRICE_HISTORY_TRANSACTIONS
      )
    })

    // Lookup Account Info
    builder.addCase(asyncLookupAccountByID.fulfilled, (state, action) => {
      state.lookupAccountInfo = action.payload.data
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.LOOKUP_ACCOUNT_BY_ID
      )
    })
    builder.addCase(asyncLookupAccountByID.pending, (state) => {
      state.loading.push(IndexerLoadingId.LOOKUP_ACCOUNT_BY_ID)
    })
    builder.addCase(asyncLookupAccountByID.rejected, (state) => {
      state.lookupAccountInfo = []
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.LOOKUP_ACCOUNT_BY_ID
      )
    })

    // Lookup My Account
    builder.addCase(asyncLookupMyAccount.fulfilled, (state, action) => {
      // console.log("action.payload", action.payload)
      if (
        action.payload.data["created-assets"] &&
        action.payload.data["created-assets"].length > 0
      ) {
        state.lookupAccountInfo = action.payload.data["created-assets"].map(
          (asa) => ({
            index: asa.index,
            creator: asa.params.creator,
            name: asa.params.name,
            total: asa.params.total,
            unitName: asa.params["unit-name"],
            url: asa.params.url,
          })
        )
      }
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.LOOKUP_MY_ACCOUNT
      )
    })
    builder.addCase(asyncLookupMyAccount.pending, (state) => {
      state.loading.push(IndexerLoadingId.LOOKUP_MY_ACCOUNT)
    })
    builder.addCase(asyncLookupMyAccount.rejected, (state) => {
      state.lookupAccountInfo = []
      state.loading = state.loading.filter(
        (id) => id !== IndexerLoadingId.LOOKUP_MY_ACCOUNT
      )
    })
  },
})

export const indexerReducer = indexerSlice.reducer
