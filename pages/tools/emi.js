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
        headline: "EMI Calculator - How to Wealthy",
        publisher: {
          name: "How to Wealthy",
          "@type": "Organization",
        },
        description:
          "Work out interest and monthly repayments for your loan or mortgage. Includes options for extra payments",
        dateModified: "2022-12-03",
        datePublished: "2022-12-03",
        mainEntityOfPage: {
          "@id": "https://www.howtowealthy.com/tools/emi",
          "@type": "WebPage",
        },
      },
    ],
  };

  return (
    <ToolsLayout
      path={"/tools/emi"}
      title="EMI Calculator - How to Wealthy"
      description="Work out interest and monthly repayments for your loan or mortgage. Includes options for extra payments"
      structuredData={JSON.stringify(structuredData)}
      ogImage={"https://assets.howtowealthy.com/ogimg-emi-calculator.png"}
    >
      <Box>
        <Box pb={10}>
          <Heading as={"h1"} fontSize={"2xl"} mb={2}>
            EMI (Equated Monthly Installment) Calculator
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
                    formik.touched.loanValue && Boolean(formik.errors.loanValue)
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
                      <FormErrorMessage>{formik.errors.year}</FormErrorMessage>
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

                    {formik.touched.month && Boolean(formik.errors.month) && (
                      <FormErrorMessage>{formik.errors.month}</FormErrorMessage>
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
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20}>
                <SimpleGrid columns={{ base: 1 }} spacing={5}>
                  <Box>
                    <Heading as={"h3"} fontSize={"2xl"}>
                      {currency.value} {numberFormater(result.emi || 0)}
                    </Heading>
                    <Text color={"gray.600"}>EMI</Text>
                  </Box>
                  <Box>
                    <Heading as={"h3"} fontSize={"2xl"}>
                      {currency.value}{" "}
                      {numberFormater(result.totalInterest || 0)}
                    </Heading>
                    <Text color={"gray.600"}>Interest Amount</Text>
                  </Box>
                  <Box>
                    <Heading as={"h3"} fontSize={"2xl"}>
                      {currency.value} {numberFormater(result.balance[0] || 0)}
                    </Heading>
                    <Text color={"gray.600"}>Loan Amount</Text>
                  </Box>
                </SimpleGrid>

                <Chart
                  type="donut"
                  series={[result.totalInterest, result.balance[0]]}
                  options={{
                    labels: ["Interest Amount", "Loan Amount"],
                    colors: ["#000", "#555"],

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
          <div className={"post-content"}>
            <p>
              An EMI calculator is a user-friendly tool for anyone considering a
              loan. When you take a loan from a financial institution, you
              control the loan principal and tenure, while the provider
              determines the interest rate. Ensuring you can repay the loan
              without struggle is crucial, and that&apos;s where the EMI
              (Equated Monthly Installment) comes in.
            </p>
            <p>
              This EMI calculator helps you determine your personal loan EMI,
              car loan EMI, or home loan EMI effortlessly. If you&apos;re
              considering a student loan, the 529 loan calculator can help you
              invest in education tax-free. Otherwise, the EMI calculator is a
              great starting point for comparing different loan options.
            </p>
            <p>
              EMI, short for Equated Monthly Installment, is the fixed monthly
              payment you make to repay your loan. It comprises both the
              principal and interest portions. In the beginning, a larger part
              of the EMI goes toward paying interest, but as you repay the loan,
              the principal portion increases. Interest rates and loan terms
              affect the EMI, with higher rates resulting in higher EMIs and
              shorter loan terms increasing the EMI.
            </p>
            <h2>To use the EMI calculator:</h2>
            <ol>
              <li>Enter the Principal loan amount (the amount you borrow).</li>
              <li>Input the Loan term (the duration of the loan).</li>
              <li>Provide the Interest rate (the annual interest rate).</li>
            </ol>
            <h2>FAQ:</h2>
            <ol>
              <li>
                <h3>What is EMI?</h3>
                <p>
                  EMI stands for Equated Monthly Installment. It is the total
                  monthly payment a borrower makes to repay a loan throughout
                  the loan term.
                </p>
              </li>
              <li>
                <h3>How do I calculate monthly EMI?</h3>
                <p>
                  To calculate monthly EMI, determine the principal loan amount,
                  find the monthly interest rate, estimate the number of months
                  for each EMI payment, and apply the EMI formula provided in
                  the article.
                </p>
              </li>
              <li>
                <h3>Can my EMI change during the loan term?</h3>
                <p>
                  Yes, your EMI can change, depending on whether you have a
                  floating rate EMI, which fluctuates with market conditions, or
                  a flat rate EMI with a fixed interest rate.
                </p>
              </li>
              <li>
                <h3>
                  What happens when the floating interest rate increases or
                  decreases during the loan term?
                </h3>
                <p>
                  When the floating interest rate increases, the loan repayment
                  extends to maintain the same EMI amount. If it decreases, the
                  loan is repaid sooner.
                </p>
              </li>
              <li>
                <h3>What happens if I prepay the loan?</h3>
                <p>
                  Prepaying the loan means paying it off sooner and incurring
                  less interest. Prepayments are usually allowed without
                  penalties, but they may affect your credit score.
                </p>
              </li>
              <li>
                <h3>How do missing EMI payments impact my loan schedule?</h3>
                <p>
                  Missing EMI payments can increase the loan term, and to avoid
                  this, you&apos;ll need to increase the EMI amount. It&apos;s
                  essential to plan ahead and make payments on time to maintain
                  a good credit score.
                </p>
              </li>
            </ol>
          </div>
        </Box>
      </Box>
    </ToolsLayout>
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
