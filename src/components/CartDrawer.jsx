import {useRef} from 'react'
import {Drawer,DrawerHeader,DrawerCloseButton
,DrawerOverlay,DrawerContent,DrawerFooter
,Button,DrawerBody} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import {selectGlobal,onCloseCartDrawerAction
} from '../app/feauture/GlobalSlice'
import {selectCart}from '../app/feauture/CartSlice'
import CarteDrawerItem from './CarteDrawerItem'

const CartDrawer = () => {
    const btnRef = useRef()
   const {isOpenCartDrawer} = useSelector(selectGlobal);
   const {CartProducts} = useSelector(selectCart);

    const dispatch = useDispatch()
    const onClose = () => dispatch(onCloseCartDrawerAction()) 

    


  return (
    <Drawer
    isOpen={isOpenCartDrawer}
    placement='right'
    onClose={onClose}
    finalFocusRef={btnRef}
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>All Products In Carte</DrawerHeader>

       <DrawerBody>
        {
          CartProducts.map(i =>(
          <CarteDrawerItem key={i.id} {...i} />  
          ))
        }
        
        {/* <Input placeholder='Type here...' /> */}
      </DrawerBody> 

      <DrawerFooter>
        <Button variant='outline' mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme='blue'>Save</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  )
}

export default CartDrawer