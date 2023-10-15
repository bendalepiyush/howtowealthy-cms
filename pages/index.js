import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Stack,
  Flex,
  Spacer,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
import Layout from "../src/components/layout";
import SmallArticleCard from "../src/components/sections/small-article-card";
import WideArticleCard from "../src/components/sections/wide-article-card";
import Seo from "../src/components/seo";
import Link from "next/link";
import { useState } from "react";
import hygraph from "../src/services/hygraph";
import SideBar from "../src/components/sidebar";
import { throttledFetch } from "../src/services/p-throttle";

export async function getStaticProps() {
  const resStockMarket = await throttledFetch(`
    {
      blogPosts(where: {category: {slug: "stock-market"}}, orderBy: publishedAt_DESC, first: 4) {
        slug
        title
        excerpt
        featuredImage
      }
    }
  `);

  const resInvestment = await throttledFetch(`
    {
      blogPosts(where: {category: {slug: "investment"}}, orderBy: publishedAt_DESC, first: 4) {
        slug
        title
        excerpt
        featuredImage
      }
    }
  `);

  const resPersonalFinance = await throttledFetch(`
    {
      blogPosts(where: {category: {slug: "personal-finance"}}, orderBy: publishedAt_DESC, first: 4) {
        slug
        title
        excerpt
        featuredImage
      }
    }
  `);

  const resLatestPost = await throttledFetch(`
    {
      blogPosts(orderBy: publishedAt_DESC, first: 5) {
        slug
        title
        excerpt
        featuredImage
      }
    }
  `);

  return {
    props: {
      stockMarket: resStockMarket.blogPosts,
      investment: resInvestment.blogPosts,
      personalFinance: resPersonalFinance.blogPosts,
      latest: resLatestPost.blogPosts,
    },
    revalidate: 60 * 60 * 24,
  };
}

const Home = ({ stockMarket, investment, personalFinance, latest }) => {
  const [latestPosts, setLatestPosts] = useState(latest);
  const [loading, setLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const handleLoadMore = async () => {
    setLoading(true);
    const skip = latestPosts.length;

    const temp = await hygraph.request(`
      {
        blogPosts(orderBy: publishedAt_DESC, skip: ${skip}, first: 10) {
          slug
          title
          excerpt
          featuredImage
        }
      }
    `);

    setLatestPosts(latestPosts.concat(temp.blogPosts));
    if (temp.blogPosts.length < 10) setIsLast(true);

    setLoading(false);
  };

  return (
    <Layout>
      <Seo
        title="How To Wealthy - The Ultimate Guide to Financial Freedom"
        description="Are you ready to start living the life of financial freedom? You're about to discover the secrets to becoming wealthy."
        structuredData={JSON.stringify(structuredData)}
      />
      <main>
        <Box py={20}>
          <Container maxW={"8xl"}>
            <Stack spacing={20}>
              <Box pb={10} maxW={"2xl"}>
                <Heading as={"h1"} mb={2}>
                  The Ultimate Guide to Financial Freedom
                </Heading>
                <Text fontSize={"2xl"} fontWeight={300}>
                  Are you ready to start living the life of financial freedom?
                  You&apos;re about to discover the secrets to becoming wealthy.
                </Text>
              </Box>
              <Box>
                <Flex>
                  <Heading
                    as={"h2"}
                    size={"sm"}
                    textTransform={"uppercase"}
                    fontWeight={"400"}
                  >
                    Investment
                  </Heading>
                  <Spacer />

                  <Link href={"/category/investment"}>
                    <Text color={"primary.900"}>Explore More</Text>
                  </Link>
                </Flex>

                <Box bg={"gray.100"} h={"1px"} mt={3} mb={8}>
                  <Box w={`10ch`} bg={"black.900"} h={"1px"}></Box>
                </Box>

                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  }}
                  gap={8}
                >
                  {investment.map((item, idx) => (
                    <SmallArticleCard key={idx} item={item} />
                  ))}
                </Grid>
              </Box>
              <Box>
                <Flex>
                  <Heading
                    as={"h2"}
                    size={"sm"}
                    textTransform={"uppercase"}
                    fontWeight={"400"}
                  >
                    Stock Market
                  </Heading>
                  <Spacer />

                  <Link href={"/category/stock-market"}>
                    <Text color={"primary.900"}>Explore More</Text>
                  </Link>
                </Flex>
                <Box bg={"gray.100"} h={"1px"} mt={3} mb={8}>
                  <Box w={`12ch`} bg={"black.900"} h={"1px"}></Box>
                </Box>
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(4, 1fr)",
                  }}
                  gap={8}
                >
                  {stockMarket.map((item, idx) => (
                    <SmallArticleCard key={idx} item={item} />
                  ))}
                </Grid>
              </Box>
              <Box>
                <Flex>
                  <Heading
                    as={"h2"}
                    size={"sm"}
                    textTransform={"uppercase"}
                    fontWeight={"400"}
                  >
                    Personal Finance
                  </Heading>
                  <Spacer />

                  <Link href={"/category/personal-finance"}>
                    <Text color={"primary.900"}>Explore More</Text>
                  </Link>
                </Flex>
                <Box bg={"gray.100"} h={"1px"} mt={3} mb={8}>
                  <Box w={`16ch`} bg={"black.900"} h={"1px"}></Box>
                </Box>
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(4, 1fr)",
                  }}
                  gap={8}
                >
                  {personalFinance.map((item, idx) => (
                    <SmallArticleCard key={idx} item={item} />
                  ))}
                </Grid>
              </Box>

              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "3fr 1fr",
                }}
                gap={20}
              >
                <GridItem>
                  <Heading
                    as={"h2"}
                    size={"sm"}
                    textTransform={"uppercase"}
                    fontWeight={"400"}
                  >
                    Latest Posts
                  </Heading>

                  <Box bg={"gray.100"} h={"1px"} mt={3} mb={8}>
                    <Box w={`12ch`} bg={"black.900"} h={"1px"}></Box>
                  </Box>
                  <Stack gap={8}>
                    {latestPosts.map((item, idx) => (
                      <WideArticleCard key={idx} item={item} />
                    ))}
                  </Stack>

                  {isLast ? (
                    <Flex
                      onClick={handleLoadMore}
                      bg={"gray.50"}
                      h={20}
                      align="center"
                      justify="center"
                      cursor="pointer"
                      mt={10}
                    >
                      <Text textAlign={"center"}>
                        Congratulation! You are at the end post. Subscribe for
                        upcoming content
                      </Text>
                    </Flex>
                  ) : (
                    <Flex
                      onClick={handleLoadMore}
                      bg={"gray.100"}
                      _hover={{ backgroundColor: "gray.200" }}
                      h={20}
                      align="center"
                      justify="center"
                      cursor="pointer"
                      transitionDuration="0.5s"
                      mt={10}
                    >
                      {!loading ? (
                        <Text textAlign={"center"}>Load More</Text>
                      ) : (
                        <CircularProgress isIndeterminate color="gray.300" />
                      )}
                    </Flex>
                  )}
                </GridItem>
                <GridItem>
                  <SideBar />
                </GridItem>
              </Grid>
            </Stack>
          </Container>
        </Box>
      </main>
    </Layout>
  );
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      url: "https://www.howtowealthy.com/",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://www.howtowealthy.com/search?query={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default Home;
