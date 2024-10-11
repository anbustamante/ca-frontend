import React, { useState, useEffect } from 'react'
import { 
    Text, 
    VStack, 
    HStack, 
    Box, 
    Button, 
    Badge, 
    Divider, 
    useToast,
    Skeleton,
    useColorModeValue,
    Flex,
    Image
} from '@chakra-ui/react'
import { FaMoneyBillWave, FaBeer } from 'react-icons/fa'
import logo from '../assets/logo3.svg'

function PaymentsContent({ user }) {
    const [paymentData, setPaymentData] = useState(null)
    const [loading, setLoading] = useState(true)
    const toast = useToast()
    const logoFilter = useColorModeValue('none','invert(1)')
    useEffect(() => {
        // Simulamos una llamada a la API
        setTimeout(() => {
            const mockData = {
                cuotaAlDia: false,
                cuotasPendientes: 2,
                montoCuota: 33220,
                tercerTiempoPendiente: true,
                montoTercerTiempo: 12000
            }
            setPaymentData(mockData)
            setLoading(false)
        }, 1500)
    }, [])

    const handlePayment = (type) => {
        // Aquí iría la lógica para conectar con MercadoPago
        console.log(`Iniciando pago de ${type}`)
        toast({
            title: "Pago iniciado",
            description: `Se ha iniciado el proceso de pago de ${type}`,
            status: "info",
            duration: 3000,
            isClosable: true,
        })
    }

    if (loading) {
        return <Skeleton height="400px" />
    }

    return (
        <VStack align="stretch" spacing={6} w="full">
            <Flex justify="space-between" align="center">
                <Text fontSize="3xl" fontWeight="bold">Pagos</Text>
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


            <Box p={4} borderWidth={1} borderRadius="md" shadow="md">
                <HStack justify="space-between">
                    <Text fontSize="xl" fontWeight="semibold">Estado de cuota:</Text>
                    <Badge colorScheme={paymentData.cuotaAlDia ? "green" : "red"}>
                        {paymentData.cuotaAlDia ? "Al día" : "Pendiente"}
                    </Badge>
                </HStack>
                {!paymentData.cuotaAlDia && (
                    <VStack align="stretch" mt={4}>
                        <Text>Cuotas pendientes: {paymentData.cuotasPendientes}</Text>
                        <Text>Monto total: ${paymentData.cuotasPendientes * paymentData.montoCuota}</Text>
                        <Button 
                            leftIcon={<FaMoneyBillWave />} 
                            colorScheme="blue" 
                            onClick={() => handlePayment('cuota')}
                        >
                            Pagar cuota
                        </Button>
                    </VStack>
                )}
            </Box>

            <Divider />

            <Box p={4} borderWidth={1} borderRadius="md" shadow="md">
                <HStack justify="space-between">
                    <Text fontSize="xl" fontWeight="semibold">Tercer tiempo:</Text>
                    <Badge colorScheme={paymentData.tercerTiempoPendiente ? "red" : "green"}>
                        {paymentData.tercerTiempoPendiente ? "Pendiente" : "Pagado"}
                    </Badge>
                </HStack>
                {paymentData.tercerTiempoPendiente && (
                    <VStack align="stretch" mt={4}>
                        <Text>Monto: ${paymentData.montoTercerTiempo}</Text>
                        <Button 
                            leftIcon={<FaBeer />} 
                            colorScheme="orange" 
                            onClick={() => handlePayment('tercer tiempo')}
                        >
                            Pagar tercer tiempo
                        </Button>
                    </VStack>
                )}
            </Box>
        </VStack>
        
    )
}

export default PaymentsContent