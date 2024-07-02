import {Routes , Route} from 'react-router-dom'
import Aboute from './pages/Aboute'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import ProductDetails from './pages/ProductDetails'
import Dashboard from './pages/Dashboard'
import Team from './pages/Team'
import Login from './pages/Login'
import Lyaout from './lyaout/lyaout'
import CookiesService from './srvices/CookiesService'

const App = () => {

  const token = CookiesService.get('jwt')
  return (
    <>
    
       <Routes>

       <Route  path="/" element={<Lyaout isAuthenticated={token} />}> 
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products" element={<ProductPage />} />
           <Route path="/Team" element={<Team />} />
           <Route path="/about" element={<Aboute />} />
           <Route path="/dashboard" element={<Dashboard />} />
    </Route>
    <Route path="/login" element={<Login isAuthenticated={token} />} />
</Routes>
</>
    
  )
}

export default App
