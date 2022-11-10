import {
  Container,
  Box,
  Grid,
  GridItem,
  Heading,
  Stack,
  Flex,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
import { GraphQLClient } from "graphql-request";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import randomQuote from "../../src/api/get_random_quote";
import Layout from "../../src/components/layout";
import WideArticleCard from "../../src/components/sections/wide-article-card";
import hygraph from "../../src/services/hygraph";

export const getStaticPaths = async () => {
  const { categories } = await hygraph.request(
    `
      {
        categories {
          slug
        }
      }
    `
  );

  return {
    paths: categories.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await hygraph.request(`
    {
      blogPosts(where: {category: {slug: "${params.slug}"}}, orderBy: publishedAt_DESC, first: 10) {
        slug
        title
        excerpt
        featuredImage
      }
    }
  `);

  var resCategory = await hygraph.request(`
    { 
      category(where: {slug: "${params.slug}"}) {
        slug
        title
        metaDescription
        featuredImage
      }
    }
  `);
  return {
    props: { posts: res.blogPosts, category: resCategory.category },
    revalidate: 60 * 60 * 12,
  };
};

const Category = ({ posts, category }) => {
  const [resquote, setResquote] = useState({
    quote: null,
    author: null,
  });

  const dynamicRoute = useRouter().asPath;

  const [latestPosts, setLatestPosts] = useState(posts);
  const [loading, setLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    setResquote(randomQuote());
    setLatestPosts(posts);
  }, [dynamicRoute, posts]);

  const handleLoadMore = async () => {
    setLoading(true);
    const skip = latestPosts.length;

    const temp = await hygraph.request(`
      {
        blogPosts(where: {category: {slug: "${category.slug}"}}, orderBy: publishedAt_DESC, skip: ${skip}, first: 10) {
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
      <main>
        <Box py={20}>
          <Container maxW={"8xl"}>
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
                <Stack spacing={14}>
                  <Box>
                    <Heading
                      as={"h2"}
                      size={"sm"}
                      textTransform={"uppercase"}
                      fontWeight={"400"}
                    >
                      Quote
                    </Heading>

                    <Box bg={"gray.100"} h={"1px"} mt={3} mb={8}>
                      <Box w={`12ch`} bg={"black.900"} h={"1px"}></Box>
                    </Box>

                    <Text
                      fontSize={"xl"}
                      fontWeight={300}
                      fontStyle={"italic"}
                      mb={3}
                    >
                      {resquote.quote}
                    </Text>
                    {resquote.author && (
                      <Text fontSize={"md"}>- by {resquote.author}</Text>
                    )}
                  </Box>
                </Stack>
              </GridItem>
            </Grid>
          </Container>
        </Box>
      </main>
    </Layout>
  );
};

export default Category;
