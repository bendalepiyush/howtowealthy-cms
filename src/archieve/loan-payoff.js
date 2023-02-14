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
import Layout from "../components/layout";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useRef, useCallback, useState } from "react";
import numberFormater from "../utils/number_format";
import Seo from "../components/seo";
import Link from "next/link";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const validationSchema = yup.object({
  loanTenure: yup
    .number("Enter valid age in years")
    .integer("Enter valid age in years")
    .min(1, "Current age must be more than 10 years")
    .max(30, "Current age must be less than 100 years")
    .required("Enter valid age in years"),

  interestRate: yup.number("Enter valid rate").required("Enter valid rate"),
  loanAmount: yup
    .number("Enter valid monthly investment")
    .min(1, "Enter valid monthly investment")
    .required("Enter valid monthly investment"),
});

const LoanPayOff = () => {
  const workerRef = useRef();
  const timer = useRef(null);
  const [currency, setCurrency] = useState({ label: "USD ($)", value: "$" });
  const [result, setResult] = useState({
    emi: 0,
    remainingAmount: [],
    principal: [],
    interest: [],
  });

  const [array, setArray] = useState({});

  const formik = useFormik({
    initialValues: {
      loanAmount: 1000000,
      interestRate: 5,
      loanTenure: 20,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../src/workers/loan-payoff.js", import.meta.url)
    );
    workerRef.current.onmessage = (event) => {
      setResult(event.data);
    };
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const handleSubmit = useCallback(async (values) => {
    workerRef.current.postMessage({
      rateOfInterest: values.interestRate,
      loanAmount: values.loanAmount,
      duration: values.loanTenure,
      extraPayment: array,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        title="Loan Payoff - How to Wealthy"
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
                Loan Payoff
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
                        formik.touched.loanAmount &&
                        Boolean(formik.errors.loanAmount)
                      }
                    >
                      <FormLabel htmlFor="loanAmount">Loan Amount</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Text>{currency.value}</Text>
                        </InputLeftElement>
                        <Input
                          value={formik.values.loanAmount}
                          name="loanAmount"
                          type="number"
                          onChange={formik.handleChange}
                        />
                      </InputGroup>
                      {formik.touched.loanAmount &&
                        Boolean(formik.errors.loanAmount) && (
                          <FormErrorMessage>
                            {formik.errors.loanAmount}
                          </FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl
                      isInvalid={
                        formik.touched.loanTenure &&
                        Boolean(formik.errors.loanTenure)
                      }
                    >
                      <FormLabel htmlFor="loanTenure">Loan Tenure</FormLabel>
                      <InputGroup>
                        <Input
                          value={formik.values.loanTenure}
                          name="loanTenure"
                          type="number"
                          onChange={formik.handleChange}
                        />
                        <InputRightElement pointerEvents="none">
                          <Text pr={5}>Year</Text>
                        </InputRightElement>
                      </InputGroup>
                      {formik.touched.loanTenure &&
                        Boolean(formik.errors.loanTenure) && (
                          <FormErrorMessage>
                            {formik.errors.loanTenure}
                          </FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl
                      isInvalid={
                        formik.touched.increaseMonthlyInvestment &&
                        Boolean(formik.errors.increaseMonthlyInvestment)
                      }
                    >
                      <FormLabel htmlFor="interestRate">
                        Loan Interest Rate
                      </FormLabel>
                      <InputGroup>
                        <Input
                          value={formik.values.interestRate}
                          name="interestRate"
                          type="number"
                          onChange={formik.handleChange}
                        />

                        <InputRightElement pointerEvents="none">
                          <Text>%</Text>
                        </InputRightElement>
                      </InputGroup>
                      {formik.touched.interestRate &&
                        Boolean(formik.errors.interestRate) && (
                          <FormErrorMessage>
                            {formik.errors.interestRate}
                          </FormErrorMessage>
                        )}
                    </FormControl>

                    <Button colorScheme={"primary"} type="submit">
                      Calculate
                    </Button>
                  </SimpleGrid>

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
                          {numberFormater(Math.round(result.emi * 100) / 100)}
                        </Heading>
                        <Text>Monthly EMI</Text>
                      </Box>
                      <Spacer />
                      <Box textAlign={{ base: "left", md: "right" }}>
                        <Heading>
                          {currency.value}{" "}
                          {numberFormater(
                            Math.round(
                              (result.emi * (result.interest.length - 1) -
                                result.remainingAmount[0]) *
                                100
                            ) / 100
                          )}
                        </Heading>
                        <Text>Total Interest</Text>
                      </Box>
                    </Flex>
                  </>
                  <Box
                    mb={10}
                    background={"gray.50"}
                    p={5}
                    textAlign={"center"}
                  >
                    <Text fontSize={"xl"}>
                      That&apos;s a lot of interest right? Want to pay your loan
                      faster and reduce the interest? Working on how you can
                      optimize your calculator.
                    </Text>
                  </Box>
                  {/* <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    <Input
                      value={0}
                      name={"extra-"}
                      type="number"
                      onChange={(e) => {
                        // const temp = array;
                        // temp[i] = Number(e.target.value);
                        // setArray(temp);
                        // clearTimeout(timer.current);
                        // timer.current = setTimeout(() => {
                        //   workerRef.current.postMessage({
                        //     rateOfInterest: formik.values.interestRate,
                        //     loanAmount: formik.values.loanAmount,
                        //     duration: formik.values.loanTenure,
                        //     extraPayment: temp,
                        //   });
                        // }, 1000);
                      }}
                    />
                    <Input
                      value={0}
                      name={"extra-"}
                      type="number"
                      onChange={(e) => {
                        // const temp = array;
                        // temp[i] = Number(e.target.value);
                        // setArray(temp);
                        // clearTimeout(timer.current);
                        // timer.current = setTimeout(() => {
                        //   workerRef.current.postMessage({
                        //     rateOfInterest: formik.values.interestRate,
                        //     loanAmount: formik.values.loanAmount,
                        //     duration: formik.values.loanTenure,
                        //     extraPayment: temp,
                        //   });
                        // }, 1000);
                      }}
                    />
                    <Button
                      variant={"outline"}
                      colorScheme={"primary"}
                      type="submit"
                    >
                      Add Extra Payments
                    </Button>
                  </SimpleGrid> */}

                  <Box>
                    <Chart
                      options={{
                        chart: {
                          id: "reverse-cagr-chart",
                          toolbar: {
                            autoSelected: "pan",
                            show: false,
                          },
                        },
                        // xaxis: {
                        //   categories: [],
                        // },
                        stroke: {
                          width: 1,
                        },
                        colors: ["#2563EB", "#040926"],
                        markers: {
                          size: 4,
                          hover: {
                            size: 6,
                          },
                        },
                        legend: { show: false },
                      }}
                      series={[
                        {
                          name: "Balanced Amount",
                          data: result.remainingAmount.map(
                            (item) => Math.round(item * 100) / 100
                          ),
                        },
                      ]}
                      type="line"
                      width="100%"
                    />
                  </Box>

                  <Box>
                    <Chart
                      options={{
                        chart: {
                          id: "reverse-cagr-chart",
                          toolbar: {
                            autoSelected: "pan",
                            show: false,
                          },
                        },
                        // xaxis: {
                        //   categories: [],
                        // },
                        stroke: {
                          width: 1,
                        },
                        colors: ["#2563EB", "#040926"],
                        markers: {
                          size: 4,
                          hover: {
                            size: 6,
                          },
                        },
                        legend: { show: false },
                      }}
                      series={[
                        {
                          name: "Interest Amount",
                          data: result.interest.map(
                            (item) => Math.round(item * 100) / 100
                          ),
                        },
                        {
                          name: "Principal Amount",
                          data: result.principal.map(
                            (item) => Math.round(item * 100) / 100
                          ),
                        },
                      ]}
                      type="line"
                      width="100%"
                    />
                  </Box>
                </Stack>
              </form>
            </Box>

            <Box mt={20} fontSize={"18px"} lineHeight={1.7}>
              <div className={"post-content"}>
                <p>
                  Prospective investors may need help determining their future
                  investment returns. Investment methods like fixed deposits and
                  systematic investment plans (SIPs) require a great deal of the
                  returns to be understood beforehand so that you are protected
                  from all the volatility you may encounter in between. You can
                  use an investing calculator to help you calculate the profits
                  you can expect from placing your money in these investment
                  instruments. Regularly investing a set amount of money in
                  mutual funds is known as a systematic investment plan or SIP.
                  SIPs often let you make weekly, monthly, or quarterly
                  investments.
                </p>
                <h2>What does an Investment calculator do?</h2>
                <p>
                  An investing calculator is a simple tool that allows
                  individuals to estimate the return on their mutual fund SIP
                  investments. Millennial&apos;s most preferred investment
                  options lately are SIP mutual fund investments. Our investment
                  calculator for retirement is made to provide prospective
                  investors with a rough idea of their investments. However, the
                  actual returns a scheme of investment offers vary based on
                  several variables. With the help of an investment calculator
                  for retirement, you may determine your monthly
                  investment&apos;s expected returns and wealth increase. Using
                  a predicted annual return rate, you may get a reasonable idea
                  of the maturity value for any of the monthly SIPs.
                </p>

                <h2>How might an Investment calculator benefit an investor?</h2>
                <p>
                  According to numerous mutual fund experts, SIPs are a more
                  profitable way to invest money than a flat payment. It helps
                  you develop financial self-discipline and a saving habit that
                  will be useful to you in the long run. The predicted returns
                  you will receive after the investment duration are displayed
                  by an online investment calculator for SIPs, which is a
                  valuable tool. The SIP calculator&apos;s advantages include,
                  among others:
                </p>
                <p>
                  Simply input the monthly investment amount (the amount for
                  which you began the investment), your starting age and
                  retirement age, and the estimated rate of return. When you
                  enter the value, the calculator will provide an expected
                  amount you can receive once your investment period is over.
                </p>
                <p>
                  Plan your investment according to the amount and duration. At
                  the conclusion of your SIP tenure, it assists you in
                  estimating the overall value of assets. Investment calculator
                  for retirement saves you time by providing precise results
                  faster than manual calculation.
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

export default LoanPayOff;

{
  /* <Box>
<Table>
  <Thead>
    <Tr>
      <Th>Month</Th>
      <Th>EMI</Th>
      <Th>Interest</Th>
      <Th>Principal</Th>
      <Th>Balance</Th>
      <Th>Extra Payment</Th>
    </Tr>
  </Thead>
  <Tbody>
    {result.interest.map((item, i) => (
      <Tr key={i}>
        <Td>{i}</Td>
        <Td>
          {numberFormater(Math.round(result.emi * 100) / 100)}
        </Td>
        <Td>
          {numberFormater(
            Math.round(result.interest[i] * 100) / 100
          )}
        </Td>
        <Td>
          {numberFormater(
            Math.round(result.principal[i] * 100) / 100
          )}
        </Td>
        <Td>
          {numberFormater(
            Math.round(result.remainingAmount[i] * 100) / 100
          )}
        </Td>


            <Td>
                        <Input
                          value={array[i] ?? 0}
                          name={"extra-" + i}
                          type="number"
                          onChange={(e) => {
                            const temp = array;
                            temp[i] = Number(e.target.value);
                            setArray(temp);

                            clearTimeout(timer.current);
                            timer.current = setTimeout(() => {
                              workerRef.current.postMessage({
                                rateOfInterest: formik.values.interestRate,
                                loanAmount: formik.values.loanAmount,
                                duration: formik.values.loanTenure,
                                extraPayment: temp,
                              });
                            }, 1000);
                          }}
                        />
                      </Td>
       
      </Tr>
    ))}
  </Tbody>
</Table>
</Box> */
}
