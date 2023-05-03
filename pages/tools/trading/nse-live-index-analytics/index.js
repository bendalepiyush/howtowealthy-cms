import { useEffect, useState } from "react";
import { nseIndexData } from "../../../../src/api/nse-index-data";
import {
  Container,
  Box,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Icon,
  Badge,
} from "@chakra-ui/react";
import Layout from "../../../../src/components/layout";
import Seo from "../../../../src/components/seo";
import Link from "next/link";
import TradingViewChartLinks from "../../../../src/utils/trading-view-chart-links";
import { FaChartLine } from "react-icons/fa";
import { getNseData } from "../../../../src/services/firebase";

const NseMarketIndexAnalytics = () => {
  const [data, setData] = useState();
  const [realTime, setRealTime] = useState(true);
  const [time, setTime] = useState(true);

  useEffect(() => {
    let interval;
    fetchData();
    if (realTime) {
      interval = setInterval(() => {
        fetchData();
      }, 3 * 60000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [realTime]);

  const fetchData = async () => {
    let tempStoredData = JSON.parse(localStorage.getItem("nse-index-data"));

    if (!tempStoredData) {
      const res = await getNseData();
      console.log(res);
      setData(res);
      localStorage.setItem("nse-index-data", JSON.stringify(res));
    } else {
      const expiryTime = new Date(tempStoredData.expires * 1000);
      const currentTime = Date.now();

      setTime(new Date(tempStoredData.expires * 1000 - 3 * 60000));

      if (currentTime > expiryTime) {
        const res = await getNseData();
        console.log(res);
        setData(res);
        localStorage.setItem("nse-index-data", JSON.stringify(res));
      } else {
        setData(tempStoredData);
      }
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        image: ["https://assets.howtowealthy.com/ogimg-tools.png"],
        author: {
          url: "https://www.howtowealthy.com/about-us",
          name: "Piyush Bendale",
          "@type": "Person",
        },
        "@context": "https://schema.org",
        headline: "Nifty Range Calculator - How to Wealthy",
        publisher: {
          name: "How to Wealthy",
          "@type": "Organization",
        },
        description:
          "For Nifty, this calculator calculates the possible range of price within which the nifty is expected to move till the expiry date that is entered, based on vix.",
        dateModified: "2022-03-02",
        datePublished: "2022-03-02",
        mainEntityOfPage: {
          "@id":
            "https://www.howtowealthy.com/tools/trading/nifty-range-calculator",
          "@type": "WebPage",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.howtowealthy.com/tools/trading/nifty-range-calculator#breadcrumb`,
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
            item: `https://www.howtowealthy.com/tools`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Nifty Range Calculator - How to Wealthy",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Seo
        title=" NSE Live Index Analytics - How to Wealthy"
        description="Explore our custom made nse live index analytics to get complete market overview while trading."
        ogImage={"https://assets.howtowealthy.com/ogimg-tools.png"}
        structuredData={JSON.stringify(structuredData)}
      />
      <Layout>
        <Container maxW={"7xl"} minH={"50vh"} py={10}>
          <Box py={{ base: 7, md: 16 }}>
            <Flex gap={2}>
              <Link href={`/tools`}>
                <Badge
                  variant="outline"
                  colorScheme="primary"
                  py={2}
                  px={5}
                  borderRadius={100}
                  mb={4}
                >
                  Tools
                </Badge>
              </Link>
              <Badge
                variant="outline"
                colorScheme="red"
                py={2}
                px={5}
                borderRadius={100}
                mb={4}
              >
                Beta
              </Badge>
            </Flex>
            <Heading as={"h1"} mb={2}>
              NSE Live Index Analytics
            </Heading>
            <Text fontSize={"2xl"} fontWeight={300}>
              Explore our custom made nse live index analytics to get complete
              market overview while trading. Subscribe to get a notification of
              next release.
            </Text>
          </Box>

          {data && (
            <>
              <Box mb={10}>
                <p>Last Updated: {time.toString()}</p>
              </Box>
              {/* <Box mb={10}>
                <p>Advances: {data.data.advances}</p>
                <p>Unchanged: {data.data.unchanged}</p>
                <p>Declines: {data.data.declines}</p>
              </Box>
              <Box my={20} h={2} backgroundColor={"red.500"}>
                <Flex w={"100%"}>
                  <Box
                    h={2}
                    w={
                      (
                        (parseInt(data.data.advances) * 100) /
                        (parseInt(data.data.advances) +
                          parseInt(data.data.unchanged) +
                          parseInt(data.data.declines))
                      ).toString() + "%"
                    }
                    backgroundColor={"green.500"}
                  />
                  <Box
                    h={2}
                    w={
                      (
                        (parseInt(data.data.unchanged) * 100) /
                        (parseInt(data.data.advances) +
                          parseInt(data.data.unchanged) +
                          parseInt(data.data.declines))
                      ).toString() + "%"
                    }
                    backgroundColor={"gray.300"}
                  />
                </Flex>
              </Box> */}

              <Box mb={20}>
                <Heading as={"h2"} mb={5} fontSize={"xl"} fontWeight={"300"}>
                  Sector Analysis
                </Heading>

                <SimpleGrid columns={{ md: 3, sm: 1 }} gap={5}>
                  {data.data.data.map((item) => {
                    if (item.key == "SECTORAL INDICES") {
                      const advances = parseInt(item.advances);
                      const unchanged = parseInt(item.unchanged);
                      const declines = parseInt(item.declines);

                      const total = advances + unchanged + declines;

                      return (
                        <Box
                          key={item.indexSymbol}
                          p={5}
                          border={"1px solid #eaeaea"}
                          borderRadius={6}
                        >
                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"start"}
                            gap={6}
                            mb={5}
                          >
                            <Flex
                              flexDirection={"column"}
                              gap={1}
                              alignItems={"start"}
                            >
                              <Heading as={"h3"} fontSize="md" fontWeight={400}>
                                {item.index}
                              </Heading>

                              {/* <a href={TradingViewChartLinks[item.index]}>
                                <Icon
                                  color={"purple.500"}
                                  w={4}
                                  h={4}
                                  as={FaChartLine}
                                />
                              </a> */}
                            </Flex>

                            <Flex flexDirection={"column"} alignItems={"end"}>
                              <Text
                                color={
                                  item.percentChange >= 0
                                    ? "green.500"
                                    : "red.500"
                                }
                                fontWeight={700}
                              >
                                {item.last}
                              </Text>
                              <Text
                                color={
                                  item.percentChange >= 0
                                    ? "green.500"
                                    : "red.500"
                                }
                                fontWeight={500}
                                fontSize={"xs"}
                              >
                                {item.percentChange}%
                              </Text>
                            </Flex>
                          </Flex>

                          <Box h={2} backgroundColor={"red.500"}>
                            <Flex w={"100%"}>
                              <Box
                                h={2}
                                w={((advances * 100) / total).toString() + "%"}
                                backgroundColor={"green.500"}
                              />
                              <Box
                                h={2}
                                w={((unchanged * 100) / total).toString() + "%"}
                                backgroundColor={"gray.300"}
                              />
                            </Flex>
                          </Box>
                          <Flex justifyContent={"space-between"}>
                            <Text fontSize={"sm"} color={"gray.700"}>
                              Advanced
                            </Text>
                            <Text fontSize={"sm"} color={"gray.700"}>
                              Declined
                            </Text>
                          </Flex>
                        </Box>
                      );
                    }
                  })}
                </SimpleGrid>
              </Box>

              <Box mb={20}>
                <Heading as={"h2"} mb={5} fontSize={"xl"} fontWeight={"300"}>
                  Borad Market Analysis
                </Heading>

                <SimpleGrid columns={{ md: 3, sm: 1 }} gap={5}>
                  {data.data.data.map((item) => {
                    if (item.key == "BROAD MARKET INDICES") {
                      const advances = parseInt(item.advances);
                      const unchanged = parseInt(item.unchanged);
                      const declines = parseInt(item.declines);

                      const total = advances + unchanged + declines;

                      return (
                        <Box
                          key={item.indexSymbol}
                          p={5}
                          border={"1px solid #eaeaea"}
                          borderRadius={6}
                        >
                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"start"}
                            gap={6}
                            mb={5}
                          >
                            <Flex
                              flexDirection={"column"}
                              gap={1}
                              alignItems={"start"}
                            >
                              <Heading as={"h3"} fontSize="md" fontWeight={400}>
                                {item.index}
                              </Heading>

                              <a href={TradingViewChartLinks[item.index]}>
                                <Icon
                                  color={"purple.500"}
                                  w={4}
                                  h={4}
                                  as={FaChartLine}
                                />
                              </a>
                            </Flex>

                            <Flex flexDirection={"column"} alignItems={"end"}>
                              <Text
                                color={
                                  item.percentChange >= 0
                                    ? "green.500"
                                    : "red.500"
                                }
                                fontWeight={700}
                              >
                                {item.last}
                              </Text>
                              <Text
                                color={
                                  item.percentChange >= 0
                                    ? "green.500"
                                    : "red.500"
                                }
                                fontWeight={500}
                                fontSize={"xs"}
                              >
                                {item.percentChange}%
                              </Text>
                            </Flex>
                          </Flex>

                          <Box h={2} backgroundColor={"red.500"}>
                            <Flex w={"100%"}>
                              <Box
                                h={2}
                                w={((advances * 100) / total).toString() + "%"}
                                backgroundColor={"green.500"}
                              />
                              <Box
                                h={2}
                                w={((unchanged * 100) / total).toString() + "%"}
                                backgroundColor={"gray.300"}
                              />
                            </Flex>
                          </Box>
                          <Flex justifyContent={"space-between"}>
                            <Text fontSize={"sm"} color={"gray.700"}>
                              Advanced
                            </Text>
                            <Text fontSize={"sm"} color={"gray.700"}>
                              Declined
                            </Text>
                          </Flex>
                        </Box>
                      );
                    }
                  })}
                </SimpleGrid>
              </Box>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
};

export default NseMarketIndexAnalytics;
