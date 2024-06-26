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
import ToolsLayout from "../../src/components/layout/tools";
import TabInput from "../../src/components/tab-input";

const validationSchema = yup.object({
  currentAge: yup
    .number("Enter valid age in years")
    .integer("Enter valid age in years")
    .min(10, "Current age must be more than 10 years")
    .max(100, "Current age must be less than 100 years")
    .required("Enter valid age in years"),
  retirementAge: yup
    .number("Enter valid age in years")
    .integer("Enter valid age in years")
    .min(10, "Retirement age must be more than 10 years")
    .max(100, "Retirement age must be less than 100 years")
    .moreThan(
      yup.ref("currentAge"),
      "Retirement age must be greater than current age"
    )
    .required("Enter valid age in years"),
  inflationRate: yup.number("Enter valid rate").required("Enter valid rate"),
  yearlyReturnsRate: yup
    .number("Enter valid rate")
    .required("Enter valid rate"),
  increaseMonthlyInvestment: yup
    .number("Enter valid rate")
    .min(0, "Enter valid rate")
    .required("Enter valid rate"),
  monthlyInvestment: yup
    .number("Enter valid monthly investment")
    .min(1, "Enter valid monthly investment")
    .max(1000000, "Enter monthly investment less than 1,000,000")
    .required("Enter valid monthly investment"),
});

const InvestmentCalculator = () => {
  const workerRef = useRef();
  const [currency, setCurrency] = useState({ label: "USD ($)", value: "$" });
  const [result, setResult] = useState({
    tableLabels: [],
    chartPerMonth: [],
    chartPerMonthWithInflation: [],
    chartOfInvestmnet: [],
  });

  const formik = useFormik({
    initialValues: {
      currentAge: 23,
      retirementAge: 60,
      monthlyInvestment: 10000,
      increaseMonthlyInvestment: 5,
      yearlyReturnsRate: 9,
      inflationRate: 5,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../src/workers/investment-calculator.js", import.meta.url)
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
    ],
  };

  return (
    <ToolsLayout
      path={"/tools/investment-calculator"}
      title="Investment Calculator - How to Wealthy"
      description="Investing is one of the best ways to build wealth over time. But before you invest, you should know what your prospect returns are. Calculate your inflation adjusted investment value with step SIP."
      structuredData={structuredData}
      ogImage={
        "https://assets.howtowealthy.com/ogimg-investment-calculator.png"
      }
    >
      <Box>
        <Box pb={10}>
          <Heading as={"h1"} fontSize={"3xl"} mb={2}>
            Investment Calculator
          </Heading>
          <Text fontSize={"xl"} fontWeight={300}>
            Investing is one of the best ways to build wealth over time. But
            before you invest, you should know what your prospect returns are.
            Calculate your inflation adjusted investment value with step SIP.
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
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                <FormControl
                  isInvalid={
                    formik.touched.currentAge &&
                    Boolean(formik.errors.currentAge)
                  }
                >
                  <FormLabel htmlFor="currentAge">
                    What&apos;s your current age?
                  </FormLabel>
                  <InputGroup>
                    <Input
                      value={formik.values.currentAge}
                      name="currentAge"
                      type="number"
                      onChange={formik.handleChange}
                    />
                    <InputRightElement pointerEvents="none">
                      <Text pr={5}>Year</Text>
                    </InputRightElement>
                  </InputGroup>

                  {formik.touched.currentAge &&
                    Boolean(formik.errors.currentAge) && (
                      <FormErrorMessage>
                        {formik.errors.currentAge}
                      </FormErrorMessage>
                    )}
                </FormControl>
                <FormControl
                  isInvalid={
                    formik.touched.retirementAge &&
                    Boolean(formik.errors.retirementAge)
                  }
                >
                  <FormLabel htmlFor="retirementAge">
                    At what age you want to retire?
                  </FormLabel>
                  <InputGroup>
                    <Input
                      value={formik.values.retirementAge}
                      name="retirementAge"
                      type="number"
                      onChange={formik.handleChange}
                    />
                    <InputRightElement pointerEvents="none">
                      <Text pr={5}>Year</Text>
                    </InputRightElement>
                  </InputGroup>
                  {formik.touched.retirementAge &&
                    Boolean(formik.errors.retirementAge) && (
                      <FormErrorMessage>
                        {formik.errors.retirementAge}
                      </FormErrorMessage>
                    )}
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.touched.monthlyInvestment &&
                    Boolean(formik.errors.monthlyInvestment)
                  }
                >
                  <FormLabel htmlFor="monthlyInvestment">
                    How much monthly investment you can do?
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Text>{currency.value}</Text>
                    </InputLeftElement>
                    <Input
                      value={formik.values.monthlyInvestment}
                      name="monthlyInvestment"
                      type="number"
                      onChange={formik.handleChange}
                    />
                  </InputGroup>
                  {formik.touched.monthlyInvestment &&
                    Boolean(formik.errors.monthlyInvestment) && (
                      <FormErrorMessage>
                        {formik.errors.monthlyInvestment}
                      </FormErrorMessage>
                    )}
                </FormControl>
                <FormControl
                  isInvalid={
                    formik.touched.increaseMonthlyInvestment &&
                    Boolean(formik.errors.increaseMonthlyInvestment)
                  }
                >
                  <FormLabel htmlFor="increaseMonthlyInvestment">
                    How much yearly contribution you can increase?
                  </FormLabel>
                  <InputGroup>
                    <Input
                      value={formik.values.increaseMonthlyInvestment}
                      name="increaseMonthlyInvestment"
                      type="number"
                      onChange={formik.handleChange}
                    />

                    <InputRightElement pointerEvents="none">
                      <Text>%</Text>
                    </InputRightElement>
                  </InputGroup>
                  {formik.touched.increaseMonthlyInvestment &&
                    Boolean(formik.errors.increaseMonthlyInvestment) && (
                      <FormErrorMessage>
                        {formik.errors.increaseMonthlyInvestment}
                      </FormErrorMessage>
                    )}
                </FormControl>
                <FormControl
                  isInvalid={
                    formik.touched.yearlyReturnsRate &&
                    Boolean(formik.errors.yearlyReturnsRate)
                  }
                >
                  <FormLabel htmlFor="yearlyReturnsRate">
                    How much yearly return you can generate?
                  </FormLabel>
                  <InputGroup>
                    <Input
                      value={formik.values.yearlyReturnsRate}
                      name="yearlyReturnsRate"
                      type="number"
                      onChange={formik.handleChange}
                    />
                    <InputRightElement pointerEvents="none">
                      <Text>%</Text>
                    </InputRightElement>
                  </InputGroup>
                  {formik.touched.yearlyReturnsRate &&
                    Boolean(formik.errors.yearlyReturnsRate) && (
                      <FormErrorMessage>
                        {formik.errors.yearlyReturnsRate}
                      </FormErrorMessage>
                    )}
                </FormControl>
                <FormControl
                  isInvalid={
                    formik.touched.inflationRate &&
                    Boolean(formik.errors.inflationRate)
                  }
                >
                  <FormLabel htmlFor="inflationRate">
                    What is the inflation rate in your country?
                  </FormLabel>
                  <InputGroup>
                    <Input
                      value={formik.values.inflationRate}
                      name="inflationRate"
                      type="number"
                      onChange={formik.handleChange}
                    />
                    <InputRightElement pointerEvents="none">
                      <Text>%</Text>
                    </InputRightElement>
                  </InputGroup>
                  {formik.touched.inflationRate &&
                    Boolean(formik.errors.inflationRate) && (
                      <FormErrorMessage>
                        {formik.errors.inflationRate}
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

        {result.chartOfInvestmnet.length > 1 && (
          <>
            <Flex
              mt={20}
              mb={10}
              gap={5}
              direction={{ base: "column", md: "row" }}
            >
              <Box>
                <Heading>
                  {currency.value}{" "}
                  {numberFormater(
                    result.chartPerMonth[result.chartPerMonth.length - 1] || 0
                  )}
                </Heading>
                <Text>Maturity Value</Text>
              </Box>
              <Spacer />
              <Box textAlign={{ base: "left", md: "right" }}>
                <Heading>
                  {currency.value}{" "}
                  {numberFormater(result.inflationAdjusted || 0)}
                </Heading>
                <Text>Inflation Adjusted</Text>
              </Box>
            </Flex>

            <Box mb={10} background={"gray.50"} p={5} textAlign={"center"}>
              <Text fontSize={"xl"}>
                In other words, at the end of your retirement age, you will have{" "}
                <strong>
                  {currency.value}{" "}
                  {numberFormater(result.inflationAdjusted || 0)}
                </strong>{" "}
                (in today&apos;s money) to spend
              </Text>
            </Box>

            <Box overflowX={"auto"} mt={20}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Year</Th>
                    <Th textAlign={"right"}>Deposits per Month</Th>
                    <Th textAlign={"right"}>
                      Total Deposits (in {currency.value})
                    </Th>
                    <Th textAlign={"right"}>
                      Accrued Earnings (in {currency.value})
                    </Th>
                    <Th textAlign={"right"}>Balance (in {currency.value})</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {result.chartPerMonth.map((item, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td>{result.tableLabels[idx]}</Td>
                        <Td textAlign={"right"}>
                          {numberFormater(result.chartOfIncrement[idx])}
                        </Td>
                        <Td textAlign={"right"}>
                          {numberFormater(result.chartOfTotalDeposits[idx])}
                        </Td>
                        <Td textAlign={"right"}>
                          {numberFormater(
                            item - result.chartOfTotalDeposits[idx]
                          )}
                        </Td>
                        <Td textAlign={"right"}>{numberFormater(item)}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          </>
        )}

        <Box mt={20} fontSize={"18px"} lineHeight={1.7}>
          <div className={"post-content"}>
            <p>
              Prospective investors may need help determining their future
              investment returns. Investment methods like fixed deposits and
              systematic investment plans (SIPs) require a great deal of the
              returns to be understood beforehand so that you are protected from
              all the volatility you may encounter in between. You can use an
              investing calculator to help you calculate the profits you can
              expect from placing your money in these investment instruments.
              Regularly investing a set amount of money in mutual funds is known
              as a systematic investment plan or SIP. SIPs often let you make
              weekly, monthly, or quarterly investments.
            </p>
            <h2>What does an Investment calculator do?</h2>
            <p>
              An investing calculator is a simple tool that allows individuals
              to estimate the return on their mutual fund SIP investments.
              Millennial&apos;s most preferred investment options lately are SIP
              mutual fund investments. Our investment calculator for retirement
              is made to provide prospective investors with a rough idea of
              their investments. However, the actual returns a scheme of
              investment offers vary based on several variables. With the help
              of an investment calculator for retirement, you may determine your
              monthly investment&apos;s expected returns and wealth increase.
              Using a predicted annual return rate, you may get a reasonable
              idea of the maturity value for any of the monthly SIPs.
            </p>

            <h2>How might an Investment calculator benefit an investor?</h2>
            <p>
              According to numerous mutual fund experts, SIPs are a more
              profitable way to invest money than a flat payment. It helps you
              develop financial self-discipline and a saving habit that will be
              useful to you in the long run. The predicted returns you will
              receive after the investment duration are displayed by an online
              investment calculator for SIPs, which is a valuable tool. The SIP
              calculator&apos;s advantages include, among others:
            </p>
            <p>
              Simply input the monthly investment amount (the amount for which
              you began the investment), your starting age and retirement age,
              and the estimated rate of return. When you enter the value, the
              calculator will provide an expected amount you can receive once
              your investment period is over.
            </p>
            <p>
              Plan your investment according to the amount and duration. At the
              conclusion of your SIP tenure, it assists you in estimating the
              overall value of assets. Investment calculator for retirement
              saves you time by providing precise results faster than manual
              calculation.
            </p>

            <h2>Important Links</h2>
            <p>
              <a
                href="https://www.theglobaleconomy.com/rankings/inflation/"
                rel="nofollow noreferrer"
                target="_blank"
              >
                Inflation rate by country - The Global Economy
              </a>
            </p>
          </div>
        </Box>
      </Box>
    </ToolsLayout>
  );
};

export default InvestmentCalculator;
