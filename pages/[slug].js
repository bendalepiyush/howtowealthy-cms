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
  AspectRatio,
  Badge,
  Divider,
  Icon,
  OrderedList,
  ListItem,
  useBoolean,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiShare2 } from "react-icons/fi";
import { FaRegBookmark, FaBookmark, FaHeart, FaRegHeart } from "react-icons/fa";
import Layout from "../src/components/layout";
import SmallArticleCard from "../src/components/sections/small-article-card";
import formateDateMMMddyyyy from "../src/utils/date_format";
import Seo from "../src/components/seo";
import {
  auth,
  bookmarkOrFavURL,
  isBookmarkedOrFavURL,
  removeBookmarkOrFavURL,
} from "../src/services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import Link from "next/link";
import hygraph from "../src/services/hygraph";

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
        destination: "/404",
        permanent: false,
      },
    };
  } else {
    const res = await hygraph.request(`
    {
      blogPosts(where: {category: {slug: "${blogPosts[0].category.slug}"}, AND: {slug_not: "${blogPosts[0].slug}"}}, orderBy: publishedAt_DESC, last: 4) {
        slug
        title
        excerpt
        featuredImage
      }
    }
  `);

    return {
      props: { post: blogPosts[0], relatedPosts: res.blogPosts },
      revalidate: 60 * 60 * 24 * 7,
    };
  }
};

const SinglePost = ({ post, relatedPosts }) => {
  const toast = useToast();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [isBookmarked, setIsBookmarked] = useBoolean(false);
  const [isFavourite, setIsFavourite] = useBoolean(false);

  useEffect(() => {
    if (user) {
      isBookmarkedOrFavURL(user.uid, router.asPath, "bookmark").then((res) => {
        if (res) {
          setIsBookmarked.on();
        }
      });

      isBookmarkedOrFavURL(user.uid, router.asPath, "favourite").then((res) => {
        if (res) {
          setIsFavourite.on();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <Flex align={"center"} justify={"center"} h={"100vh"} w={"100vw"}>
        <Spinner />
      </Flex>
    );
  }

  // Render post...
  const title = post.title || "";
  const excerpt = post.excerpt || "";
  const publishedAt = post.publishedAt || "";
  const tableOfContent = post.tableOfContent || [];
  const metaDescription = post.metaDescription || "";
  const metaStructuredData = post.metaStructuredData || {};
  const content = post.content || <div></div>;
  const category = post.category || {
    title: "",
  };
  const featuredImage = post.featuredImage || {
    ogimg: "",
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      metaStructuredData,
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.howtowealthy.com/${router.asPath}/#breadcrumb`,
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
            item: `https://www.howtowealthy.com/category/${category.slug}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
          },
        ],
      },
    ],
  };

  const handleBookmark = async () => {
    if (user) {
      if (isBookmarked) {
        removeBookmarkOrFavURL(user.uid, router.asPath, "bookmark").then(
          (res) => {
            toast({
              title: "Bookmark Removed!",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            setIsBookmarked.off();
          }
        );
      } else {
        bookmarkOrFavURL(user.uid, router.asPath, title, "bookmark")
          .then((res) => {
            toast({
              title: "Bookmark Added!",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            setIsBookmarked.on();
          })
          .catch((e) => {});
      }
    } else {
      router.push("/auth/login");
    }
  };

  const handleFavourite = async () => {
    if (user) {
      if (isFavourite) {
        removeBookmarkOrFavURL(user.uid, router.asPath, "favourite").then(
          (res) => {
            toast({
              title: "Removed from favourites!",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            setIsFavourite.off();
          }
        );
      } else {
        bookmarkOrFavURL(user.uid, router.asPath, title, "favourite")
          .then((res) => {
            toast({
              title: "Added to favourites!",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            setIsFavourite.on();
          })
          .catch((e) => {});
      }
    } else {
      router.push("/auth/login");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied to clipboard!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Layout>
      <Seo
        title={title}
        description={metaDescription}
        structuredData={JSON.stringify(structuredData)}
        ogImage={featuredImage.ogimg}
      />
      <main>
        <Container maxW={"70ch"} pt={10}>
          <Link href={`/category/${category.slug}`}>
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
          </Link>
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

            <Stack direction={"row"} spacing={8}>
              <Box onClick={handleFavourite}>
                <Icon
                  as={isFavourite ? FaHeart : FaRegHeart}
                  w={6}
                  h={6}
                  color={isFavourite ? "red" : "gray.400"}
                  _hover={{ color: "red.500", transitionDuration: "0.3s" }}
                />
              </Box>
              <Box onClick={handleBookmark}>
                <Icon
                  as={isBookmarked ? FaBookmark : FaRegBookmark}
                  w={6}
                  h={6}
                  color={isBookmarked ? "gray.800" : "gray.400"}
                  _hover={{ color: "gray.900", transitionDuration: "0.3s" }}
                />
              </Box>
              <Box onClick={handleShare}>
                <Icon
                  as={FiShare2}
                  w={6}
                  h={6}
                  color={"gray.400"}
                  _hover={{ color: "blue.700", transitionDuration: "0.5s" }}
                />
              </Box>
            </Stack>
          </Flex>
          <Divider my={6} />

          <Box lineHeight={1.7}>
            <Text as={"b"} fontSize={"lg"} mb={2} display="block">
              Table of content:
            </Text>
            <OrderedList className="table-content">
              {tableOfContent.map((item, idx) => (
                <ListItem fontSize={"xl"} key={idx}>
                  <a href={`#${idx + 1}`}>{item}</a>
                </ListItem>
              ))}
            </OrderedList>
          </Box>
        </Container>

        <Container maxW={"6xl"} py={10}>
          <AspectRatio w={"100%"} zIndex={0} ratio={1200 / 630}>
            <picture style={{ objectFit: "cover" }}>
              <source
                srcSet={featuredImage?.ogimg + "?webp"}
                type="image/webp"
              />
              <img
                src={featuredImage?.ogimg}
                alt={title + " - Featured Image"}
              />
            </picture>
          </AspectRatio>
        </Container>

        <Box pb={20}>
          <Container maxW={"70ch"} fontSize={"18px"} lineHeight={1.7}>
            <div
              className={"post-content"}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <Divider my={6} />
            <Flex align={"center"}>
              <Text as={"pre"}>{formateDateMMMddyyyy(publishedAt)}</Text>
              <Spacer />

              <Stack direction={"row"} spacing={8}>
                <Box onClick={handleFavourite}>
                  <Icon
                    as={isFavourite ? FaHeart : FaRegHeart}
                    w={6}
                    h={6}
                    color={isFavourite ? "red" : "gray.400"}
                    _hover={{ color: "red.500", transitionDuration: "0.3s" }}
                  />
                </Box>
                <Box onClick={handleBookmark}>
                  <Icon
                    as={isBookmarked ? FaBookmark : FaRegBookmark}
                    w={6}
                    h={6}
                    color={isBookmarked ? "gray.800" : "gray.400"}
                    _hover={{ color: "gray.900", transitionDuration: "0.3s" }}
                  />
                </Box>
                <Box onClick={handleShare}>
                  <Icon
                    as={FiShare2}
                    w={6}
                    h={6}
                    color={"gray.400"}
                    _hover={{ color: "blue.700", transitionDuration: "0.5s" }}
                  />
                </Box>
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
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            }}
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
