import {
  Heading,
  Flex,
  Box,
  Stack,
  HStack,
  SimpleGrid,
  VStack,
  Image,
  Text,
} from "@chakra-ui/react";
import type { NextPageWithLayout } from "next";
import Layout from "../../components/Layout";
import { Artwork, getAllArtworkData } from "../../lib/art";
import { NextSeo } from "next-seo";
import { useTheme } from "../../context/ThemeContext";
import AreciboIcon from "../../components/AreciboIcon";

interface ArtProps {
  artworks: Artwork[];
}

const Art: NextPageWithLayout<ArtProps> = ({ artworks }) => {
  const { spaceThemeEnabled } = useTheme();

  return (
    <>
      <NextSeo title="Art | Aswin Manohar" />
      <Flex direction="column" align="flex-start" width="100%" gap={12}>
        <HStack align="center" spacing={6}>
          <VStack align="flex-start" spacing={1}>
            {spaceThemeEnabled && (
              <Text fontFamily="'Space Mono', monospace" fontSize="10px" color="black" letterSpacing="0.2em" mb={-2}>
                BIT_0841-1267
              </Text>
            )}
            <Heading as="h1" size="3xl" fontFamily="'Doto', sans-serif" fontWeight="700">
              <Text as="span" color="nothing.accent">A</Text>RT
            </Heading>
          </VStack>
          {spaceThemeEnabled && <AreciboIcon type="planets" size={40} />}
        </HStack>

        <SimpleGrid columns={[1, 1, 2]} spacing={12} width="100%">
          {artworks.map((artwork) => (
            <VStack key={artwork.title} align="start" spacing={4} role="group">
              <Box 
                w="100%" 
                overflow="hidden" 
                border="1px solid" 
                borderColor="nothing.border.dark"
                bg="nothing.surface.dark"
              >
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  objectFit="contain"
                  width="100%"
                  height="auto"
                  transition="transform 0.5s ease"
                  _groupHover={{ transform: "scale(1.02)" }}
                />
              </Box>
              <Stack spacing={1}>
                <Text fontSize="lg" fontWeight="600" fontFamily="'Space Grotesk', sans-serif">
                  {artwork.title}
                </Text>
                <Text 
                  fontSize="10px" 
                  fontFamily="'Space Mono', monospace" 
                  textTransform="uppercase" 
                  letterSpacing="0.05em" 
                  color={spaceThemeEnabled ? "nothing.text.secondaryDark" : "nothing.text.secondaryLight"}
                >
                  {artwork.medium || "Mixed Media"} • {artwork.date}
                </Text>
              </Stack>
            </VStack>
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default Art;

Art.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
);

export async function getStaticProps() {
  const artworks = getAllArtworkData();
  return { props: { artworks } };
} 