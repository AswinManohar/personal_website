import { HStack, Text, VStack, Tag, Box } from "@chakra-ui/react";
import { useTheme } from "../context/ThemeContext";

interface AuthorInfoProps {
    date?: string;
    readTime?: string;
    tags?: string[];
}

const AuthorInfo = ({ date, readTime, tags }: AuthorInfoProps) => {
    const { spaceThemeEnabled } = useTheme();
    const metaColor = spaceThemeEnabled ? "nothing.text.secondaryDark" : "nothing.text.secondaryLight";

    return (
        <VStack spacing={3} mt={2} mb={8} align="left" width="100%">
            <HStack spacing={4} mt={0} align="center">
                {date && (
                    <HStack spacing={2} align="center">
                        <Text 
                          fontSize="11px" 
                          fontFamily="'Space Mono', monospace" 
                          textTransform="uppercase" 
                          letterSpacing="0.05em" 
                          color={metaColor} 
                          lineHeight="1"
                        >
                            {date}
                        </Text>
                    </HStack>
                )}
                {readTime && (
                    <HStack spacing={2} align="center">
                        <Box w={1} h={1} borderRadius="full" bg={spaceThemeEnabled ? "nothing.border.dark" : "nothing.border.light"} />
                        <Text 
                          fontSize="11px" 
                          fontFamily="'Space Mono', monospace" 
                          textTransform="uppercase" 
                          letterSpacing="0.05em" 
                          color={metaColor} 
                          lineHeight="1"
                        >
                            {readTime}
                        </Text>
                    </HStack>
                )}
            </HStack>
            {tags && tags.length > 0 && (
                <HStack spacing={2} mt={1}>
                    {tags.map((tag) => (
                        <Tag 
                          key={tag} 
                          size="sm" 
                          variant="outline" 
                          borderColor={spaceThemeEnabled ? "nothing.border.dark" : "nothing.border.light"}
                          color={metaColor}
                          bg="transparent"
                          borderRadius="full"
                          px={3}
                          py={1}
                          fontSize="10px"
                          fontFamily="'Space Mono', monospace"
                          textTransform="uppercase"
                          letterSpacing="0.05em"
                        >
                            {tag}
                        </Tag>
                    ))}
                </HStack>
            )}
        </VStack>
    );
};



export default AuthorInfo;