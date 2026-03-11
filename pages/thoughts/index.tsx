import { useState } from "react";
import {
    Heading,
    Flex,
    Text,
    Stack,
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

interface ThoughtsProps {
    thoughts: Thought[];
}

const Thoughts: NextPageWithLayout<ThoughtsProps> = ({ thoughts }) => {
    const { spaceThemeEnabled } = useTheme();
    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    const titleColor = spaceThemeEnabled ? "white" : "gray.800";
    const textColor = spaceThemeEnabled ? "gray.300" : "gray.700";
    const metaColor = spaceThemeEnabled ? "gray.400" : "gray.500";
    const dividerColor = spaceThemeEnabled ? "gray.700" : "gray.200";

    const filteredThoughts = selectedMood
        ? thoughts.filter((thought) => thought.mood === selectedMood)
        : thoughts;

    return (
        <>
            <NextSeo title="Thoughts | Aswin Manohar" />
            <Flex direction="column" align="flex-start" width="100%" gap={8}>
                <Flex justify="space-between" width="100%" align="center" mb={5}>
                    <Heading as="h1" size="3xl" fontFamily="'Homey Feeling', sans-serif" color={titleColor}>
                        Thoughts
                    </Heading>
                    {selectedMood && (
                        <Tag size="md" borderRadius="full" variant="subtle" colorScheme="purple">
                            <TagLabel>Mood: {selectedMood}</TagLabel>
                            <TagCloseButton onClick={() => setSelectedMood(null)} />
                        </Tag>
                    )}
                </Flex>

                <Stack spacing={8} width="100%">
                    {filteredThoughts.map((thought, index) => (
                        <Box key={index}>
                            <Stack spacing={3} align="flex-start">
                                <Text fontSize="lg" color={textColor} fontFamily="'STIX Two Text', serif" lineHeight="1.6">
                                    {thought.text}
                                </Text>

                                <Text fontSize="sm" color={metaColor} fontFamily="'STIX Two Text', sans-serif" fontStyle="italic">
                                    - {thought.date} •{" "}
                                    <Text
                                        as="span"
                                        cursor="pointer"
                                        _hover={{ textDecoration: "underline", color: spaceThemeEnabled ? "purple.300" : "purple.600" }}
                                        onClick={() => setSelectedMood(thought.mood)}
                                        transition="color 0.2s"
                                    >
                                        {thought.mood}
                                    </Text>
                                </Text>
                            </Stack>
                            {index < filteredThoughts.length - 1 && (
                                <Divider mt={6} borderColor={dividerColor} />
                            )}
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
