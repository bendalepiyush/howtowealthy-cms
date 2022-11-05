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
import { default as NLink } from "next/link";
import Logo from "../logo";

const Header = () => {
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
          <Flex align={"center"}>
            <NLink href="/">
              <Box w={200} py={5}>
                <Logo />
              </Box>
            </NLink>
            <Box display={{ base: "none", md: "block" }}>
              <Stack direction={"row"} spacing={6} ml={10}>
                {NavItems.map((item) => (
                  <NLink href={item.href} key={item.name}>
                    <Box py={4}>
                      <Text>{item.name}</Text>
                    </Box>
                  </NLink>
                ))}
              </Stack>
            </Box>
            <Spacer />
            <Stack
              display={{ base: "none", md: "block" }}
              direction={"row"}
              gap={1}
            >
              <Button colorScheme={"black"} variant={"outline"}>
                Sign In
              </Button>
              <Button colorScheme={"black"}>Subscribe</Button>
            </Stack>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

const NavItems = [
  {
    name: "Stock Market",
    href: "/category/stock-market",
  },
  {
    name: "Investment",
    href: "/category/investment",
  },
  {
    name: "Personal Finance",
    href: "/category/personal-finance",
  },
];

export default Header;
