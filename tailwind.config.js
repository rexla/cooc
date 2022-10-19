const tailwindColors = require("tailwindcss/colors");
const colors = require("./src/globals/Colors");
const deviceSizes = require("./src/globals/DeviceSizes");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  corePlugins: {
    preflight: false,
  },
  mode: "jit",
  darkMode: "false",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "NotoSansMonoCJKtc",
          "PingFangTC",
          ...defaultTheme.fontFamily.sans,
        ],
        noto: ["NotoSansMonoCJKtc"],
        pf: ["PingFangTC"],
      },
    },
    // https://app.zeplin.io/project/5fd2d9dcdab998555e00a4ea/screen/5fe2b48f271788571431f226
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: tailwindColors.black,
      white: tailwindColors.white,
      gray: tailwindColors.gray,
      emerald: tailwindColors.emerald,
      indigo: tailwindColors.indigo,
      yellow: tailwindColors.yellow,
      green: tailwindColors.green,
      blue: tailwindColors.blue,
      red: tailwindColors.red,
      pink: tailwindColors.pink,
      "cooc-primary": colors.coocPrimary,
      "cooc-primary-dark": colors.coocPrimaryDark,
      "cooc-sec-orange": colors.coocSecOrange,
      "cooc-sec-orange-dark": colors.coocSecOrangeDark,
      "cooc-sec-green": colors.coocSecGreen,
      "cooc-bg-light": colors.coocBgLight,
      "cooc-bg-dark": colors.coocBgDark,
      "cooc-line": colors.coocLine,
      "cooc-tab-green": colors.coocTabGreen,
      "cooc-tab-green-inactive": colors.coocTabGreenInactive,
      "cooc-tab-orange": colors.coocTabOrange,
      "cooc-text-black-primary": colors.coocTextBlackPrimary,
      "cooc-text-black-secondary": colors.coocTextBlackSeconary,
      "cooc-text-gray": colors.coocTextGray,
      "cooc-border-primary": colors.coocBorderPrimary,
      "cooc-border-secondary": colors.coocBorderSecondary,
      "cooc-warning": colors.coocWarning,
      "cooc-footer-text": colors.coocTextFooter,
    },
    screens: {
      sm: deviceSizes.sm,
      md: deviceSizes.md,
      lg: deviceSizes.lg,
      xl: deviceSizes.xl,
      "2xl": deviceSizes["2xl"],
    },
  },
  plugins: [],
};
