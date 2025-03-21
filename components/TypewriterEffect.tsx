import React, { useState, useEffect } from 'react';
import { Text, TextProps } from '@chakra-ui/react';

interface TypewriterEffectProps extends TextProps {
  text: string;
  speed?: number;
  delay?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  speed = 100,
  delay = 500,
  ...props
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, isStarted]);

  return (
    <Text
      as="span"
      display="inline-block"
      {...props}
    >
      {displayText}
      <Text
        as="span"
        animation="blink 1s step-end infinite"
        sx={{
          '@keyframes blink': {
            'from, to': { opacity: 1 },
            '50%': { opacity: 0 }
          }
        }}
      >
        |
      </Text>
    </Text>
  );
};

export default TypewriterEffect;
