import React from 'react';
import { Box } from '@chakra-ui/react';

export default function AttractionsImage({ image, name }) {
  return (
    <Box flex="1">
      <img
        src={image}
        alt={name}
        style={{ height: '225px', width: '225px', borderRadius: '20px' }}
      />
    </Box>
  );
}
