/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Container,
  Flex,
  Text,
  Spacer,
  Stack,
  Grid,
  Heading,
  GridItem,
  Badge,
  Divider,
  Icon,
  OrderedList,
  ListItem,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { FiBookmark, FiHeart, FiShare2 } from "react-icons/fi";
import Layout from "../src/components/layout";
import SmallArticleCard from "../src/components/sections/small-article-card";
import { GraphQLClient } from "graphql-request";
import formateDateMMMddyyyy from "../src/utils/date_format";

const hygraph = new GraphQLClient(
  "https://api-us-east-1.hygraph.com/v2/cl9wyki8y09ws01uj1bhufnw5/master",
  {
    headers: {
      authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjcyMzIxMTQsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuaHlncmFwaC5jb20vdjIvY2w5d3lraTh5MDl3czAxdWoxYmh1Zm53NS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiOGY5ZTkwNzgtMjI3Ny00NTdjLTg2ZDEtMGFmNTg1NTM4ZDYyIiwianRpIjoiY2w5d3l5Y2pnMDlzdDAxdWthZW43aDZrdyJ9.ckmQkXi9MXu1CWxSzCUBxFA_wL13fBe4HkK0mL_j8v1lr7EPUuPQp51zGqrVD8fj0QYEO91BiN9Zoqi76l8Xny1weBg1xGAhRaPPersvrYkjdVudBpLwuxeqHTrxnPmYGX5MygSVvVm60Nvc4T3TwT0Prqy4ucAczL1d2l0quA1e5wCBMQf4ffexBDKprQU9j0JzdcIYNLP4JwUwx06SQ2YDQ6tMXIAxMtvE3ydzP6cbADfcSg9eUUEV7WxSbYd5iUg6Z3E0hcbYmXVJHFnYDCNBIgmRfKxBy-Ya5n2dEN2UUNOeVDjDa9Rvzpup-yNPLzlT2pzJzLw6yU8wOkp--AxU2ujdfUHciWScjUFqJzm0RtS8OcwdzfBUcRtaE2QE_P846QOZWnr2olfaKPflt9fGhLL75b7mHcPPut6Ve3tWAT0PYQYjCZhMXVYS--u3ThI_pc0BNkHPksTmohGynie_XqcWdnULsNprFS-YIbsk9w1Drtjfde-gZJTAJsWnyhz87kevy_KdA9RZRpZpDvwKkkxv2mcsJOVfycrLg1kUe6__K7vQVzI17L9E3NBWWMT0W6H-EWWyYrkaGVH4gQ3VSOR98wwTsqbrLrgn28dURAVN_pkw3aGR1ItHWvaqpL6WPYtsQOgJ_JjZNUO-w2NAQFov9NxkR9jkAqrv9os`,
    },
  }
);

export const getStaticPaths = async () => {
  const { blogPosts } = await hygraph.request(
    `
      {
        blogPosts {
          slug
        }
      }
    `
  );

  return {
    paths: blogPosts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { blogPosts } = await hygraph.request(`
    {
      blogPosts(where: {slug: "${params.slug}"}) {
        slug
        title
        publishedAt
        id
        featuredImage
        excerpt
        tableOfContent
        metaDescription
        metaStructuredData
        category {
          slug
          title
        }
        content
      }
    }
  `);

  if (!blogPosts.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  console.log(blogPosts[0].category.slug);

  const res = await hygraph.request(`
    {
      blogPosts(where: {category: {slug: "${blogPosts[0].category.slug}"}, AND: {slug_not: "${blogPosts[0].slug}"}}, orderBy: publishedAt_DESC, last: 3) {
        slug
        title
        excerpt
      }
    }
  `);

  return {
    props: { post: blogPosts[0], relatedPosts: res.blogPosts },
    revalidate: 60 * 60 * 12,
  };
};

const SinglePost = ({ post, relatedPosts }) => {
  const {
    title,
    excerpt,
    publishedAt,
    tableOfContent,
    metaDescription,
    metaStructuredData,
    content,
    category,
  } = post;

  return (
    <Layout>
      <main>
        <Container maxW={"70ch"} pt={10}>
          <Badge
            variant="outline"
            colorScheme="primary"
            py={2}
            px={5}
            borderRadius={100}
            mb={4}
          >
            {category.title}
          </Badge>
          <Heading as={"h1"} size={"2xl"} mb={4} fontWeight={500}>
            {title}
          </Heading>
          <Heading as={"h2"} size={"lg"} fontWeight={"200"}>
            {excerpt}
          </Heading>
          <Divider my={6} />
          <Flex align={"center"}>
            <Text as={"pre"}>{formateDateMMMddyyyy(publishedAt)}</Text>

            <Spacer />

            <Stack direction={"row"} spacing={6}>
              <Icon
                as={FiShare2}
                w={6}
                h={6}
                color={"gray.400"}
                _hover={{ color: "blue.700", transitionDuration: "0.5s" }}
              />
            </Stack>
          </Flex>
          <Divider my={6} />

          <Box lineHeight={1.7}>
            <Text as={"b"} mb={2} display="block">
              Table of content:
            </Text>
            <OrderedList>
              {tableOfContent.map((item, idx) => (
                <ListItem key={idx} fontSize={"xl"}>
                  {item}
                </ListItem>
              ))}
            </OrderedList>
          </Box>
        </Container>

        <Container maxW={"6xl"} py={10}>
          <img src="https://wallpaperaccess.com/full/1393728.jpg" />
        </Container>

        <Box pb={20}>
          <Container maxW={"70ch"} fontSize={"18px"} lineHeight={1.7}>
            <div
              className={"post-content"}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <Divider my={6} />
            <Flex align={"center"}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink href="/stock-market/">
                    Stock Market
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">
                    What Is a Stock Market ..
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Spacer />

              <Stack direction={"row"} spacing={6}>
                <Icon
                  as={FiShare2}
                  w={6}
                  h={6}
                  color={"gray.400"}
                  _hover={{ color: "blue.700", transitionDuration: "0.5s" }}
                />
              </Stack>
            </Flex>
            <Divider my={6} />
          </Container>
        </Box>
      </main>
      <Box bg={"gray.50"}>
        <Container maxW={"8xl"} py={20}>
          <Heading as={"h2"} size={"md"} fontWeight={"600"} mb={12}>
            Related Articles
          </Heading>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            gap={8}
          >
            {relatedPosts.map((item, idx) => (
              <SmallArticleCard key={idx} item={item} />
            ))}
          </Grid>
        </Container>
      </Box>
      <Container maxW={"7xl"}>
        <Divider />
      </Container>
    </Layout>
  );
};

export default SinglePost;
