
 import { Outlet } from 'react-router-dom';
 import Nav from './Nav'

const Lyaout = () => {
  

  return (
    <>
     <Nav /> 
   <Outlet />
    </>
  )
}

export default Lyaout