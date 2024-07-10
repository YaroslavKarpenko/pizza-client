import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import pizzaService from '../services/pizza';

import { FetchPizzaParams } from '../types';
import { setFilter } from './filterReducer';

export const initializePizza = createAsyncThunk<PizzaItem[], FetchPizzaParams>(
  'pizza/fetchPizza',
  async (params, { dispatch }) => {
    const { category, sort, page, search } = params;
    const { data, pageCount, filter } = await pizzaService.getPizza({
      category,
      sort,
      page,
      search,
    });

    dispatch(setFilter(filter));
    dispatch(setPageCount(pageCount));
    return data;
  },
);

export interface PizzaItem {
  id: string;
  name: string;
  origin: string;
  category: string;
  rating: number;
  feedback: number;
  doughTypes: string[];
  sizes: string[];
  price: number;
  img: string;
}

interface PizzaSliceState {
  currentPagePizza: PizzaItem[];
  pageCount: number;
  loading: LoadingStatus;
}

export enum LoadingStatus {
  PENDING = 'pending',
  FULFILLED = 'succeeded',
  REJECTED = 'failed',
}

const initialState: PizzaSliceState = {
  currentPagePizza: [],
  pageCount: 0,
  loading: LoadingStatus.PENDING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPageCount(state, action: PayloadAction<number>) {
      return { ...state, pageCount: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializePizza.pending, (state) => {
      state.currentPagePizza = [];
      state.loading = LoadingStatus.PENDING;
    });
    builder.addCase(initializePizza.fulfilled, (state, action) => {
      state.currentPagePizza = action.payload;
      state.loading = LoadingStatus.FULFILLED;
    });
    builder.addCase(initializePizza.rejected, (state) => {
      state.currentPagePizza = [];
      state.loading = LoadingStatus.REJECTED;
    });
  },
});

export const { setPageCount } = pizzaSlice.actions;

export default pizzaSlice.reducer;
