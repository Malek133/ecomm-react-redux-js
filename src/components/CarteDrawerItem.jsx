import {Divider,Image,
Text,Flex,Stack} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { X } from 'lucide-react';
import {removeFromCart} from '../app/feauture/CartSlice'

const CarteDrawerItem = ({id,attributes:{thumbnail,price,title},quantity}) => {
    const dispatch = useDispatch()
  return (
    <>

    <Flex alignItems={'center'} justifyContent={'space-around'} 
    mb={3} py={2} gap={8} >
        <Image
        src={`${import.meta.env.VITE_SERVER_URL}${thumbnail.data.attributes.url}`} 
        alt={title}
        w={'66px'} h={'66px'} mr={5}
        rounded={'full'} objectFit={'cover'}
         />

         <Stack>
        
            <Text fontSize={'sm'}>{title}</Text>
            <Text fontSize={'sm'}> $ {price}</Text>
            <Text fontSize={'sm'}>Quantity: {quantity}</Text>
            
         </Stack>

        <Text onClick={()=>{dispatch(removeFromCart(id))}}
        size='md' w='full' color={'#c37272'}>
             <X />
           </Text>
    </Flex>
      <Divider />
    </>
  )
}

export default CarteDrawerItem
