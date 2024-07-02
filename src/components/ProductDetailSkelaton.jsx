
import { Box, SkeletonText,Skeleton } from "@chakra-ui/react"

const ProductDetailSkelaton = () => {
  return (
    <Box padding='6' boxShadow='lg' bg='white'>
    <Skeleton height='90px' />
    <SkeletonText mt='4' noOfLines={4} 
    spacing='4' skeletonHeight='2' />
  </Box>
  )
}

export default ProductDetailSkelaton
