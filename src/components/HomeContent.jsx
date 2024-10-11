import React, { useState, useEffect } from 'react'
import { 
    Text, 
    VStack, 
    HStack, 
    Box, 
    Button, 
    useDisclosure, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton,
    Textarea,
    useToast,
    Divider,
    Badge,
    Icon,
    Image,
    Flex,
    useColorModeValue
} from '@chakra-ui/react'
import { FaHockeyPuck, FaFootballBall, FaCalendarAlt, FaBullhorn } from 'react-icons/fa'
import logo from '../assets/logo3.svg'

function HomeContent({ user }) {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [suggestion, setSuggestion] = useState('')
    const toast = useToast()
    const logoFilter = useColorModeValue('none','invert(1)')

    useEffect(() => {
        setTimeout(() => {
            const mockEvents = [
                { sport: 'Hockey', cat: 'PS-A', teams: 'V vs SAG', time: '16:00', date: '2023-05-20' },
                { sport: 'Hockey', cat: 'PS-B', teams: 'V vs SAG', time: '16:00', date: '2023-05-20' },
                { sport: 'Rugby', cat: 'PS', teams: 'CASI vs V', time: '15:30', date: '2023-05-21' },
                { sport: 'Rugby', cat: 'M19', teams: 'V vs Daom', time: '09:00', date: '2023-05-20' }
            ]
            setEvents(mockEvents)
            setLoading(false)
        }, 1000)
    }, [])

    const handleSuggestionSubmit = () => {
        // Aquí iría la lógica para enviar la sugerencia a la API
        console.log('Sugerencia enviada:', suggestion)
        toast({
            title: "Sugerencia enviada",
            description: "Gracias por tu aporte al club",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
        onClose()
        setSuggestion('')
    }

    return (
        <VStack align="stretch" spacing={6} w="full">
            <Flex justify="space-between" align="center">
                <Text fontSize="4xl" fontWeight="bold" >Inicio</Text>
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
            
            <Box>
                <HStack>
                    <Icon as={FaCalendarAlt} />
                    <Text fontSize="xl" fontWeight="semibold">Eventos del fin de semana:</Text>
                </HStack>
                {loading ? (
                    <Text>Cargando eventos...</Text>
                ) : (
                    events.map((event, index) => (
                        <Box key={index} p={3} shadow="md" borderWidth="1px" borderRadius="md" mt={2}>
                            <HStack justify="space-between">
                                <HStack>
                                    <Icon as={event.sport === 'Hockey' ? FaHockeyPuck : FaFootballBall} />
                                    <Text fontWeight="bold">{event.sport}:</Text>
                                </HStack>
                                <Badge colorScheme="green">{event.date}</Badge>
                            </HStack>
                            <Text>{event.teams} - {event.time}hs</Text>
                        </Box>
                    ))
                )}
            </Box>

            <Divider />

            <Box>
                <HStack>
                    <Icon as={FaBullhorn} />
                    <Text fontSize="xl" fontWeight="semibold">Noticias del club:</Text>
                </HStack>
                <Text mt={2}>El dia 21 de septiembre se realizara la cuarta matiné del club. ¡No te la pierdas!</Text>
            </Box>
            <Button colorScheme="blue" onClick={onOpen}>Mas información</Button>
            
            <Divider />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Enviar sugerencia</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea 
                            value={suggestion} 
                            onChange={(e) => setSuggestion(e.target.value)}
                            placeholder="Escribe tu sugerencia aquí..."
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSuggestionSubmit}>
                            Enviar
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    )
}

export default HomeContent