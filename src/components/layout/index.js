import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [height, setHeight] = useState(0);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    setRender(true);

    setHeight(window.document.body.offsetHeight - 1000);

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header progressPercent={(scrollY * 100) / height} />

      {children}

      <Footer />
    </>
  );
};

const HtmlWidget = ({ html, script }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <div class="tradingview-widget-container">
          <div class="tradingview-widget-container__widget"></div>  
          <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async>
          {
          "symbols": [
            {
              "proName": "FOREXCOM:SPXUSD",
              "title": "S&P 500"
            },
            {
              "proName": "FOREXCOM:NSXUSD",
              "title": "US 100"
            },
            {
              "proName": "FX_IDC:EURUSD",
              "title": "EUR/USD"
            },
            {
              "proName": "BITSTAMP:BTCUSD",
              "title": "Bitcoin"
            },
            {
              "proName": "BITSTAMP:ETHUSD",
              "title": "Ethereum"
            },
            {
              "description": "NIFTY 50",
              "proName": "NSE:NIFTY"
            },
            {
              "description": "DOW",
              "proName": "DJ:DJI"
            }
          ],
          "showSymbolLogo": true,
          "colorTheme": "light",
          "isTransparent": true,
          "displayMode": "adaptive",
          "locale": "in"
        }
          </script>
        </div>`,
      }}
    />
  );
};

export default Layout;
