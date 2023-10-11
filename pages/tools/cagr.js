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
  finalValue: yup
    .number("Enter valid initial investment")
    .min(500, "Enter initial investment more than 500")
    .max(1000000, "Enter initial investment less than 1,000,000")
    .required("Enter valid initial investment"),
  duration: yup
    .number("Enter valid duration")
    .min(0, "Enter duration more than 0")
    .max(30, "Enter duration less than 30")
    .required("Enter valid duration"),
});

const CompoundAnnualGrowthRateCalculator = () => {
  const workerRef = useRef();
  const [currency, setCurrency] = useState({ label: "USD ($)", value: "$" });
  const [result, setResult] = useState({
    cagr: 0,
    interest: [],
    totalInterest: [],
    totalInterestInPercentage: [],
    investmentValue: [],
  });

  const formik = useFormik({
    initialValues: {
      initialValue: 10000,
      finalValue: 15000,
      duration: 5,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../src/workers/cagr.js", import.meta.url)
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
        headline: "CAGR Calculator - How to Wealthy",
        publisher: {
          name: "How to Wealthy",
          "@type": "Organization",
        },
        description:
          "In simpler terms, it's a way to figure out how much an investment has grown on average each year with the help of the Initial value and Final value.",
        dateModified: "2023-08-02",
        datePublished: "2023-08-02",
        mainEntityOfPage: {
          "@id": "https://www.howtowealthy.com/tools/cagr",
          "@type": "WebPage",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.howtowealthy.com/tools/cagr#breadcrumb`,
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
            name: "CAGR Calculator",
          },
        ],
      },
    ],
  };

  return (
    <ToolsLayout
      path={"/tools/cagr"}
      title={"CAGR Calculator - How to Wealthy"}
      description={
        "In simpler terms, it's a way to figure out how much an investment has grown on average each year with the help of the Initial value and Final value."
      }
      structuredData={structuredData}
      ogImage={"https://assets.howtowealthy.com/ogimg-cagr-calculator.png"}
    >
      <Box>
        <Box pb={10} maxW={"2xl"}>
          <Heading as={"h1"} fontSize={"3xl"} mb={2}>
            Compound Annual Growth Rate (CAGR) Calculator
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
                  isInvalid={
                    formik.touched.finalValue &&
                    Boolean(formik.errors.finalValue)
                  }
                >
                  <FormLabel htmlFor="finalValue">Final Value</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Text>{currency.value}</Text>
                    </InputLeftElement>
                    <Input
                      value={formik.values.finalValue}
                      name="finalValue"
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
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                  <Box>
                    <Heading as={"h3"} fontSize={"2xl"}>
                      {numberFormater(result.cagr + " %" || 0)}
                    </Heading>
                    <Text color={"gray.600"}>CAGR</Text>
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
                        result.investmentValue[
                          result.investmentValue.length - 1
                        ] - result.investmentValue[0] || 0
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
          <div className={"post-content"}>
            <p>
              The CAGR calculator is helpful for anyone who wants to{" "}
              <strong>estimate the gain from an investment</strong> . This
              application bases its calculations on the{" "}
              <strong>compound annual growth rate</strong> (CAGR) formula. If
              you know how to calculate the growth rate, you can determine the
              profit of your investment over a particular period.
            </p>
            <p>
              All this information can be helpful when choosing your savings
              account or figuring out where to place it. You might also need a
              CAGR calculator when you plan any capital investment.
            </p>
            <h2>What is the compound interest?</h2>
            <p>
              To understand the idea of the compound annual growth rate, first
              of all, you should know what compound interest is.
            </p>
            <p>
              In finance, compound interest is defined as{" "}
              <strong>
                interest earned not only on the initial amount invested but also
                on any interest
              </strong>{" "}
              . In other words, compound interest is the interest calculated on
              the initial principal and the interest accumulated during
              consecutive periods. Note here that a deposit or loan grows at a
              faster rate thanks to compounding.
            </p>
            <p>
              The formula for compound interest is quite complex as it includes
              not only the annual interest rate and the number of years but also
              the number of times the interest is compounded per year. It can be
              presented as follows:
            </p>
            <p>
              {" "}
              <strong>FV = PV (1 + r/m)mt</strong>{" "}
            </p>
            <p>where:</p>
            <ul>
              <li>
                {" "}
                <strong>FV</strong> &mdash; Future value of the investment;
              </li>
              <li>
                {" "}
                <strong>PV</strong> &mdash; Initial balance (the present value
                of the investment);
              </li>
              <li>
                {" "}
                <strong>r</strong> &mdash; Annual interest rate (in decimal);
              </li>
              <li>
                {" "}
                <strong>m</strong> &mdash; Number of times the interest is
                compounded per year (compounding frequency); and
              </li>
              <li>
                {" "}
                <strong>t</strong> &mdash; Numbers of years the money is
                invested for.
              </li>
            </ul>
            <p>
              From a formal point of view, if the interest is compounded once
              per year (so m = 1), then r is called the compound annual growth
              rate (CAGR).
            </p>
            <h2>What is CAGR (compound annual growth rate)?</h2>
            <p>
              As explained in the introduction,{" "}
              <strong>
                CAGR is an acronym for
                <em>compound annual growth rate</em>
              </strong>{" "}
              . The formal definition of CAGR says that CAGR is the yearly rate
              of return that is required for an investment to grow from its
              initial balance to its final balance within a particular period.
              CAGR is counted with an assumption that{" "}
              <strong>profits are reinvested</strong> at the end of each year of
              its time horizon.
            </p>
            <p>
              You should be aware that the compound annual growth rate is an
              approximate figure rather than a true return rate. You can say
              that{" "}
              <strong>
                CAGR is a number that describes the rate at which investment
                would have grown if it had grown at the same rate every year
                during the whole investment period
              </strong>{" "}
              (with an assumption that the profits were reinvested at the end of
              each year).
            </p>
            <p>
              Obviously, in real life, such a situation is almost impossible.
              However, CAGR is mainly used to smooth the rate of return over the
              whole investment period and, therefore, is very useful in
              comparing different investments. The <strong>pros</strong> and{" "}
              <strong>cons</strong> of CAGR are discussed in detail in CAGR
              advantages and disadvantages section.
            </p>
            <h2>
              What is the difference between a simple growth rate and a compound
              annual growth rate?
            </h2>
            <p>
              The simple growth rate formula is used to determine the percentage
              increase of a value within a particular period of time, which is
              usually the same as the whole investment period (e.g., three
              years, ten months, etc.) In other words, a simple growth rate says
              how much an investment is going to yield within its time horizon.
            </p>
            <p>
              On the other hand, the compound annual growth rate reflects the
              average rate of return that is required for an investment to grow
              from its initial balance to its final balance within a particular
              period on a yearly basis. In the case of CAGR, it doesn&apos;t
              matter what the time horizon of the investment is. Note that,
              unlike the simple growth rate, the compound annual growth rate
              enables you to compare investments with different time horizons.
            </p>
            <h2>The simple growth rate formula</h2>
            <p>
              In order to calculate the simple growth rate formula, you need to
              use the following equation:
            </p>
            <p>
              {" "}
              <strong>SGR = (FV &minus; PV) / PV &times; 100</strong>{" "}
            </p>
            <p>Where:</p>
            <ul>
              <li>
                {" "}
                <strong>SGR</strong> &mdash; Simple growth rate;
              </li>
              <li>
                {" "}
                <strong>FV</strong> &mdash; Future value of the investment and
              </li>
              <li>
                {" "}
                <strong>PV</strong> &mdash; Initial balance (the present value
                of the investment).
              </li>
            </ul>
            <p>
              To fully understand this formula, let&apos;s look at the following
              example:
            </p>
            <p>
              Assume that in May 2015, you invested $1000. After three years, in
              May 2018, you closed this investment and got $1300. So, the simple
              growth rate of your investment was:
            </p>
            <p>SGR = (1300 - 1000) / 1000 &times; 100 = 30%</p>
            <h2>The CAGR formula</h2>
            <p>
              The formula that allows you to compute CAGR derives from the
              compound interest formula presented in the section What is the
              compound interest? It is:
            </p>
            <p>
              {" "}
              <strong>FV = PV (1 + r/m)mt</strong>{" "}
            </p>
            <p>
              Assuming that that interest is compounded on a yearly basis (m =
              1), we can write:
            </p>
            <p>
              {" "}
              <strong>FV = PV (1 + CAGR)t</strong>{" "}
            </p>
            <p>where CAGR is the compound annual growth rate.</p>
            <p>After the transformation, the formula for CAGR is:</p>
            <p>
              {" "}
              <strong>CAGR = (FV / PV)1/t &minus; 1</strong>{" "}
            </p>
            <p>
              Note that the CAGR formula is more complex than the simple growth
              rate formula, as it takes into consideration also the investment
              time horizon (which may be longer than a year) and the number of
              compounding periods.
            </p>

            <h2>How to calculate CAGR?</h2>
            <p>
              Whenever you want to calculate the compound annual growth rate,
              you need to do the following steps:
            </p>
            <ul>
              <li>
                Divide the final value of the considered investment by its
                initial value.
              </li>
              <li>
                Raise the result to the power of one divided by the number of
                years in the investment period.
              </li>
              <li>Subtract one from the result taken from the previous.</li>
            </ul>

            <h2>How to use our CAGR calculator</h2>
            <p>
              If you are still not sure how to calculate the growth rate,
              don&apos;t worry. It is easier than it sounds. Instead of
              performing many complicated mathematical operations in order to
              calculate the compound annual growth rate, you might like to try
              our CAGR calculator.
            </p>
            <p>
              You can use our application in a few ways. With the CAGR
              calculator, you can determine either the final value of the
              investment or the growth rate:
            </p>
            <ul>
              <li>
                To determine the final value of your investment with the given
                CAGR, all you need to do is to fill the first three boxes with
                appropriate values ( <strong>Growth rate (CAGR)</strong> ,{" "}
                <strong>Number of periods</strong> ,{" "}
                <strong>Initial value</strong> ). The calculator will
                automatically determine the final value of your investment.
              </li>
              <li>
                If you want to use the tool inversely and find the growth rate,
                you have to fill in all the boxes except the first one ({" "}
                <strong>Number of periods</strong> ,{" "}
                <strong>Initial value</strong> , <strong>final value</strong> ).
              </li>
              <li>
                The calculator also allows you to check the difference between
                the initial and final value and estimates the total growth as a
                percentage.
              </li>
            </ul>
            <p>
              Although the CAGR formula is relatively simple, it has a variety
              of uses. You can use the compound annual growth rate formula
              either to estimate the average growth of a single investment or to
              compare investments of different types.
            </p>
            <h2>CAGR advantages and disadvantages</h2>
            <p>
              As a measure of investment profitability, CAGR has a number of
              advantages and disadvantages.
            </p>
            <p>
              On the <strong>pros</strong> side, we can list the following
              arguments:
            </p>
            <ul>
              <li>
                CAGR is one of the most{" "}
                <strong>
                  accurate ways to calculate the return on an investment
                </strong>{" "}
                that rises and falls in value during the investment period.
              </li>
              <li>
                CAGR allows investors to <strong>compare investments</strong>{" "}
                with different time horizons.
              </li>
              <li>
                CAGR makes it possible to{" "}
                <strong>
                  compare profits from a particular investment with risk-free
                  instruments
                </strong>{" "}
                . It also allows you to assess whether the premium for the risk
                taken is high enough.
              </li>
            </ul>
            <p>
              The biggest <strong>cons</strong> of CAGR are:
            </p>
            <ul>
              <li>
                CAGR does not take into account the{" "}
                <strong>investment risk</strong> .
              </li>
              <li>
                As CAGR reflects smooth growth over the investment period, it
                doesn&apos;t reflect the{" "}
                <strong>volatility of the investment value</strong> . In fact,
                CAGR suggests that the growth rate is constant.
              </li>
              <li>
                With CAGR, it is impossible to calculate the{" "}
                <strong>
                  profitability of an investment with inflows and outflows
                  during the investment period
                </strong>{" "}
                . This is because the CAGR computes the rate of return only on
                the basis of the initial and final balance of the portfolio.
              </li>
            </ul>

            <h2>FAQ</h2>
            <h3>
              How do I calculate CAGR &mdash; compounded annual growth rate?
            </h3>
            <p>You use CAGR tool or follow the next steps:</p>
            <ol>
              <li>
                {" "}
                <strong>
                  Find the ending value (VF) and the initial value (VI). Also,
                  define the number of periods in between (t).
                </strong>{" "}
                Periods are usually expressed in years.
              </li>
              <li>
                Divide <strong>VF</strong> by <strong>VI</strong> and get the
                root of order <strong>t</strong> . <strong>Subtract</strong> 1.
              </li>
              <li>
                {" "}
                <strong>Multiply</strong> the result by 100%. Congratulations,
                you now have your
                <em>t-period</em>
                CAGR.
              </li>
            </ol>
            <h3>How much CAGR do I need to double my money in 3 years?</h3>
            <p>
              A <strong>26% 3-year CAGR.</strong> You can get it by using the
              CAGR tool or by the following steps:
            </p>
            <ol>
              <li>
                Imagine you have 1000 USD and want to double it to 2000 USD in 3
                years. Then,{" "}
                <strong>you start dividing 2000 by 1000. You get 2.</strong>{" "}
              </li>
              <li>
                {" "}
                <strong>Calculate the cube root</strong> (because you have three
                periods). We obtain 1.26.
              </li>
              <li>
                {" "}
                <strong>Subtract one and multiply by 100%.</strong> The result
                is 26%, the three-year CAGR for doubling the money.
              </li>
            </ol>
            <h3>Is a CAGR of 5% sound?</h3>
            <p>
              It depends on the benchmark to which you are comparing. CAGR
              acronym means <strong>compounded annual growth rate</strong> , so
              it works for comparing growth rates yearly-wise. Let&apos;s see a
              few cases:
            </p>
            <ul>
              <li>
                If your competitor grows at a more significant CAGR, they will
                eventually steal your market share.
              </li>
              <li>
                Regarding investing, if inflation is below that level, you keep
                buying power.
              </li>
              <li>
                A higher CAGR would harm our resource capacities if we talk
                about the world population.
              </li>
            </ul>
            <h3>What does a 3-year CAGR mean?</h3>
            <p>
              It refers to the compounded growth rate a value has had through 3
              years. Imagine you want to double your investment in the next
              three years. Then, it would be required to grow{" "}
              <strong>26%</strong> each year. You take the end value of each
              year and start from there. That&apos;s compounding.
            </p>
          </div>
        </Box>
      </Box>
    </ToolsLayout>
  );
};

export default CompoundAnnualGrowthRateCalculator;
