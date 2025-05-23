import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser, TOrder } from '../utils/types';
import {
  registerUserApi,
  TRegisterData,
  loginUserApi,
  TLoginData,
  logoutApi,
  getUserApi,
  updateUserApi,
  getOrdersApi
} from '../utils/burger-api';
import { setCookie, deleteCookie } from '../utils/cookie';

type TUserState = {
  orders: TOrder[];
  data: TUser | null;
  isLoading: boolean;
  error: string | null;
  refreshToken: string | null;
  accessToken: string | null;
  isAuthenticated: boolean;
};

const initialState: TUserState = {
  orders: [],
  data: null,
  isLoading: false,
  error: null,
  refreshToken: '',
  accessToken: '',
  isAuthenticated: false
};

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) => {
    const response = await registerUserApi({ email, name, password });
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);

    return response;
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const response = await loginUserApi({ email, password });
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);

    return response;
  }
);

export const logoutUserThunk = createAsyncThunk('user/logout', async () => {
  const response = await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');

  return response;
});

export const getUserThunk = createAsyncThunk('user/getUser', getUserApi);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  updateUserApi
);

export const getOrdersThunk = createAsyncThunk('user/getOrders', getOrdersApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
        state.data = payload.user;
        state.refreshToken = payload.refreshToken;
        state.accessToken = payload.accessToken;
        state.isAuthenticated = true;
        state.isLoading = false;
      })

      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
        state.data = payload.user;
        state.refreshToken = payload.refreshToken;
        state.accessToken = payload.accessToken;
        state.isAuthenticated = true;
        state.isLoading = false;
      })

      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.data = null;
        state.refreshToken = null;
        state.accessToken = null;
        state.isLoading = false;
      })

      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.data = payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
      })

      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        state.data = payload.user;
        state.isLoading = false;
      })

      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getOrdersThunk.fulfilled, (state, { payload }) => {
        state.orders = payload;
        state.isLoading = false;
      });
  },
  selectors: {
    selectUserOrders: (state) => state.orders,
    selectUserData: (state) => state.data,
    selectName: (state) => state.data?.name || '',
    selectEmail: (state) => state.data?.email || '',
    selectUserLoading: (state) => state.isLoading,
    selectAuth: (state) => state.isAuthenticated
  }
});
export const {
  selectUserOrders,
  selectUserData,
  selectName,
  selectEmail,
  selectAuth,
  selectUserLoading
} = userSlice.selectors;
export default userSlice.reducer;
