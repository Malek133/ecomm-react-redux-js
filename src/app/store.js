import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./feauture/LoginSlice"
import cartSlice from './feauture/CartSlice'
import globalSlice from './feauture/GlobalSlice'

export const store = configureStore({
    reducer:{
        cart:cartSlice,
        login:loginSlice,
        global:globalSlice
    }
})