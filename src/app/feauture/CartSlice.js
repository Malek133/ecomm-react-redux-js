import { createSlice } from "@reduxjs/toolkit";
import {AddItemToShoppingCart} from '../../utils/index'

const initialState = {
    CartProducts: []
 }

 const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
     addToCart: (state, action) => {
      state.CartProducts = AddItemToShoppingCart(action.payload,state.CartProducts)
      //  state.CartProducts = [...state.CartProducts, action.payload]
        }
    }
 })

 export const { addToCart } = cartSlice.actions;
 export const selectCart = ({cart}) => cart;
 export default cartSlice.reducer;