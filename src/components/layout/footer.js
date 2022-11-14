import {
  Box,
  Button,
  Container,
  Heading,
  Flex,
  Spacer,
  Divider,
  VStack,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";
import Link from "next/link";

const Footer = () => {
  const companyNav = {
    label: "Categories",
    items: [
      {
        href: "/category/stock-market",
        name: "Stock Market",
      },
      {
        href: "/category/investment",
        name: "Investment",
      },
      {
        href: "/category/personal-finance",
        name: "Personal Finance",
      },
    ],
  };

  const resourceNav = {
    label: "Important Links",
    items: [
      {
        href: "/",
        name: "Home",
      },
      {
        href: "/about-us",
        name: "About Us",
      },
      {
        href: "/privacy-policy",
        name: "Privacy Policy",
      },
      {
        href: "/terms-and-conditions",
        name: "Terms and Conditions",
      },
    ],
  };

  return (
    <footer>
      <Box bg="gray.50" pt={20} pb={10}>
        <Container maxW="8xl">
          <Flex direction={{ base: "column", md: "row" }}>
            <Box maxW={"sm"} mb={{ base: 6, md: 0 }}>
              <Box mb={3}>
                <Text as="b">About How to Wealthy</Text>
              </Box>
              <Text>
                How to Wealthy is a place where we write about things related to
                personal finance, investments, the stock market, and economics
                that interest us most and will help others make better decisions
                about their money.
              </Text>
            </Box>
            <Spacer />
            <Box w={"full"}>
              <Flex
                justify={"end"}
                gap={{ base: 0, md: 24 }}
                direction={{ base: "column", md: "row" }}
              >
                <Box mb={{ base: 6, md: 0 }}>
                  <Box mb={3}>
                    <Text as="b">User</Text>
                  </Box>
                  <List>
                    <ListItem mb={2}>
                      <Link href={"/profile/bookmark"}>Bookmarks</Link>
                    </ListItem>
                    <ListItem mb={2}>
                      <Link href={"/profile/favourite"}>Favourites</Link>
                    </ListItem>
                  </List>
                </Box>
                <Box mb={{ base: 6, md: 0 }}>
                  <Box mb={3}>
                    <Text as="b">{companyNav.label}</Text>
                  </Box>
                  <List>
                    {companyNav.items.map((el, idx) => (
                      <ListItem mb={2} key={idx}>
                        <Link href={el.href}>{el.name}</Link>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box mb={{ base: 6, md: 0 }}>
                  <Box mb={3}>
                    <Text mb={3} as="b">
                      {resourceNav.label}
                    </Text>
                  </Box>
                  <List>
                    {resourceNav.items.map((el, idx) => (
                      <ListItem mb={2} key={idx}>
                        <Link href={el.href}>{el.name}</Link>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Flex>
            </Box>
          </Flex>

          <Box py={10}>
            <Divider />
          </Box>

          <VStack>
            <Text> © 2022 How to Wealthy, All rights reserved.</Text>
          </VStack>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
