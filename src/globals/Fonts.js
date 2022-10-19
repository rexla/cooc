import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: "NotoSansMonoCJKtc";
        src: url("../../public/fonts/NotoSansMonoCJKtc-Regular.otf");
      }
      /* latin */
      @font-face {
        font-family: "PingFangTC";
        src: url("../../public/fonts/PingFangTC-Regular.ttf");
      }
      `}
  />
);

export default Fonts;
