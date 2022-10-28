import {
  Grid,
  GridItem,
  Box,
  Stack,
  Text,
  Heading,
  AspectRatio,
} from "@chakra-ui/react";

const WideArticleCard = () => {
  return (
    <GridItem>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap={{ base: 4, md: 8 }}
      >
        <AspectRatio w={"100%"} ratio={3 / 2}>
          <Box bg={"red"} w={"100%"} h={"100%"} />
        </AspectRatio>
        <Stack gap={2}>
          <Heading as={"h3"} size={"lg"} fontWeight={"200"}>
            A stock market index is a statistical metric that?
          </Heading>

          <Text fontSize={"18px"} lineHeight={1.7}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            cursus, dui ut imperdiet cursus, elit purus faucibus risus,
            elementum sodales est odio a orci.
          </Text>

          <Text>View More</Text>
        </Stack>
      </Grid>
    </GridItem>
  );
};

export default WideArticleCard;
