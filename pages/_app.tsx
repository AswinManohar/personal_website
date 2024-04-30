import type { AppProps } from "../node_modules/next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Prose, withProse } from "@nikolovlazar/chakra-ui-prose";
import Layout from "../components/Layout";
import { ReactElement } from "react";
import { DefaultSeo } from "next-seo";
import posthog from "posthog-js";
import React from "react";
import { useRouter } from "../node_modules/next/router";
import { Lora } from "@next/font/google";



const lora = Lora({ subsets: ["latin"], display: "swap" });

/* const theme = extendTheme(
  {
    fonts: {
      heading: lora.style.fontFamily,
      body: lora.style.fontFamily,
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
      heading: lora.style.fontFamily, // This property is used to set custom fonts for the application. In your snippet, both the heading and body font families are set to use lora.style.fontFamily. This suggests that the font family Lora is being applied to all heading and body text throughout the application, ensuring a consistent look.
      body: lora.style.fontFamily,
    },
  },
  withProse({
    baseStyle: {
      'h1, h2, h3, h4, h5, h6': {
        mt: 2,
        mb: 2,
        fontSize: '3xl' // Example to set font size for headings
      },
      p: {
        my: 3,
        fontSize: 'md' // Example to set font size for paragraphs
      },
      a: {
        color: "purple.500",
        fontSize: 'md' // Example to set font size for links
      },
    },
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
    <ChakraProvider theme={theme}>
      <DefaultSeo
        title="Aswin Manohar"
        description="I'm a constant learner and aspiring technical generalist. I'm also a founding enginer at thirdweb and on gap year from the University of Pennsylvania."
        openGraph={{
          title: "Aswin Manohar",
          description:
            "I'm a constant learner and aspiring technical generalist. I'm also a founding enginer at thirdweb and on gap year from the University of Pennsylvania.",
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
  );
}