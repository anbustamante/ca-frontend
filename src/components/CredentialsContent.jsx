import React, { useState, useEffect } from 'react'
import { Flex, Text, VStack, Image, Box, Badge, SimpleGrid, Skeleton, useColorModeValue } from '@chakra-ui/react'
import logo from '../assets/logo3.svg'

function CredentialsContent({ user }) {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const logoFilter = useColorModeValue('none','invert(1)')
    useEffect(() => {
        // Simulamos una llamada a la API con un timeout
        const fetchUserData = () => {
            setTimeout(() => {
                const mockData = {
                    nombre: "Juan Pérez",
                    numeroSocio: "12345",
                    categoria: "Plantel Superior",
                    actividad: "Socio Activo",
                    cuotaAlDia: Math.random() < 0.5,
                    foto: `https://source.unsplash.com/random/150x150?face&${Date.now()}` // Imagen aleatoria de una cara
                }
                setUserData(mockData)
                setLoading(false)
            }, 500)
        }

        fetchUserData()
    }, [])

    if (loading) {
        return <Skeleton height="400px" />
    }

    return (
        <VStack align="stretch" spacing={6} w="full">
            <Flex justify="space-between" align="center">
                <Text fontSize="3xl" fontWeight="bold">Credenciales</Text>
                <Image 
                    src={logo}
                    alt="Logo de la aplicación" 
                    boxSize="50px" 
                    width="75px"
                    height="75px"
                    objectFit="contain"
                    filter={logoFilter}
                />
            </Flex>
            
            <VStack align="center" spacing={6}>
                <Image
                    borderRadius="full"
                    boxSize="250px"
                    src={userData.foto}
                    alt={userData.nombre}
                    fallbackSrc="https://i.pinimg.com/236x/58/ac/2e/58ac2e722527319666603da8a7570f53.jpg"
                />
                
                <Badge 
                    colorScheme={userData.cuotaAlDia ? "green" : "red"} 
                    p={2} 
                    borderRadius="md"
                    fontSize="lg"
                >
                    {userData.cuotaAlDia ? "Habilitado" : "No habilitado"}
                </Badge>
                
                <SimpleGrid columns={2} spacing={4} w="full">
                    <Box>
                        <Text fontWeight="bold">Nombre:</Text>
                        <Text>{userData.nombre}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight="bold">Socio N°:</Text>
                        <Text>{userData.numeroSocio}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight="bold">Categoría:</Text>
                        <Text>{userData.categoria}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight="bold">Actividad:</Text>
                        <Text>{userData.actividad}</Text>
                    </Box>
                </SimpleGrid>
            </VStack>
        </VStack>
    )
}

export default CredentialsContent