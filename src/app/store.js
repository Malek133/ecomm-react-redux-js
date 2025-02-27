import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./feauture/LoginSlice"
import cartSlice from './feauture/CartSlice'
import globalSlice from './feauture/GlobalSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {apiSlice} from '../app/services/ApiSlice'

const persistCartConfig = {
    key: 'cart',
    storage,
  };
  const persistedCart = persistReducer(persistCartConfig,cartSlice)

export const store = configureStore({
    reducer:{
        cart:persistedCart,
        login:loginSlice,
        global:globalSlice,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck:false,
    }).concat([apiSlice.middleware])
})

export const persistor = persistStore(store)