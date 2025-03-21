import React from 'react';
import { Heading, Box, HStack } from '@chakra-ui/react';
import TypewriterEffect from './TypewriterEffect';
import SpaceThemeToggle from './SpaceThemeToggle';

const AnimatedHeading = () => {
  return (
    <Box mb={6}>
      <HStack spacing={4} mb={8} align="center">
        <Heading as="h1" fontSize={{ base: "3xl", md: "4xl", lg: "4xl" }} letterSpacing="wide">
          <TypewriterEffect
            text="Aswin Manohar"
            speed={150}
            delay={1000}
            fontSize="inherit"
            fontWeight="inherit"
          />
        </Heading>
        <SpaceThemeToggle />
      </HStack>
    </Box>
  );
};

export default AnimatedHeading;
