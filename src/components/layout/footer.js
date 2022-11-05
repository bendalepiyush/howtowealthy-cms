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
        href: "/calculators/cagr",
        name: "Stock Market",
      },
      {
        href: "/calculators/emi",
        name: "Investment",
      },
      {
        href: "/calculators/fixed-deposit",
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
        href: "/company/about-us",
        name: "About Us",
      },
      {
        href: "/company/privacy-policy",
        name: "Privacy Policy",
      },
      {
        href: "/company/terms-and-conditions",
        name: "Terms and Conditions",
      },
    ],
  };

  return (
    <footer>
      <Box bg="gray.50" pt={20} pb={10}>
        <Container maxW="8xl">
          <Flex direction={{ base: "column", md: "row" }}>
            <Box maxW={"xs"} mb={{ base: 6, md: 0 }}>
              <Box mb={3}>
                <Text as="b">About How to Wealthy</Text>
              </Box>
              <Text>
                Simplifying your financial journey by building user friendly
                tools and calculators.
              </Text>
            </Box>
            <Spacer />
            <Box maxW={"md"} w={"full"}>
              <Flex direction={{ base: "column", md: "row" }}>
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
                <Spacer />
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
