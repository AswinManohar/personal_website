import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Link, HStack } from '@chakra-ui/react';
import { useTheme } from '../context/ThemeContext';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = () => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const { spaceThemeEnabled } = useTheme();

  useEffect(() => {
    const extractHeadings = () => {
      const articleHeadings = Array.from(document.querySelectorAll('h2, h3'))
        .filter(heading => heading.id)
        .map(heading => ({
          id: heading.id,
          text: (heading as HTMLElement).innerText.replace('#', '').trim(),
          level: parseInt(heading.tagName[1])
        }));
      setHeadings(articleHeadings);
    };

    // Initial extraction
    extractHeadings();

    // Observe changes in the DOM (for MDX rendering)
    const observer = new MutationObserver(extractHeadings);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return null;

  return (
    <Box 
      position="fixed" 
      left={{ base: "auto", xl: "calc(50% + 420px)" }}
      right={{ base: "20px", xl: "auto" }}
      top="150px"
      width="200px"
      display={{ base: "none", xl: "block" }}
      zIndex={10}
    >
      <VStack align="flex-start" spacing={4}>
        <HStack spacing={2} align="center">
          <Box w={1.5} h={1.5} borderRadius="full" bg="nothing.accent" />
          <Text 
            fontFamily="'Space Mono', monospace" 
            fontSize="10px" 
            fontWeight="700" 
            textTransform="uppercase" 
            letterSpacing="0.1em"
            color={spaceThemeEnabled ? "white" : "black"}
          >
            Contents
          </Text>
        </HStack>
        
        <VStack align="flex-start" spacing={2} borderLeft="1px solid" borderColor={spaceThemeEnabled ? "nothing.border.dark" : "nothing.border.light"} pl={4}>
          {headings.map((heading) => (
            <Link 
              key={heading.id} 
              href={`#${heading.id}`}
              _hover={{ textDecoration: 'none', color: "nothing.accent" }}
            >
              <Text 
                fontSize="11px" 
                fontFamily="'Space Mono', monospace"
                textTransform="lowercase"
                color={spaceThemeEnabled ? "nothing.text.secondaryDark" : "nothing.text.secondaryLight"}
                pl={heading.level === 3 ? 4 : 0}
                transition="all 0.2s"
                _hover={{ color: "nothing.accent", transform: "translateX(2px)" }}
              >
                {heading.text}
              </Text>
            </Link>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default TableOfContents;
