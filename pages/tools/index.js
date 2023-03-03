import { Container, Box, Heading, Text, Flex } from "@chakra-ui/react";
import Layout from "../../src/components/layout";
import Seo from "../../src/components/seo";
import Link from "next/link";

const Tools = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.howtowealthy.com/tools#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.howtowealthy.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tools",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Seo
        title="Tools - How to Wealthy"
        description="Explore our custom made simple and easy to use tools, for better investment decisions."
        ogImage={"https://assets.howtowealthy.com/ogimg-tools.png"}
        structuredData={JSON.stringify(structuredData)}
      />
      <Layout>
        <Container maxW={"70ch"} minH={"50vh"} py={10}>
          <Box py={{ base: 10, md: 20 }}>
            <Heading as={"h1"} mb={2}>
              Tools
            </Heading>
            <Text fontSize={"2xl"} fontWeight={300}>
              Explore our custom made simple and easy to use tools, for better
              investment decisions.
            </Text>
          </Box>

          <Flex flexDirection="column" mb={10} gap={3}>
            <Link href={"/tools/investment-calculator"}>
              <Box p={6} border={"1px solid #eaeaea"} borderRadius={6}>
                <Heading as="h3" size={"sm"} mb={1.5}>
                  Investment Calculator
                </Heading>
                <Text mb={2}>
                  Investing is one of the best ways to build wealth over time.
                  But before you invest, you should know what your prospect
                  returns are. Calculate your inflation adjusted investment
                  value with step SIP.
                </Text>
                <Text color={"primary.500"} fontWeight={"bold"}>
                  View
                </Text>
              </Box>
            </Link>
            <Link href={"/tools/loan-payoff-or-invest"}>
              <Box p={6} border={"1px solid #eaeaea"} borderRadius={6}>
                <Heading as="h3" size={"sm"} mb={1.5}>
                  Loan PayOff or Invest
                </Heading>
                <Text mb={2}>
                  Investing and paying down debt are both good uses for any
                  spare cash you might have. So this will help you make a
                  decision on whether you should invest your money or pay off
                  your ongoing loan.
                </Text>
                <Text color={"primary.500"} fontWeight={"bold"}>
                  View
                </Text>
              </Box>
            </Link>

            <Link href={"/tools/trading/position-sizing-calculator"}>
              <Box p={6} border={"1px solid #eaeaea"} borderRadius={6}>
                <Heading as="h3" size={"sm"} mb={1.5}>
                  Position Sizing
                </Heading>
                <Text mb={2}>
                  Position sizing is the number of units invested in a
                  particular security by a trader. To help you to determine
                  position sizing we have created this simple tool.
                </Text>
                <Text color={"primary.500"} fontWeight={"bold"}>
                  View
                </Text>
              </Box>
            </Link>

            <Link href={"/tools/trading/nifty-range-calculator"}>
              <Box p={6} border={"1px solid #eaeaea"} borderRadius={6}>
                <Heading as="h3" size={"sm"} mb={1.5}>
                  Nifty Range Calculator
                </Heading>
                <Text mb={2}>
                  For Nifty, this calculator calculates the possible range of
                  price within which the nifty is expected to move till the
                  expiry date that is entered, based on vix.
                </Text>
                <Text color={"primary.500"} fontWeight={"bold"}>
                  View
                </Text>
              </Box>
            </Link>

            <Link href={"/tools/trading/pivot-point-calculator"}>
              <Box p={6} border={"1px solid #eaeaea"} borderRadius={6}>
                <Heading as="h3" size={"sm"} mb={1.5}>
                  Pivot Point Calculator
                </Heading>
                <Text mb={2}>
                  Pivot Points Calculator uses a previous period’s high, low,
                  and close price for a specific period to define future support
                  and Resistance levels.
                </Text>
                <Text color={"primary.500"} fontWeight={"bold"}>
                  View
                </Text>
              </Box>
            </Link>
          </Flex>
        </Container>
      </Layout>
    </>
  );
};

export default Tools;
