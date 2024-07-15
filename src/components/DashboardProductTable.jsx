
import {
    TableContainer,Table,TableCaption,useDisclosure,
    Thead,Tr,Th,Tbody,Tfoot,Td,Image,Button,
    FormControl,FormLabel,Input,Textarea
    ,NumberInput,NumberInputField,Flex
     ,NumberInputStepper ,NumberIncrementStepper
     ,NumberDecrementStepper
  } from '@chakra-ui/react'
  import { Eye,Trash,Pencil } from 'lucide-react';
  import { Link } from 'react-router-dom';
  import AlertDialogue from '../shared/AlertDialogue'
  import CustomModal from '../shared/CustomModal'
  import CreateModal from '../shared/CreateModal'
  import {useGetDashboardProductsQuery,
    useDeleteDashboardProductsMutation
  ,useEditDashboardProductsMutation,
  useCreateDashboardProductMutation} from '../app/services/ApiSlice'
   import DashboardProductTableSkelaton from './DashboardProductTableSkelaton'
import { useEffect, useState } from 'react';

const DashboardProductTable = () => {

  const [productId,setProductId] = useState(null)
  const [productIdToEdit,setProductIdToEdit] = useState(null)
  const [thumbnail,setThumbnail] = useState(null)
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: 0,
    stock: 0,
    des: '',
    thumbnail: null,
  });

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen:isModelOpen, 
    onOpen:onModalOpen, onClose:onModalClose } = useDisclosure();

    const { isOpen:isCreateModelOpen, onOpen:onCreateModalOpen,
      onClose:onCreateModalClose } = useDisclosure()
    
const {isLoading,data} = useGetDashboardProductsQuery({page:1})

const [removeProduct,{isLoading:isremove,
  isSuccess}]=useDeleteDashboardProductsMutation();
  

  const [editProduct,{isLoading:isedit,
    isSuccess:iseditSuccess}]=useEditDashboardProductsMutation();

    const [createProduct,{isLoading:iscreate,
      isSuccess:iscreateSuccess}]=useCreateDashboardProductMutation();


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
  const onSubmitHandler = () =>{
    const formData = new FormData();
    formData.append('data',JSON.stringify({
      title:productIdToEdit.title,
      price:productIdToEdit.price,
      stock:productIdToEdit.stock,
      des:productIdToEdit.des
    }))
    formData.append('files.thumbnail',thumbnail)
    editProduct({id:productId,body:formData})
  }
  const onChangeThumbnailHandler = e =>{
    setThumbnail(e.target.files[0])
  }


  const onNewChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const onNewChangePriceHandler = (value) => {
    setNewProduct({
      ...newProduct,
      price: +value,
    });
  };

  const onNewChangeStockHandler = (value) => {
    setNewProduct({
      ...newProduct,
      stock: +value,
    });
  };

  const onNewChangeThumbnailHandler = (e) => {
    setNewProduct({
      ...newProduct,
      thumbnail: e.target.files[0],
    });
  };

  const onSubmitHandlerCreat = () => {
    const formData = new FormData();
    formData.append('data', JSON.stringify({
      title: newProduct.title,
      price: newProduct.price,
      stock: newProduct.stock,
      des: newProduct.des,
    }));
    formData.append('files.thumbnail', newProduct.thumbnail);
  
    createProduct(formData)
      .unwrap()
      .then(() => {
        onCreateModalClose();
        setNewProduct({
          title: '',
          price: 0,
          stock: 0,
          des: '',
          thumbnail: null,
        });
      })
      .catch((error) => {
        console.error('Failed to create product:', error);
      });
  };
  
  
  useEffect(()=>{
    if(iscreateSuccess){
      setNewProduct({
        title: '',
        price: 0,
        stock: 0,
        des: '',
        thumbnail: null,
      })
      onCreateModalClose()
    }
    },[isSuccess,iscreateSuccess])
 
useEffect(()=>{
if(isSuccess){
  setProductId(null)
  onClose()
}
},[isSuccess])

useEffect(()=>{
  if(iseditSuccess){
    setProductId(null)
    onModalClose()
  }
  },[isSuccess,iseditSuccess])

   if(isLoading)  return <DashboardProductTableSkelaton />;
  return (
    <>
    <Flex direction={'column'} maxW={"85%"} my={6} mx={'auto'}>
    <Button 
      onClick={() =>{
        onCreateModalOpen()
      }}
       py={5} px={8}
      width={'fit-content'} ml={"auto"}  variant='solid' 
      colorScheme='blue'size='sm' >
       Creat New Product
      </Button>
    </Flex>
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
          setProductId(p.id)
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
{/* {console.log(newProduct)} */}
<AlertDialogue 
isOpen={ isOpen} onOpen={onOpen} onClose={onClose} 
title={'Remove this Products'} CancelTxt={'Cancel'} DeleteTxt={'Delete'} 
des={'Are you sure? You can t undo this action afterwards.'}
  onOkHandler={()=>removeProduct(productId)}
  isLoading={isremove}  />

  <CustomModal isOpen={isModelOpen} onClick={onSubmitHandler}
   onOpen={onModalOpen} onClose={onModalClose}
   title={'Update this product'} save={'Save'} cancel={'Cancel'}
   isLoading={isedit} >
    {/* <Box as="form" onSubmit={onSubmitHandler}> */}

         <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <Input placeholder='Last name' name='title'
              value={productIdToEdit?.title} onChange={onChangeHandler} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Descreption</FormLabel>
              <Textarea h={120} placeholder='descreption' name='des'
              value={productIdToEdit?.des} onChange={onChangeHandler} />
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

   <CreateModal  isOpen={isCreateModelOpen} onClose={onCreateModalClose}
    title={'Create New Product'} add={'Add'} cancel={'cancel'}
    isLoading={iscreate} onClick={onSubmitHandlerCreat}  >

         <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <Input placeholder='Last name' name='title'
              value={newProduct.title} onChange={onNewChangeHandler}  />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Descreption</FormLabel>
              <Textarea h={120} placeholder='descreption' name='des'
              value={newProduct.des} onChange={onNewChangeHandler}  />
            </FormControl>

          <FormControl my={3}>
            <FormLabel>Price</FormLabel>
            <NumberInput step={0.5} name='price'defaultValue={0.0}  
             value={newProduct.price} onChange={onNewChangePriceHandler} >
                 <NumberInputField />
                  <NumberInputStepper>
                   <NumberIncrementStepper />
                     <NumberDecrementStepper />
                      </NumberInputStepper>
                       </NumberInput>
            </FormControl>

            <FormControl my={3}>
              <FormLabel>Stock</FormLabel>
              <NumberInput step={1} name='stock' defaultValue={0} 
               value={newProduct.stock} onChange={onNewChangeStockHandler} >
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
              onChange={onNewChangeThumbnailHandler} />
            </FormControl>

    </CreateModal>
    </>
  )
}

export default DashboardProductTable
