import { FaArrowRight } from "react-icons/fa";
import Layout from ".";
import Seo from "../seo";
import { Flex, Box, Container, VStack, Link } from "@chakra-ui/react";

const toolsList = [
  { title: "Reverse CAGR", path: "/tools/reverse-cagr" },
  { title: "CAGR", path: "/tools/cagr" },
  { title: "Loan Payoff or Invest", path: "/tools/loan-payoff-or-invest" },
  { title: "Investment Calculator", path: "/tools/investment-calculator" },
  { title: "EMI Calculator", path: "/tools/emi" },
  { title: "Compound Interest Calculator", path: "/tools/compound-interest" },
  { title: "Fixed Deposit Calculator", path: "/tools/fixed-deposit" },
];

const tradingToolsList = [
  {
    title: "NSE Live Index Analytics",
    path: "/tools/trading/nse-live-index-analytics",
  },
  {
    title: "Pivot Point Calculator",
    path: "/tools/trading/pivot-point-calculator",
  },
  {
    title: "Nifty Range Calculator",
    path: "/tools/trading/nifty-range-calculator",
  },
  {
    title: "Position Sizing",
    path: "/tools/trading/position-sizing-calculator",
  },
];

const ToolsLayout = ({
  title,
  description,
  structuredData,
  ogImg,
  children,
  path,
}) => {
  return (
    <>
      <Seo
        title={title}
        description={description}
        structuredData={JSON.stringify(structuredData)}
        ogImage={ogImg}
      />
      <Layout>
        <Container maxW={"8xl"} py={10}>
          <Flex flexDirection={{ base: "column-reverse", md: "row" }}>
            <VStack minW={{ base: "full", md: "300px" }} spacing={0}>
              <Box
                w={"full"}
                p={5}
                backgroundColor={"#fafafa"}
                fontWeight={700}
              >
                Finance Tools
              </Box>
              {toolsList.map((item) => {
                let active = false;
                if (path === item.path) {
                  active = true;
                }
                return (
                  <Link
                    w={"full"}
                    href={item.path}
                    _hover={{ textDecoration: "none" }}
                    key={item.path}
                  >
                    <Flex
                      w={"full"}
                      p={5}
                      backgroundColor={active ? "#fff" : "#fafafa"}
                      borderLeft={active && "2px solid purple"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      {item.title}
                      {!active && <FaArrowRight size={11} color="#999" />}
                    </Flex>
                  </Link>
                );
              })}
              <Box
                w={"full"}
                p={5}
                backgroundColor={"#fafafa"}
                fontWeight={700}
              >
                Trading Tools
              </Box>
              {tradingToolsList.map((item) => {
                let active = false;
                if (path === item.path) {
                  active = true;
                }
                return (
                  <Link
                    w={"full"}
                    href={item.path}
                    _hover={{ textDecoration: "none" }}
                    key={item.path}
                  >
                    <Flex
                      w={"full"}
                      p={5}
                      backgroundColor={active ? "#fff" : "#fafafa"}
                      borderLeft={active && "2px solid purple"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      {item.title}
                      {!active && <FaArrowRight size={11} color="#999" />}
                    </Flex>
                  </Link>
                );
              })}
            </VStack>
            <Box pl={{ base: 0, md: 20 }}>{children}</Box>
          </Flex>
        </Container>
      </Layout>
    </>
  );
};

export default ToolsLayout;
