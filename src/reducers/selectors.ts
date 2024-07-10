import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

const selectPizzaData = (state: RootState) => state.pizza;

export const selectPizzaList = createSelector(selectPizzaData, (pizza) => pizza.currentPagePizza);
export const selectPageCount = createSelector(selectPizzaData, (pizza) => pizza.pageCount);
export const selectLoadingStatus = createSelector(selectPizzaData, (pizza) => pizza.loading);

const selectFilterData = (state: RootState) => state.filter;

export const selectCategory = createSelector(selectFilterData, (filter) => filter.category);
export const selectSortBy = createSelector(selectFilterData, (filter) => filter.sortBy);
export const selectCurrentPage = createSelector(selectFilterData, (filter) => filter.currentPage);
export const selectSearch = createSelector(selectFilterData, (filter) => filter.search);

const selectUserData = (state: RootState) => state.user;

export const selectUserEmail = createSelector(selectUserData, (user) => user.email);
export const selectUserName = createSelector(selectUserData, (user) => user.name);
export const selectUserId = createSelector(selectUserData, (user) => user.id);

const selectCartData = (state: RootState) => state.cart;

export const selectCartItems = createSelector(selectCartData, (cart) => cart.items);
export const selectTotalQuantity = createSelector(selectCartData, (cart) => cart.totalQuantity);
export const selectTotalPrice = createSelector(selectCartData, (cart) => cart.totalPrice);
