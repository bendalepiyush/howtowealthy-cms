import {
  Container,
  Box,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Td,
  SimpleGrid,
  Button,
  Table,
  Tbody,
  Tr,
  Thead,
  Th,
  Flex,
  Spacer,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Badge,
  FormErrorMessage,
} from "@chakra-ui/react";
import Layout from "../../src/components/layout";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useRef, useCallback, useState } from "react";
import numberFormater from "../../src/utils/number_format";
import Seo from "../../src/components/seo";
import Link from "next/link";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const validationSchema = yup.object({
  initialValue: yup
    .number("Enter valid initial investment")
    .min(500, "Enter initial investment more than 500")
    .max(1000000, "Enter initial investment less than 1,000,000")
    .required("Enter valid initial investment"),
  cagr: yup
    .number("Enter valid rate of interest")
    .min(4, "Enter rate of interest more than 4")
    .max(25, "Enter rate of interest less than 25")
    .required("Enter valid rate of interest"),
  duration: yup
    .number("Enter valid duration")
    .min(0, "Enter duration more than 0")
    .max(30, "Enter duration less than 30")
    .required("Enter valid duration"),
});

const ReverseCompoundAnnualGrowthRateCalculator = () => {
  const workerRef = useRef();
  const [currency, setCurrency] = useState({ label: "USD ($)", value: "$" });
  const [result, setResult] = useState({
    interest: [],
    totalInterest: [],
    totalInterestInPercentage: [],
    investmentValue: [],
  });

  const formik = useFormik({
    initialValues: {
      initialValue: 10000,
      cagr: 6,
      duration: 3,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../src/workers/reverse_cagr.js", import.meta.url)
    );
    workerRef.current.onmessage = (event) => {
      setResult(event.data);
      console.log(event.data);
    };
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const handleSubmit = useCallback(async (values) => {
    workerRef.current.postMessage(values);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        image: ["https://assets.howtowealthy.com/ogimg-tools.png"],
        author: {
          url: "https://www.howtowealthy.com/about-us",
          name: "Piyush Bendale",
          "@type": "Person",
        },
        "@context": "https://schema.org",
        headline: "Reverse CAGR Calculator - How to Wealthy",
        publisher: {
          name: "How to Wealthy",
          "@type": "Organization",
        },
        description:
          "The Reverse CAGR Calculator is simply means if You know the annual return of any instrument, you can calculate the final value or maturity value of an investment using this calculator.",
        dateModified: "2022-12-03",
        datePublished: "2022-12-03",
        mainEntityOfPage: {
          "@id": "https://www.howtowealthy.com/tools/reverse-cagr",
          "@type": "WebPage",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.howtowealthy.com/tools/reverse-cagr#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.howtowealthy.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tools",
            item: `https://www.howtowealthy.com/tools`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Reverse CAGR Calculator",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Seo
        title="Reverse CAGR Calculator - How to Wealthy"
        description="The Reverse CAGR Calculator is simply means if You know the annual return of any instrument, you can calculate the final value or maturity value of an investment using this calculator."
        structuredData={JSON.stringify(structuredData)}
        ogImage={
          "https://assets.howtowealthy.com/ogimg-reverse-cagr-calculator.png"
        }
      />
      <Layout>
        <Box py={20}>
          <Container maxW={"5xl"}>
            <Box pb={16} maxW={"2xl"}>
              <Link href={`/tools`}>
                <Badge
                  variant="outline"
                  colorScheme="primary"
                  py={2}
                  px={5}
                  borderRadius={100}
                  mb={4}
                >
                  Tools
                </Badge>
              </Link>
              <Heading as={"h1"} mb={2}>
                Reverse Compound Annual Growth Rate (Reverse CAGR) Calculator
              </Heading>
            </Box>

            <Box mb={10}>
              <TabInput
                handleChange={setCurrency}
                options={[
                  { label: "USD ($)", value: "$" },
                  { label: "GBP (£)", value: "£" },
                  { label: "INR (₹)", value: "₹" },
                ]}
                currentValue={currency}
              />
            </Box>

            <Box>
              <form onSubmit={formik.handleSubmit}>
                <Stack gap={10}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <FormControl
                      isInvalid={
                        formik.touched.initialValue &&
                        Boolean(formik.errors.initialValue)
                      }
                    >
                      <FormLabel htmlFor="initialValue">
                        Initial Value
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Text>{currency.value}</Text>
                        </InputLeftElement>
                        <Input
                          value={formik.values.initialValue}
                          name="initialValue"
                          type="number"
                          onChange={formik.handleChange}
                        />
                      </InputGroup>

                      {formik.touched.initialValue &&
                        Boolean(formik.errors.initialValue) && (
                          <FormErrorMessage>
                            {formik.errors.initialValue}
                          </FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl
                      isInvalid={
                        formik.touched.cagr && Boolean(formik.errors.cagr)
                      }
                    >
                      <FormLabel htmlFor="cagr">CAGR</FormLabel>
                      <InputGroup>
                        <Input
                          value={formik.values.cagr}
                          name="cagr"
                          type="number"
                          onChange={formik.handleChange}
                        />
                        <InputRightElement pointerEvents="none">
                          <Text pr={5}>%</Text>
                        </InputRightElement>
                      </InputGroup>

                      {formik.touched.cagr && Boolean(formik.errors.cagr) && (
                        <FormErrorMessage>
                          {formik.errors.cagr}
                        </FormErrorMessage>
                      )}
                    </FormControl>

                    <FormControl
                      isInvalid={
                        formik.touched.duration &&
                        Boolean(formik.errors.duration)
                      }
                    >
                      <FormLabel htmlFor="duration">Duration</FormLabel>
                      <InputGroup>
                        <Input
                          value={formik.values.duration}
                          name="duration"
                          type="number"
                          onChange={formik.handleChange}
                        />
                        <InputRightElement pointerEvents="none">
                          <Text pr={5}>Yearly</Text>
                        </InputRightElement>
                      </InputGroup>

                      {formik.touched.duration &&
                        Boolean(formik.errors.duration) && (
                          <FormErrorMessage>
                            {formik.errors.duration}
                          </FormErrorMessage>
                        )}
                    </FormControl>
                    <div></div>
                    <Button colorScheme={"primary"} type="submit">
                      Calculate
                    </Button>
                  </SimpleGrid>
                </Stack>
              </form>
            </Box>
            {result.investmentValue.length > 1 && (
              <Box>
                <Stack mt={20} mb={10} gap={10}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <SimpleGrid columns={{ base: 1, md: 1 }} spacing={10}>
                      <Box>
                        <Heading>
                          {currency.value}{" "}
                          {numberFormater(
                            result.investmentValue[
                              result.investmentValue.length - 1
                            ] || 0
                          )}
                        </Heading>
                        <Text>Maturity Value</Text>
                      </Box>
                      <Box>
                        <Heading>
                          {currency.value}{" "}
                          {numberFormater(result.investmentValue[0] || 0)}
                        </Heading>
                        <Text>Invested Amount</Text>
                      </Box>
                      <Box>
                        <Heading>
                          {currency.value}{" "}
                          {numberFormater(
                            (
                              result.investmentValue[
                                result.investmentValue.length - 1
                              ] - result.investmentValue[0] || 0
                            ).toFixed(2)
                          )}
                        </Heading>
                        <Text>Interest Earned</Text>
                      </Box>
                    </SimpleGrid>

                    <Chart
                      type="donut"
                      series={[
                        result.totalInterest[result.investmentValue.length - 1],
                        result.investmentValue[0],
                      ]}
                      options={{
                        labels: ["Interest Earned", "Invested Amount"],

                        fill: {
                          colors: ["#000", "#555"],
                        },
                      }}
                    />
                  </SimpleGrid>
                </Stack>
              </Box>
            )}

            {result.investmentValue.length > 1 && (
              <Box overflowX={"auto"} mt={20}>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Year</Th>
                      <Th textAlign={"right"}>Interest</Th>
                      <Th textAlign={"right"}>
                        Total Interest (in {currency.value})
                      </Th>
                      <Th textAlign={"right"}>Total Interest(in %)</Th>
                      <Th textAlign={"right"}>Interest Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {result.investmentValue.map((item, idx) => {
                      return (
                        <Tr key={idx}>
                          <Td>{idx}</Td>
                          <Td textAlign={"right"}>
                            {numberFormater(result.interest[idx])}
                          </Td>
                          <Td textAlign={"right"}>
                            {numberFormater(result.totalInterest[idx])}
                          </Td>
                          <Td textAlign={"right"}>
                            {numberFormater(
                              result.totalInterestInPercentage[idx] + " %"
                            )}
                          </Td>
                          <Td textAlign={"right"}>
                            {numberFormater(result.investmentValue[idx])}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </Box>
            )}

            <Box mt={20} fontSize={"18px"} lineHeight={1.7}>
              <div className={"post-content"}></div>
            </Box>
          </Container>
        </Box>
      </Layout>
    </>
  );
};

const TabInput = ({ handleChange, options, currentValue }) => {
  return (
    <>
      <Flex>
        {options.map((item) => (
          <Box
            px={5}
            py={2}
            key={item.value}
            color={item.value === currentValue.value ? "white" : "black"}
            border={"1px solid #eaeaea"}
            background={item.value === currentValue.value ? "black" : ""}
            cursor={"pointer"}
            onClick={() => handleChange(item)}
          >
            <Text>{item.label}</Text>
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default ReverseCompoundAnnualGrowthRateCalculator;
