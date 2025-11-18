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
          color: props.colorMode === 'dark' ? 'white' : 'black',
          fontFamily: "'STIX Two Text', sans-serif",
          fontWeight: 400,
          fontSize: '17px',
          textAlign: 'justify',
          lineHeight: '1.4',
        },
      }),
    },
  },
  withProse({
    baseStyle: (props: any) => ({
      'h1, h2, h3, h4, h5, h6': {
        mt: 2,
        mb: 2,
        fontSize: '3xl',
        fontWeight: 400,
        textAlign: 'left',
        lineHeight: '1.4'
      },
      p: {
        my: 3,
        fontSize: '17px',
        color: props.colorMode === 'dark' ? 'white' : 'black',
        fontWeight: 400,
        textAlign: 'justify',
        lineHeight: '1.4'
      },
      a: {
        color: props.colorMode === 'dark' ? 'purple.300' : 'purple.500',
        fontSize: '17px',
      },
      strong: {
        color: props.colorMode === 'dark' ? 'white' : 'black',
      },
      li: {
        color: props.colorMode === 'dark' ? 'white' : 'black',
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