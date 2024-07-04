import { createStandaloneToast } from "@chakra-ui/react";
const {toast} = createStandaloneToast()
export const AddItemToShoppingCart = (cartitem={},ShopingCartItem=[]) =>{

    const existItem = ShopingCartItem.find(item => item.id === cartitem.id)

    if(existItem){
        toast({
            title:'Added to your carte',
            description: "this product existe quantity ++ .",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })

          return ShopingCartItem.map(item => item.id === cartitem.id ? 
            { ...item,quantity: item.quantity +1} : item)
    }
    toast({
        title:'Added to your carte',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })


    return  [...ShopingCartItem,{...cartitem,quantity:1} ]
}