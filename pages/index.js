import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Stack,
  AspectRatio,
} from "@chakra-ui/react";
import Layout from "../src/components/layout";
import SmallArticleCard from "../src/components/sections/small-article-card";
import WideArticleCard from "../src/components/sections/wide-article-card";

const Home = () => {
  return (
    <Layout>
      <main>
        <Box py={20}>
          <Container maxW={"7xl"}>
            <Stack spacing={20}>
              <Box>
                <Heading as={"h2"} size={"md"} fontWeight={"600"} mb={12}>
                  Stock market
                </Heading>
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(3, 1fr)",
                  }}
                  gap={8}
                >
                  <SmallArticleCard />
                  <SmallArticleCard />
                  <SmallArticleCard />
                </Grid>
              </Box>
              <Box>
                <Heading as={"h2"} size={"md"} fontWeight={"600"} mb={12}>
                  Stock market
                </Heading>
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(3, 1fr)",
                  }}
                  gap={8}
                >
                  <SmallArticleCard />
                  <SmallArticleCard />
                  <SmallArticleCard />
                </Grid>
              </Box>
              <Box>
                <Heading as={"h2"} size={"md"} fontWeight={"600"} mb={12}>
                  Stock market
                </Heading>
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(3, 1fr)",
                  }}
                  gap={8}
                >
                  <SmallArticleCard />
                  <SmallArticleCard />
                  <SmallArticleCard />
                </Grid>
              </Box>

              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "2fr 1fr",
                }}
                gap={8}
              >
                <GridItem>
                  <Stack gap={8}>
                    <WideArticleCard />
                    <WideArticleCard />
                    <WideArticleCard />
                    <WideArticleCard />
                    <WideArticleCard />
                    <WideArticleCard />
                  </Stack>
                </GridItem>
                <GridItem>
                  <Box>
                    <AspectRatio w={"100%"} ratio={1}>
                      <Box bg={"red"} w={"100%"} h={"100%"} />
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
