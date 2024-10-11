import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'

function Register({ setUser }) {
  const [userData, setUserData] = useState({ email: '', password: '', confirmPassword: '' })
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (userData.password !== userData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    
    try {
      // Aquí deberías hacer una llamada a tu backend para registrar al usuario
      // y enviar el correo de verificación
      // Por ahora, simularemos que esto fue exitoso
      const response = await simulateBackendCall(userData.email)
      if (response.success) {
        // Guardamos el email en el estado global para usarlo en la verificación
        setUser({ email: userData.email, verified: false })
        // Redirigimos a la página de verificación
        navigate('/verify-email')
      }
    } catch (error) {
      console.error('Error during registration:', error)
      alert('Hubo un error durante el registro. Por favor, intente nuevamente.')
    }
  }

  // Esta función simula una llamada al backend
  const simulateBackendCall = (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Verification email sent' })
      }, 1000)
    })
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <VStack spacing={4} w={'full'} maxW={'md'} p={6}>
        <Heading fontSize={'2xl'}>Crea tu cuenta</Heading>
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
            <FormControl id="email" isRequired>
              <FormLabel>Correo electrónico</FormLabel>
              <Input 
                type="email" 
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input 
                type="password" 
                value={userData.password}
                onChange={(e) => setUserData({...userData, password: e.target.value})}
              />
            </FormControl>
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirmar Contraseña</FormLabel>
              <Input 
                type="password" 
                value={userData.confirmPassword}
                onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
              />
            </FormControl>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleRegister}
              w={'full'}
            >
              Registrarse
            </Button>
            <Button
              w={'full'}
              variant={'outline'}
              leftIcon={<FaGoogle />}
            >
              Registrarse con Google
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Flex>
  )
}

export default Register