/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Container,
  Flex,
  Text,
  Spacer,
  Stack,
  Grid,
  Heading,
  AspectRatio,
  Badge,
  Divider,
  Icon,
  OrderedList,
  ListItem,
  useBoolean,
  useToast,
  Spinner,
  Wrap,
  VStack,
  UnorderedList,
  SimpleGrid,
  StackDivider,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "../../src/components/layout";
import Seo from "../../src/components/seo";
import {
  auth,
  bookmarkOrFavURL,
  isBookmarkedOrFavURL,
  removeBookmarkOrFavURL,
} from "../../src/services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import hygraph from "../../src/services/hygraph";
import truncate from "../../src/utils/truncate";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { throttledFetch } from "../../src/services/p-throttle";
import { FaBook, FaHourglass, FaLightbulb, FaSmile } from "react-icons/fa";

const validationSchema = yup.object({
  firstName: yup
    .string("Enter valid firstname")
    .required("Enter valid firstname")
    .min(3, "Firstname should minimum 3 charaters")
    .max(20, "Firstname should maximum 20 charaters")
    .typeError("Enter valid firstname"),
  lastName: yup
    .string("Enter valid lastname")
    .required("Enter valid lastname")
    .min(3, "Lastname should minimum 3 charaters")
    .max(20, "Lastname should maximum 20 charaters")
    .typeError("Enter valid lastname"),
  email: yup
    .string("Enter valid email")
    .email("Enter valid email")
    .required("Email is required"),
  password: yup
    .string("Enter valid password")
    .required("Enter valid password")
    .min(6, "Password must contain min 6 characters")
    .max(16, "Password must contain max 16 characters"),

  agree: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

export const getStaticPaths = async () => {
  const { courses } = await throttledFetch(
    `
        {
        courses {
            slug
          }
        }
      `
  );

  return {
    paths: courses.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { courses } = await throttledFetch(`
    {
      courses(where: {slug: "${params.slug}"}) {
          title
          slug
          description
          structuredData
          images
          courseTopics {
            seq
            title
            content
            moduleStructure
            questions
            resources
          }
        }
    }
  `);

  if (!courses.length) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  } else {
    return {
      props: { course: courses[0] },
      revalidate: 60 * 60 * 24 * 7,
    };
  }
};

const SinglePost = ({ course }) => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [currentCourseTopic, setCurrentCourseTopic] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      agree: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.agree) {
        setIsLoading(true);
        registerWithEmailAndPassword(
          {
            firstName: values.firstName,
            lastName: values.lastName,
          },
          values.email,
          values.password
        );

        setIsLoading(false);
      }
    },
  });

  // useEffect(() => {
  //   if (user) {
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  if (loading) {
    return (
      <Flex align={"center"} justify={"center"} h={"100vh"} w={"100vw"}>
        <Spinner />
      </Flex>
    );
  }

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <Flex align={"center"} justify={"center"} h={"100vh"} w={"100vw"}>
        <Spinner />
      </Flex>
    );
  }

  // Render course...
  const title = course.title || "";
  const description = course.description || "";

  const renderPageContent = (item) => {
    switch (selectedTab) {
      case 0:
        return (
          <div
            className={"post-content"}
            dangerouslySetInnerHTML={{
              __html: item.content,
            }}
          />
        );

      case 1:
        return (
          <Box>
            {course.courseTopics[currentCourseTopic].moduleStructure.map(
              (item, index) => {
                return (
                  <Box key={index} mb={7}>
                    <Text fontWeight={700} pb={2}>
                      {item.title}
                    </Text>

                    <UnorderedList>
                      {item.submodule &&
                        item.submodule.map((item, index) => {
                          return (
                            <ListItem mb={1} key={index}>
                              {item}
                            </ListItem>
                          );
                        })}
                    </UnorderedList>
                  </Box>
                );
              }
            )}
          </Box>
        );
      case 2:
        return (
          <div
            className={"post-content"}
            dangerouslySetInnerHTML={{
              __html: item.resources,
            }}
          />
        );
      case 3:
        return (
          <Box>
            {course.courseTopics[currentCourseTopic].questions.map(
              (item, index) => {
                return (
                  <Box key={index} mb={7}>
                    <Text fontWeight={700} pb={2}>
                      {item.question}
                    </Text>

                    <OrderedList type="a" mb={2}>
                      {item.options &&
                        item.options.map((item, index) => {
                          return (
                            <ListItem mb={1} key={index}>
                              {item}
                            </ListItem>
                          );
                        })}
                    </OrderedList>

                    <Text>Answer: {item.answer}</Text>
                  </Box>
                );
              }
            )}
          </Box>
        );
      default:
        return (
          <div
            className={"post-content"}
            dangerouslySetInnerHTML={{
              __html: item.content,
            }}
          />
        );
    }
  };

  if (user) {
    return (
      <Layout>
        <Seo
          title={title}
          description={description}
          structuredData={JSON.stringify(course.structuredData)}
          ogImage={
            course.images
              ? course.images.ogimg
              : "https://assets.howtowealthy.com/ogimg.png"
          }
        />

        <Box position={"relative"}>
          <Box
            backgroundColor={"black"}
            color={"white"}
            position={"sticky"}
            top={"130px"}
            left={0}
          >
            <Container maxW={"8xl"} py={5}>
              <Heading as={"h1"} size={"md"} fontWeight={400}>
                {title}
              </Heading>
            </Container>
          </Box>

          <Container maxW={"8xl"} mt={10} mb={10}>
            <Grid templateColumns={"400px 1fr"} gap={20}>
              <VStack>
                {course.courseTopics.map((item, index) => {
                  const isCurrent = index === currentCourseTopic;
                  return (
                    <Box
                      key={index}
                      w={"full"}
                      cursor={"pointer"}
                      onClick={() => setCurrentCourseTopic(index)}
                    >
                      <Flex
                        key={index}
                        gap={4}
                        align={"center"}
                        border={"1px solid #eaeaea"}
                        p={4}
                      >
                        <Flex
                          w={10}
                          minW={10}
                          h={10}
                          align={"center"}
                          justifyContent={"center"}
                          borderRadius={100}
                          border={"1px solid #eaeaea"}
                          borderColor={isCurrent ? "purple" : "gray.300"}
                          fontWeight={isCurrent ? 500 : 400}
                        >
                          {index + 1}
                        </Flex>
                        <Text
                          fontWeight={isCurrent ? 500 : 400}
                          color={isCurrent ? "black" : "gray.600"}
                        >
                          {item.title}
                        </Text>
                      </Flex>
                    </Box>
                  );
                })}
              </VStack>
              <Box>
                <Flex
                  borderBottom={"1px solid #eaeaea"}
                  borderTop={"1px solid #eaeaea"}
                  mb={10}
                >
                  <TabItem
                    tabIndex={0}
                    selectedTab={selectedTab}
                    title={"Overview"}
                    setSelectedTab={setSelectedTab}
                  />
                  <TabItem
                    tabIndex={1}
                    selectedTab={selectedTab}
                    title={"Table of Content"}
                    setSelectedTab={setSelectedTab}
                  />
                  <TabItem
                    tabIndex={2}
                    selectedTab={selectedTab}
                    title={"Resouces"}
                    setSelectedTab={setSelectedTab}
                  />
                  <TabItem
                    tabIndex={3}
                    selectedTab={selectedTab}
                    title={"Quiz"}
                    setSelectedTab={setSelectedTab}
                  />
                </Flex>

                {renderPageContent(course.courseTopics[currentCourseTopic])}
              </Box>
            </Grid>
          </Container>

          <Container maxW={"8xl"}>
            <Flex
              align="start"
              pos="relative"
              position="static"
              justify={"space-between"}
              gap={10}
            ></Flex>
          </Container>
        </Box>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Seo
          title={title}
          description={description}
          structuredData={JSON.stringify(course.structuredData)}
          ogImage={
            course.images
              ? course.images.ogimg
              : "https://assets.howtowealthy.com/ogimg.png"
          }
        />

        <Container maxW={"6xl"} minH={"50vh"} py={10}>
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
                🎉 Free for Limited Period
              </Text>
              <Heading as={"h1"}>
                Introduction to Financial Statement Analysis
              </Heading>
              <Text color={"gray.600"} pb={8} fontSize={"lg"}>
                Ever wondered how to make sense of balance sheets and income
                statements? 📑 Want to ace your investment game? This course is
                your golden ticket!
              </Text>
            </Stack>
            <Flex>
              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={20}>
                  <Stack spacing={4}>
                    <HStack align={"top"}>
                      <Box w={"100%"}>
                        <FormControl
                          isInvalid={
                            formik.touched.firstName &&
                            Boolean(formik.errors.firstName)
                          }
                        >
                          <FormLabel htmlFor={"firstName"}>
                            First Name
                          </FormLabel>
                          <Input
                            name="firstName"
                            id="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            type="text"
                          />
                          {formik.touched.firstName &&
                            Boolean(formik.errors.firstName) && (
                              <FormErrorMessage>
                                {formik.errors.firstName}
                              </FormErrorMessage>
                            )}
                        </FormControl>
                      </Box>
                      <Box w={"100%"}>
                        <FormControl
                          isInvalid={
                            formik.touched.lastName &&
                            Boolean(formik.errors.lastName)
                          }
                        >
                          <FormLabel htmlFor="lastName">Last Name</FormLabel>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            type="text"
                          />
                          {formik.touched.lastName &&
                            Boolean(formik.errors.lastName) && (
                              <FormErrorMessage>
                                {formik.errors.lastName}
                              </FormErrorMessage>
                            )}
                        </FormControl>
                      </Box>
                    </HStack>
                    <FormControl
                      isInvalid={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                    >
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <Input
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        type="text"
                      />
                      {formik.touched.email && Boolean(formik.errors.email) && (
                        <FormErrorMessage>
                          {formik.errors.email}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      isInvalid={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        type="password"
                      />
                      {formik.touched.password &&
                        Boolean(formik.errors.password) && (
                          <FormErrorMessage>
                            {formik.errors.password}
                          </FormErrorMessage>
                        )}
                    </FormControl>
                    <Stack spacing={7}>
                      <FormControl
                        isInvalid={
                          formik.touched.agree && Boolean(formik.errors.agree)
                        }
                      >
                        <Checkbox
                          id="agree"
                          name="agree"
                          value={formik.values.agree}
                          onChange={formik.handleChange}
                        >
                          Agree to Terms and Condtions and Privacy Policy
                        </Checkbox>
                        {formik.touched.agree &&
                          Boolean(formik.errors.agree) && (
                            <FormErrorMessage>
                              {formik.errors.agree}
                            </FormErrorMessage>
                          )}
                      </FormControl>
                      <Stack gap={2}>
                        <Button
                          isLoading={isLoading}
                          type={"submit"}
                          colorScheme={"black"}
                        >
                          Avail your free ticket
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </form>
            </Flex>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} mt={20}>
            {features.map((item) => {
              return (
                <Box key={item.title} border={"1px solid #f5f5f5"} p={5}>
                  <Icon as={item.icon} mb={5} fontSize={32} />
                  <Heading as={"h3"} fontSize={"lg"} mb={2}>
                    {item.title}
                  </Heading>
                  <Text color={"gray.700"}>{item.subtitle}</Text>
                </Box>
              );
            })}
          </SimpleGrid>
        </Container>
      </Layout>
    );
  }
};

const features = [
  {
    title: "100% On-Demand",
    subtitle:
      "No need to rush; learn at your own pace. Access the course whenever it suits you best. Whether you're a morning person or a night owl, our course is available whenever you are.",
    icon: FaHourglass,
  },
  {
    title: "Exercise Driven",
    subtitle:
      "We believe in learning by doing. Our exercises are practical, real-world scenarios that will help you grasp the concepts of financial statement analysis with ease. ",
    icon: FaLightbulb,
  },
  {
    title: "Weekly Bonus Analysis",
    subtitle:
      "Each week, we provide you with extra tips, tricks, and analysis to keep you on your toes. Stay updated and sharpen your skills to make informed decisions in the dynamic world of stocks.",
    icon: FaBook,
  },
  {
    title: "Lifetime Access",
    subtitle:
      "Once you're in, you're in for good! With lifetime access, you can revisit the course whenever you need a refresher or want to explore more advanced topics. ",
    icon: FaSmile,
  },
];

const TabItem = ({ tabIndex, title, selectedTab, setSelectedTab }) => {
  return (
    <Box
      py={3}
      px={7}
      backgroundColor={selectedTab == tabIndex ? "gray.100" : "white"}
      onClick={() => setSelectedTab(tabIndex)}
      cursor={"pointer"}
      fontWeight={selectedTab == tabIndex ? 500 : 400}
      color={selectedTab == tabIndex ? "black" : "gray.700"}
    >
      <Text>{title}</Text>
    </Box>
  );
};

export default SinglePost;
