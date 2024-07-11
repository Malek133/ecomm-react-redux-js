import { createSlice } from "@reduxjs/toolkit";
import {AddItemToShoppingCart} from '../../utils/index'
import { createStandaloneToast } from "@chakra-ui/react";

const initialState = {
    CartProducts: []
 }
 const {toast} = createStandaloneToast()
 const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
     addToCart: (state, action) => {
      state.CartProducts = AddItemToShoppingCart(action.payload,state.CartProducts)
      //  state.CartProducts = [...state.CartProducts, action.payload]
        },

        removeFromCart: (state, action) => {
         state.CartProducts = state.CartProducts.filter(item =>item.id != action.payload)
               
         toast({
            title:'success',
            description: "Product Removed from your cart.",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
           },

           clearFromCart:state => {
            state.CartProducts = []
            toast({
               title:'success',
               description: "All Products Clear in Cart.",
               status: 'success',
               duration: 2000,
               isClosable: true,
             })
            
              }
    }
 })

 export const { addToCart,removeFromCart,clearFromCart } = cartSlice.actions;
 export const selectCart = ({cart}) => cart;
 export default cartSlice.reducer;