import { useState } from "react";
import {
    Heading,
    Flex,
    VStack,
    Text,
    Stack,
    HStack,
    Box,
    Divider,
    Tag,
    TagLabel,
    TagCloseButton,
} from "@chakra-ui/react";
import { getAllThoughts, Thought } from "../../lib/thoughts";
import type { NextPageWithLayout } from "next";
import Layout from "../../components/Layout";
import { NextSeo } from "next-seo";
import { useTheme } from "../../context/ThemeContext";
import AreciboIcon from "../../components/AreciboIcon";

interface ThoughtsProps {
    thoughts: Thought[];
}

const Thoughts: NextPageWithLayout<ThoughtsProps> = ({ thoughts }) => {
    const { spaceThemeEnabled } = useTheme();
    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    const filteredThoughts = selectedMood
        ? thoughts.filter((thought) => thought.mood === selectedMood)
        : thoughts;

    return (
        <>
            <NextSeo title="Thoughts | Aswin Manohar" />
      <Flex direction="column" align="flex-start" width="100%" gap={12}>
        <Flex justify="space-between" width="100%" align="center">
          <HStack align="center" spacing={6}>
            <VStack align="flex-start" spacing={1}>
              {spaceThemeEnabled && (
                <Text fontFamily="'Space Mono', monospace" fontSize="10px" color="black" letterSpacing="0.2em" mb={-2}>
                  BIT_1268-1679
                </Text>
              )}
              <Heading as="h1" size="3xl" fontFamily="'Doto', sans-serif" fontWeight="700">
                <Text as="span" color="nothing.accent">T</Text>HOUGHTS
              </Heading>
            </VStack>
            {spaceThemeEnabled && <AreciboIcon type="telescope" size={32} />}
          </HStack>
                    {selectedMood && (
                        <Tag 
                          size="md" 
                          borderRadius="full" 
                          variant="outline" 
                          borderColor="nothing.accent"
                          color="nothing.accent"
                          bg="transparent"
                          fontFamily="'Space Mono', monospace"
                          fontSize="xs"
                          px={4}
                          textTransform="uppercase"
                        >
                            <TagLabel>MOOD: {selectedMood}</TagLabel>
                            <TagCloseButton onClick={() => setSelectedMood(null)} />
                        </Tag>
                    )}
                </Flex>

                <Stack spacing={12} width="100%">
                    {filteredThoughts.map((thought, index) => (
                        <Box key={index} pb={8} borderBottom={index < filteredThoughts.length - 1 ? "1px solid" : "none"} borderColor={spaceThemeEnabled ? "nothing.border.dark" : "nothing.border.light"}>
                            <Stack spacing={4} align="flex-start">
                                <Text fontSize="xl" fontFamily="'Ubuntu', sans-serif" lineHeight="1.5">
                                    {thought.text}
                                </Text>

                                <HStack spacing={2} align="center">
                                    <Text 
                                      fontSize="11px" 
                                      fontFamily="'Space Mono', monospace" 
                                      textTransform="uppercase" 
                                      letterSpacing="0.05em"
                                      color={spaceThemeEnabled ? "nothing.text.secondaryDark" : "nothing.text.secondaryLight"}
                                    >
                                        {thought.date}
                                    </Text>
                                    <Box w={1} h={1} borderRadius="full" bg={spaceThemeEnabled ? "nothing.border.dark" : "nothing.border.light"} />
                                    <Text
                                        fontSize="11px"
                                        fontFamily="'Space Mono', monospace"
                                        textTransform="uppercase"
                                        letterSpacing="0.05em"
                                        cursor="pointer"
                                        color="nothing.accent"
                                        _hover={{ textDecoration: "underline" }}
                                        onClick={() => setSelectedMood(thought.mood)}
                                    >
                                        {thought.mood}
                                    </Text>
                                </HStack>
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            </Flex>
        </>
    );
};

export default Thoughts;

Thoughts.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps() {
    const thoughts = getAllThoughts();
    return { props: { thoughts } };
}
