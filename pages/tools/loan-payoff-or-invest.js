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

// .lessThan(
//   yup.ref("loanTenure") * 12 - 1,
//   "Current month must be less than 1000"
// )
const validationSchema = yup.object({
  loanTenure: yup
    .number("Enter valid age in years")
    .integer("Enter valid age in years")
    .min(1, "Current age must be more than 10 years")
    .max(30, "Current age must be less than 100 years")
    .required("Enter valid age in years"),
  currentMonthOfLoan: yup
    .number("Enter valid month")
    .integer("Enter valid month")
    .min(0, "Current month must be more than 0")
    .when("loanTenure", (loanTenure, schema) => {
      return schema.test({
        test: (currentMonthOfLoan) =>
          !!loanTenure && currentMonthOfLoan < loanTenure * 12,
        message: "Enter valid month",
      });
    })
    .required("Enter valid month"),
  yearlyReturnsRate: yup
    .number("Enter valid rate")
    .min(0, "Enter valid rate")
    .required("Enter valid rate"),
  interestRate: yup
    .number("Enter valid rate")
    .min(0, "Enter valid rate")
    .required("Enter valid rate"),
});

const LoanPayOfOrInvest = () => {
  const workerRef = useRef();
  const [currency, setCurrency] = useState({ label: "USD ($)", value: "$" });
  const [result, setResult] = useState({
    emi: 0,
  });

  const formik = useFormik({
    initialValues: {
      loanAmount: 1000000,
      currentMonthOfLoan: 30,
      loanTenure: 5,
      lumpsumAmount: 100000,
      yearlyReturnsRate: 14,
      interestRate: 9,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Submit");
      handleSubmit(values);
    },
  });

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../src/workers/loan-payoff-or-invest.js", import.meta.url)
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
    workerRef.current.postMessage({
      rateOfInterest: values.interestRate,
      loanAmount: values.loanAmount,
      duration: values.loanTenure,
      extraPaymentMonth: values.currentMonthOfLoan,
      lumpsumAmount: Number(values.lumpsumAmount),
      yearlyReturnsRate: values.yearlyReturnsRate,
    });
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
        headline: "Loan Payoff or Invest - How to Wealthy",
        publisher: {
          name: "How to Wealthy",
          "@type": "Organization",
        },
        description:
          "Investing and paying down debt are both good uses for any spare cash you might have. So this will help you make a decision on whether you should invest your money or pay off your ongoing loan.",
        dateModified: "2022-02-28",
        datePublished: "2022-02-28",
        mainEntityOfPage: {
          "@id": "https://www.howtowealthy.com/tools/loan-payoff-or-invest",
          "@type": "WebPage",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.howtowealthy.com/tools/loan-payoff-or-invest#breadcrumb`,
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
            name: "Loan Payoff or Invest",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Seo
        title="Loan Payoff or Invest - How to Wealthy"
        description="Investing and paying down debt are both good uses for any spare cash you might have. So this will help you make a decision on whether you should invest your money or pay off your ongoing loan."
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
                Loan Payoff or Invest
              </Heading>
              <Text fontSize={"2xl"} fontWeight={300}>
                Investing and paying down debt are both good uses for any spare
                cash you might have. So this will help you make a decision on
                whether you should invest your money or pay off your ongoing
                loan.
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
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
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
                    <div></div>
                    <FormControl
                      isInvalid={
                        formik.touched.currentMonthOfLoan &&
                        Boolean(formik.errors.currentMonthOfLoan)
                      }
                    >
                      <FormLabel htmlFor="currentMonthOfLoan">
                        Current month of the loan?
                      </FormLabel>
                      <InputGroup>
                        <Input
                          value={formik.values.currentMonthOfLoan}
                          name="currentMonthOfLoan"
                          type="number"
                          onChange={formik.handleChange}
                        />
                        <InputRightElement pointerEvents="none">
                          <Text pr={5}>Month</Text>
                        </InputRightElement>
                      </InputGroup>

                      {formik.touched.currentMonthOfLoan &&
                        Boolean(formik.errors.currentMonthOfLoan) && (
                          <FormErrorMessage>
                            {formik.errors.currentMonthOfLoan}
                          </FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl
                      isInvalid={
                        formik.touched.loanTenure &&
                        Boolean(formik.errors.loanTenure)
                      }
                    >
                      <FormLabel htmlFor="loanTenure">
                        Total loan tenure (in Years)?
                      </FormLabel>
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
                        formik.touched.interestRate &&
                        Boolean(formik.errors.interestRate)
                      }
                    >
                      <FormLabel htmlFor="interestRate">
                        Loan Interest Rate
                      </FormLabel>
                      <InputGroup>
                        <Input
                          value={formik.values.interestRate}
                          name="increaseMonthlyInvestment"
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
                        formik.touched.lumpsumAmount &&
                        Boolean(formik.errors.lumpsumAmount)
                      }
                    >
                      <FormLabel htmlFor="lumpsumAmount">
                        How much lumpsum amount you have?
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Text>{currency.value}</Text>
                        </InputLeftElement>
                        <Input
                          value={formik.values.lumpsumAmount}
                          name="inflationRate"
                          type="number"
                          onChange={formik.handleChange}
                        />
                      </InputGroup>
                      {formik.touched.lumpsumAmount &&
                        Boolean(formik.errors.lumpsumAmount) && (
                          <FormErrorMessage>
                            {formik.errors.lumpsumAmount}
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

            {result.emi > 0 && (
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
                      {numberFormater(Math.round(result.compound) || 0)}
                    </Heading>
                    <Text>Investment Earning if invested</Text>
                  </Box>
                  <Spacer />
                  <Box textAlign={{ base: "left", md: "right" }}>
                    <Heading>
                      {currency.value}{" "}
                      {numberFormater(Math.round(result.savedInterest) || 0)}
                    </Heading>
                    <Text>Saved Interest if payoff</Text>
                  </Box>
                </Flex>

                <Box mb={10} background={"gray.50"} p={5} textAlign={"center"}>
                  <Text fontSize={"xl"}>{result.result}</Text>
                </Box>
              </>
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

export default LoanPayOfOrInvest;
