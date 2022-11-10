import { Flex, Box, Heading, Text, Icon } from "@chakra-ui/react";
import { FiExternalLink, FiX } from "react-icons/fi";
import Link from "next/link";

const BookMarkFavCard = ({ data, handleRemoveBookmark }) => {
  return (
    <Flex
      align={"center"}
      justify={"space-between"}
      py={4}
      borderBottom={"1px solid #f3f3f3"}
    >
      <Box>
        <Heading as={"h2"} fontSize={"lg"}>
          {data.title}
        </Heading>
        <Text>{data.url}</Text>
      </Box>

      <Flex gap={4}>
        <Link href={data.url}>
          <Box p={1}>
            <Icon
              as={FiExternalLink}
              w={6}
              h={6}
              color={"gray.500"}
              _hover={{
                color: "gray.900",
                transitionDuration: "0.5s",
              }}
            />
          </Box>
        </Link>
        <Box p={1} onClick={handleRemoveBookmark}>
          <Icon
            as={FiX}
            w={6}
            h={6}
            color={"gray.500"}
            _hover={{ color: "gray.900", transitionDuration: "0.5s" }}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default BookMarkFavCard;
