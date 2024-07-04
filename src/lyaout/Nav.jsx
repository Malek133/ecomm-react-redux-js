'use client'

import {
  Box,Flex, Avatar,HStack,Button,
  Menu, MenuButton, MenuList,MenuItem, 
  MenuDivider,useColorModeValue,
  Stack,useColorMode,Center,
} from '@chakra-ui/react'
import { useSelector,useDispatch } from "react-redux";
import {selectCart} from '../app/feauture/CartSlice'
import { Moon,SunMoon } from 'lucide-react';
import CookiesService from '../srvices/CookiesService'
import { Link, Link as RouterLink } from 'react-router-dom';
import {onOpenCartDrawerAction} from '../app/feauture/GlobalSlice'



const Links = ['Dashboard', 'Products', 'Team','About']
const NavLink = ({ children }) => {
  

  return (
    <Link
      as={RouterLink}
      to={children.toLowerCase()}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      >
      {children}
    </Link>
  )
}

export default function Nav() {
  
  const { CartProducts } = useSelector(selectCart);
  const onOpen = () => dispatch(onOpenCartDrawerAction()) 
  const dispatch = useDispatch()
  const { colorMode, toggleColorMode } = useColorMode()
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const token = CookiesService.get('jwt')
  const LogoutHandler = () =>{
    CookiesService.remove('jwt')
    window.location.reload()
  }
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
         <RouterLink  to={'/'} >My App</RouterLink> 
        
         
          <HStack as={'nav'} fontSize={'initial'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
            
          <Flex alignItems={'center'}>
         
            <Stack direction={'row'} spacing={7}>
            <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <Moon /> : <SunMoon />}
              </Button>
             <Button onClick={onOpen}> Cart ({CartProducts.length})</Button>
              {
                token ? (
                  
                  <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br /> 
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                   <br />
                  <Center>
                    Username
                  </Center>
                   <br /> 
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={LogoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
                ) : (
                  <Button
                  variant='solid' colorScheme='blue'
                    _hover={{
                      bg: colorMode === 'light' ? 'black' : 'white',
                      color: colorMode === 'light' ? 'blue.50' : 'black'
                        }}>
                   <Link to="/login">Login</Link>
                  </Button>
                )
              }
            

            

              
            </Stack>
            
          </Flex>
          
        </Flex>
      </Box>

    </>
  )
}