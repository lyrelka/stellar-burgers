import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient, TOrder } from '../../utils/types';
import { orderBurgerApi, TNewOrderResponse } from '../../utils/burger-api';
import { nanoid } from 'nanoid';

interface OrderState {
  constructorItems: {
    bun: null | TConstructorIngredient;
    ingredients: TConstructorIngredient[];
  };
  error: string;
  isLoading: boolean;
  response: TNewOrderResponse | null;
}

type TMoveAction = {
  index: number;
  direction: number;
};

export const initialState: OrderState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isLoading: false,
  error: '',
  response: null
};

export const orderBurgerThunk = createAsyncThunk(
  'order/orderBurger',
  orderBurgerApi
);

const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeOrderIngredient(state, action: PayloadAction<string>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    moveOrderIngredient(state, action: PayloadAction<TMoveAction>) {
      const index = action.payload.index;
      const direction = action.payload.direction;

      const ingredient = state.constructorItems.ingredients.splice(index, 1)[0];
      state.constructorItems.ingredients.splice(
        index + direction,
        0,
        ingredient
      );
    },
    resetOrder(state) {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
      state.response = null;
    }
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorItems,
    selectIngredientsIdList: (state) => {
      const ingredientsList = [
        state.constructorItems.bun,
        ...state.constructorItems.ingredients,
        state.constructorItems.bun
      ];
      const ingredientsListId = ingredientsList
        .map((ingredient) => ingredient?._id)
        .filter((id): id is string => id !== undefined);
      return ingredientsListId;
    },
    selectOrderLoading: (state) => state.isLoading,
    selectOrderResponse: (state) => state.response
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurgerThunk.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(orderBurgerThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || '';
    });
    builder.addCase(orderBurgerThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.response = payload;
    });
  }
});

export const {
  addOrderItem,
  removeOrderIngredient,
  moveOrderIngredient,
  resetOrder
} = OrderSlice.actions;
export const {
  selectConstructorItems,
  selectIngredientsIdList,
  selectOrderLoading,
  selectOrderResponse
} = OrderSlice.selectors;

export default OrderSlice.reducer;
