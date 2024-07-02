import {
    Flex, Box, FormControl, FormLabel, Input,
    Checkbox,Stack,Button,Heading,Text,useColorModeValue,
    InputGroup, InputRightElement,FormHelperText,
  } from '@chakra-ui/react'
  import { Eye, EyeOff } from 'lucide-react';
  import {  useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import {userLogin,selectLogin} from '../app/feauture/LoginSlice'
  import { Navigate } from 'react-router-dom';

  
  export default function LoginPage({isAuthenticated}) {

    if(isAuthenticated) return <Navigate to={-1} replace />;
  
  
     const dispatch = useDispatch();
      const {loading,data,error}=useSelector(selectLogin);
  
    const [showPassword, setShowPassword] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [user,setUser] = useState({
        
      identifier:"",
      password:""
    });
  
    const onChangeHandler = (e) => {
      const {name , value} = e.target;
      setUser({...user,[name]:value});
    }
  
    const submitHandler = (e) =>{
      e.preventDefault();
      console.log(user)
      if(!user.identifier && !user.password){
        setIsEmail(true)
        setIsPassword(true) 
        return;
      }
        if(!user.identifier){
          setIsEmail(true)
          return;
        }
  
        if(!user.password){
          setIsPassword(true)
          return;
        }
       
      
      setIsEmail(false)
      setIsPassword(false)
       dispatch(userLogin(user))
    }
  
     
    return (
      <>
      
       <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>
                LogIn in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Text color={'blue.400'}>
                features</Text> ✌️
            </Text>
          </Stack>
          <Box as={'form'} onSubmit={submitHandler}
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="identifier">
                <FormLabel>Email address</FormLabel>
                <Input isInvalid={isEmail} errorBorderColor='crimson' 
                type="email" value={user.identifier} name='identifier'
                onChange={onChangeHandler} />
                 {isEmail ? ( 
                    <FormHelperText color={'red.500'}>
                 Enter the email you'd like to receive the newsletter on.
               </FormHelperText>
                ) : (
               null
                   )} 
              </FormControl>
             
              <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} 
                isInvalid={isPassword} errorBorderColor='crimson' 
                name='password'value={user.password} 
                onChange={onChangeHandler} />
              
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => 
                    setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <Eye /> : < EyeOff />}
                  </Button>
                </InputRightElement>
                </InputGroup>
                {isPassword ? ( 
                 <FormHelperText color={'red.500'}>
                 Enter the password please
               </FormHelperText>
                ) : (
                  null
                  )} 
              
            </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Text color={'blue.400'}>Forgot password?</Text>
                </Stack>
  
                <Button
                   
                 isLoading={loading}
                type='submit'
                  bg={isPassword || isEmail ? 'red.500' : 'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: isPassword || isEmail ? 'red.600' : 'blue.500'
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      </>
     
    )
  }