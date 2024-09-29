import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#E8F5E9",
      100: "#C8E6C9",
      500: "#4CAF50",
      700: "#388E3C",
    },
  },
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Inter, sans-serif",
  },
});

export default theme;
