import { configureStore, combineReducers } from '@reduxjs/toolkit';
import IngredientsSliceReducer from '../slices/ingredients/ingredients';
import OrderSliceReducer from '../slices/order/order';
import FeedsSliceReducer from '../slices/feeds/feeds';
import UserSliceReducer from '../slices/user/user';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: IngredientsSliceReducer,
  order: OrderSliceReducer,
  feeds: FeedsSliceReducer,
  user: UserSliceReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
