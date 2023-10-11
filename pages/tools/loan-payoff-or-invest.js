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
            name: "Loan Payoff or Invest - How to Wealthy",
          },
        ],
      },
    ],
  };

  return (
    <ToolsLayout
      path={"/tools/loan-payoff-or-invest"}
      title="Loan Payoff or Invest - How to Wealthy"
      description="Investing and paying down debt are both good uses for any spare cash you might have. So this will help you make a decision on whether you should invest your money or pay off your ongoing loan."
      structuredData={structuredData}
      ogImage={
        "https://assets.howtowealthy.com/ogimg-loan-payoff-or-invest.png.png"
      }
    >
      <Box>
        <Box pb={10}>
          <Heading as={"h1"} fontSize={"3xl"} mb={2}>
            Loan Payoff or Invest
          </Heading>
          <Text fontSize={"xl"} fontWeight={300}>
            Investing and paying down debt are both good uses for any spare cash
            you might have. So this will help you make a decision on whether you
            should invest your money or pay off your ongoing loan.
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
          <div className={"post-content"}>
            <p>
              Making wise choices is crucial to achieving your objectives when
              managing your finances. Having the appropriate tools at your
              disposal may make a huge impact, whether you&apos;re trying to pay
              off debt or make investments for the future. Calculators for
              investments or loan repayment can help with that.
            </p>
            <p>
              In this post, we&apos;ll discuss the advantages of using a loan
              payoff or investment calculator, how to use one, and give examples
              of how it may assist you in making wise financial decisions.
              We&apos;ll also contrast paying off loans with investing and
              discuss things to consider while choosing between the two.
            </p>
            <h2>What is a Loan Payoff Calculator?</h2>
            <p>
              You may calculate the time it will take to repay a loan, the total
              amount of interest paid, and the overall cost of the loan with a
              loan payoff calculator. It can be applied to various loans,
              including auto and school loans.
            </p>
            <p>
              Using a loan payoff calculator is simple. You enter the loan
              amount, interest rate, and term. The calculator will then give you
              a breakdown of your monthly payment, the total interest paid for
              the loan, and the overall cost of the loan.
            </p>
            <p>
              Say, for illustration, that you have a car loan with a $10,000
              sum, a 4% interest rate, and a 60-month duration. According to an
              auto loan payoff calculator, your monthly payment will be $184.39,
              your total interest paid will be $1,063.28, and your total loan
              cost will be $11,063.28.
            </p>
            <h2>What Exactly Is an Invest Calculator?</h2>
            <p>
              On the other hand, an investment calculator can help you determine
              how much you might make on your investments over time. It can
              evaluate many investment possibilities and help you select the
              optimal approach.
            </p>
            <p>
              You enter the money, estimated rate of return, and time frame for
              your investment into an investment calculator. The calculator will
              then display the potential return on your investment to you.
            </p>
            <p>
              For instance, you want to spend $10,000 over ten years and
              anticipate a 7% annual return on your investment. According to an
              investing calculator, your investment might increase to $19,672.74
              over ten years.
            </p>
            <h2>Loan payoff vs. investing</h2>
            <p>
              Balancing your debt and investment responsibilities is crucial
              when managing your money. While paying the debt as quickly as
              possible is essential, investing for the future is also important.
            </p>
            <p>
              You can use a loan payoff or investment calculator to make
              well-informed financial decisions. For instance, it might make
              sense to prioritize paying off high-interest credit card debt
              before investing.
            </p>
            <h2>Factors to Consider</h2>
            <p>
              Several variables must be considered when choosing between paying
              off the loan and investing. They consist of the following:
            </p>
            <h3>Rates of interest</h3>
            <p>
              Generally, it&apos;s best to pay off high-interest debt, like
              credit card debt, before investing. However, investments may
              provide a better return if you have low-interest debt, such as a
              home or school loan.
            </p>
            <h3>Returns on investments</h3>
            <p>
              When looking at possible investments, it&apos;s essential to
              consider the risks and returns. Long-term gains on the stock
              market have historically been higher, but more risk is involved.
            </p>
            <h3>Time horizon</h3>
            <p>
              Your time horizon is the time you have to reach your financial
              objectives. If you have a longer time horizon, like 10 or 20
              years, you can take on greater risk and invest in stocks or other
              higher-risk investments. Focusing on paying off debt might make
              more sense if you only have five years or less to live.
            </p>
            <h3>Your overall financial status</h3>
            <p>
              When choosing between paying off debt and investing, it&apos;s
              critical to consider your entire financial situation. You can take
              on greater risk and invest in stocks or other higher-risk assets
              with a steady income and a sizable emergency fund. It might be
              more appropriate to concentrate on paying off debt if you have a
              less consistent income or are coping with other financial
              difficulties, such as a high level of debt.
            </p>
            <h2>
              Using a Loan Payoff or Investment Calculator to Make Informed
              Decisions
            </h2>
            <p>
              Use a loan payback or investment calculator to make informed
              judgments about debt payoff vs. the investment. These tools can
              assist you in comprehending the potential advantages and
              disadvantages of various financial plans and making well-informed
              financial decisions.
            </p>
            <p>
              For illustration, suppose you had a $50,000 student loan amount
              with a 6% interest rate. You can invest in the stock market or
              repay the loan over ten years.
            </p>
            <p>
              Your monthly payment would be $555.10, and you would pay
              $16,812.24 in interest throughout the loan, according to a student
              loan payoff calculator.
            </p>
            <p>
              Using an investment calculator, you can determine that your
              investment may increase to $96,235.12 if you invest $555.10 per
              month for ten years and anticipate an average annual return of 7%.
            </p>
            <p>
              You can use these calculators to see whether investing in the
              stock market makes more sense or paying down your student loans.
            </p>
            <h2>The Best Investments</h2>
            <p>
              There are numerous options available when it comes to investing.
              The following are some of the top investments:
            </p>
            <ul>
              <li>
                Stocks have historically given the best long-term returns, even
                though they carry more risk.
              </li>
              <li>
                Bonds: Bonds can offer a continuous revenue stream and are a
                lower-risk investment alternative.
              </li>
              <li>
                You can spread out your investments by buying different stocks
                and bonds through mutual funds.
              </li>
              <li>
                Exchange-traded funds (ETFs): ETFs are traded like stocks but
                are similar to mutual funds.Real estate: Whether you&apos;re
                seeking a reliable source of rental income or the possibility of
                value growth, real estate can be a suitable investment choice.
              </li>
            </ul>
            <h2>Conclusion</h2>
            <p>
              Handling your finances can be difficult, but you can reach your
              objectives and make well-informed decisions with the correct
              tools. Calculators for loan payback or investments are valuable
              tools that can help you understand various financial strategies,
              possibilities, expenses, and advantages.
            </p>
            <p>
              Considerations like interest rates, investment returns, time
              horizons, and overall financial status are crucial when choosing
              between paying off debt and investing. You can use a loan payoff
              or investment calculator to help you decide how to use your funds
              and work toward your financial objectives.
            </p>
          </div>
        </Box>
      </Box>
    </ToolsLayout>
  );
};

export default LoanPayOfOrInvest;
