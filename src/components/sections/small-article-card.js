import {
  GridItem,
  Box,
  Stack,
  Text,
  Heading,
  AspectRatio,
} from "@chakra-ui/react";

const SmallArticleCard = () => {
  return (
    <GridItem>
      <Stack gap={4}>
        <AspectRatio w={"100%"} ratio={3 / 2}>
          <Box bg={"red"} w={"100%"} h={"100%"} />
        </AspectRatio>
        <Heading as={"h3"} size={"lg"} fontWeight={"200"}>
          A stock market index is a statistical metric that?
        </Heading>

        <Text>View More</Text>
      </Stack>
    </GridItem>
  );
};

export default SmallArticleCard;
