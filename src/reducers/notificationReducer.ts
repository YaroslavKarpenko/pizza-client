import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: string[] = [];

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<string>) {
      state.push(action.payload);
    },
    removeNotification(state) {
      state.shift();
    },
    removeNotificationByIndex(state, action: PayloadAction<number>) {
      state.splice(action.payload, 1);
    },
  },
});

export const { addNotification, removeNotification, removeNotificationByIndex } =
  notificationSlice.actions;

export default notificationSlice.reducer;
