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
} from "@chakra-ui/react";
import { FaTwitter, FaGithub, FaFilm, FaEnvelope } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { animate, AnimatePresence, motion } from "framer-motion";
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
  const { spaceThemeEnabled } = useTheme();
  const { setColorMode } = useColorMode();
  const router = useRouter();

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
        <Container
          position="relative"
          maxW="container.xl"
          mt={{ base: 20, md: 20 }}
          pb={{ base: 8, md: "10em" }}
          px={{ base: 2, md: 4 }}
        >
          <Container maxW="100%" px={{ base: 4, md: 8 }} position="relative">
            {/* Mobile Navigation */}
            <Flex
              justify="space-between"
              position="fixed"
              top={0}
              display="flex"
              height={{ base: 24, md: 12 }}
              zIndex={50}
              left={0}
              width="100%"
              align="center"
              borderBottom="1px solid"
              borderBottomColor={spaceThemeEnabled ? "gray.700" : "gray.200"}
              bg={spaceThemeEnabled ? "rgba(0, 0, 0, 0.95)" : "white"}
            >
              <Container px={{ base: 4, md: 8 }} maxW="container.xl">
                <Flex justify="flex-end" width="100%">
                  <HStack spacing={{ base: 2, md: 8 }}>
                    <Box display={{ base: "none", md: "block" }}>
                      <Navigation link="/" spaceEnabled={spaceThemeEnabled}>Home</Navigation>
                    </Box>
                    <Box display={{ base: "none", md: "block" }}>
                      <Navigation link="/writing" spaceEnabled={spaceThemeEnabled}>Writing</Navigation>
                    </Box>
                    <Box display={{ base: "none", md: "block" }}>
                      <Navigation link="/ML" spaceEnabled={spaceThemeEnabled}>ML</Navigation>
                    </Box>
                    <Box display={{ base: "none", md: "block" }}>
                      <Navigation link="/art" spaceEnabled={spaceThemeEnabled}>Art</Navigation>
                    </Box>
                    <SpaceThemeToggle />
                    <Box display={{ base: "block", md: "none" }}>
                      <Menu placement="bottom">
                        {({ isOpen }) => (
                          <>
                            <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<Icon as={isOpen ? FiX : FiMenu} boxSize={4} />}
                              variant="outline"
                              color={textColor}
                              borderColor={spaceThemeEnabled ? "gray.500" : "gray.200"}
                              _hover={{
                                bg: spaceThemeEnabled ? 'gray.700' : 'gray.100'
                              }}
                              size="sm"
                              display="flex"
                            />
                            <MenuList bg={spaceThemeEnabled ? 'gray.800' : 'white'}>
                              <MenuGroup title="NAVIGATION" color={textColor}>
                                <VStack align="flex-start" px={7} spacing={3} mb={4}>
                                  <Navigation link="/" spaceEnabled={spaceThemeEnabled}>Home</Navigation>
                                  <Navigation link="/writing" spaceEnabled={spaceThemeEnabled}>Writing</Navigation>
                                  <Navigation link="/ML" spaceEnabled={spaceThemeEnabled}>ML</Navigation>
                                  <Navigation link="/art" spaceEnabled={spaceThemeEnabled}>Art</Navigation>
                                </VStack>
                              </MenuGroup>
                              <MenuGroup title="FIND ME ON" color={textColor}>
                                <VStack align="flex-start" px={4} spacing={3} mb={2}>
                                  <Navigation link="https://twitter.com/Aswin_polymath" isExternal spaceEnabled={spaceThemeEnabled}>Twitter</Navigation>
                                  <Navigation link="https://github.com/AswinManohar" isExternal spaceEnabled={spaceThemeEnabled}>
                                    GitHub
                                  </Navigation>
                                </VStack>
                              </MenuGroup>
                            </MenuList>
                          </>
                        )}
                      </Menu>
                    </Box>
                  </HStack>
                </Flex>
              </Container>
            </Flex>
            <Flex direction={{ base: "column", md: "row" }} gap={8}>
              <VStack
                align="center"
                spacing={4}
                minW={{ md: "200px" }}
                position={{ md: "sticky" }}
                top={{ md: "100px" }}
                height={{ md: "fit-content" }}
                alignSelf={{ md: "flex-start" }}
              >
                <Box
                  position="relative"
                  width="128px"
                  height="128px"
                  borderRadius="full"
                  overflow="hidden"
                  borderWidth="2px"
                  borderColor={spaceThemeEnabled ? "gray.700" : "gray.200"}
                >
                  <Image
                    src="/aswin.jpeg"
                    alt="Aswin Manohar"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </Box>
                <VStack align="center" spacing={2}>
                  <TypewriterEffect
                    text="Aswin Manohar"
                    fontWeight="normal"
                    fontSize="lg"
                    color={textColor}
                  />
                  <Text fontSize="sm" color={spaceThemeEnabled ? "gray.300" : "gray.600"} textAlign={{ base: "center", md: "center" }}>
                    Data Scientist
                  </Text>
                </VStack>
                <HStack spacing={4}>
                  <Link href="mailto:aswinbio@gmail.com" target="_blank">
                    <Icon as={FaEnvelope} boxSize={5} color={spaceThemeEnabled ? "gray.300" : "gray.500"} _hover={{ color: spaceThemeEnabled ? "white" : "black" }} />
                  </Link>
                  <Link href="https://x.com/Aswin_polymath" target="_blank">
                    <Icon as={FaTwitter} boxSize={5} color={spaceThemeEnabled ? "gray.300" : "gray.500"} _hover={{ color: spaceThemeEnabled ? "white" : "black" }} />
                  </Link>
                  <Link href="https://github.com/AswinManohar" target="_blank">
                    <Icon as={FaGithub} boxSize={5} color={spaceThemeEnabled ? "gray.300" : "gray.500"} _hover={{ color: spaceThemeEnabled ? "white" : "black" }} />
                  </Link>
                  <Link href="https://letterboxd.com/aswin_manohar/" target="_blank">
                    <Icon as={FaFilm} boxSize={5} color={spaceThemeEnabled ? "gray.300" : "gray.500"} _hover={{ color: spaceThemeEnabled ? "white" : "black" }} />
                  </Link>
                </HStack>
              </VStack>
              <Box flex={1} maxW="container.md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={router.route}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </Box>
            </Flex>
          </Container>
        </Container>
      </Container>
    </Box>
  );

}
export default Layout; 