import React from 'react'
import { Button, ButtonGroup, Card, Image, Text, 
    CardBody, CardFooter,
     Divider, Heading, Stack } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import {useColorMode} from '@chakra-ui/color-mode'

const ProductCard = ({id,attributes}) => {
    const { colorMode } = useColorMode();
   

  return (
    <>
    <Card border={"1px solid black"}>
  <CardBody>
  
     <Image
      src={`${import.meta.env.VITE_SERVER_URL}${attributes?.thumbnail?.data?.attributes?.url}`}
      alt={attributes.title}
      borderRadius=''
      width={'260px'}
      height={'220px'}
      mx={'auto'}
    /> 
    <Stack mt='6' spacing='3'>
   
       <Heading size='md'>{attributes.title}</Heading>
      <Text>
      {attributes.des}
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        $ {attributes.price}
      </Text> 
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup width={'full'} spacing='2'>
      <Button 
      as={Link}
      to={`/products/${id}`}
      py={7}
      bg={colorMode != 'light' ? '#f8f8f8' : '#b54cff'}
      color={colorMode === 'light' ? '#f8f8f8' : '#b54cff'}
      _hover={{
        bg:colorMode === 'light' ? '#f8f8f8' : '#b54cff',
      color:colorMode != 'light' ? '#f8f8f8' : '#b54cff'
      }}
      width={'full'}  variant='solid' 
      colorScheme='blue'size='md' >
        View Details
      </Button>
      
    </ButtonGroup>
  </CardFooter>
</Card>
    </>
  )
}

export default ProductCard