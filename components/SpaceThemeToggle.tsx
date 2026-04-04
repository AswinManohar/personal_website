import React from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';
import { useTheme } from '../context/ThemeContext';

const SpaceThemeToggle = () => {
  const { spaceThemeEnabled, toggleSpaceTheme } = useTheme();

  return (
    <Box 
      onClick={toggleSpaceTheme}
      cursor="pointer"
      userSelect="none"
      px={3}
      py={1}
      border="1px solid"
      borderColor={spaceThemeEnabled ? "nothing.border.dark" : "nothing.border.light"}
      borderRadius="none"
      bg="transparent"
      _hover={{ borderColor: spaceThemeEnabled ? "white" : "black" }}
      transition="all 0.2s"
    >
      <HStack spacing={3} align="center">
        <Box 
          w={2} 
          h={2} 
          borderRadius="full" 
          bg={spaceThemeEnabled ? "nothing.accent" : "gray.300"}
          boxShadow={spaceThemeEnabled ? "0 0 8px #D71921" : "none"}
        />
        <Text 
          fontSize="10px" 
          fontFamily="'Space Mono', monospace" 
          fontWeight="700"
          textTransform="uppercase"
          letterSpacing="0.1em"
          color={spaceThemeEnabled ? "white" : "black"}
        >
          {spaceThemeEnabled ? "SIGNAL: BROADCAST" : "SIGNAL: STBY"}
        </Text>
      </HStack>
    </Box>
  );
};

export default SpaceThemeToggle;