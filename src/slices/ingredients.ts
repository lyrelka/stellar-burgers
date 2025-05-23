import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '../utils/types';

interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false
};

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

const IngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsLoading: (state) => state.isLoading,
    selectBuns: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    selectMains: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    selectSauces: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    selectIngredientById: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      if (action.payload) {
        return state.ingredients.find((item) => item._id === action.payload);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredientsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredientsThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getIngredientsThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.ingredients = payload;
    });
  }
});

export const {
  selectIngredients,
  selectIngredientsLoading,
  selectBuns,
  selectMains,
  selectSauces,
  selectIngredientById
} = IngredientsSlice.selectors;

export default IngredientsSlice.reducer;
