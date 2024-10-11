import { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  Image,
} from '@chakra-ui/react'
import logo from '../assets/logo3.svg'

function Login({ setUser }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()
  const logoFilter = useColorModeValue('none','invert(1)')

  const handleLogin = (e) => {
    e.preventDefault()
    // Simulamos una verificación de credenciales
    if (credentials.email && credentials.password) {
      // Establecemos el usuario con un campo 'verified' en true
      setUser({ email: credentials.email, verified: true })
      navigate('/dashboard')
    } else {
      // Aquí podrías mostrar un mensaje de error
      console.error('Credenciales inválidas')
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <VStack spacing={4} w={'full'} maxW={'md'} p={6}>
        <Image
          src={logo}
          alt="Logo del Club"
          boxSize="100px"
          objectFit="contain"
          mb={4}
          filter={logoFilter}
        />
        <Heading fontSize={'2xl'}>Ingresá a tu cuenta</Heading>
        <Text fontSize={'md'} color={'gray.600'} textAlign="center">
          Para disfrutar de todas nuestras funciones
        </Text>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          w={'full'}
        >
          <VStack spacing={4}>
            <FormControl id="email">
              <FormLabel>Correo electrónico</FormLabel>
              <Input 
                type="email" 
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <Input 
                type="password" 
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
            </FormControl>
            <Stack direction={'row'} align={'start'} justify={'space-between'} w={'full'}>
              <Checkbox 
                isChecked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              >
                Recordarme
              </Checkbox>
              <Link color={'blue.400'} fontSize={'sm'}>¿Olvidaste tu contraseña?</Link>
            </Stack>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleLogin}
              w={'full'}
            >
              Ingresar
            </Button>
            <Button
              w={'full'}
              variant={'outline'}
              leftIcon={<FaGoogle />}
              isDisabled
            >
              Ingresar con Google
            </Button>
            <Text align={'center'} fontSize={'sm'}>
              ¿No tenes una cuenta? <Link as={RouterLink} to="/signup" color={'blue.400'}>Regístrate</Link>
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Flex>
  )
}

export default Login