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

const SinglePost = () => {
  return (
    <Layout>
      <main>
        <Container maxW={"70ch"} pt={10}>
          <Badge
            variant="subtle"
            colorScheme="green"
            py={2}
            px={5}
            borderRadius={100}
            mb={4}
          >
            Stock Market
          </Badge>
          <Heading as={"h1"} mb={4}>
            What Is a Stock Market Index? : Definition, How Indexing Works,
            Types, and Examples
          </Heading>
          <Heading as={"h2"} size={"lg"} fontWeight={"200"}>
            A stock market index is a statistical metric that depicts movements
            in the stock market. A few similar equities are selected from among
            the stocks already listed on the market to build an index.
          </Heading>
          <Divider my={6} />
          <Flex align={"center"}>
            <Text as={"pre"}>October 20, 2022</Text>

            <Spacer />

            <Stack direction={"row"} spacing={6}>
              <Icon
                as={FiBookmark}
                w={6}
                h={6}
                _hover={{ color: "black", transitionDuration: "0.5s" }}
                color={"gray.400"}
              />
              <Icon
                as={FiHeart}
                w={6}
                h={6}
                color={"gray.400"}
                _hover={{ color: "red", transitionDuration: "0.5s" }}
              />
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
              <ListItem fontSize={"xl"}>What Are Stock Indices?</ListItem>
              <ListItem fontSize={"xl"}>
                How Stock Market Indices Are Created
              </ListItem>
              <ListItem fontSize={"xl"}>The Importance of Indices</ListItem>
              <ListItem fontSize={"xl"}>Market Indices as Benchmarks</ListItem>
              <ListItem fontSize={"xl"}>
                How do you read a stock market index?
              </ListItem>
              <ListItem fontSize={"xl"}>
                Why are stock indices required?
              </ListItem>
              <ListItem fontSize={"xl"}>
                Different Types of Market Indexes
              </ListItem>
            </OrderedList>
          </Box>
        </Container>

        <Container maxW={"6xl"} py={10}>
          <img src="https://wallpaperaccess.com/full/1393728.jpg" />
        </Container>

        <Box pb={20}>
          <Container
            maxW={"70ch"}
            fontSize={"18px"}
            lineHeight={1.7}
            className={"post-content"}
          >
            <p>
              What Are Stock Indices? A stock market index is a statistical
              metric that depicts movements in the stock market. A few similar
              equities are selected from among the stocks already listed on the
              market to build an index. The size of the firm, the market
              capitalization, or the type of industry could all be factored in
              choosing stocks. Stock market indices are valued by utilizing the
              stock prices of their underlying holdings.
            </p>
            <p>
              What Are Stock Indices? A stock market index is a statistical
              metric that depicts movements in the stock market. A few similar
              equities are selected from among the stocks already listed on the
              market to build an index. The size of the firm, the market
              capitalization, or the type of industry could all be factored in
              choosing stocks. Stock market indices are valued by utilizing the
              stock prices of their underlying holdings.
            </p>
            <p>
              What Are Stock Indices? A stock market index is a statistical
              metric that depicts movements in the stock market. A few similar
              equities are selected from among the stocks already listed on the
              market to build an index. The size of the firm, the market
              capitalization, or the type of industry could all be factored in
              choosing stocks. Stock market indices are valued by utilizing the
              stock prices of their underlying holdings.
            </p>
            <p>
              What Are Stock Indices? A stock market index is a statistical
              metric that depicts movements in the stock market. A few similar
              equities are selected from among the stocks already listed on the
              market to build an index. The size of the firm, the market
              capitalization, or the type of industry could all be factored in
              choosing stocks. Stock market indices are valued by utilizing the
              stock prices of their underlying holdings.
            </p>
            <p>
              What Are Stock Indices? A stock market index is a statistical
              metric that depicts movements in the stock market. A few similar
              equities are selected from among the stocks already listed on the
              market to build an index. The size of the firm, the market
              capitalization, or the type of industry could all be factored in
              choosing stocks. Stock market indices are valued by utilizing the
              stock prices of their underlying holdings.
            </p>
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
                  as={FiBookmark}
                  w={6}
                  h={6}
                  _hover={{ color: "black", transitionDuration: "0.5s" }}
                  color={"gray.400"}
                />
                <Icon
                  as={FiHeart}
                  w={6}
                  h={6}
                  color={"gray.400"}
                  _hover={{ color: "red", transitionDuration: "0.5s" }}
                />
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
        <Container maxW={"7xl"} py={20}>
          <Heading as={"h2"} size={"md"} fontWeight={"600"} mb={12}>
            Related Articles
          </Heading>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            gap={8}
          >
            <SmallArticleCard />
            <SmallArticleCard />
            <SmallArticleCard />
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
