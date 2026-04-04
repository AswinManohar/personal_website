import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';

type AreciboIconType = 'dna' | 'human' | 'planets' | 'telescope';

interface AreciboIconProps {
  type: AreciboIconType;
  size?: number;
  color?: string;
}

const AreciboIcon = ({ type, size = 40, color }: AreciboIconProps) => {
  // Simplified bit patterns for the iconic Arecibo symbols
  // 1 = active bit, 0 = empty
  const patterns: Record<AreciboIconType, { grid: number[][], defaultColor: string }> = {
    dna: {
      defaultColor: "#5B9BF6", // Arecibo Blue/Cyan
      grid: [
        [1,0,1],
        [0,1,0],
        [1,0,1],
        [1,0,1],
        [0,1,0],
        [1,0,1],
        [1,0,1],
        [0,1,0],
        [1,0,1],
      ]
    },
    human: {
      defaultColor: "#D71921", // Arecibo Red
      grid: [
        [0,1,0],
        [1,1,1],
        [0,1,0],
        [0,1,0],
        [1,1,1],
        [1,0,1],
        [1,0,1],
      ]
    },
    planets: {
      defaultColor: "#D4A843", // Arecibo Yellow
      grid: [
        [1,0,0,0,0,0,0,0,0],
        [0,1,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,0,0,0], // Earth (raised)
        [0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0],
      ]
    },
    telescope: {
      defaultColor: "#FFFFFF", // White/Cyan
      grid: [
        [0,0,1,1,1,0,0],
        [0,1,0,0,0,1,0],
        [1,0,0,0,0,0,1],
        [1,1,1,1,1,1,1],
        [0,0,0,1,0,0,0],
        [0,0,1,1,1,0,0],
      ]
    }
  };

  const { grid, defaultColor } = patterns[type];
  const columns = grid[0].length;

  return (
    <Box width={`${size}px`} height="auto" display="inline-block">
      <SimpleGrid columns={columns} spacing="1px">
        {grid.flat().map((bit, i) => (
          <Box 
            key={i} 
            bg={bit === 1 ? (color || defaultColor) : "transparent"} 
            aspectRatio="1/1"
            opacity={bit === 1 ? 1 : 0}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AreciboIcon;
