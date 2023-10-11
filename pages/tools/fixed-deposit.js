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
import ToolsLayout from "../../src/components/layout/tools";
import TabInput from "../../src/components/tab-input";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const validationSchema = yup.object({
  initialInvestment: yup
    .number("Enter valid initial investment")
    .min(500, "Enter initial investment more than 500")
    .max(1000000, "Enter initial investment less than 1,000,000")
    .required("Enter valid initial investment"),
  rateOfInterest: yup
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

const FixedDepositCalculator = () => {
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
      initialInvestment: 10000,
      rateOfInterest: 6,
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
      new URL("../../src/workers/fd.js", import.meta.url)
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
        headline: "Fixed Deposit Calculator - How to Wealthy",
        publisher: {
          name: "How to Wealthy",
          "@type": "Organization",
        },
        description:
          "FD Calculator - Calculate fixed deposit interest rates and maturity amount online. Fixed deposit calculator helps you to calculate the maturity and interest amount you can earn on your fixed deposit investment.",
        dateModified: "2022-12-03",
        datePublished: "2022-12-03",
        mainEntityOfPage: {
          "@id": "https://www.howtowealthy.com/tools/fixed-deposit",
          "@type": "WebPage",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.howtowealthy.com/tools/fixed-deposit#breadcrumb`,
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
            name: "Fixed Deposit Calculator",
          },
        ],
      },
    ],
  };

  return (
    <ToolsLayout
      title="Fixed Deposit Calculator - How to Wealthy"
      description="FD Calculator - Calculate fixed deposit interest rates and maturity amount online. Fixed deposit calculator helps you to calculate the maturity and interest amount you can earn on your fixed deposit investment."
      structuredData={JSON.stringify(structuredData)}
      ogImage={
        "https://assets.howtowealthy.com/ogimg-fixed-deposit-calculator.png"
      }
      path={"/tools/fixed-deposit"}
    >
      <Box>
        <Box pb={10}>
          <Heading as={"h1"} fontSize={"2xl"} mb={2}>
            Fixed Deposit Calculator
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
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
                <FormControl
                  isInvalid={
                    formik.touched.initialInvestment &&
                    Boolean(formik.errors.initialInvestment)
                  }
                >
                  <FormLabel htmlFor="initialInvestment">
                    Initial Investment
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Text>{currency.value}</Text>
                    </InputLeftElement>
                    <Input
                      value={formik.values.initialInvestment}
                      name="initialInvestment"
                      type="number"
                      onChange={formik.handleChange}
                    />
                  </InputGroup>

                  {formik.touched.initialInvestment &&
                    Boolean(formik.errors.initialInvestment) && (
                      <FormErrorMessage>
                        {formik.errors.initialInvestment}
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
                      <Text pr={5}>Year</Text>
                    </InputRightElement>
                  </InputGroup>

                  {formik.touched.rateOfInterest &&
                    Boolean(formik.errors.rateOfInterest) && (
                      <FormErrorMessage>
                        {formik.errors.rateOfInterest}
                      </FormErrorMessage>
                    )}
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.touched.duration && Boolean(formik.errors.duration)
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
                      <Text pr={5}>Year</Text>
                    </InputRightElement>
                  </InputGroup>

                  {formik.touched.duration &&
                    Boolean(formik.errors.duration) && (
                      <FormErrorMessage>
                        {formik.errors.duration}
                      </FormErrorMessage>
                    )}
                </FormControl>
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
                    <Heading as={"h3"} fontSize={"2xl"}>
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
                    <Heading as={"h3"} fontSize={"2xl"}>
                      {currency.value}{" "}
                      {numberFormater(result.investmentValue[0] || 0)}
                    </Heading>
                    <Text>Invested Amount</Text>
                  </Box>
                  <Box>
                    <Heading as={"h3"} fontSize={"2xl"}>
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
                    colors: ["#000", "#555"],
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
                  <Th>Month</Th>
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
          <div className={"post-content"}>
            <p>
              A fixed deposit calculator is an internet-based tool crafted to
              provide individuals with an estimation of their anticipated
              returns upon the completion of a fixed deposit period. It
              considers factors such as the initial deposit amount, deposit
              duration, and the prevailing interest rate to compute the final
              maturity amount. Therefore, prior to making an investment in a
              fixed deposit, this calculator offers insight into your
              prospective gains, enabling you to make informed financial
              choices.
            </p>
          </div>
        </Box>
      </Box>
    </ToolsLayout>
  );
};

export default FixedDepositCalculator;
