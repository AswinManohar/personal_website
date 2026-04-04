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
import TableOfContents from '../components/TableOfContents';

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
    config: {
      initialColorMode: 'light',
      useSystemColorMode: false,
    },
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Ubuntu', sans-serif",
      mono: "'Space Mono', monospace",
      display: "'Doto', sans-serif",
    },
    colors: {
      nothing: {
        black: "#000000",
        white: "#FFFFFF",
        offWhite: "#F5F5F5",
        surface: {
          dark: "#111111",
          light: "#FFFFFF",
        },
        text: {
          primaryDark: "#E8E8E8",
          primaryLight: "#1A1A1A",
          secondaryDark: "#999999",
          secondaryLight: "#666666",
        },
        accent: "#D71921",
        border: {
          dark: "#222222",
          light: "#E8E8E8",
        }
      }
    },
    styles: {
      global: (props: any) => ({
        body: {
          bg: props.colorMode === 'dark' ? 'nothing.black' : 'nothing.offWhite',
          color: props.colorMode === 'dark' ? 'nothing.text.primaryDark' : 'nothing.text.primaryLight',
          fontFamily: "'Ubuntu', sans-serif",
          fontWeight: 400,
          fontSize: '17px',
          textAlign: 'left',
          lineHeight: '1.6',
        },
      }),
    },
  },
  withProse({
    baseStyle: (props: any) => ({
      h1: {
        fontFamily: "'Doto', sans-serif",
        mt: 8,
        mb: 4,
        fontSize: '5xl',
        fontWeight: 700,
        textAlign: 'left',
        lineHeight: '1.1',
        color: props.colorMode === 'dark' ? 'white' : 'black',
      },
      h2: {
        fontFamily: "'Ubuntu', sans-serif",
        mt: 10,
        mb: 4,
        fontSize: '3xl',
        fontWeight: 500,
        textAlign: 'left',
        lineHeight: '1.2',
        color: props.colorMode === 'dark' ? 'white' : 'black',
      },
      h3: {
        fontFamily: "'Ubuntu', sans-serif",
        mt: 8,
        mb: 4,
        fontSize: '2xl',
        fontWeight: 500,
        textAlign: 'left',
        lineHeight: '1.3',
        color: props.colorMode === 'dark' ? 'white' : 'black',
      },
      p: {
        fontFamily: "'Ubuntu', sans-serif",
        my: 4,
        fontSize: '17px',
        color: props.colorMode === 'dark' ? 'nothing.text.primaryDark' : 'nothing.text.primaryLight',
        fontWeight: 400,
        textAlign: 'left',
        lineHeight: '1.6'
      },
      a: {
        color: 'nothing.accent',
        fontSize: '16px',
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
        _hover: {
          opacity: 0.8
        }
      },
      strong: {
        color: props.colorMode === 'dark' ? 'white' : 'black',
        fontWeight: 600,
      },
      li: {
        fontFamily: "'Ubuntu', sans-serif",
        color: props.colorMode === 'dark' ? 'nothing.text.primaryDark' : 'nothing.text.primaryLight',
        mb: 2,
      },
      code: {
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.9em',
        bg: props.colorMode === 'dark' ? 'nothing.surface.dark' : 'gray.100',
        px: 1,
        borderRadius: 'sm',
      }
    }),
  })
);



const getDefaultLayout = (page: ReactElement) => (
  <Layout>
    <TableOfContents />
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