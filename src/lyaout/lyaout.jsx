
 import { Outlet,Navigate } from 'react-router-dom';
import Nav from './Nav'




const Lyaout = ({isAuthenticated}) => {
  
  if(isAuthenticated) return <Navigate to={'/'} replace />;
  return (
    <>
    <Nav />
   <Outlet />
    </>
  )
}

export default Lyaout