import {
  Heading,
  SimpleGrid,
  VStack,
  Image,
  Text,
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
      <SimpleGrid columns={[1, 1, 2]} spacing={8} width="100%">
        {artworks.map((artwork) => (
          <VStack key={artwork.title} align="start" spacing={3}>
            <Image
              src={artwork.image}
              alt={artwork.title}
              objectFit="contain"
              width="100%"
              height="auto"
            />
            <Text fontSize="lg" fontWeight="medium">
              {artwork.title}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Art;

Art.getLayout = (page) => page;

export async function getStaticProps() {
  const artworks = getAllArtworkData();
  return { props: { artworks } };
} 