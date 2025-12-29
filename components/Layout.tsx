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
  Avatar,
  MenuGroup,
  useColorMode,
  Spacer,
} from "@chakra-ui/react";
import { FaTwitter, FaGithub, FaFilm, FaEnvelope } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

import SpaceBackground from './SpaceBackground';
import SpaceThemeToggle from './SpaceThemeToggle';
import TypewriterEffect from './TypewriterEffect';
import { useTheme } from '../context/ThemeContext';

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
      <Text
        fontSize={{ base: "md", md: "lg" }}
        color={spaceEnabled ? (isActive ? "white" : "gray.300") : (isActive ? "black" : "gray.500")}
        _hover={{ color: spaceEnabled ? "white" : "black" }}
        fontFamily={spaceEnabled ? "inherit" : "'STIX Two Text', sans-serif"}
      >
        {children}
      </Text>
    </Link>
  );
}

function Footer({ spaceEnabled }: { spaceEnabled: boolean }) {
  const iconColor = spaceEnabled ? "gray.300" : "gray.500";
  const hoverColor = spaceEnabled ? "white" : "black";

  return (
    <Box as="footer" py={10} mt={10} borderTop="1px solid" borderColor={spaceEnabled ? "gray.800" : "gray.100"}>
      <Container maxW="container.md">
        <HStack justify="center" spacing={8}>
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
        <Text textAlign="center" mt={4} fontSize="sm" color={spaceEnabled ? "gray.500" : "gray.400"}>
          © {new Date().getFullYear()} Aswin Manohar
        </Text>
      </Container>
    </Box>
  );
}

function Layout({ children }: PropsWithChildren) {
  const { spaceThemeEnabled } = useTheme();
  const { setColorMode } = useColorMode();
  const router = useRouter();

  useEffect(() => {
    setColorMode(spaceThemeEnabled ? 'dark' : 'light');
  }, [spaceThemeEnabled, setColorMode]);

  const textColor = spaceThemeEnabled ? "rgb(153, 153, 153)" : "black";

  return (
    <Box minH="100vh" w="100%" position="relative" bg={spaceThemeEnabled ? "transparent" : "#FAFAFA"} overflowX="hidden">
      {spaceThemeEnabled && (
        <SpaceBackground starCount={300} speed={0.03} depth={4} color="#ffffff" backgroundColor="rgba(0, 0, 0, 0.95)" />
      )}

      {/* Navigation Bar */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={50}
        bg={spaceThemeEnabled ? "rgba(0, 0, 0, 0.8)" : "rgba(250, 250, 250, 0.9)"}
        backdropFilter="blur(10px)"
      >
        <Container maxW="100%" px={{ base: 6, md: 5 }} py={3}>
          <Flex align="center" justify="space-between">
            {/* Brand / Name */}
            <Link href="/">
              <Text
                fontSize="xl"
                fontWeight="400"
                color={textColor}
                fontFamily="'STIX Two Text', serif"
              >
                Aswin Manohar
              </Text>
            </Link>

            <Spacer />

            {/* Desktop Navigation */}
            <HStack spacing={8} display={{ base: "none", md: "flex" }}>
              <Navigation link="/writing" spaceEnabled={spaceThemeEnabled}>Writing</Navigation>
              <Navigation link="/ML" spaceEnabled={spaceThemeEnabled}>ML</Navigation>
              <Navigation link="/art" spaceEnabled={spaceThemeEnabled}>Art</Navigation>
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
                      _hover={{ bg: spaceThemeEnabled ? 'gray.700' : 'gray.100' }}
                    />
                    <MenuList bg={spaceThemeEnabled ? 'gray.800' : 'white'} borderColor={spaceThemeEnabled ? 'gray.700' : 'gray.200'}>
                      <MenuItem as={Link} href="/writing" bg="transparent" _hover={{ bg: spaceThemeEnabled ? 'gray.700' : 'gray.50' }}>Writing</MenuItem>
                      <MenuItem as={Link} href="/ML" bg="transparent" _hover={{ bg: spaceThemeEnabled ? 'gray.700' : 'gray.50' }}>ML</MenuItem>
                      <MenuItem as={Link} href="/art" bg="transparent" _hover={{ bg: spaceThemeEnabled ? 'gray.700' : 'gray.50' }}>Art</MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.sm" pt={{ base: 24, md: 32 }} pb={20} px={{ base: 4, md: 0 }}>
        {children}
      </Container>

      {/* Footer */}
      <Footer spaceEnabled={spaceThemeEnabled} />
    </Box>
  );
}
export default Layout; 