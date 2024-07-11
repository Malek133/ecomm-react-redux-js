import {Routes , Route} from 'react-router-dom'
import Aboute from './pages/Aboute'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import ProductDetails from './pages/ProductDetails'
import AdminDashboard from './pages/dashboard/index'
import DashboardLyaout from './pages/dashboard/DashboardLyaout'
import Team from './pages/Team'
import Login from './pages/Login'
import Lyaout from './lyaout/lyaout'
import CookiesService from './srvices/CookiesService'
import CartDrawer from './components/CartDrawer'
import DashboardProducts from './pages/dashboard/DashboardProducts'



const App = () => {

  const token = CookiesService.get('jwt')
  return (
    <>
    
      <CartDrawer />
       <Routes>
       
       <Route  path="/" element={<Lyaout />}> 
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products" element={<ProductPage />} />
           <Route path="/Team" element={<Team />} />
           <Route path="/about" element={<Aboute />} />

           <Route path="/dashboard" element={<DashboardLyaout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<DashboardProducts />} />
            <Route path="Explore" element={<h5>Explore test</h5>} />
            <Route path="Categories" element={<h5>Categories test</h5>} />
            <Route path="Settings" element={<h5>Settings test</h5>} />
           </Route>
    </Route>
    <Route path="/login" element={<Login isAuthenticated={token} />} />
</Routes>
</>
    
  )
}

export default App
