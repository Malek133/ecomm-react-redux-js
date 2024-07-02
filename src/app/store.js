import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./feauture/LoginSlice"

export const store = configureStore({
    reducer:{
        login:loginSlice
    }
})