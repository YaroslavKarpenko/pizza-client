import { combineReducers, configureStore } from '@reduxjs/toolkit';
import pizzaReducer from './pizzaReducer';
import filterReducer from './filterReducer';
import cartReducer from './cartReducer';
import notificationReducer from './notificationReducer';
import userReducer from './userReducer';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root', // Уникальный ключ для хранилища
  storage,
  blacklist: ['notification'],
};

const rootReducer = combineReducers({
  pizza: pizzaReducer,
  filter: filterReducer,
  cart: cartReducer,
  notification: notificationReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // Обертка главного редьюсера

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// export const store = configureStore({
//   reducer: {
//     pizza: pizzaReducer,
//     filter: filterReducer,
//     cart: cartReducer,
//     notification: notificationReducer,
//     user: userReducer,
//   },
// });

export const persistor = persistStore(store); // Запуск персистирования

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
