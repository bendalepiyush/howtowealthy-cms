import {
  Container,
  Box,
  Heading,
  Flex,
  Text,
  Stack,
  SimpleGrid,
  Icon,
  StackDivider,
  AspectRatio,
} from "@chakra-ui/react";
import Layout from "../src/components/layout";
import Seo from "../src/components/seo";
import { FaRupeeSign, FaSearch, FaChartLine } from "react-icons/fa";
import Link from "next/link";

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

const AboutUs = () => {
  return (
    <>
      <Seo
        title="About Us - How to Wealthy"
        description="HowToWealthy is where we write about personal finance,
              investments, the stock market, and economics that interest us most
              and will help others make better decisions about their money."
      />
      <Layout>
        <Container maxW={"5xl"} minH={"50vh"} py={10}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20}>
            <Stack spacing={4}>
              <Text
                textTransform={"uppercase"}
                color={"primary.900"}
                fontWeight={600}
                fontSize={"sm"}
                bg={"primary.50"}
                p={2}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                🎉 About Me
              </Text>
              <Heading as={"h1"}>
                Hi, I am Piyush Bendale founder behind How to Wealthy.
              </Heading>
              <Text color={"gray.600"} pb={8} fontSize={"lg"}>
                How to Wealthy is where we write about personal finance,
                investments, the stock market, and economics that interest us
                most and will help others make better decisions about their
                money.
              </Text>
              <Stack
                spacing={4}
                divider={<StackDivider borderColor={"gray.100"} />}
              >
                <Feature
                  icon={
                    <Icon as={FaRupeeSign} color={"green.500"} w={5} h={5} />
                  }
                  iconBg={"green.100"}
                  text={"Personal Finance"}
                />
                <Feature
                  icon={
                    <Icon as={FaChartLine} color={"blue.500"} w={5} h={5} />
                  }
                  iconBg={"blue.100"}
                  text={"Stock Market"}
                />
                <Feature
                  icon={<Icon as={FaSearch} color={"red.500"} w={5} h={5} />}
                  iconBg={"red.100"}
                  text={"Investment"}
                />
              </Stack>
            </Stack>
            <Flex>
              <AspectRatio w={"100%"} zIndex={0} ratio={621 / 900}>
                <picture style={{ objectFit: "cover" }}>
                  <source
                    srcSet={"https://assets.howtowealthy.com/piyush.png?webp"}
                    type="image/webp"
                  />
                  <img
                    src={"https://assets.howtowealthy.com/piyush.png"}
                    alt={"Piyush Bendale - How to Wealthy"}
                  />
                </picture>
              </AspectRatio>
            </Flex>
          </SimpleGrid>

          <Container maxW={"2xl"} mt={20} py={20}>
            <Stack gap={20}>
              <Box>
                <Flex direction={"column"} align={"center"} gap={6}>
                  <Text
                    textTransform={"uppercase"}
                    color={"primary.900"}
                    fontWeight={600}
                    fontSize={"sm"}
                    bg={"primary.50"}
                    p={2}
                    rounded={"md"}
                  >
                    My Story
                  </Text>
                  <Text fontSize={"2xl"} textAlign={"center"} fontWeight={400}>
                    After 5+ years of working as a full-time freelancer in the
                    technology field, I have realized that freelancing is also a
                    business because you have to manage your sales, marketing,
                    finance, service offering, etc. There are ups and downs, and
                    I had to face some hard times when struggling to find
                    suitable projects. This allowed me to gain a lot of
                    experience in managing my finance in challenging situations
                    to survive and bear my monthly expenses and also helped me
                    to build the psychology of money and some good habits. Now,
                    I can say that, I am financially free and looking forward to
                    completing my bucket list.
                  </Text>
                  <Text fontSize={"2xl"} textAlign={"center"} fontWeight={400}>
                    I started How to Wealthy in September 2022 to share my
                    valuable experience with the world. Join me to be part of
                    the financial freedom journey.
                  </Text>
                </Flex>
              </Box>

              <Box>
                <Flex direction={"column"} align={"center"} gap={6}>
                  <Text
                    textTransform={"uppercase"}
                    color={"primary.900"}
                    fontWeight={600}
                    fontSize={"sm"}
                    bg={"primary.50"}
                    p={2}
                    rounded={"md"}
                  >
                    My Mission
                  </Text>
                  <Text fontSize={"2xl"} textAlign={"center"} fontWeight={400}>
                    My mission is to awaken a financial planner inside my
                    readers by educating and creating awareness by following the
                    simplistic and easy-to-follow articles.
                  </Text>
                </Flex>
              </Box>

              <Box>
                <Flex direction={"column"} align={"center"} gap={6}>
                  <Text
                    textTransform={"uppercase"}
                    color={"primary.900"}
                    fontWeight={600}
                    fontSize={"sm"}
                    bg={"primary.50"}
                    p={2}
                    rounded={"md"}
                  >
                    My Bucket List
                  </Text>
                  <Text
                    fontSize={"2xl"}
                    textAlign={"center"}
                    fontWeight={400}
                    mb={5}
                  >
                    Here is my bucket list if you are intersted.
                  </Text>

                  <Stack textAlign={"center"} gap={3}>
                    <Text>
                      <b>Complete the Bachelor&apos;s Degree</b> (Complete! I
                      have received my degree in 2020)
                    </Text>
                    <Text>
                      <b>Study in IIT</b>
                    </Text>
                    <Text>
                      <b>International Tour</b>
                    </Text>
                    <Text>
                      <b>Read 100 books</b>
                    </Text>
                    <Text>
                      <b>Get the CFP Certification</b>
                    </Text>
                    <Text>
                      <b>Attend the Dubai Expo</b>
                    </Text>
                    <Text>
                      <b>Stay one night in Burj Al Arab, Dubai</b>
                    </Text>
                    <Text>
                      <b>Build a dream home</b>
                    </Text>
                    <Text>
                      <b>Own a luxury car</b>
                    </Text>
                    <Text>
                      <b>Meet with any billionaire</b>
                    </Text>
                    <Text>
                      <b>Own a musical instrument</b> (Complete! I got a guitar
                      on my 22nd birthday and I am learning to play)
                    </Text>
                    <Text>
                      <b>Have a six pack abs</b>
                    </Text>
                    <Text>
                      <b>Go on safari in Africa</b>
                    </Text>
                    <Text>
                      <b>Be a guest speaker in any top institute</b>
                    </Text>
                    <Text>
                      <b>Be a billionaire</b>
                    </Text>
                    <Text>
                      <b>Write a book that sells thousand copies</b>
                    </Text>
                    <Text>
                      <b>Have story of myself in newspaper</b>
                    </Text>
                    <Text>
                      <b>Build a million dollar startup</b>
                    </Text>
                    <Text>
                      <b>60 Day profitable trader challenge</b>
                    </Text>
                    <Text>
                      <b>Work from a island for a month</b>
                    </Text>
                  </Stack>
                </Flex>
              </Box>

              <Box>
                <Flex direction={"column"} align={"center"} gap={6}>
                  <Text
                    textTransform={"uppercase"}
                    color={"primary.900"}
                    fontWeight={600}
                    fontSize={"sm"}
                    bg={"primary.50"}
                    p={2}
                    rounded={"md"}
                  >
                    My Social Accounts
                  </Text>
                  <Link href={"https://www.linkedin.com/in/piyush-bendale/"}>
                    <Text
                      fontSize={"2xl"}
                      textAlign={"center"}
                      fontWeight={400}
                    >
                      LinkedIN
                    </Text>
                  </Link>
                </Flex>
              </Box>
            </Stack>
          </Container>
        </Container>
      </Layout>
    </>
  );
};

export default AboutUs;
