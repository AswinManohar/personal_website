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
  import { PropsWithChildren } from "react";
  import { FiMenu } from "../node_modules/react-icons/fi";
  import { Image } from "@chakra-ui/react";

  function Navigation({
    link,
    children,
    isExternal,
  }: {
    link: string;
    children: string;
    isExternal?: boolean;
  }) {
    const router = useRouter();
    const isActive =
      link === "/" ? router.asPath === link : router.asPath.includes(link);
  
    return (
      <Link href={link} target={isExternal ? "_blank" : "_self"}>
        <Text
          fontSize="lg"
          color={isActive ? "black" : "gray.500"}
          _hover={{ color: "black" }}
        >
          {children}
        </Text>
      </Link>
    );
  }

  <Box boxSize='sm'>
  <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
</Box>
  

  function Layout({ children }: PropsWithChildren) {
    const DinosaurAnimation = () => (
      <Box height="120px" width="120px"> {/* Adjust the size as needed */}
      <Image src="/random.gif" alt="Running Dinosaur" />
    </Box>
     );

    return (
      <Container
        position="relative"
        mt={{ base: 16, md: 20 }}
        pb={{ base: 8, md: "10em" }}
        gap={{ md: 10 }}
      >
        <Flex
          position="absolute"
          right="100%"
          mr="160px"
          display={{ base: "none", lg: "flex" }}
        >
          <VStack position="fixed" align="flex-start" spacing={10}>
            <VStack align="flex-start">
              <Text fontWeight="bold" fontSize="smaller">
                NAVIGATION
              </Text>
              <Navigation link="/">Home</Navigation>
              <Navigation link="/writing">Writing</Navigation>
              <Navigation link="/books">Books</Navigation>
              <Navigation link="/ML">ML</Navigation>
            </VStack>
            <VStack align="flex-start">
              <Text fontWeight="bold" fontSize="smaller">
                FIND ME ON
              </Text>
              <DinosaurAnimation /> {/* Usage of the DinosaurAnimation component */}
              <Navigation link=".." isExternal>
                Twitter
              </Navigation>
              <Navigation link="https://letterboxd.com/aswin_manohar/" isExternal>
                Letterboxd
              </Navigation>
              <Navigation link="https://github.com/AswinManohar" isExternal>
                GitHub
              </Navigation>
              <Image
              src='/Arecibo_message.svg.png'
              alt='Responsive Logo'
              height={['200px', '300px']} // Adjust based on your needs
              width="auto" // Adjust width automatically based on the height
              objectFit='cover'
            />
            </VStack>
          </VStack>
        </Flex>
        <Container width={{ md: "container.md" }} position="relative">
          <Box
            width="100%"
            bg="white"
            height={20}
            position="fixed"
            top={0}
            zIndex={100}
            display={{ base: "none", lg: "block" }}
          />
          <Flex
            justify="space-between"
            position="fixed"
            top={0}
            display={{ base: "flex", lg: "none" }}
            height={12}
            zIndex={50}
            left={0}
            width="100%"
            align="center"
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            bg="white"
          >
            <Container px={8}>
              <Flex justify="space-between" width="100%">
                <HStack spacing={8}>
                <Image
                  src="/image.jpeg" // Update the path as needed
                  alt="Logo"
                  boxSize="50px" // Adjust size as needed
                  />
                  <Navigation link="/">Home</Navigation>
                  <Navigation link="/writing">Writing</Navigation>
                  <Navigation link="/books">Books</Navigation>
                  <Navigation link="/ML">ML</Navigation>
                </HStack>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<Icon as={FiMenu} boxSize={4} />}
                    variant="outline"
                    size="sm"
                  />
                  <MenuList>
                    <MenuGroup title="NAVIGATION">
                      <VStack align="flex-start" px={4} spacing={3} mb={4}>
                        <Navigation link="/">Home</Navigation>
                        <Navigation link="/writing">Writing</Navigation>
                        <Navigation link="/books">Books</Navigation>
                        <Navigation link="/ML">ML</Navigation>
                      </VStack>
                    </MenuGroup>
                    <MenuGroup title="FIND ME ON">
              
                      <VStack align="flex-start" px={4} spacing={3} mb={2}>
                      {                         <Navigation
                          link=""
                          isExternal
                        >
                          Twitter
                        </Navigation> } 
                        <Navigation link="https://github.com/AswinManohar" isExternal>
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
    );
  }
  
  export default Layout;