import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

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

export default Layout;
