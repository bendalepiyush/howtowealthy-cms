import {
  Box,
  Container,
  Flex,
  Link,
  Text,
  Spacer,
  Stack,
  Button,
} from "@chakra-ui/react";
import { Link as NLink } from "next";
import Logo from "../logo";

const Header = () => {
  return (
    <>
      <Box position={"sticky"} top={0} py={3} bg={"white"} shadow={"sm"}>
        <Container maxW={"7xl"}>
          <Flex align={"center"}>
            <Box w={200}>
              <Logo />
            </Box>
            <Box display={{ base: "none", md: "block" }}>
              <Stack direction={"row"} spacing={6} ml={8}>
                {NavItems.map((item) => (
                  <Box py={4} key={item.name}>
                    <Text>{item.name}</Text>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Spacer />
            <Button colorScheme={"blue"}>Sign up</Button>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

const NavItems = [
  {
    name: "Stock Market",
    href: "#",
  },
  {
    name: "Investment",
    href: "#",
  },
  {
    name: "Personal Finance",
    href: "#",
  },
];

export default Header;
