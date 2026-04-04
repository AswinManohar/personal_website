import React, { useMemo } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';

// The Arecibo message is 1679 bits (23 columns x 73 rows)
// This is a simplified representation of the bit-pattern density
// to create the visual texture of the original signal.
const AreciboBackground = () => {
  const bits = useMemo(() => {
    // 1679 bits, increased density for visibility
    const data = new Array(1679).fill(0).map(() => (Math.random() > 0.7 ? 1 : 0));
    return data;
  }, []);

  return (
    <Box 
      position="fixed" 
      top={0} 
      left={0} 
      right={0} 
      bottom={0} 
      zIndex={0} 
      overflow="hidden"
      opacity={0.3}
      pointerEvents="none"
    >
      <SimpleGrid 
        columns={23} 
        spacing="0px" 
        width="100vw" 
        height="100vh"
      >
        {bits.map((bit, i) => (
          <Box 
            key={i} 
            border="0.1px solid"
            borderColor="rgba(255, 255, 255, 0.05)"
            bg={bit === 1 ? "white" : "transparent"} 
            opacity={bit === 1 ? Math.random() * 0.4 + 0.2 : 0}
            animation={Math.random() > 0.95 ? "pulse 2s infinite" : "none"}
            sx={{
              '@keyframes pulse': {
                '0%, 100%': { opacity: 0.1 },
                '50%': { opacity: 0.6 },
              }
            }}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AreciboBackground;
