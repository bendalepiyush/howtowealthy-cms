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
  InputRightAddon,
  Badge,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import Layout from "../../src/components/layout";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useRef, useCallback, useState } from "react";
import numberFormater from "../../src/utils/number_format";
import Seo from "../../src/components/seo";
import Link from "next/link";

const validationSchema = yup.object({
  initialAmount: yup.number().required(),
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

const CAGRCalculator = () => {
  const workerRef = useRef();
  const [currency, setCurrency] = useState({ label: "USD ($)", value: "$" });
  const [result, setResult] = useState({
    emi: 0,
  });

  const formik = useFormik({
    initialValues: {
      initialAmount: 1000000,
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
            name: "Loan Payoff or Invest - How to Wealthy",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Seo
        title="Online CAGR Calculator - How to Wealthy"
        description="Investing and paying down debt are both good uses for any spare cash you might have. So this will help you make a decision on whether you should invest your money or pay off your ongoing loan."
        structuredData={JSON.stringify(structuredData)}
        ogImage={
          "https://assets.howtowealthy.com/ogimg-loan-payoff-or-invest.png.png"
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
                CAGR Calculator
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
                        formik.touched.initialAmount &&
                        Boolean(formik.errors.initialAmount)
                      }
                    >
                      <FormLabel htmlFor="initialAmount">
                        Initial Value
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Text>{currency.value}</Text>
                        </InputLeftElement>
                        <Input
                          value={formik.values.initialAmount}
                          name="initialAmount"
                          type="number"
                          onChange={formik.handleChange}
                        />
                      </InputGroup>
                      {formik.touched.initialAmount &&
                        Boolean(formik.errors.initialAmount) && (
                          <FormErrorMessage>
                            {formik.errors.initialAmount}
                          </FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl
                      isInvalid={
                        formik.touched.finalValue &&
                        Boolean(formik.errors.finalValue)
                      }
                    >
                      <FormLabel htmlFor="loanAmount">Final Value</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Text>{currency.value}</Text>
                        </InputLeftElement>
                        <Input
                          value={formik.values.finalValue}
                          name="loanAmount"
                          type="number"
                          onChange={formik.handleChange}
                        />
                      </InputGroup>
                      {formik.touched.finalValue &&
                        Boolean(formik.errors.finalValue) && (
                          <FormErrorMessage>
                            {formik.errors.finalValue}
                          </FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl
                      isInvalid={
                        formik.touched.loanTenure &&
                        Boolean(formik.errors.loanTenure)
                      }
                    >
                      <FormLabel htmlFor="loanTenure">Duration</FormLabel>
                      <InputGroup>
                        <Input
                          value={formik.values.loanTenure}
                          name="loanTenure"
                          type="number"
                          onChange={formik.handleChange}
                        />
                        <InputRightAddon
                          // eslint-disable-next-line react/no-children-prop
                          children={
                            <Select border={"none"} focusBorderColor={"none"}>
                              <option>Year</option>
                              <option>Month</option>
                            </Select>
                          }
                          p={0}
                        />
                      </InputGroup>
                      {formik.touched.loanTenure &&
                        Boolean(formik.errors.loanTenure) && (
                          <FormErrorMessage>
                            {formik.errors.loanTenure}
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

            {result.emi > 0 && <></>}

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

export default CAGRCalculator;
