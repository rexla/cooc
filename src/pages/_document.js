import NextDocument, { Html, Head, Main, NextScript } from "next/document";
//https://nextjs.org/docs/advanced-features/custom-document
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../globals/theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}
