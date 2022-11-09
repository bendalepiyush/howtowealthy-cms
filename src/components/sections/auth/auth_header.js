import { Box, Container, Flex } from "@chakra-ui/react";
import { default as NLink } from "next/link";
import Logo from "../../logo";

const AuthHeader = () => {
  return (
    <>
      <Box
        position={"sticky"}
        top={0}
        py={3}
        zIndex={99}
        bg={"white"}
        shadow={"sm"}
      >
        <Container maxW={"8xl"}>
          <Flex align={"center"} justify={"center"}>
            <NLink href="/">
              <Box w={200} py={5}>
                <Logo />
              </Box>
            </NLink>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default AuthHeader;
