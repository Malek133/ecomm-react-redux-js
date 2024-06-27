import { Grid } from '@chakra-ui/react'
import ProductCard from '../components/ProductCard'
import axios from 'axios';
import {useQuery} from  '@tanstack/react-query'
import ProductSkelaton from '../components/ProductSkelaton'
// import { useNavigate } from 'react-router-dom';
// import {useColorMode} from '@chakra-ui/color-mode';
import { useEffect } from "react";

const ProductPage = () => {

    // const {id} = useParams();
    // const navigate = useNavigate()
    // const { colorMode } = useColorMode();

    const getProductList = async () =>{
        const {data} = await 
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products?populate=categories,thumbnail`);
        return data;
      };

    const { isLoading, data } = useQuery({
        queryKey: ['products'],
        queryFn: getProductList
      });

      

      useEffect(() => {
        document.title=`Product ${data?.data?.attributes?.title} Page`;
               }, [data])
      
      if(isLoading) return <Grid margin={10}  
      templateColumns='repeat(auto-fill,minmax(300px,1fr) )' gap={6}>{
        Array.from({length:10},((_,i)=>
           <ProductSkelaton key={i} />)
      )}</Grid>;

   

   
  return (
    <Grid margin={10} 
    templateColumns='repeat(auto-fill,minmax(340px,1fr) )' gap={6}>
        {
            data.data.map(product => (
             <ProductCard key={product.id}   {...product} />
            ))
        }
        
       
    </Grid>
      
    
  )
}

export default ProductPage