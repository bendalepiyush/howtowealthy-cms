import {
  Box,
  Container,
  Flex,
  Text,
  Spacer,
  Stack,
  Button,
  useBoolean,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { default as NLink } from "next/link";
import Logo from "../logo";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const [isLoggedIn, setIsLoggedIn] = useBoolean(false);

  useEffect(() => {
    if (user) {
      setIsLoggedIn.on();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
              {isLoggedIn ? (
                <Menu>
                  <MenuButton
                    bg={"transparent"}
                    as={Button}
                    rightIcon={<FaAngleDown />}
                    _hover={{
                      backgroundColor: "transparent",
                    }}
                    _focus={{
                      backgroundColor: "transparent",
                    }}
                    _active={{
                      backgroundColor: "transparent",
                    }}
                  >
                    <Box
                      bg={"black"}
                      color={"white"}
                      borderRadius={"100px"}
                      w={10}
                      h={10}
                    >
                      <Flex h={"100%"} align={"center"} justify={"center"}>
                        {user.email[0].toUpperCase()}
                      </Flex>
                    </Box>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>My Bookmarks</MenuItem>
                    <MenuDivider />
                    <MenuItem>My Favourites</MenuItem>
                    <MenuDivider />
                    <MenuItem>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <NLink href={"/auth/register"}>
                    <Button variant={"outline"} colorScheme={"black"}>
                      Sign Up
                    </Button>
                  </NLink>
                  <Button colorScheme={"black"}>Subscribe</Button>
                </>
              )}
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
