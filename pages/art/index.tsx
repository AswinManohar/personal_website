import {
  Heading,
  SimpleGrid,
  Box,
  Image,
  Text,
  Stack,
} from "@chakra-ui/react";
import type { NextPageWithLayout } from "next";
import Layout from "../../components/Layout";
import { Artwork, getAllArtworkData } from "../../lib/art";
import { NextSeo } from "next-seo";

interface ArtProps {
  artworks: Artwork[];
}

const Art: NextPageWithLayout<ArtProps> = ({ artworks }) => {
  return (
    <>
      <NextSeo title="Art | Aswin Manohar" />
      <SimpleGrid columns={[1, 2, 3]} spacing={6} width="100%">
        {artworks.map((artwork) => (
          <Box key={artwork.title} position="relative">
            <Image
              src={artwork.image}
              alt={artwork.title}
              objectFit="cover"
              width="100%"
              height="300px"
              borderRadius="md"
            />
            <Stack 
              position="absolute" 
              bottom={0} 
              left={0} 
              right={0}
              p={4}
              bg="rgba(0, 0, 0, 0.7)"
              color="white"
              borderBottomRadius="md"
            >
              <Heading as="h3" size="sm">
                {artwork.title}
              </Heading>
              <Text fontSize="sm">{artwork.medium}</Text>
              <Text fontSize="xs" color="gray.300">
                {artwork.date}
              </Text>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Art;

Art.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps() {
  const artworks = getAllArtworkData();
  return { props: { artworks } };
} 