import React from 'react';
import { Spinner, Center } from '@chakra-ui/react';

function LoadingSpinner() {
  return (
    <Center height="100vh">
      <Spinner size="xl" color="teal.500" thickness="4px" />
    </Center>
  );
}

export default LoadingSpinner;
