import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth';
import userService from '../services/user';
import { AuthCredentials, NewUserEntry } from '../types';

export interface User {
  email: string | null;
  name: string | null;
  id: string | null;
}

const initialState = {
  email: null,
  name: null,
  id: null,
};

export const createUser = createAsyncThunk<void, NewUserEntry>(
  'user/setUser',
  async (newUserParams, { dispatch }) => {
    const user = await userService.createUser(newUserParams);
    dispatch(setUser(user));
  },
);

export const logIn = createAsyncThunk<void, AuthCredentials>(
  'user/logIn',
  async (credentials, { dispatch }) => {
    const user = await authService.login(credentials);
    dispatch(setUser(user));
  },
);

export const logOut = createAsyncThunk<void>('user/logOut', async (_, { dispatch }) => {
  await authService.logout();
  dispatch(removeUser());
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.name = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
