import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import AuthHeader from "../src/components/sections/auth/auth_header";
import Seo from "../src/components/seo";

const FourOhFour = () => {
  return (
    <>
      <Seo
        title="404 Not Found - How to Wealthy"
        description="404 Page"
        noIndex={true}
      />
      <AuthHeader />

      <Flex minH={"80vh"} align={"center"} justify={"center"}>
        <Box w={"100%"} maxW={"xl"} p={8}>
          <Stack spacing={20}>
            <Heading as={"h1"} textAlign="center">
              404 <br />
              Not Found
            </Heading>

            <Link href={"/"}>
              <Text textAlign={"center"} color={"primary.900"}>
                Go back to home
              </Text>
            </Link>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default FourOhFour;
