import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Stack,
  AspectRatio,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Layout from "../src/components/layout";
import SmallArticleCard from "../src/components/sections/small-article-card";
import WideArticleCard from "../src/components/sections/wide-article-card";
import Seo from "../src/components/seo";
import { GraphQLClient } from "graphql-request";
import Link from "next/link";

const hygraph = new GraphQLClient(
  "https://api-us-east-1.hygraph.com/v2/cl9wyki8y09ws01uj1bhufnw5/master",
  {
    headers: {
      authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjcyMzIxMTQsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuaHlncmFwaC5jb20vdjIvY2w5d3lraTh5MDl3czAxdWoxYmh1Zm53NS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiOGY5ZTkwNzgtMjI3Ny00NTdjLTg2ZDEtMGFmNTg1NTM4ZDYyIiwianRpIjoiY2w5d3l5Y2pnMDlzdDAxdWthZW43aDZrdyJ9.ckmQkXi9MXu1CWxSzCUBxFA_wL13fBe4HkK0mL_j8v1lr7EPUuPQp51zGqrVD8fj0QYEO91BiN9Zoqi76l8Xny1weBg1xGAhRaPPersvrYkjdVudBpLwuxeqHTrxnPmYGX5MygSVvVm60Nvc4T3TwT0Prqy4ucAczL1d2l0quA1e5wCBMQf4ffexBDKprQU9j0JzdcIYNLP4JwUwx06SQ2YDQ6tMXIAxMtvE3ydzP6cbADfcSg9eUUEV7WxSbYd5iUg6Z3E0hcbYmXVJHFnYDCNBIgmRfKxBy-Ya5n2dEN2UUNOeVDjDa9Rvzpup-yNPLzlT2pzJzLw6yU8wOkp--AxU2ujdfUHciWScjUFqJzm0RtS8OcwdzfBUcRtaE2QE_P846QOZWnr2olfaKPflt9fGhLL75b7mHcPPut6Ve3tWAT0PYQYjCZhMXVYS--u3ThI_pc0BNkHPksTmohGynie_XqcWdnULsNprFS-YIbsk9w1Drtjfde-gZJTAJsWnyhz87kevy_KdA9RZRpZpDvwKkkxv2mcsJOVfycrLg1kUe6__K7vQVzI17L9E3NBWWMT0W6H-EWWyYrkaGVH4gQ3VSOR98wwTsqbrLrgn28dURAVN_pkw3aGR1ItHWvaqpL6WPYtsQOgJ_JjZNUO-w2NAQFov9NxkR9jkAqrv9os`,
    },
  }
);

export async function getStaticProps() {
  const resStockMarket = await hygraph.request(`
    {
      blogPosts(where: {category: {slug: "stock-market"}}, orderBy: publishedAt_DESC, first: 4) {
        slug
        title
        excerpt
        featuredImage
      }
    }
  `);

  const resInvestment = await hygraph.request(`
    {
      blogPosts(where: {category: {slug: "investment"}}, orderBy: publishedAt_DESC, first: 4) {
        slug
        title
        excerpt
        featuredImage
      }
    }
  `);

  const resPersonalFinance = await hygraph.request(`
    {
      blogPosts(where: {category: {slug: "personal-finance"}}, orderBy: publishedAt_DESC, first: 4) {
        slug
        title
        excerpt
        featuredImage
      }
    }
  `);

  const resLatestPost = await hygraph.request(`
    {
      blogPosts(orderBy: publishedAt_DESC, first: 10) {
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
    revalidate: 1,
  };
}

const Home = ({ stockMarket, investment, personalFinance, latest }) => {
  return (
    <Layout>
      <Seo />
      <main>
        <Box py={20}>
          <Container maxW={"8xl"}>
            <Stack spacing={20}>
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
                gap={10}
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
                    {latest.map((item, idx) => (
                      <WideArticleCard key={idx} item={item} />
                    ))}
                  </Stack>
                </GridItem>
                <GridItem>
                  <Box>
                    <Heading
                      as={"h2"}
                      size={"sm"}
                      textTransform={"uppercase"}
                      fontWeight={"400"}
                    >
                      About Us
                    </Heading>

                    <Box bg={"gray.100"} h={"1px"} mt={3} mb={8}>
                      <Box w={`12ch`} bg={"black.900"} h={"1px"}></Box>
                    </Box>
                    <AspectRatio w={"100%"} ratio={1}>
                      <Box bg={"gray.100"} w={"100%"} h={"100%"} />
                    </AspectRatio>
                  </Box>
                </GridItem>
              </Grid>
            </Stack>
          </Container>
        </Box>
      </main>
    </Layout>
  );
};

export default Home;
