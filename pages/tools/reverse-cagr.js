import {
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
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import ToolsLayout from "../../src/components/layout/tools";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useRef, useCallback, useState } from "react";
import numberFormater from "../../src/utils/number_format";
import dynamic from "next/dynamic";
import TabInput from "../../src/components/tab-input";

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
    ],
  };

  return (
    <ToolsLayout
      path={"/tools/reverse-cagr"}
      title={"Reverse CAGR Calculator - How to Wealthy"}
      description={
        "The Reverse CAGR Calculator is simply means if You know the annual return of any instrument, you can calculate the final value or maturity value of an investment using this calculator."
      }
      structuredData={structuredData}
      ogImage={"https://assets.howtowealthy.com/ogimg-cagr-calculator.png"}
    >
      <Box pb={10}>
        <Heading as={"h1"} fontSize={"3xl"} mb={2}>
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
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
              <FormControl
                isInvalid={
                  formik.touched.initialValue &&
                  Boolean(formik.errors.initialValue)
                }
              >
                <FormLabel htmlFor="initialValue">Initial Value</FormLabel>
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
                isInvalid={formik.touched.cagr && Boolean(formik.errors.cagr)}
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
                  <FormErrorMessage>{formik.errors.cagr}</FormErrorMessage>
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
                    <Text pr={5}>Yearly</Text>
                  </InputRightElement>
                </InputGroup>

                {formik.touched.duration && Boolean(formik.errors.duration) && (
                  <FormErrorMessage>{formik.errors.duration}</FormErrorMessage>
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
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                <Box>
                  <Heading as={"h3"} fontSize={"2xl"}>
                    {currency.value}{" "}
                    {numberFormater(
                      result.investmentValue[
                        result.investmentValue.length - 1
                      ] || 0
                    )}
                  </Heading>
                  <Text color={"gray.600"}>Maturity Value</Text>
                </Box>
                <Box>
                  <Heading as={"h3"} fontSize={"2xl"}>
                    {currency.value}{" "}
                    {numberFormater(result.investmentValue[0] || 0)}
                  </Heading>
                  <Text color={"gray.600"}>Invested Amount</Text>
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
                  <Text color={"gray.600"}>Interest Earned</Text>
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
        <div className={"post-content"} w={"full"}>
          <p>
            Financial planning is crucial for managing one&apos;s finances and
            achieving long-term goals. One essential tool in this realm is the
            Compound Annual Growth Rate (CAGR), which calculates the annual
            growth rate of an investment over a specific period. While
            calculating CAGR for a known investment is common, understanding the
            reverse CAGR calculator is equally valuable. This article will
            explore the concept of a Reverse CAGR Calculator, explain its
            significance, and offer guidance on its practical application.
          </p>
          <h2>Understanding CAGR</h2>
          <p>
            Before discussing the reverse CAGR calculator, it&apos;s important
            to briefly review what CAGR represents. The Compound Annual Growth
            Rate (CAGR) is a mathematical measure that computes the annualized
            rate of return on an investment over a specified period, assuming
            consistent annual growth or decline. CAGR is a valuable tool for
            evaluating investment performance, especially when dealing with
            varying annual returns.
          </p>
          <h2>The Relevance of a Reverse CAGR Calculator</h2>
          <p>
            A reverse CAGR calculator is useful in various real-life scenarios
            due to its versatility and practicality:
          </p>
          <ol>
            <li>
              <strong>Goal Planning</strong>: Many individuals have financial
              goals such as saving for retirement or buying a property.
              Goal-based investing involves determining the required annual
              growth rate to achieve these objectives, and a reverse CAGR
              calculator can assist in this. 2
            </li>
            <li>
              <strong>Risk Assessment</strong>: Understanding reverse CAGR helps
              assess whether investment choices align with financial goals and
              reveals the level of risk needed to achieve those goals.
            </li>
            <li>
              <strong>Comparing Investments</strong>: When faced with multiple
              investment options, calculating reverse CAGR allows for a more
              comprehensive assessment of which investment aligns better with
              financial aspirations.
            </li>
            <li>
              <strong>Legacy Planning</strong>: For those interested in leaving
              a financial legacy, reverse CAGR helps determine the current
              investment needed to fulfill that legacy in the future.
            </li>
          </ol>
          <h2>Utilizing a Reverse CAGR Calculator</h2>
          <p>The Reverse CAGR formula is as follows:</p>
          <p>
            Final value = Initial value * ( 1 + R/100)<sup>t</sup>
          </p>
          <p>
            Where,
            <br />
            t: Duration in years
            <br />
            R: CAGR in %<br />
            Initial value: Initial Investment value
            <br />
            Final Value: Maturity value of investment at the end of duration
            <br />
          </p>
          <h2>Conclusion</h2>
          <p>
            The reverse CAGR calculator is a valuable resource for individuals
            involved in financial planning. It enables them to assess the
            feasibility of their financial goals, make informed investment
            choices, and strategize effectively for their financial future. By
            mastering the use of this calculator, individuals can take control
            of their financial destiny and confidently pursue their long-term
            financial objectives.
          </p>
          <h2>Frequently Asked Questions</h2>
          <h3>
            FAQ 1: What is the importance of a credit score, and how can it be
            improved?
          </h3>
          <p>
            Answer: A credit score reflects your creditworthiness and is used by
            lenders to assess your ability to manage debt responsibly. A higher
            credit score often leads to better loan terms and lower interest
            rates. To improve your credit score, focus on paying bills on time,
            reducing credit card balances, avoiding excessive new credit
            accounts, maintaining a mix of credit types, and regularly checking
            your credit report for errors.
          </p>
          <h3>
            FAQ 2: How does compound interest work, and why is it important for
            savings and investments?
          </h3>
          <p>
            Answer: Compound interest is the interest earned not only on the
            initial investment but also on the interest that accumulates over
            time. It&apos;s crucial for savings and investments because it
            allows your money to grow exponentially. The longer your money is
            invested or saved, the more significant the compounding effect
            becomes, helping you build wealth over time.
          </p>
          <h3>
            FAQ 3: What&apos;s the difference between stocks and bonds in
            investing?
          </h3>
          <p>
            Answer: Stocks represent ownership in a company and offer potential
            for capital appreciation and dividends. They are typically riskier
            but offer higher potential returns. Bonds are debt securities issued
            by governments or corporations. When you buy a bond, you&apos;re
            lending money and receiving periodic interest payments (coupon) and
            the principal back at maturity. Bonds are generally considered less
            risky than stocks but offer lower returns.
          </p>
          <h3>FAQ 4: How can I create a budget and stick to it?</h3>
          <p>
            Answer: Creating and sticking to a budget is essential for effective
            financial management. Follow these steps: assess your financial
            situation, set specific goals, track your spending for a month,
            create a budget allocating income to expenses, savings, and debt
            payments, regularly monitor and adjust your budget, use budgeting
            tools, and stay disciplined by avoiding unnecessary expenses and
            prioritizing financial goals.
          </p>
        </div>
      </Box>
    </ToolsLayout>
  );
};

export default ReverseCompoundAnnualGrowthRateCalculator;
