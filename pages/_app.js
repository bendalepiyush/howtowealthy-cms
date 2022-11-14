import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import * as gtag from "../src/utils/gtag";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const theme = extendTheme({
    colors: {
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

      primary: {
        50: "#f5e3fd",
        100: "#e6b9fb",
        200: "#d58af8",
        300: "#c45bf5",
        400: "#b737f2",
        500: "#aa14f0",
        600: "#a312ee",
        700: "#990eec",
        800: "#900be9",
        900: "#7f06e5",
      },

      black: {
        50: "#f2f2f2",
        100: "#000000",
        200: "#000000",
        300: "#000000",
        400: "#000000",
        500: "#000000",
        600: "#000000",
        700: "#000000",
        800: "#000000",
        900: "#000000",
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtag.GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
