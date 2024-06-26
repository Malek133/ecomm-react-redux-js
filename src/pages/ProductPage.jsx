import { Grid } from '@chakra-ui/react'
import ProductCard from '../components/ProductCard'
import { useEffect, useState } from 'react'
import axios from 'axios';

const ProductPage = () => {

    const [productList,setProductList]=useState([]);

    useEffect(() => {
     (() => {
       axios
       .get(`${import.meta.env.VITE_SERVER_URL}/api/products?populate=categories,thumbnail`)
       .then(res => setProductList(res.data.data))
       .catch(err => console.log(err))
     })()
    },[])
  return (
    <Grid margin={10} 
    templateColumns='repeat(auto-fill,minmax(340px,1fr) )' gap={6}>
        {
            productList.map(product => (
                <ProductCard key={product.id}   {...product} />
            ))
        }
        
       
    </Grid>
      
    
  )
}

export default ProductPage