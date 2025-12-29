import type { AppProps } from "../node_modules/next/app";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import { Prose, withProse } from "@nikolovlazar/chakra-ui-prose";
import Layout from "../components/Layout";
import { ReactElement } from "react";
import { DefaultSeo } from "next-seo";
import posthog from "posthog-js";
import React from "react";
import { useRouter } from "../node_modules/next/router";
import { Box } from '@chakra-ui/react';

import { ThemeProvider } from '../context/ThemeContext';
import '../styles/fonts.css';

/* const theme = extendTheme(
  {
    fonts: {
      heading: inter.style.fontFamily,
      body: inter.style.fontFamily,
    },
  },
  withProse({
    baseStyle: {
      "h1, h2, h3, h4, h5, h6": {
        mt: 4,
        mb: 4,
      },
      p: {
        my: 3,
      },
      a: {
        color: "purple.500",
      },
    },
  })
);
 */
const theme = extendTheme(
  {
    fonts: {
      heading: "'STIX Two Text', sans-serif",
      body: "'STIX Two Text', sans-serif",
    },
    styles: {
      global: (props: any) => ({
        body: {
          // Global Body Styles: Affects the entire website unless overridden
          color: props.colorMode === 'dark' ? 'rgb(153, 153, 153)' : 'black',
          fontFamily: "'STIX Two Text', sans-serif",
          fontWeight: 400,
          fontSize: '15px', // Base font size for the site
          textAlign: 'left',
          lineHeight: '1.6', // Global line height
        },
      }),
    },
  },
  withProse({
    baseStyle: (props: any) => ({
      h1: {
        // H1: Main Page Titles (e.g. "Hi, I'm Aswin")
        mt: 2,
        mb: 2,
        fontSize: '4xl',
        fontWeight: 400,
        textAlign: 'left',
        lineHeight: '1.2',
      },
      h2: {
        // H2: Major Section Headings (e.g. "Background", "Interests")
        mt: 2,
        mb: 2,
        fontSize: '2xl',
        fontWeight: 400,
        textAlign: 'left',
        lineHeight: '1.3',
      },
      h3: {
        // H3: Sub-section Headings
        mt: 2,
        mb: 2,
        fontSize: 'xl',
        fontWeight: 600,
        textAlign: 'left',
        lineHeight: '1.3',
      },
      h4: {
        mt: 2,
        mb: 2,
        fontSize: 'lg',
        fontWeight: 400,
        textAlign: 'left',
        lineHeight: '1.3',
      },
      h5: {
        mt: 2,
        mb: 2,
        fontSize: 'md',
        fontWeight: 400,
        textAlign: 'left',
        lineHeight: '1.3',
      },
      h6: {
        mt: 2,
        mb: 2,
        fontSize: 'sm',
        fontWeight: 400,
        textAlign: 'left',
        lineHeight: '1.3',
      },
      p: {
        // Paragraphs: Main body text content
        my: 2, // Spacing between paragraphs (vertical margin)
        fontSize: '15px', // Font size for body text
        color: props.colorMode === 'dark' ? 'rgb(153, 153, 153)' : 'black',
        fontWeight: 400,
        textAlign: 'left',
        lineHeight: '1.6' // Spacing between lines within a paragraph
      },
      a: {
        color: props.colorMode === 'dark' ? '#725CAD' : '#725CAD',
        fontSize: '15px',
      },
      strong: {
        color: props.colorMode === 'dark' ? 'rgb(153, 153, 153)' : 'black',
      },
      li: {
        color: props.colorMode === 'dark' ? 'rgb(153, 153, 153)' : 'black',
      },
      figcaption: {
        color: props.colorMode === 'dark' ? 'gray.300' : 'gray.600',
      },
    }),
  })
);



const getDefaultLayout = (page: ReactElement) => (
  <Layout>
    <Prose>{page}</Prose>
  </Layout>
);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const getLayout = Component.getLayout || getDefaultLayout;

  React.useEffect(() => {
    posthog.init("phc_jFlJqpi333LZJJRxwjiFTkKI2Ufv3Pgf0hnbrPuZdLL", {
      api_host: "https://app.posthog.com",
    });

    const handleRouteChange = () => posthog.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <ThemeProvider>
      <ChakraProvider theme={theme}>
        <DefaultSeo
          title="Aswin Manohar"
          description="I'm an Astrophysicist turned Data scientist – in the constant prusit for transformative ideas and technologies that will make earth a better place and I like engaging and learning them."
          openGraph={{
            title: "Aswin Manohar",
            description:
              "I'm an Astrophysicist turned Data scientist – in the constant prusit for transformative ideas and technologies that will make earth a better place and I like engaging and learning them. ",
            images: [
              {
                url: "",
                type: "",
              },
            ],
            siteName: "Aswin Manohar",
          }}
        />
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </ThemeProvider>
  );
}