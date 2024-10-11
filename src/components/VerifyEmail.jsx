import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

function VerifyEmail({ user, setUser }) {
  const [verificationCode, setVerificationCode] = useState('')
  const navigate = useNavigate()

  const handleVerify = async (e) => {
    e.preventDefault()
    try {
      // Aquí deberías hacer una llamada a tu backend para verificar el código
      // Por ahora, simularemos que esto fue exitoso
      const response = await simulateBackendCall(user.email, verificationCode)
      if (response.success) {
        setUser({ ...user, verified: true })
        navigate('/dashboard')
      } else {
        alert('Código incorrecto. Por favor, intente nuevamente.')
      }
    } catch (error) {
      console.error('Error during verification:', error)
      alert('Hubo un error durante la verificación. Por favor, intente nuevamente.')
    }
  }

  // Esta función simula una llamada al backend
  const simulateBackendCall = (email, code) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Email verified successfully' })
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
        <Heading fontSize={'2xl'}>Verifica tu correo electrónico</Heading>
        <Text fontSize={'md'} color={'gray.600'} textAlign="center">
          Hemos enviado un código de verificación a {user.email}
        </Text>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          w={'full'}
        >
          <VStack spacing={4}>
            <FormControl id="verificationCode" isRequired>
              <FormLabel>Código de verificación</FormLabel>
              <Input 
                type="text" 
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
            </FormControl>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleVerify}
              w={'full'}
            >
              Verificar
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Flex>
  )
}

export default VerifyEmail