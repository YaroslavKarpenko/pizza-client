import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type CartItemType = {
  id: string;
  selectedDough: string;
  selectedSize: string;
  quantity: number;
  price: number;
  name: string;
  img: string;
};

interface CartSliceState {
  totalPrice: number;
  totalQuantity: number;
  items: CartItemType[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  totalQuantity: 0,
  items: [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItemType>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => {
        return (
          item.id === newItem.id &&
          item.selectedDough === newItem.selectedDough &&
          item.selectedSize === newItem.selectedSize
        );
      });

      existingItem ? existingItem.quantity++ : state.items.push({ ...newItem, quantity: 1 });
      state.totalPrice += newItem.price;
      state.totalQuantity += 1;
    },
    removeItemFromCart(state, action: PayloadAction<CartItemType>) {
      const { id, selectedDough, selectedSize } = action.payload;

      const removedItemIndex = state.items.findIndex((item) => {
        return (
          item.id === id &&
          item.selectedDough === selectedDough &&
          item.selectedSize === selectedSize
        );
      });

      if (removedItemIndex !== -1) {
        const removedItem = state.items[removedItemIndex];
        state.items.splice(removedItemIndex, 1);
        state.totalPrice -= removedItem.price * removedItem.quantity;
        state.totalQuantity -= removedItem.quantity;
      }
    },
    incrementItemQuantity(state, action: PayloadAction<CartItemType>) {
      const { id, selectedDough, selectedSize } = action.payload;
      const itemToIncrement = state.items.find(
        (item) =>
          item.id === id &&
          item.selectedDough === selectedDough &&
          item.selectedSize === selectedSize,
      );
      if (itemToIncrement) {
        itemToIncrement.quantity++;
        state.totalPrice += itemToIncrement.price;
        state.totalQuantity += 1;
      }
    },
    decrementItemQuantity(state, action: PayloadAction<CartItemType>) {
      const { id, selectedDough, selectedSize } = action.payload;
      const itemToDecrement = state.items.find(
        (item) =>
          item.id === id &&
          item.selectedDough === selectedDough &&
          item.selectedSize === selectedSize,
      );
      if (itemToDecrement) {
        itemToDecrement.quantity--;
        if (itemToDecrement.quantity === 0) {
          state.items = state.items.filter((item) => {
            return (
              item.id !== id ||
              item.selectedDough !== selectedDough ||
              item.selectedSize !== selectedSize
            );
          });
        }
        state.totalPrice -= itemToDecrement.price;
        state.totalQuantity -= 1;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
