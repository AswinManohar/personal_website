import React from 'react';
import { IconButton, Tooltip, useColorModeValue, Box } from '@chakra-ui/react';
import { FaRocket, FaRegCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const SpaceThemeToggle = () => {
  const { spaceThemeEnabled, toggleSpaceTheme } = useTheme();
  const iconColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box display="inline-block" ml={2} cursor="pointer">
    <Tooltip label={spaceThemeEnabled ? 'Disable Space Theme' : 'Enable Space Theme'}>
      <IconButton
        aria-label="Toggle space theme"
        icon={spaceThemeEnabled ? <FaRocket /> : <FaRegCircle />}
        onClick={toggleSpaceTheme}
        variant="ghost"
        color={iconColor}
        size="lg"
        fontSize="24px"
        p={2}
      />
    </Tooltip>
    </Box>
  );
};

export default SpaceThemeToggle;
