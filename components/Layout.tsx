import {
  Container,
  VStack,
  Stack,
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
  Spacer,
} from "@chakra-ui/react";
import { FaTwitter, FaGithub, FaFilm, FaEnvelope } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";

import SpaceThemeToggle from './SpaceThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useColorMode } from "@chakra-ui/react";

function Navigation({
  spaceEnabled,
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
      <HStack spacing={2} align="center">
        {isActive && <Box w={1.5} h={1.5} borderRadius="full" bg="nothing.accent" />}
        <Text
          fontSize="xs"
          fontWeight="700"
          textTransform="uppercase"
          letterSpacing="0.1em"
          color={spaceEnabled ? (isActive ? "white" : "nothing.text.secondaryDark") : (isActive ? "black" : "nothing.text.secondaryLight")}
          _hover={{ color: spaceEnabled ? "white" : "black" }}
          fontFamily="'Space Mono', monospace"
        >
          {children}
        </Text>
      </HStack>
    </Link>
  );
}

function Footer({ spaceEnabled }: { spaceEnabled: boolean }) {
  const iconColor = spaceEnabled ? "nothing.text.secondaryDark" : "nothing.text.secondaryLight";
  const hoverColor = spaceEnabled ? "white" : "black";
  const metaTextColor = spaceEnabled ? "nothing.text.secondaryDark" : "nothing.text.secondaryLight";
  const dataTextColor = spaceEnabled ? "white" : "black";
  
  // Calculate light years since Nov 16, 1974
  const [lightYears, setLightYears] = useState(51.42);

  useEffect(() => {
    const timer = setInterval(() => {
      const startDate = new Date('1974-11-16T00:00:00');
      const now = new Date();
      const diffInMs = now.getTime() - startDate.getTime();
      const msInYear = 31557600000; // Average year in ms
      setLightYears(diffInMs / msInYear);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box as="footer" py={16} mt={20} borderTop="1px solid" borderColor={spaceEnabled ? "nothing.border.dark" : "nothing.border.light"}>
      <Container maxW="container.md">
        <Stack spacing={12} align="center">
          <HStack justify="center" spacing={12}>
            <Link href="mailto:aswinbio@gmail.com" target="_blank">
              <Icon as={FaEnvelope} boxSize={5} color={iconColor} _hover={{ color: hoverColor }} />
            </Link>
            <Link href="https://x.com/Aswin_polymath" target="_blank">
              <Icon as={FaTwitter} boxSize={5} color={iconColor} _hover={{ color: hoverColor }} />
            </Link>
            <Link href="https://github.com/AswinManohar" target="_blank">
              <Icon as={FaGithub} boxSize={5} color={iconColor} _hover={{ color: hoverColor }} />
            </Link>
            <Link href="https://letterboxd.com/aswin_manohar/" target="_blank">
              <Icon as={FaFilm} boxSize={5} color={iconColor} _hover={{ color: hoverColor }} />
            </Link>
          </HStack>

          <VStack spacing={4} width="100%" color={metaTextColor}>
            <HStack spacing={8} justify="center" wrap="wrap">
              <VStack align="center" spacing={0}>
                <Text fontFamily="'Space Mono', monospace" fontSize="9px" letterSpacing="0.1em">SIGNAL RADIUS</Text>
                <Text fontFamily="'Space Mono', monospace" fontSize="xs" fontWeight="700" color={dataTextColor}>
                  {lightYears.toFixed(8)} LY
                </Text>
              </VStack>
              <VStack align="center" spacing={0}>
                <Text fontFamily="'Space Mono', monospace" fontSize="9px" letterSpacing="0.1em">TARGET: M13</Text>
                <Text fontFamily="'Space Mono', monospace" fontSize="xs" fontWeight="700" color={dataTextColor}>
                  16h 41m 41s | +36° 27′ 36″
                </Text>
              </VStack>
              <VStack align="center" spacing={0}>
                <Text fontFamily="'Space Mono', monospace" fontSize="9px" letterSpacing="0.1em">TRANSMISSION</Text>
                <Text fontFamily="'Space Mono', monospace" fontSize="xs" fontWeight="700" color={dataTextColor}>
                  2380 MHZ | 450 KW
                </Text>
              </VStack>
            </HStack>
            <Box w="40px" h="1px" bg="nothing.accent" />
          </VStack>

          <Text textAlign="center" mt={4} fontSize="xs" fontFamily="'Space Mono', monospace" textTransform="uppercase" letterSpacing="0.05em" color={spaceEnabled ? "nothing.text.secondaryDark" : "nothing.text.secondaryLight"}>
            © {new Date().getFullYear()} Aswin Manohar — Built for the more-than-human world
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}

function Layout({ children }: PropsWithChildren) {
  const { spaceThemeEnabled } = useTheme();
  const { setColorMode } = useColorMode();
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    setColorMode(spaceThemeEnabled ? 'dark' : 'light');
    
    // Trigger glitch effect on change
    setIsGlitching(true);
    const timer = setTimeout(() => setIsGlitching(false), 300);
    return () => clearTimeout(timer);
  }, [spaceThemeEnabled, setColorMode]);

  const textColor = spaceThemeEnabled ? "white" : "black";

  return (
    <Box 
      minH="100vh" 
      w="100%" 
      position="relative" 
      bg={spaceThemeEnabled ? "nothing.black" : "nothing.offWhite"} 
      overflowX="hidden"
    >
      
      {/* Signal Glitch Overlay */}
      {isGlitching && (
        <Box 
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={spaceThemeEnabled ? "white" : "black"}
          opacity={0.1}
          zIndex={9999}
          pointerEvents="none"
          animation="glitch-scan 0.2s steps(3) infinite"
          sx={{
            '@keyframes glitch-scan': {
              '0%': { transform: 'translateY(-100%)' },
              '100%': { transform: 'translateY(100%)' }
            }
          }}
        />
      )}

      {/* Navigation Bar */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={50}
        bg={spaceThemeEnabled ? "rgba(0, 0, 0, 0.8)" : "rgba(245, 245, 245, 0.9)"}
        backdropFilter="blur(10px)"
        borderBottom="1px solid"
        borderColor={spaceThemeEnabled ? "nothing.border.dark" : "nothing.border.light"}
      >
        <Container maxW="container.md" px={{ base: 6, md: 0 }} py={4}>
          <Flex align="center" justify="space-between">
            {/* Brand / Name */}
            <Link href="/">
              <Text
                fontSize="lg"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.05em"
                color={textColor}
                fontFamily="'Space Grotesk', sans-serif"
              >
                Aswin Manohar
              </Text>
            </Link>

            <Spacer />

            {/* Desktop Navigation */}
            <HStack spacing={6} display={{ base: "none", md: "flex" }}>
              <Navigation link="/writing" spaceEnabled={spaceThemeEnabled}>Writing</Navigation>
              <Navigation link="/thoughts" spaceEnabled={spaceThemeEnabled}>Thoughts</Navigation>
              <Navigation link="/projects" spaceEnabled={spaceThemeEnabled}>Projects</Navigation>
              <Navigation link="/art" spaceEnabled={spaceThemeEnabled}>Art</Navigation>
              <Box w="1px" h="16px" bg={spaceThemeEnabled ? "nothing.border.dark" : "nothing.border.light"} mx={2} />
              <SpaceThemeToggle />
            </HStack>

            {/* Mobile Navigation */}
            <Box display={{ base: "flex", md: "none" }} alignItems="center">
              <SpaceThemeToggle />
              <Menu placement="bottom-end">
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<Icon as={isOpen ? FiX : FiMenu} boxSize={5} />}
                      variant="ghost"
                      color={textColor}
                      ml={2}
                      _hover={{ bg: spaceThemeEnabled ? 'nothing.surface.dark' : 'white' }}
                    />
                    <MenuList 
                      bg={spaceThemeEnabled ? 'nothing.black' : 'white'} 
                      borderColor={spaceThemeEnabled ? 'nothing.border.dark' : 'nothing.border.light'}
                      borderRadius="none"
                      p={2}
                    >
                      <MenuItem as={Link} href="/writing" bg="transparent" fontFamily="'Space Mono', monospace" fontSize="xs" textTransform="uppercase" _hover={{ bg: spaceThemeEnabled ? 'nothing.surface.dark' : 'nothing.offWhite' }}>Writing</MenuItem>
                      <MenuItem as={Link} href="/thoughts" bg="transparent" fontFamily="'Space Mono', monospace" fontSize="xs" textTransform="uppercase" _hover={{ bg: spaceThemeEnabled ? 'nothing.surface.dark' : 'nothing.offWhite' }}>Thoughts</MenuItem>
                      <MenuItem as={Link} href="/projects" bg="transparent" fontFamily="'Space Mono', monospace" fontSize="xs" textTransform="uppercase" _hover={{ bg: spaceThemeEnabled ? 'nothing.surface.dark' : 'nothing.offWhite' }}>Projects</MenuItem>
                      <MenuItem as={Link} href="/art" bg="transparent" fontFamily="'Space Mono', monospace" fontSize="xs" textTransform="uppercase" _hover={{ bg: spaceThemeEnabled ? 'nothing.surface.dark' : 'nothing.offWhite' }}>Art</MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.md" pt={{ base: 32, md: 40 }} pb={20} px={{ base: 6, md: 0 }} position="relative" zIndex={1}>
        {children}
      </Container>

      {/* Footer */}
      <Footer spaceEnabled={spaceThemeEnabled} />
    </Box>
  );
}
export default Layout;
