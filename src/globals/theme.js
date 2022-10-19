import DeviceSizes from "./DeviceSizes";
import Colors from "./Colors";
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const breakpoints = DeviceSizes;
const colors = Colors;
const textStyles = {
  h1: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  h2: {
    // you can also use responsive styles
    fontSize: ["36px", "48px"],
    fontWeight: "semibold",
    lineHeight: "110%",
    letterSpacing: "-1%",
  },
};
const theme = extendTheme({
  fonts: {
    html: "NotoSansMonoCJKtc, PingFangTC, sans-serif",
    body: "NotoSansMonoCJKtc, PingFangTC, sans-serif",
  },
  config,
  breakpoints,
  colors,
  textStyles,
});

export default theme;
