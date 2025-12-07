import { HStack, Avatar, Text, VStack, Icon, Tag } from "@chakra-ui/react";
import { FaCalendar, FaClock } from "react-icons/fa";

interface AuthorInfoProps {
    date?: string;
    readTime?: string;
    tags?: string[];
}

const AuthorInfo = ({ date, readTime, tags }: AuthorInfoProps) => {
    return (
        <VStack spacing={1} mt={1} mb={4} align="left" width="100%">
            <HStack spacing={3} mt={0} align="center">
                {date && (
                    <HStack spacing={1} align="center">
                        <Icon as={FaCalendar} boxSize={3} color="gray.400" />
                        <Text fontSize="xs" color="gray.400" lineHeight="1">
                            {date}
                        </Text>
                    </HStack>
                )}
                {date && readTime && (
                    <Text fontSize="xs" color="gray.400" lineHeight="1">
                        •
                    </Text>
                )}
                {readTime && (
                    <HStack spacing={1} align="center">
                        <Icon as={FaClock} boxSize={3} color="gray.400" />
                        <Text fontSize="xs" color="gray.400" lineHeight="1">
                            {readTime}
                        </Text>
                    </HStack>
                )}
            </HStack>
            {tags && tags.length > 0 && (
                <HStack spacing={2} mt={1}>
                    {tags.map((tag) => (
                        <Tag key={tag} size="sm" variant="subtle" colorScheme="gray">
                            {tag}
                        </Tag>
                    ))}
                </HStack>
            )}
        </VStack>
    );
};



export default AuthorInfo;