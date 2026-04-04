import {
  Heading,
  Stack,
  VStack,
  Flex,
  Text,
  HStack,
  Box,
} from "@chakra-ui/react";
import type { NextPageWithLayout } from "next";
import Layout from "../../components/Layout";
import Link from "next/link";
import { getAllProjectData, Project } from "../../lib/projects";
import { NextSeo } from "next-seo";
import { useTheme } from "../../context/ThemeContext";
import AreciboIcon from "../../components/AreciboIcon";

interface ProjectsProps {
  projects: Project[];
}

const Projects: NextPageWithLayout<ProjectsProps> = ({ projects }) => {
  const { spaceThemeEnabled } = useTheme();

  // Group projects by category
  const groupedProjects = projects.reduce((acc, project) => {
    const category = project.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  return (
    <>
      <NextSeo title="Projects | Aswin Manohar" />
      <Flex direction="column" align="flex-start" width="100%" gap={12}>
        <HStack align="center" spacing={6}>
          <VStack align="flex-start" spacing={1}>
            {spaceThemeEnabled && (
              <Text fontFamily="'Space Mono', monospace" fontSize="10px" color="black" letterSpacing="0.2em" mb={-2}>
                BIT_0421-0840
              </Text>
            )}
            <Heading as="h1" size="3xl" fontFamily="'Doto', sans-serif" fontWeight="700">
              <Text as="span" color="nothing.accent">P</Text>rojects
            </Heading>
          </VStack>
          {spaceThemeEnabled && <AreciboIcon type="human" size={24} />}
        </HStack>

        <Stack spacing={16} width="100%">
          {Object.entries(groupedProjects).map(([category, items]) => (
            <Stack key={category} spacing={8} width="100%">
              <HStack spacing={4} align="center">
                <Box h="1px" flex={1} bg={spaceThemeEnabled ? "nothing.border.dark" : "nothing.border.light"} />
                <Text 
                  fontFamily="'Doto', sans-serif" 
                  fontSize="sm" 
                  fontWeight="700" 
                  textTransform="uppercase" 
                  letterSpacing="0.1em"
                  color="black"
                >
                  {category}
                </Text>
                <Box h="1px" flex={4} bg={spaceThemeEnabled ? "nothing.border.dark" : "nothing.border.light"} />
              </HStack>

              <Stack spacing={12} width="100%">
                {items.map((project, index) => (
                  <Box key={project.title} pb={8} borderBottom={index < items.length - 1 ? "1px solid" : "none"} borderColor={spaceThemeEnabled ? "nothing.border.dark" : "nothing.border.light"}>
                    <Link href={project.url} target={project.external ? "_blank" : "_self"}>
                      <Stack spacing={4}>
                        <Heading 
                          as="h2" 
                          fontSize="2xl" 
                          fontFamily="'Space Grotesk', sans-serif" 
                          fontWeight="600" 
                          position="relative"
                          _hover={{ color: "nothing.accent" }}
                        >
                          {project.title}
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
                              {Buffer.from(project.title).toString('hex').substring(0, 16)}...
                            </Box>
                          )}
                        </Heading>
                        <Text fontSize="md" fontFamily="'Ubuntu', sans-serif" lineHeight="1.5">
                          {project.description}
                        </Text>
                        <Text 
                          fontSize="11px" 
                          fontFamily="'Space Mono', monospace" 
                          textTransform="uppercase" 
                          letterSpacing="0.05em" 
                          color={spaceThemeEnabled ? "nothing.text.secondaryDark" : "nothing.text.secondaryLight"}
                        >
                          {project.date}
                        </Text>
                      </Stack>
                    </Link>
                  </Box>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Flex>
    </>
  );
};

export default Projects;

Projects.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
);

export async function getStaticProps() {
  const projects = getAllProjectData();
  return { props: { projects } };
}
