import Head from "next/head";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { AppProvider } from "../contexts/AppContext";
import { ChakraProvider } from "@chakra-ui/provider";
import { ColorModeProvider } from "@chakra-ui/react";
import { SWRConfig } from "swr";
//https://chakra-ui.com/guides/getting-started/nextjs-guide
//https://chakra-ui.com/docs/styled-system/recipes/using-fonts
import theme from "../globals/theme";
import Fonts from "../globals/Fonts";
// https://nextjs.org/docs/advanced-features/custom-app
// https://www.evernote.com/shard/s304/sh/c718446a-8498-b9c3-b807-357f970eafa0/1a5bc96f0d2693b0873db87a63d387aa
function MyApp({ Component, pageProps }) {
  // const getLayout = Component.getLayout || ((page) => page);
  // return getLayout(<Component {...pageProps} />);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{"臺北酷課雲"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider resetCSS={true} theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: theme.config.useSystemColorMode,
          }}
        >
          {/* <Fonts /> 508 loop*/}
          <AppProvider>
            {/* https://swr.vercel.app/docs/options */}
            <SWRConfig
              value={{
                refreshInterval: 0,
              }}
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SWRConfig>
          </AppProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
