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
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../src/components/layout";
import WideArticleCard from "../../src/components/sections/wide-article-card";
import Seo from "../../src/components/seo";
import SideBar from "../../src/components/sidebar";
import hygraph from "../../src/services/hygraph";
import truncate from "../../src/utils/truncate";
import { throttledFetch } from "../../src/services/p-throttle";

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
  const res = await throttledFetch(`
    {
      blogPosts(where: {category: {slug: "${params.slug}"}}, orderBy: publishedAt_DESC, first: 10) {
        slug
        title
        excerpt
        featuredImage
      }
    }
  `);

  var resCategory = await throttledFetch(`
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
    revalidate: 60 * 60 * 24,
  };
};

const Category = ({ posts, category }) => {
  const router = useRouter();
  const dynamicRoute = router.asPath;

  const [latestPosts, setLatestPosts] = useState(posts);
  const [loading, setLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    setLatestPosts(posts);
  }, [dynamicRoute, posts]);

  const handleLoadMore = async () => {
    setLoading(true);
    const skip = latestPosts.length;

    const temp = await throttledFetch(`
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

  if (router.isFallback) {
    return (
      <Flex align={"center"} justify={"center"} h={"100vh"} w={"100vw"}>
        <Spinner />
      </Flex>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.howtowealthy.com/${router.asPath}#breadcrumb`,
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
            name: category.title,
          },
        ],
      },
    ],
  };

  return (
    <Layout>
      <Seo
        title={`${category.title} - How To Wealthy`}
        description={
          category.metaDescription.length > 155
            ? truncate(category.metaDescription)
            : category.metaDescription
        }
        structuredData={JSON.stringify(structuredData)}
        ogImage={category.featuredImage.ogimg}
      />
      <main>
        <Box py={20}>
          <Container maxW={"8xl"}>
            <Box pb={36} maxW={"2xl"}>
              <Heading as={"h1"} mb={2}>
                {category.title}
              </Heading>
              <Text fontSize={"2xl"} fontWeight={300}>
                {category.metaDescription}
              </Text>
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
                  {latestPosts &&
                    latestPosts.map((item, idx) => (
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
          </Container>
        </Box>
      </main>
    </Layout>
  );
};

export default Category;
