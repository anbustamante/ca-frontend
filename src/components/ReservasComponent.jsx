import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  VStack,
  Heading,
  Select,
  Textarea,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  HStack,
} from '@chakra-ui/react';
import { FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';

function ReservasComponent() {
  const [lugar, setLugar] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [duracion, setDuracion] = useState('');
  const toast = useToast();
  const isSubmitting = false; // Assuming this is a state variable for submission status
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la solicitud de reserva
    console.log({ lugar, descripcion, fecha, hora, duracion });
    toast({
      title: "Solicitud enviada",
      description: "Tu solicitud de reserva ha sido enviada con éxito.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    // Resetear el formulario
    setLugar('');
    setDescripcion('');
    setFecha('');
    setHora('');
    setDuracion('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box maxWidth="600px" margin="auto" padding={6} mb={20}>
        <HStack justifyContent="space-between" mb={6}>
          <Button leftIcon={<FaArrowLeft />} onClick={() => navigate(-1)} variant="outline">
            Atrás
          </Button>
          <Heading size="lg">Solicitar Reserva</Heading>
        </HStack>
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Lugar</FormLabel>
            <Select
              placeholder="Selecciona un lugar"
              value={lugar}
              onChange={(e) => setLugar(e.target.value)}
            >
              <option value="quincho">Quincho</option>
              <option value="capilla">Capilla</option>
              <option value="cancha">Cancha</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Descripción del evento</FormLabel>
            <Textarea
              placeholder="Describe tu evento y necesidades"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Fecha</FormLabel>
            <Input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Hora de inicio</FormLabel>
            <Input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Duración (horas)</FormLabel>
            <Input
              type="number"
              min="1"
              max="24"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
            />
          </FormControl>

          <Button
            leftIcon={<FaCalendarAlt />}
            colorScheme="teal"
            type="submit"
            width="full"
            isLoading={isSubmitting}
            loadingText="Enviando..."
          >
            Solicitar Reserva
          </Button>

          <Text fontSize="sm" color="gray.500">
            Nota: La reserva está sujeta a aprobación. Te contactaremos para confirmar.
          </Text>
        </VStack>
      </Box>
    </motion.div>
  );
}

export default ReservasComponent;
