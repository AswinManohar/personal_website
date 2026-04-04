import React, { useState, useEffect } from 'react';
import { Text, TextProps } from '@chakra-ui/react';

interface TypewriterEffectProps extends TextProps {
  text: string;
  speed?: number;
  delay?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  speed = 80,
  delay = 500,
  ...props
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  // Arecibo Reconstruction Palette
  const areciboColors = [
    "#942193", // Purple (DNA elements)
    "#5B9BF6", // Blue (Helix)
    "#D71921", // Red (Human)
    "#4A9E5C", // Green (Nucleotides)
    "#D4A843", // Yellow (Solar System)
    "#FFFFFF", // White (Numbers/Telescope)
  ];

  // Map each character to a color based on its position or specific word logic
  const getCharColor = (char: string, index: number) => {
    if (char === ' ') return 'transparent';
    
    // Logic to color specific parts:
    if (index < 2) return "#942193"; // HI
    if (index === 2) return "#FFFFFF"; // ,
    if (index > 2 && index < 7) return "#5B9BF6"; // I'M
    
    // For ASWIN, alternate between Human Red and Solar Yellow
    return index % 2 === 0 ? "#D71921" : "#D4A843"; 
  };

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.substring(0, displayText.length + 1));
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [displayText, text, speed, isStarted]);

  return (
    <Text
      as="span"
      display="inline-block"
      position="relative"
      {...props}
    >
      {displayText.split('').map((char, index) => (
        <Text
          as="span"
          key={index}
          color={getCharColor(char, index)}
          animation="print-flicker 0.1s steps(2, end)"
          sx={{
            '@keyframes print-flicker': {
              '0%': { opacity: 0.3 },
              '50%': { opacity: 0.6 },
              '100%': { opacity: 1 }
            }
          }}
        >
          {char}
        </Text>
      ))}
      <Text
        as="span"
        display="inline-block"
        w="0.6em"
        h="0.9em"
        bg="nothing.accent"
        ml={1}
        verticalAlign="middle"
        animation="blink 0.8s steps(2, start) infinite"
        sx={{
          '@keyframes blink': {
            '0%': { opacity: 1 },
            '50%': { opacity: 0 },
            '100%': { opacity: 1 }
          }
        }}
      />
    </Text>
  );
};

export default TypewriterEffect;
