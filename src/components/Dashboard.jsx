import React, { useState, useEffect } from 'react'
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Icon, VStack, Text, useColorModeValue } from '@chakra-ui/react'
import { FaHome } from 'react-icons/fa'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import { MdOutlinePayment } from 'react-icons/md'
import { LuAlignJustify } from "react-icons/lu";
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import HomeContent from './HomeContent'
import CredentialsContent from './CredentialsContent'
import PaymentsContent from './PaymentsContent'
import MasContent from './MasContent'

function Dashboard({ user }) {
    const [bottomPadding, setBottomPadding] = useState(0)
    const location = useLocation()
    const navigate = useNavigate()

    const bgColor = useColorModeValue('rgba(255, 255, 255, 0.7)', 'rgba(26, 32, 44, 0.7)')
    const borderColor = useColorModeValue('gray.200', 'gray.700')

    useEffect(() => {
        function updateBottomPadding() {
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
            setBottomPadding(isIOS ? 34 : 0)
        }

        updateBottomPadding()
        window.addEventListener('resize', updateBottomPadding)

        return () => window.removeEventListener('resize', updateBottomPadding)
    }, [])

    const tabContent = [
        { name: 'Inicio', icon: FaHome, content: <HomeContent user={user} /> },
        { name: 'Credenciales', icon: BsFillPersonVcardFill, content: <CredentialsContent user={user} /> },
        { name: 'Pagos', icon: MdOutlinePayment, content: <PaymentsContent user={user} /> },
        { name: 'Más', icon: LuAlignJustify, content: <MasContent user={user} /> },
    ]

    return (
        <Flex direction="column" h="100vh">
            <Tabs isFitted variant="enclosed">
                <TabPanels flex="1" overflowY="auto">
                    {tabContent.map((tab, index) => (
                        <TabPanel key={index} p={4} pb={`calc(80px + ${bottomPadding}px)`}>
                            {tab.content}
                        </TabPanel>
                    ))}
                </TabPanels>
                <Box
                    position="fixed"
                    bottom="0"
                    left="0"
                    right="0"
                    height={`calc(80px + ${bottomPadding}px)`}
                    bg={bgColor}
                    backdropFilter="blur(10px)"
                    borderTop="1px solid"
                    borderColor={borderColor}
                >
                    <TabList height="80px" width="100%">
                        {tabContent.map((tab, index) => (
                            <Tab 
                                key={index} 
                                _selected={{ 
                                    color: 'blue.500', 
                                    borderTop: '2px solid',
                                    borderColor: 'blue.500'
                                }}
                            >
                                <VStack spacing={1}>
                                    <Icon as={tab.icon} boxSize={6} />
                                    <Text fontSize="xs">{tab.name}</Text>
                                </VStack>
                            </Tab>
                        ))}
                    </TabList>
                </Box>
            </Tabs>
        </Flex>
    )
}

export default Dashboard