import { Container, Box, Heading, Text } from "@chakra-ui/react";
import Layout from "../../src/components/layout";
import Seo from "../../src/components/seo";
import Link from "next/link";

const Tools = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.howtowealthy.com/tools/investment-calculator/#breadcrumb`,
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

          <Box mb={10}>
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
          </Box>
        </Container>
      </Layout>
    </>
  );
};

export default Tools;
