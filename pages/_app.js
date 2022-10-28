import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    colors: {
      blue: {
        50: "#e3e9ff",
        100: "#b3beff",
        200: "#8393fc",
        300: "#5268f9",
        400: "#223df6",
        500: "#0923dd",
        600: "#031cad",
        700: "#00137d",
        800: "#000b4e",
        900: "#000320",
      },

      green: {
        50: "#e4fbed",
        100: "#c3ebd4",
        200: "#a1ddb9",
        300: "#7dcf9f",
        400: "#59c184",
        500: "#40a86b",
        600: "#308252",
        700: "#205d3a",
        800: "#103921",
        900: "#001507",
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
