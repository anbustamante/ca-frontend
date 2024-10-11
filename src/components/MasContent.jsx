import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Text,
    VStack,
    HStack,
    Switch,
    Button,
    useToast,
    Divider,
    Image,
    Flex,
    useColorMode,
    useColorModeValue,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import { FaSignOutAlt, FaCalendarAlt, FaLightbulb } from 'react-icons/fa'
import logo from '../assets/logo3.svg'

function MasContent({ user, onLogout }) {
    const navigate = useNavigate()
    const [notifications, setNotifications] = useState(true)
    const { colorMode, toggleColorMode } = useColorMode()
    const [email, setEmail] = useState(user.email)
    const toast = useToast()
    const logoFilter = useColorModeValue('none','invert(1)')
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
    const cancelRef = React.useRef()

    useEffect(() => {
        localStorage.setItem('colorMode', colorMode)
    }, [colorMode])

    const handleSaveChanges = () => {
        // Aquí iría la lógica para guardar los cambios
        toast({
            title: "Cambios guardados",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }

    const handleNavigateToReservas = () => {
        navigate('/reservas')
    }

    const handleNavigateToSugerencias = () => {
        navigate('/sugerencias')
    }

    const handleLogout = () => {
        setIsLogoutDialogOpen(true)
    }

    const confirmLogout = () => {
        onLogout()
        setIsLogoutDialogOpen(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <VStack align="stretch" spacing={6} w="full" mb={20}>
                <Flex justify="space-between" align="center">
                    <Text fontSize="3xl" fontWeight="bold">Configuración</Text>
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

                <HStack justify="space-between">
                    <Text>Notificaciones</Text>
                    <Switch 
                        isChecked={notifications} 
                        onChange={() => setNotifications(!notifications)}
                    />
                </HStack>

                <HStack justify="space-between">
                    <Text>Modo oscuro</Text>
                    <Switch 
                        isChecked={colorMode === 'dark'}
                        onChange={toggleColorMode}
                    />
                </HStack>

                <Button colorScheme="blue" onClick={handleSaveChanges}>
                    Guardar cambios
                </Button>

                <Divider />

                <Button 
                    leftIcon={<FaCalendarAlt />}
                    colorScheme="teal"
                    onClick={handleNavigateToReservas}
                >
                    Reservas
                </Button>

                <Button 
                    leftIcon={<FaLightbulb />}
                    colorScheme="yellow"
                    onClick={handleNavigateToSugerencias}
                >
                    Sugerencias
                </Button>

                <Button 
                    leftIcon={<FaSignOutAlt />} 
                    colorScheme="red" 
                    variant="outline"
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </Button>

                <AlertDialog
                    isOpen={isLogoutDialogOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={() => setIsLogoutDialogOpen(false)}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Cerrar sesión
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                ¿Estás seguro de que quieres cerrar sesión?
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={() => setIsLogoutDialogOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button colorScheme="red" onClick={confirmLogout} ml={3}>
                                    Cerrar sesión
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </VStack>
        </motion.div>
    )
}

export default MasContent