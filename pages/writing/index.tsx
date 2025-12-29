import {
  Heading,
  Link,
  Flex,
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

interface WritingProps {
  posts: Post[];
}

const Writing: NextPageWithLayout<WritingProps> = ({ posts }) => {
  const { spaceThemeEnabled } = useTheme();

  const titleColor = spaceThemeEnabled ? "white" : "gray.800";
  const dateColor = spaceThemeEnabled ? "gray.400" : "gray.600";
  const descColor = spaceThemeEnabled ? "gray.300" : "gray.700";
  const hoverColor = spaceThemeEnabled ? "blue.300" : "blue.600";
  const dividerColor = spaceThemeEnabled ? "gray.700" : "gray.200";

  return (
    <>
      <NextSeo title="Writing | Aswin Manohar" />
      <Flex direction="column" align="flex-start" width="100%" gap={8}>
        <Heading as="h1" size="3xl" mb={5} fontFamily="'Homey Feeling', sans-serif" color={titleColor}>
          Writing
        </Heading>

        <Stack spacing={8} width="100%">
          {posts.map((post, index) => (
            <Box key={post.url}>
              <Stack spacing={2} align="flex-start">
                <Link
                  href={post.url}
                  target={post.external ? "_blank" : "_self"}
                  _hover={{ textDecoration: 'none' }}
                  role="group"
                >
                  <Heading
                    as="h2"
                    size="md"
                    fontFamily="'STIX Two Text', serif"
                    fontWeight="500"
                    color={titleColor}
                    _groupHover={{ color: hoverColor }}
                  >
                    {post.title}
                  </Heading>

                  {/* Assuming 'description' or similar field exists, otherwise using a placeholder or omitting */}
                  {/* If the Post type doesn't have a description, we might need to add it or skip this. 
                      Based on the target, there is a subtitle. I'll check if 'Post' has it. 
                      If not, I'll just render the title and date for now. */}
                  {/* <Text fontSize="md" color={descColor} mt={1}>
                    {post.description}
                  </Text> */}
                </Link>

                <Text fontSize="sm" color={dateColor} fontFamily="'STIX Two Text', sans-serif">
                  {post.date}
                </Text>
              </Stack>
              {index < posts.length - 1 && (
                <Divider mt={3} borderColor={dividerColor} />
              )}
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