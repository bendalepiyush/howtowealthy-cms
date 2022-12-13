import {
  Box,
  Container,
  Icon,
  Flex,
  Spacer,
  Divider,
  VStack,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const companyNav = {
    label: "Categories",
    items: [
      {
        href: "/category/freelance",
        name: "Freelance",
      },
      {
        href: "/category/investment",
        name: "Investment",
      },
      {
        href: "/category/personal-finance",
        name: "Personal Finance",
      },
      {
        href: "/category/stock-market",
        name: "Stock Market",
      },
    ],
  };

  const calculatorNav = {
    label: "Tools",
    items: [
      {
        href: "/tools/investment-calculator",
        name: "Investment Calculator",
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
        href: "/contact",
        name: "Contact Us",
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
      <Box bg="gray.50" py={20}>
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

              <Flex mt={6} gap={6}>
                {/* <Link href={"https://www.facebook.com/howtowealthy/"}>
                  <Icon w={6} h={6} as={FaFacebook} />
                </Link> */}
                <Link href={"https://twitter.com/howtowealthy"}>
                  <Icon w={6} h={6} as={FaTwitter} />
                </Link>
                <Link href={"https://www.linkedin.com/company/how-to-wealthy/"}>
                  <Icon w={6} h={6} as={FaLinkedin} />
                </Link>

                <Link href={"https://www.instagram.com/_howto_wealthy/"}>
                  <Icon w={6} h={6} as={FaInstagram} />
                </Link>
              </Flex>
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
                    <ListItem mb={2}>
                      <Link href={"/search"}>Search</Link>
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
                    <Text as="b">{calculatorNav.label}</Text>
                  </Box>
                  <List>
                    {calculatorNav.items.map((el, idx) => (
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

          <VStack align={"left"} gap={10}>
            <Text fontSize={"sm"}>
              <b>No Investment Advice Provided by howtowealthy.com</b> Trading
              leveraged products carries a high degree of risk and you could
              lose more than your initial deposit. Any opinions, chats,
              messages, news, research, analyses, prices, or other information
              contained on this Website are provided as general market
              information for educational and entertainment purposes only, and
              do not constitute investment advice. The Website should not be
              relied upon as a substitute for extensive independent market
              research before making your actual trading decisions. Opinions,
              market data, recommendations or any other content is subject to
              change at any time without notice. How to Wealthy. will not accept
              liability for any loss or damage, including without limitation any
              loss of profit, which may arise directly or indirectly from use of
              or reliance on such information. We do not recommend the use of
              technical analysis as a sole means of trading decisions. We do not
              recommend making hurried trading decisions. You should always
              understand that PAST PERFORMANCE IS NOT NECESSARILY INDICATIVE OF
              FUTURE RESULTS.
            </Text>
            <Text>© 2022 How to Wealthy, All rights reserved.</Text>
          </VStack>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
