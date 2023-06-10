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
  loanValue: yup
    .number("Enter valid initial investment")
    .min(500, "Enter initial investment more than 500")
    .max(20000000, "Enter initial investment less than 1,000,000")
    .required("Enter valid initial investment"),
  rateOfInterest: yup
    .number("Enter valid rate of interest")
    .min(4, "Enter rate of interest more than 4")
    .max(25, "Enter rate of interest less than 25")
    .required("Enter valid rate of interest"),
  year: yup
    .number("Enter valid year")
    .min(0, "Enter year more than 0")
    .max(30, "Enter year less than 30")
    .required("Enter valid year"),
  month: yup
    .number("Enter valid month")
    .min(0, "Enter month more than 0")
    .max(11, "Enter month less than 11")
    .required("Enter valid month"),
});

const EquatedMonthlyInsatllmentCalculator = () => {
  const workerRef = useRef();
  const [currency, setCurrency] = useState({ label: "USD ($)", value: "$" });
  const [breakdown, setBreakdown] = useState({
    label: "Monthly",
    value: "Month",
  });
  const [result, setResult] = useState({
    emi: 0,
    totalInterest: 0,
    principal: [],
    interest: [],
    totalPayment: [],
    balance: [],
    loanPaidPercentage: [],
    yearlyPrincipal: [],
    yearlyInterest: [],
    yearlyTotalPayment: [],
    yearlyBalance: [],
    yearlyLoanPaidPercentage: [],
  });

  const formik = useFormik({
    initialValues: {
      loanValue: 10000,
      rateOfInterest: 6,
      year: 3,
      month: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../src/workers/emi.js", import.meta.url)
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
        headline: "Investment Calculator - How to Wealthy",
        publisher: {
          name: "How to Wealthy",
          "@type": "Organization",
        },
        description:
          "Investing is one of the best ways to build wealth over time. But before you invest, you should know what your prospect returns are. Calculate your inflation adjusted investment value with step SIP.",
        dateModified: "2022-12-03",
        datePublished: "2022-12-03",
        mainEntityOfPage: {
          "@id": "https://www.howtowealthy.com/tools/investment-calculator",
          "@type": "WebPage",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.howtowealthy.com/tools/investment-calculator#breadcrumb`,
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
            name: "Investment Calculator",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Seo
        title="Investment Calculator - How to Wealthy"
        description="Investing is one of the best ways to build wealth over time. But before you invest, you should know what your prospect returns are. Calculate your inflation adjusted investment value with step SIP."
        structuredData={JSON.stringify(structuredData)}
        ogImage={
          "https://assets.howtowealthy.com/ogimg-investment-calculator.png"
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
                Equated Monthly Insatllment(EMI) Calculator
              </Heading>
              <Text fontSize={"2xl"} fontWeight={300}>
                Investing is one of the best ways to build wealth over time. But
                before you invest, you should know what your prospect returns
                are. Calculate your inflation adjusted investment value with
                step SIP.
              </Text>
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
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    <FormControl
                      isInvalid={
                        formik.touched.loanValue &&
                        Boolean(formik.errors.loanValue)
                      }
                    >
                      <FormLabel htmlFor="loanValue">Loan Value</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Text>{currency.value}</Text>
                        </InputLeftElement>
                        <Input
                          value={formik.values.loanValue}
                          name="loanValue"
                          type="number"
                          onChange={formik.handleChange}
                        />
                      </InputGroup>

                      {formik.touched.loanValue &&
                        Boolean(formik.errors.loanValue) && (
                          <FormErrorMessage>
                            {formik.errors.loanValue}
                          </FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl
                      isInvalid={
                        formik.touched.rateOfInterest &&
                        Boolean(formik.errors.rateOfInterest)
                      }
                    >
                      <FormLabel htmlFor="rateOfInterest">
                        Rate of Interest
                      </FormLabel>
                      <InputGroup>
                        <Input
                          value={formik.values.rateOfInterest}
                          name="rateOfInterest"
                          type="number"
                          onChange={formik.handleChange}
                        />
                        <InputRightElement pointerEvents="none">
                          <Text pr={5}>Yearly</Text>
                        </InputRightElement>
                      </InputGroup>

                      {formik.touched.rateOfInterest &&
                        Boolean(formik.errors.rateOfInterest) && (
                          <FormErrorMessage>
                            {formik.errors.rateOfInterest}
                          </FormErrorMessage>
                        )}
                    </FormControl>

                    <SimpleGrid columns={{ base: 2, md: 2 }} spacing={5}>
                      <FormControl
                        isInvalid={
                          formik.touched.year && Boolean(formik.errors.year)
                        }
                      >
                        <FormLabel htmlFor="year">Year</FormLabel>
                        <InputGroup>
                          <Input
                            value={formik.values.year}
                            name="year"
                            type="number"
                            onChange={formik.handleChange}
                          />
                        </InputGroup>

                        {formik.touched.year && Boolean(formik.errors.year) && (
                          <FormErrorMessage>
                            {formik.errors.year}
                          </FormErrorMessage>
                        )}
                      </FormControl>
                      <FormControl
                        isInvalid={
                          formik.touched.month && Boolean(formik.errors.month)
                        }
                      >
                        <FormLabel htmlFor="month">Month</FormLabel>
                        <InputGroup>
                          <Input
                            value={formik.values.month}
                            name="month"
                            type="number"
                            onChange={formik.handleChange}
                          />
                        </InputGroup>

                        {formik.touched.month &&
                          Boolean(formik.errors.month) && (
                            <FormErrorMessage>
                              {formik.errors.month}
                            </FormErrorMessage>
                          )}
                      </FormControl>
                    </SimpleGrid>

                    <Button colorScheme={"primary"} type="submit">
                      Calculate
                    </Button>
                  </SimpleGrid>
                </Stack>
              </form>
            </Box>

            {result.balance.length > 1 && (
              <Box>
                <Stack mt={20} mb={10} gap={10}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <SimpleGrid columns={{ base: 1, md: 1 }} spacing={10}>
                      <Box>
                        <Heading>
                          {currency.value} {numberFormater(result.emi || 0)}
                        </Heading>
                        <Text>EMI</Text>
                      </Box>
                      <Box>
                        <Heading>
                          {currency.value}{" "}
                          {numberFormater(result.totalInterest || 0)}
                        </Heading>
                        <Text>Interest Amount</Text>
                      </Box>
                      <Box>
                        <Heading>
                          {currency.value}{" "}
                          {numberFormater(result.balance[0] || 0)}
                        </Heading>
                        <Text>Loan Amount</Text>
                      </Box>
                    </SimpleGrid>

                    <Chart
                      type="donut"
                      series={[result.totalInterest, result.balance[0]]}
                      options={{
                        labels: ["Interest Amount", "Loan Amount"],

                        fill: {
                          colors: ["#000", "#555"],
                        },
                      }}
                    />
                  </SimpleGrid>
                </Stack>
              </Box>
            )}

            {result.balance.length > 1 && (
              <Box overflowX={"auto"} mt={20}>
                <TabInput
                  handleChange={setBreakdown}
                  options={[
                    { label: "Monthly", value: "Month" },
                    { label: "Yearly", value: "Year" },
                  ]}
                  currentValue={breakdown}
                />
                <Table>
                  <Thead>
                    <Tr>
                      <Th>{breakdown.value}</Th>
                      <Th textAlign={"right"}>Principal (A)</Th>
                      <Th textAlign={"right"}>Interest (B)</Th>
                      <Th textAlign={"right"}>Total Payment (A+B)</Th>
                      <Th textAlign={"right"}>Balance</Th>
                      <Th textAlign={"right"}>Loan Paid</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {breakdown.value == "Month" &&
                      result.balance.map((item, idx) => {
                        return (
                          <Tr key={idx}>
                            <Td>{idx}</Td>
                            <Td textAlign={"right"}>
                              {numberFormater(result.principal[idx])}
                            </Td>
                            <Td textAlign={"right"}>
                              {numberFormater(result.interest[idx])}
                            </Td>
                            <Td textAlign={"right"}>
                              {numberFormater(result.totalPayment[idx])}
                            </Td>
                            <Td textAlign={"right"}>
                              {numberFormater(result.balance[idx])}
                            </Td>
                            <Td textAlign={"right"}>
                              {numberFormater(result.loanPaidPercentage[idx]) +
                                " %"}
                            </Td>
                          </Tr>
                        );
                      })}
                    {breakdown.value == "Year" &&
                      result.yearlyBalance.map((item, idx) => {
                        return (
                          <Tr key={idx}>
                            <Td>{idx}</Td>
                            <Td textAlign={"right"}>
                              {numberFormater(result.yearlyPrincipal[idx])}
                            </Td>
                            <Td textAlign={"right"}>
                              {numberFormater(result.yearlyInterest[idx])}
                            </Td>
                            <Td textAlign={"right"}>
                              {numberFormater(result.yearlyTotalPayment[idx])}
                            </Td>
                            <Td textAlign={"right"}>
                              {numberFormater(result.yearlyBalance[idx])}
                            </Td>
                            <Td textAlign={"right"}>
                              {numberFormater(
                                result.yearlyLoanPaidPercentage[idx] + " %"
                              )}
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

export default EquatedMonthlyInsatllmentCalculator;
