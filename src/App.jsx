import {Routes , Route} from 'react-router-dom'
import Aboute from './pages/Aboute'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import ProductDetails from './pages/ProductDetails'
const App = () => {
  return (
    <>
       <Routes>


   <Route path="/" element={<Home />} />
   <Route path="/products/:id" element={<ProductDetails />} />
   <Route path="/products" element={<ProductPage />} />
   {/* <Route path="/signin" element={<SignIn />} /> */}
   <Route path="/about" element={<Aboute />} />
   {/* <Route path="/dashboard" element={<Dashboard/>} />

   <Route path="/product/:id" element={<ProductDetails />} />
    */}


{/* 
    <Route path="/login" element={<Login  />} /> */}
</Routes>
</>
    
  )
}

export default App
