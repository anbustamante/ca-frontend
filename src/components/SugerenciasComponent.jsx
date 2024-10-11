import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  VStack,
  Heading,
  Textarea,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Select,
  HStack,
} from '@chakra-ui/react';
import { FaLightbulb, FaArrowLeft } from 'react-icons/fa';

function SugerenciasComponent() {
  const [categoria, setCategoria] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la sugerencia
    console.log({ categoria, titulo, descripcion });
    toast({
      title: "Sugerencia enviada",
      description: "Tu sugerencia ha sido enviada con éxito. ¡Gracias por tu aporte!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    // Resetear el formulario
    setCategoria('');
    setTitulo('');
    setDescripcion('');
  };

  const handleImageUpload = (e) => {
    setIsSubmitting(true);
    // Aquí iría la lógica para subir la imagen
    console.log('Imagen subida:', e.target.files[0]);
    setIsSubmitting(false);
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
          <Heading size="lg">Enviar Sugerencia</Heading>
        </HStack>
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Categoría</FormLabel>
            <Select
              placeholder="Selecciona una categoría"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="instalaciones">Instalaciones</option>
              <option value="actividades">Actividades</option>
              <option value="servicios">Servicios</option>
              <option value="otros">Otros</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Título de la sugerencia</FormLabel>
            <Input
              placeholder="Escribe un título breve para tu sugerencia"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Descripción de la sugerencia</FormLabel>
            <Textarea
              placeholder="Describe tu sugerencia en detalle"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              minHeight="150px"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Adjuntar imagen (opcional)</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </FormControl>

          <Button
            leftIcon={<FaLightbulb />}
            colorScheme="yellow"
            type="submit"
            width="full"
            isLoading={isSubmitting}
            loadingText="Enviando..."
          >
            Enviar Sugerencia
          </Button>

          <Text fontSize="sm" color="gray.500">
            Nota: Valoramos tus ideas para mejorar nuestro club. Todas las sugerencias serán revisadas por nuestro equipo.
          </Text>
        </VStack>
      </Box>
    </motion.div>
  );
}

export default SugerenciasComponent;
