import {Divider,Button,Image,
Text,Flex,Stack} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

const CarteDrawerItem = ({id,attributes:{thumbnail,price,title},quantity}) => {
    const dispatch = useDispatch()
  return (
    <>

    <Flex alignItems={'center'} 
    mb={3} py={2} gap={3} >
        <Image
        src={`${import.meta.env.VITE_SERVER_URL}${thumbnail.data.attributes.url}`} 
        alt={title}
        w={'80px'} h={'80px'} mr={5}
        rounded={'full'} objectFit={'cover'}
         />

         <Stack>
        
            <Text fontSize={'sm'}>{title}</Text>
            <Text fontSize={'sm'}>Price: $ {price}</Text>
            <Text fontSize={'sm'}>Quantity: {quantity}</Text>
            
            
         </Stack>
<Button variant={'solid'} 
            colorScheme='red' 
            size='xs' w='fit-content'>
                Remove
            </Button>
    </Flex>
      <Divider />
    </>
  )
}

export default CarteDrawerItem
