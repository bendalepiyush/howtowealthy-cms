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
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  FormErrorMessage,
  InputLeftAddon,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import randomQuote from "../src/api/get_random_quote";
import Layout from "../src/components/layout";
import WideArticleCard from "../src/components/sections/wide-article-card";
import Seo from "../src/components/seo";
import hygraph from "../src/services/hygraph";

const Search = ({ query }) => {
  const [posts, setPosts] = useState([]);
  const [isLast, setIsLast] = useState(null);
  const [resquote, setResquote] = useState({
    quote: null,
    author: null,
  });
  useEffect(() => {
    setResquote(randomQuote());
  }, []);

  useEffect(() => {
    if (query.query) {
      fetchPosts({ query: query.query, searchType: "all" });
    }
    console.log("Query" + query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  const formik = useFormik({
    initialValues: {
      query: query.query,
      searchType: "all",
    },
    onSubmit: (values) => {
      fetchPosts(values);
    },
  });

  const fetchPosts = async (values) => {
    let filter = `, AND: {category: {slug: "${values.searchType}"}}`;
    if (values.searchType === "all") {
      filter = "";
    }

    const skip = posts.length;

    var res = await hygraph.request(
      `
          {
              blogPosts(orderBy: publishedAt_DESC, skip: ${skip}, first: 10, where: {title_contains: "${values.query}"${filter}}) {
                  slug
                  title
                  excerpt
                  featuredImage
              }
          }
      `
    );

    setPosts(posts.concat(res.blogPosts));

    if (res.blogPosts.length < 20) {
      setIsLast(true);
    }
  };

  return (
    <Layout>
      <Seo
        title="Search - How to Wealthy"
        description="Are you ready to start living the life of financial freedom? You're about to discover the secrets to becoming wealthy."
      />
      <main>
        <Box py={20}>
          <Container maxW={"8xl"}>
            <Box pb={36} maxW={"2xl"}>
              <Heading as={"h1"} mb={2}>
                Search
              </Heading>
              <Text fontSize={"2xl"} mb={6} fontWeight={300}>
                Lorem ipsum dolor summit
              </Text>

              <form onSubmit={formik.handleSubmit}>
                <Flex>
                  <FormControl
                    isInvalid={
                      formik.touched.query && Boolean(formik.errors.query)
                    }
                  >
                    <InputGroup size="lg">
                      <Input
                        type="text"
                        size={"lg"}
                        id={"query"}
                        name={"query"}
                        value={formik.values.query}
                        onChange={formik.handleChange}
                        placeholder={"Enter search query"}
                      />
                      <InputRightAddon p={0}>
                        <Select
                          border={"none"}
                          id="searchType"
                          name="searchType"
                          value={formik.values.searchType}
                          onChange={formik.handleChange}
                          size={"lg"}
                        >
                          <option value="all">Category: All</option>
                          <option value="stock-market">
                            Category: Stock Market
                          </option>
                          <option value="investment">
                            Category: Investment
                          </option>
                          <option value="personal-finance">
                            Category: Personal Finance
                          </option>
                        </Select>
                      </InputRightAddon>
                    </InputGroup>
                    {formik.touched.duration &&
                      Boolean(formik.errors.duration) && (
                        <FormErrorMessage>
                          {formik.errors.duration}
                        </FormErrorMessage>
                      )}
                  </FormControl>
                  <Button type="submit" colorScheme={"primary"} size={"lg"}>
                    Search
                  </Button>
                </Flex>
              </form>
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
                  Search Results
                </Heading>

                <Box bg={"gray.100"} h={"1px"} mt={3} mb={8}>
                  <Box w={`12ch`} bg={"black.900"} h={"1px"}></Box>
                </Box>
                <Stack gap={8}>
                  {posts &&
                    posts.map((item, idx) => (
                      <WideArticleCard key={idx} item={item} />
                    ))}
                </Stack>

                {isLast !== null &&
                  (isLast ? (
                    <Flex
                      onClick={fetchPosts}
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
                  ))}
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

Search.getInitialProps = ({ query }) => {
  return { query };
};

export default Search;
