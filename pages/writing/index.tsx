import {
  Heading,
  Link,
  Flex,
  VStack,
  Text,
  Stack,
  HStack,
  Divider,
  Tag,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { getAllPostData, Post } from "../../lib/writing";
import type { NextPageWithLayout } from "next";
import Layout from "../../components/Layout";
import { NextSeo } from "next-seo";
import { useTheme } from '../../context/ThemeContext';
import AreciboIcon from "../../components/AreciboIcon";

interface WritingProps {
  posts: Post[];
}

const Writing: NextPageWithLayout<WritingProps> = ({ posts }) => {
  const { spaceThemeEnabled } = useTheme();

  return (
    <>
      <NextSeo title="Writing | Aswin Manohar" />
      <Flex direction="column" align="flex-start" width="100%" gap={12}>
        <HStack align="center" spacing={6}>
          <VStack align="flex-start" spacing={1}>
            {spaceThemeEnabled && (
              <Text fontFamily="'Space Mono', monospace" fontSize="10px" color="black" letterSpacing="0.2em" mb={-2}>
                BIT_0001-0420
              </Text>
            )}
            <Heading as="h1" size="3xl" fontFamily="'Doto', sans-serif" fontWeight="700">
              <Text as="span" color="nothing.accent">W</Text>riting
            </Heading>
          </VStack>
          {spaceThemeEnabled && <AreciboIcon type="dna" size={24} />}
        </HStack>

        <Stack spacing={10} width="100%">
          {posts.map((post, index) => (
            <Box key={post.url} pb={8} borderBottom={index < posts.length - 1 ? "1px solid" : "none"} borderColor={spaceThemeEnabled ? "nothing.border.dark" : "nothing.border.light"}>
              <Stack spacing={3} align="flex-start">
                <Link
                  href={post.url}
                  target={post.external ? "_blank" : "_self"}
                  _hover={{ textDecoration: 'none' }}
                  role="group"
                >
                  <Heading
                    as="h2"
                    fontSize="2xl"
                    fontFamily="'Ubuntu', sans-serif"
                    fontWeight="500"
                    lineHeight="1.2"
                    textTransform="lowercase"
                    position="relative"
                    _groupHover={{ color: "nothing.accent" }}
                  >
                    {post.title}
                    {spaceThemeEnabled && (
                      <Box 
                        as="span" 
                        position="absolute" 
                        left={0} 
                        top="-18px" 
                        fontSize="9px" 
                        fontFamily="'Space Mono', monospace" 
                        opacity={0} 
                        _groupHover={{ opacity: 0.6 }} 
                        transition="all 0.2s"
                        color="#4A9E5C"
                      >
                        {Buffer.from(post.title).toString('hex').substring(0, 16)}...
                      </Box>
                    )}
                  </Heading>
                </Link>

                <HStack spacing={4} align="center">
                  <Text 
                    fontSize="11px" 
                    fontFamily="'Space Mono', monospace" 
                    textTransform="uppercase" 
                    letterSpacing="0.05em" 
                    color={spaceThemeEnabled ? "nothing.text.secondaryDark" : "nothing.text.secondaryLight"}
                  >
                    {post.date}
                  </Text>
                  
                  {post.tags && post.tags.length > 0 && (
                    <HStack spacing={2}>
                      {post.tags.map((tag) => (
                        <Tag 
                          key={tag} 
                          size="sm" 
                          variant="outline" 
                          borderColor={spaceThemeEnabled ? "nothing.border.dark" : "nothing.border.light"}
                          color={spaceThemeEnabled ? "nothing.text.secondaryDark" : "nothing.text.secondaryLight"}
                          bg="transparent"
                          borderRadius="full"
                          px={3}
                          fontSize="10px"
                          fontFamily="'Space Mono', monospace"
                          textTransform="uppercase"
                        >
                          {tag}
                        </Tag>
                      ))}
                    </HStack>
                  )}
                </HStack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Flex>
    </>
  );
};

export default Writing;

Writing.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
);

export async function getStaticProps() {
  const posts = getAllPostData();
  return { props: { posts } };
}