import {
  Container,
  VStack,
  Text,
  Flex,
  Box,
  HStack,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Icon,
  MenuGroup,
} from "@chakra-ui/react";
import Link from "../node_modules/next/link";
import { useRouter } from "../node_modules/next/router";
import { PropsWithChildren, useEffect } from "react";
import { FiMenu } from "../node_modules/react-icons/fi";
import { Image } from "@chakra-ui/react";
import SpaceBackground from './SpaceBackground';
import SpaceThemeToggle from './SpaceThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useColorMode } from '@chakra-ui/react';

function Navigation({ spaceEnabled, 
  link,
  children,
  isExternal,
}: {
  link: string;
  children: string;
  isExternal?: boolean;
  spaceEnabled: boolean;
}) {
  const router = useRouter();
  const isActive =
    link === "/" ? router.asPath === link : router.asPath.includes(link);

  return (
    <Link href={link} target={isExternal ? "_blank" : "_self"}>
      <Text
        fontSize={{ base: "sm", md: "lg" }}
        color={spaceEnabled ? (isActive ? "white" : "gray.300") : (isActive ? "black" : "gray.500")}
        _hover={{ color: spaceEnabled ? "white" : "black" }}
      >
        {children}
      </Text>
    </Link>
  );
}

function Layout({ children }: PropsWithChildren) {
  const DinosaurAnimation = () => (
    <Box height="120px" width="120px"> {/* Adjust the size as needed */}
      <Image src="/random.gif" alt="Running Dinosaur" />
    </Box>
  );

  const { spaceThemeEnabled } = useTheme();
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode(spaceThemeEnabled ? 'dark' : 'light');
  }, [spaceThemeEnabled, setColorMode]);

  const textColor = spaceThemeEnabled ? "white" : "black";

  return (
    <Box minH="100vh" w="100%" position="relative" bg={spaceThemeEnabled ? "transparent" : "white"} overflowX="hidden">
      {spaceThemeEnabled && (
        <SpaceBackground starCount={300} speed={0.03} depth={4} color="#ffffff" backgroundColor="rgba(0, 0, 0, 0.95)" />
      )}
      <Container maxW="container.xl" pt={{ base: 6, md: 10 }}>
        {/* Removed ColorModeSwitcher and its container */}
        <Container
          position="relative"
          mt={{ base: 12, md: 20 }}
          pb={{ base: 8, md: "10em" }}
          px={{ base: 2, md: 4 }}
          gap={{ md: 10 }}
        >
          {/* Desktop sidebar navigation */}
          <Flex
            position="absolute"
            right="100%"
            mr="240px"
            mt="20px"
            display={{ base: "none", lg: "flex" }}
          >
            <VStack 
              position="fixed" 
              align="flex-start" 
              spacing={16} 
              maxH="calc(100vh - 40px)" 
              overflowY="auto"
              sx={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                'scrollbarWidth': 'none',
                '-ms-overflow-style': 'none',
              }}
            >
              <VStack align="flex-start" spacing={6}>
                <Text fontWeight="bold" fontSize="smaller" color={textColor}>
                  NAVIGATION
                </Text>
                <Navigation link="/" spaceEnabled={spaceThemeEnabled}>Home</Navigation>
                <Navigation link="/writing" spaceEnabled={spaceThemeEnabled}>Thoughts and Feelings</Navigation>
                <Navigation link="/books" spaceEnabled={spaceThemeEnabled}>Books</Navigation>
                <Navigation link="/ML" spaceEnabled={spaceThemeEnabled}>ML</Navigation>
              </VStack>
              <VStack align="flex-start" spacing={6}>
                <Text fontWeight="bold" fontSize="smaller" color={textColor}>
                  FIND ME ON
                </Text>
                <DinosaurAnimation /> {/* Usage of the DinosaurAnimation component */}
                <Navigation link=".." isExternal spaceEnabled={spaceThemeEnabled}>
                  Twitter
                </Navigation>
                <Navigation link="https://letterboxd.com/aswin_manohar/" isExternal spaceEnabled={spaceThemeEnabled}>
                  Letterboxd
                </Navigation>
                <Navigation link="https://github.com/AswinManohar" isExternal spaceEnabled={spaceThemeEnabled}>
                  GitHub
                </Navigation>
                <Image
                  src='/Arecibo_message.svg.png'
                  alt='Responsive Logo'
                  height={['200px', '300px']}
                  width="auto"
                  objectFit='cover'
                />
              </VStack>
            </VStack>
          </Flex>
          <Container width={{ base: "100%", md: "container.md" }} px={{ base: 4, md: 8 }} position="relative">
            {/* Mobile Navigation */}
            <Flex
              justify="space-between"
              position="fixed"
              top={0}
              display={{ base: "flex", lg: "none" }}
              height={{ base: 16, md: 12 }}
              zIndex={50}
              left={0}
              width="100%"
              align="center"
              borderBottom="1px solid"
              borderBottomColor={spaceThemeEnabled ? "gray.700" : "gray.200"}
              bg={spaceThemeEnabled ? "rgba(0, 0, 0, 0.95)" : "white"}
            >
              <Container px={{ base: 4, md: 8 }}>
                <Flex justify="space-between" width="100%">
                  <HStack spacing={{ base: 2, md: 8 }}>
                    <Image
                      src="/image.jpeg"
                      alt="Logo"
                      boxSize={{ base: "40px", md: "50px" }}
                    />
                    <Box display={{ base: "none", md: "block" }}>
                      <Navigation link="/" spaceEnabled={spaceThemeEnabled}>Home</Navigation>
                    </Box>
                    <Box display={{ base: "none", md: "block" }}>
                      <Navigation link="/writing" spaceEnabled={spaceThemeEnabled}>Thoughts and Feelings</Navigation>
                    </Box>
                    <Box display={{ base: "none", md: "block" }}>
                      <Navigation link="/books" spaceEnabled={spaceThemeEnabled}>Books</Navigation>
                    </Box>
                    <Box display={{ base: "none", md: "block" }}>
                      <Navigation link="/ML" spaceEnabled={spaceThemeEnabled}>ML</Navigation>
                    </Box>
                  </HStack>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<Icon as={FiMenu} boxSize={4} />}
                      variant="outline"
                      color={textColor}
                      borderColor={spaceThemeEnabled ? "gray.500" : "gray.200"}
                      _hover={{
                        bg: spaceThemeEnabled ? 'gray.700' : 'gray.100'
                      }}
                      size="sm"
                      display={{ base: "flex", md: "flex" }}
                    />
                    <MenuList bg={spaceThemeEnabled ? 'gray.800' : 'white'}>
                      <MenuGroup title="NAVIGATION" color={textColor}>
                        <VStack align="flex-start" px={4} spacing={3} mb={4}>
                          <Navigation link="/" spaceEnabled={spaceThemeEnabled}>Home</Navigation>
                          <Navigation link="/writing" spaceEnabled={spaceThemeEnabled}>Thoughts and Feelings</Navigation>
                          <Navigation link="/books" spaceEnabled={spaceThemeEnabled}>Books</Navigation>
                          <Navigation link="/ML" spaceEnabled={spaceThemeEnabled}>ML</Navigation>
                        </VStack>
                      </MenuGroup>
                      <MenuGroup title="FIND ME ON" color={textColor}>
                        <VStack align="flex-start" px={4} spacing={3} mb={2}>
                          <Navigation link="" isExternal spaceEnabled={spaceThemeEnabled}>Twitter</Navigation>
                          <Navigation link="https://github.com/AswinManohar" isExternal spaceEnabled={spaceThemeEnabled}>
                            GitHub
                          </Navigation>
                        </VStack>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                </Flex>
              </Container>
            </Flex>
            {children}
          </Container>
        </Container>
      </Container>
    </Box>
  );
}

export default Layout;