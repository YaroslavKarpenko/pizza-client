import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Category, SortType } from '../types';

export interface FilterSliceState {
  category: Category;
  sortBy: SortType;
  currentPage: number;
  search: string;
}

const initialState: FilterSliceState = {
  category: Category.All,
  sortBy: SortType.Name,
  currentPage: 1,
  search: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeCategory(state, action: PayloadAction<Category>) {
      return { ...state, category: action.payload, currentPage: 1 };
    },
    changeSortType(state, action: PayloadAction<SortType>) {
      return {
        ...state,
        sortBy: action.payload,
      };
    },
    changeCurrentPage(state, action: PayloadAction<number>) {
      return {
        ...state,
        currentPage: action.payload,
      };
    },
    setSearch(state, action: PayloadAction<string>) {
      return {
        ...state,
        search: action.payload,
      };
    },
    setFilter(state, action: PayloadAction<FilterSliceState>) {
      state.category = action.payload.category;
      state.sortBy = action.payload.sortBy;
      state.currentPage = Number(action.payload.currentPage);
      state.search = action.payload.search;
    },
    refreshFilter(state) {
      state.category = Category.All;
      state.sortBy = SortType.Name;
      state.currentPage = 1;
      state.search = '';
    },
  },
});

export const {
  changeCategory,
  changeSortType,
  changeCurrentPage,
  setSearch,
  setFilter,
  refreshFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
