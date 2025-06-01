import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrdersData } from '../../utils/types';

interface FeedsState {
  data: TOrdersData;
  isLoading: boolean;
  error: string;
}

export const initialState: FeedsState = {
  data: { orders: [], total: 0, totalToday: 0 },
  isLoading: false,
  error: ''
};

export const getFeedsThunk = createAsyncThunk('feeds/getFeeds', getFeedsApi);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectFeeds: (state) => state.data,
    selectFeedsOrders: (state) => state.data.orders,
    selectFeedsLoading: (state) => state.isLoading,
    selectOrderByNumber: (state, action: PayloadAction<number | undefined>) => {
      if (action.payload) {
        return state.data.orders.find(
          (order) => order.number === action.payload
        );
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      })
      .addCase(getFeedsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      });
  }
});

export const {
  selectFeeds,
  selectFeedsOrders,
  selectFeedsLoading,
  selectOrderByNumber
} = feedsSlice.selectors;

export default feedsSlice.reducer;
