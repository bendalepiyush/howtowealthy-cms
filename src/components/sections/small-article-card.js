import {
  GridItem,
  Box,
  Stack,
  Text,
  Heading,
  AspectRatio,
} from "@chakra-ui/react";
import Link from "next/link";

import truncate from "../../utils/truncate";

const SmallArticleCard = ({ item }) => {
  return (
    <GridItem>
      <Link href={`/${item.slug}`}>
        <Stack gap={2}>
          <AspectRatio w={"100%"} zIndex={0} ratio={3 / 2}>
            <Box bg={"gray.100"} w={"100%"} h={"100%"} />
          </AspectRatio>
          <Stack gap={0}>
            <Heading as={"h3"} size={"md"} fontWeight={"600"}>
              {item.title}
            </Heading>

            <Text>{truncate(item.excerpt, 75)}</Text>

            <Text color={"primary.900"}>Read More</Text>
          </Stack>
        </Stack>
      </Link>
    </GridItem>
  );
};

export default SmallArticleCard;
