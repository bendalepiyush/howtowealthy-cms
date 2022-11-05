import {
  Grid,
  GridItem,
  Box,
  Stack,
  Text,
  Heading,
  AspectRatio,
} from "@chakra-ui/react";
import Link from "next/link";
import truncate from "../../utils/truncate";

const WideArticleCard = ({ item }) => {
  return (
    <GridItem>
      <Link href={item.slug}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={{ base: 4, md: 8 }}
          alignItems={"center"}
        >
          <GridItem colSpan={2}>
            <Stack gap={1} justifyContent={"center"}>
              <Heading as={"h3"} size={"md"} fontWeight={"700"}>
                {item.title}
              </Heading>

              <Text fontSize={"18px"} lineHeight={1.7}>
                {truncate(item.excerpt, 150)}
              </Text>

              <Text color={"primary.900"}>Read More</Text>
            </Stack>
          </GridItem>
          <AspectRatio w={"100%"} ratio={3 / 2}>
            <Box bg={"gray.100"} w={"100%"} h={"100%"} />
          </AspectRatio>
        </Grid>
      </Link>
    </GridItem>
  );
};

export default WideArticleCard;
