
import { Box,Flex ,Button, ButtonGroup, 
  Card, Image, Text,CardBody, CardFooter,
   Divider, Heading, Stack} from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductDetailSkelaton from "../components/ProductDetailSkelaton";
import { useNavigate,useParams } from "react-router-dom";
import { useColorMode } from "@chakra-ui/color-mode";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import {addToCart} from '../app/feauture/CartSlice'

 const ProductDetails = ({attributes}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const getProductList = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/products/${id}?populate=thumbnail&fields=price&fields=title`
    );
    return data;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["products", id],
    queryFn: getProductList,
  });

  useEffect(() => {
    if (data?.data?.attributes?.title) {
      document.title = `Product ${data.data.attributes.title} Page`;
    }
  }, [data]);

  const GoBack = () => navigate(-1);

  const AddToCarteHandler = () =>{
     dispatch(addToCart(data.data))
    // console.log()
  }

  // useEffect(() => {
  //   document.title = `Product ${data?.data?.attributes?.title} Page`;
  // }, [data]);

  if (isLoading)
    return (
      <Box maxW="sm" mx="auto" my={20}>
        <ProductDetailSkelaton />
      </Box>
    );

  return (
    <>
      <Flex ml={50} my={50}>
        
        <Button onClick={GoBack}
        variant='solid'
         colorScheme='blue'
         _hover={{
        bg: colorMode === 'light' ? 'black' : 'white',
        color: colorMode === 'light' ? 'blue.50' : 'black'
        }}>
        <ArrowRight /> Back
        </Button>
        
      </Flex>
      <Box mx='auto' my={30}  width={'500px'}>
        <Card border={"1px solid black"}>
          <CardBody>
            <Image
              src={`${import.meta.env.VITE_SERVER_URL}${
                data?.data?.attributes?.thumbnail?.data?.attributes?.url
              }`}
              alt={data?.data?.attributes?.title}
              borderRadius=""
              width={"260px"}
              height={"220px"}
              mx={"auto"}
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{data?.data?.attributes?.title}</Heading>
              <Text>{data?.data?.attributes?.des}</Text>
              <Text color="blue.600" fontSize="2xl">
                $ {data?.data?.attributes?.price}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup width={"full"} spacing="2">
              <Button
                onClick={AddToCarteHandler}
                py={7}
                bg={colorMode != "light" ? "#f8f8f8" : "#b54cff"}
                color={colorMode === "light" ? "#f8f8f8" : "#b54cff"}
                _hover={{
                  bg: colorMode === "light" ? "#f8f8f8" : "#b54cff",
                  color: colorMode != "light" ? "#f8f8f8" : "#b54cff",
                }}
                width={"full"}
                variant="solid"
                colorScheme="blue"
                size="lg"
              >
                Add To Carte
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Box>
    </>
  );
};

export default ProductDetails