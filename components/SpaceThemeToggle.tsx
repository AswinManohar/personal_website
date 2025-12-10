import React from 'react';
import { IconButton, Tooltip, useColorModeValue, Box, Image } from '@chakra-ui/react';
import { FaRocket } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const SpaceThemeToggle = () => {
  const { spaceThemeEnabled, toggleSpaceTheme } = useTheme();
  const iconColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box display="inline-block" ml={2} cursor="pointer">
      <Tooltip label={spaceThemeEnabled ? 'Escape void' : 'Enter void'}>
        <IconButton
          aria-label="Toggle space theme"
          icon={
            spaceThemeEnabled ? (
              <FaRocket />
            ) : (
              <Image
                src="/HD-wallpaper-8-bit-moon-sky-space-modified.png"
                alt="Planet"
                width="24px"
                height="24px"
                objectFit="contain"
              />
            )
          }
          onClick={toggleSpaceTheme}
          variant="unstyled"
          color={iconColor}
          size="lg"
          fontSize="24px"
          p={2}
          _focus={{ boxShadow: 'none', outline: 'none' }}
          _active={{ bg: 'transparent', transform: 'none' }}
          _hover={{ bg: 'transparent' }}
          style={{ outline: 'none' }}
        />
      </Tooltip>
    </Box>
  );
};

export default SpaceThemeToggle;