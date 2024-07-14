
import {
    TableContainer,Table,TableCaption,useDisclosure,
    Thead,Tr,Th,Tbody,Tfoot,Td,Image,Button,
    FormControl,FormLabel,Input
    ,NumberInput,NumberInputField
     ,NumberInputStepper ,NumberIncrementStepper
     ,NumberDecrementStepper
  } from '@chakra-ui/react'
  import { Eye,Trash,Pencil } from 'lucide-react';
  import { Link } from 'react-router-dom';
  import AlertDialogue from '../shared/AlertDialogue'
  import CustomModal from '../shared/CustomModal'
  import {useGetDashboardProductsQuery,
    useDeleteDashboardProductsMutation} from '../app/services/ApiSlice'
   import DashboardProductTableSkelaton from './DashboardProductTableSkelaton'
import { useEffect, useState } from 'react';

const DashboardProductTable = () => {

  const onChangeHandler = (e) =>{
    const {name,value}= e.target
    setProductIdToEdit({
      ...productIdToEdit,
      [name]:value
    })
  }
  const onChangePriceHandler = value =>{
    setProductIdToEdit({
      ...productIdToEdit,
      price:+value
    })
  }
  const onChangeStockHandler = value =>{
    setProductIdToEdit({
      ...productIdToEdit,
      stock:+value
    })
  }
  const onSubmitHandler = e =>{
    // e.preventDefault()
    console.log(thumbnail)
    console.log(productIdToEdit)
  }
  const onChangeThumbnailHandler = e =>{
    setThumbnail(e.target.files[0])
  }

  const [productId,setProductId] = useState(null)
  const [productIdToEdit,setProductIdToEdit] = useState(null)
  const [thumbnail,setThumbnail] = useState('')

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen:isModelOpen, 
    onOpen:onModalOpen, onClose:onModalClose } = useDisclosure()
    
const {isLoading,data,error} = useGetDashboardProductsQuery({page:1})

const [removeProduct,{isLoading:isremove,isSuccess}]=useDeleteDashboardProductsMutation();

useEffect(()=>{
if(isSuccess){
  setProductId(null)
  onClose()
}
},[isSuccess])

   if(isLoading)  return <DashboardProductTableSkelaton />;
  return (
    <>
      <TableContainer maxW={'87%'} mx='auto'>
  <Table variant='simple'>
    <TableCaption>Total Products : {data?.data?.length ?? 0}</TableCaption>
    <Thead>
      <Tr>
        <Th>ID</Th>
        <Th>title</Th>
        {/* <Th>category</Th> */}
        <Th>thumbnail</Th>
        <Th>Price</Th>
        <Th>Stoks</Th>
        <Th>Detail</Th>
        <Th>Update</Th>
        <Th>Remove</Th>
      </Tr>
    </Thead>
    <Tbody>
        {
            data?.data?.map((p,i) =>(
              
                <Tr key={p.id}>
        <Td>{i+1}</Td>
        <Td>{p?.attributes?.title}</Td>
        {/* <Td>{p?.attributes?.categories?.data?.attributes?.title}</Td> */}
        <Td>
            <Image borderRadius='full' boxSize='40px' objectFit={'cover'}
            src={`${import.meta.env.VITE_SERVER_URL}${p?.attributes?.thumbnail?.data?.attributes?.formats?.thumbnail?.url}`} 
            alt={p?.attributes?.title} 
              />
        </Td>
        <Td>{p?.attributes?.price} $</Td>
         <Td>{p?.attributes?.stock}</Td>
         <Td>
         <Button 
      as={Link}
      to={`/products/${p.id}`}
      py={5} px={8}
      width={'fit'}  variant='solid' 
      colorScheme='blue'size='xs' >
        <Eye size={19} />
      </Button>
         </Td>
         <Td>
         <Button 
        onClick={() =>{
          setProductIdToEdit(p.attributes)
          onModalOpen()
        }}
        py={5} px={8}
      width={'fit'}  variant='solid' 
      colorScheme='green' size='xs' >
        <Pencil size={19} />
      </Button>
         </Td>
         <Td>
         <Button 
      onClick={() =>{
        setProductId(p.id)
        onOpen()
      }}
       py={5} px={8}
      width={'fit'}  variant='solid' 
      colorScheme='red'size='xs' >
        <Trash size={19} />
      </Button>
         </Td>
         
      </Tr>
            ))
        }
      
      
    </Tbody>
    <Tfoot>
    <Tr>
        <Th>ID</Th>
        <Th>title</Th>
        {/* <Th>category</Th> */}
        <Th>thumbnail</Th>
        <Th>Price</Th>
         <Th>Stoks</Th>
         <Th>Detail</Th>
         <Th>Update</Th>
        <Th>Remove</Th>
      </Tr>
    </Tfoot>
   
  </Table>
</TableContainer>
{console.log(productIdToEdit)}
<AlertDialogue 
isOpen={ isOpen} onOpen={onOpen} onClose={onClose} 
title={'Remove this Products'} CancelTxt={'Cancel'} DeleteTxt={'Delete'} 
des={'Are you sure? You can t undo this action afterwards.'}
  onOkHandler={()=>removeProduct(productId)}
  isLoading={isremove}  />

  <CustomModal isOpen={isModelOpen} onClick={onSubmitHandler}
   onOpen={onModalOpen} onClose={onModalClose}
   title={'Update this product'} save={'Save'} cancel={'Cancel'} >
    {/* <Box as="form" onSubmit={onSubmitHandler}> */}

         <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <Input placeholder='Last name' name='title'
              value={productIdToEdit?.title} onChange={onChangeHandler} />
            </FormControl>

            <FormControl my={3}>
              <FormLabel>Price</FormLabel>
              <NumberInput step={0.5} name='price'
              defaultValue={productIdToEdit?.price}  
               onChange={onChangePriceHandler} >
                 <NumberInputField />
                  <NumberInputStepper>
                   <NumberIncrementStepper />
                     <NumberDecrementStepper />
                      </NumberInputStepper>
                       </NumberInput>
            </FormControl>

            <FormControl my={3}>
              <FormLabel>Stock</FormLabel>
              <NumberInput step={1} name='stock'
              defaultValue={productIdToEdit?.stock} 
              onChange={onChangeStockHandler} >
                 <NumberInputField />
                  <NumberInputStepper>
                   <NumberIncrementStepper />
                     <NumberDecrementStepper />
                      </NumberInputStepper>
                       </NumberInput>
            </FormControl>


            <FormControl my={3}>
              <FormLabel>Image</FormLabel>
              <Input type='file' h={'full'}
              accept='image/png ,image/gif ,imag/jpeg' name='thumbnail'
              onChange={onChangeThumbnailHandler} />
            </FormControl>
          {/* </Box> */}
   </CustomModal>
    </>
  )
}

export default DashboardProductTable
