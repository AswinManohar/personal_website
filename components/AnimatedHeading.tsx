import React from 'react';
import { Heading, Box, HStack } from '@chakra-ui/react';
import TypewriterEffect from './TypewriterEffect';
import SpaceThemeToggle from './SpaceThemeToggle';

const AnimatedHeading = () => {
  return (
    <Box mb={8}>
      <HStack spacing={0} align="center">
        <Heading 
          as="h1" 
          fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} 
          fontFamily="'Doto', sans-serif" 
          fontWeight="800"
          textTransform="uppercase"
          letterSpacing="-0.02em"
          lineHeight="1"
        >
          <TypewriterEffect
            text="HI, I'M ASWIN"
            speed={80}
            delay={1000}
            fontSize="inherit"
            fontWeight="inherit"
          />
        </Heading>
      </HStack>
    </Box>
  );
};

export default AnimatedHeading;
