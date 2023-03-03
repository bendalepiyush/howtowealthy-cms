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
  Icon,
  useDisclosure,
  Collapse,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import Logo from "../logo";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../../services/firebase";
import { useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import CustomModal from "../modal";
import SubscriptionModal from "../modals/subscriber";
import useModal from "../../utils/use-modal";

const Header = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const [isLoggedIn, setIsLoggedIn] = useBoolean(false);
  const { isOpen, onToggle } = useDisclosure();
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    if (user) {
      setIsLoggedIn.on();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Box position={"sticky"} top={0} zIndex={99} bg={"white"} shadow={"sm"}>
        <Box>
          <Box
            w={
              props.progressPercent > 100 || props.progressPercent < 0
                ? 100
                : props.progressPercent + "%"
            }
            h={"2px"}
            bg={"black"}
          ></Box>
        </Box>
        <Container py={3} maxW={"8xl"}>
          <Flex align={"center"}>
            <Link href="/" aria-label="How to Wealthy">
              <Box w={200} py={5}>
                <Logo />
              </Box>
            </Link>
            <Box display={{ base: "none", md: "block" }}>
              <DesktopNav />
            </Box>
            <Spacer />
            <Flex
              display={{ base: "flex", md: "none" }}
              onClick={onToggle}
              aria-label={"Toggle Navigation"}
            >
              <Icon as={isOpen ? FiX : FiMenu} w={7} h={7} />
            </Flex>
            <Stack
              display={{ base: "none", md: "block" }}
              direction={"row"}
              gap={1}
            >
              {isLoggedIn && user ? (
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
                    <Link href={"/profile/bookmark"}>
                      <MenuItem>My Bookmarks</MenuItem>
                    </Link>
                    <MenuDivider />
                    <Link href={"/profile/favourite"}>
                      <MenuItem>My Favourites</MenuItem>
                    </Link>
                    <MenuDivider />
                    <Box
                      onClick={() => {
                        logout();
                      }}
                    >
                      <MenuItem>Logout</MenuItem>
                    </Box>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Link href={"/auth/login"}>
                    <Button variant={"outline"} colorScheme={"black"}>
                      Sign In
                    </Button>
                  </Link>
                  <Button onClick={toggle} colorScheme={"black"}>
                    Subscribe
                  </Button>
                </>
              )}
            </Stack>
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <MobileNav isLoggedIn={isLoggedIn} user={user} toggle={toggle} />
          </Collapse>
        </Container>
      </Box>
      <CustomModal isOpen={isShowing} onClose={toggle}>
        <SubscriptionModal toggle={toggle} />
      </CustomModal>
    </>
  );
};

const DesktopNav = () => {
  return (
    <Stack direction={"row"} align={"center"} spacing={6} ml={10}>
      {NAV_ITEMS.map((navItem) => {
        if (navItem.href) {
          return (
            <Link href={navItem.href} key={navItem.name}>
              <Box px={3} py={4}>
                <Text>{navItem.label}</Text>
              </Box>
            </Link>
          );
        }

        return (
          <Menu key={navItem.label}>
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
              px={0}
            >
              <Box py={2}>
                <Text fontWeight={"400"}>{navItem.label}</Text>
              </Box>
            </MenuButton>
            <MenuList py={0}>
              {navItem.children.map((item) => (
                <Link key={item.href} href={item.href}>
                  <MenuItem p={3}>{item.label}</MenuItem>
                </Link>
              ))}
            </MenuList>
          </Menu>
        );
      })}
    </Stack>
  );
};

const MobileNav = ({ isLoggedIn, user, toggle }) => {
  return (
    <Flex direction={"column"} py={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => {
        if (navItem.href) {
          return (
            <>
              <Link href={navItem.href} key={navItem.label}>
                <Box py={2}>
                  <Text fontWeight={500}>{navItem.label}</Text>
                </Box>
              </Link>
              <Divider my={5} />
            </>
          );
        }
        return (
          <Box key={navItem.label}>
            <Text
              mb={1}
              textTransform={"uppercase"}
              fontWeight={"bold"}
              color={"gray.500"}
              fontSize={"13px"}
            >
              {navItem.label}
            </Text>
            {navItem.children.map((item) => (
              <Link key={item.href} href={item.href}>
                <Box py={2}>
                  <Text fontWeight={500}>{item.label}</Text>
                </Box>
              </Link>
            ))}
            <Divider my={5} />
          </Box>
        );
      })}

      {isLoggedIn && user ? (
        <>
          <Link href={"/profile/bookmark"}>
            <Box py={2}>
              <Text fontWeight={500}>My Bookmarks</Text>
            </Box>
          </Link>
          <Link href={"/profile/favourite"}>
            <Box py={2}>
              <Text fontWeight={500}>My Favourites</Text>
            </Box>
          </Link>
          <Box py={2} onClick={logout}>
            <Text fontWeight={500}>Logout</Text>
          </Box>
        </>
      ) : (
        <>
          <Link href={"/auth/login"}>
            <Box mb={3}>
              <Button variant={"outline"} colorScheme={"black"}>
                Sign In
              </Button>
            </Box>
          </Link>
          <Box>
            <Button onClick={toggle} colorScheme={"black"}>
              Subscribe
            </Button>
          </Box>
        </>
      )}
    </Flex>
  );
};

const NAV_ITEMS = [
  {
    label: "Category",
    children: [
      {
        label: "Freelance",
        href: "/category/freelance",
      },
      {
        label: "Investment",
        href: "/category/investment",
      },
      {
        label: "Personal Finance",
        href: "/category/personal-finance",
      },
      {
        label: "Stock Market",
        href: "/category/stock-market",
      },
    ],
  },
  {
    label: "Tools",
    children: [
      {
        label: "Investment Calculator",
        href: "/tools/investment-calculator",
      },

      {
        href: "/tools/loan-payoff-or-invest",
        label: "Loan Payoff or Invest",
      },
      {
        href: "/tools/trading/position-sizing-calculator",
        label: "Position Sizing",
      },
      {
        href: "/tools/trading/nifty-range-calculator",
        label: "Nifty Range Calculator",
      },
      {
        href: "/tools/trading/pivot-point-calculator",
        label: "Pivot Point Calculator",
      },
    ],
  },
];

export default Header;
