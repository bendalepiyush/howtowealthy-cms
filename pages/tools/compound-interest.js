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
  InputRightAddon,
  Select,
  Badge,
  FormErrorMessage,
  GridItem,
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
  year: yup
    .number("Enter valid year value")
    .min(0, "Enter year more than 0")
    .max(30, "Enter year less than 30")
    .required("Enter valid year"),
  month: yup
    .number("Enter valid month value")
    .min(0, "Enter month more than 0")
    .max(30, "Enter month less than 30")
    .required("Enter valid month"),
  deposit: yup
    .number("Enter valid deposit value")
    .min(50, "Enter deposit value more than 50")
    .max(1000000, "Enter deposit value less than 1,000,000")
    .required("Enter valid deposit value"),
  depositRate: yup
    .number("Enter valid rate")
    .min(4, "Enter rate more than 4")
    .max(25, "Enter rate less than 25")
    .required("Enter valid rate"),
  rateOfInterestType: yup.string().required("rateOfInterestType is required!"),
  depositsType: yup.string().required("rateOfInterestType is required!"),
});

const EquatedMonthlyInsatllmentCalculator = () => {
  const workerRef = useRef();
  const [currency, setCurrency] = useState({ label: "USD ($)", value: "$" });
  const [additional, setAdditional] = useState({
    label: "None",
    value: "Intial Investment",
  });
  const [breakdown, setBreakdown] = useState({
    label: "Monthly",
    value: "Month",
  });
  const [period, setPeriod] = useState({
    label: "Beginning",
    value: "Beginning",
  });
  const [result, setResult] = useState({
    deposits: [],
    interest: [],
    totalDeposits: [],
    accrusedInterest: [],
    balance: [],
    yearDeposits: [],
    yearInterest: [],
    yearTotalDeposits: [],
    yearAccrusedInterest: [],
    yearBalance: [],
    initialInvestment: 0,
  });

  const formik = useFormik({
    initialValues: {
      initialInvestment: 10000,
      rateOfInterest: 6,
      year: 3,
      month: 0,
      deposit: 1000,
      depositRate: 6,
      rateOfInterestType: "option1",
      depositsType: "1",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values = {
        ...values,
        pointPeriod: period.value,
        additional: additional.label,
      };
      handleSubmit(values);
    },
  });

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../src/workers/compound_interest.js", import.meta.url)
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
        headline: "Compound Interest Calculator - How to Wealthy",
        publisher: {
          name: "How to Wealthy",
          "@type": "Organization",
        },
        description:
          "Use our compound interest calculator to see how your savings or investments might grow over time using the power of compound interest",
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
      title="Compound Interest Calculator - How to Wealthy"
      description="Use our compound interest calculator to see how your savings or investments might grow over time using the power of compound interest"
      structuredData={JSON.stringify(structuredData)}
      ogImage={
        "https://assets.howtowealthy.com/ogimg-compound-interest-calculator.png"
      }
      path={"/tools/compound-interest"}
    >
      <Box>
        <Box pb={10}>
          <Heading as={"h1"} fontSize={"2xl"} mb={2}>
            Compound Interest Calculator
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
                    <InputRightAddon pr={0}>
                      <Select
                        value={formik.values.rateOfInterestType}
                        name="rateOfInterestType"
                        type="string"
                        onChange={formik.handleChange}
                        variant="unstyled"
                      >
                        <option value="option1">Yearly</option>
                        <option value="option2">Monthly</option>
                      </Select>
                    </InputRightAddon>
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
                <GridItem p={10} backgroundColor={"gray.50"} colSpan={3}>
                  <Text>Additional Contribution</Text>
                  <br />
                  <TabInput
                    handleChange={setAdditional}
                    options={[
                      { label: "None", value: "Intial Investment" },
                      { label: "Deposits", value: "Total Deposits" },
                      { label: "Withdrawals", value: "Total Withdrawals" },
                    ]}
                    currentValue={additional}
                  />
                  <AditionalInput
                    formik={formik}
                    currentValue={additional}
                    currentPeriod={period}
                    handlePeriod={setPeriod}
                  />
                </GridItem>
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
                      {currency.value}{" "}
                      {numberFormater(
                        result.balance[result.balance.length - 1] || 0
                      )}
                    </Heading>
                    <Text>Future Investment Value</Text>
                  </Box>
                  <Box>
                    <Heading>
                      {currency.value}{" "}
                      {numberFormater(
                        result.accrusedInterest[result.balance.length - 1] || 0
                      )}
                    </Heading>
                    <Text>Total Interest Earned</Text>
                  </Box>
                  <Box>
                    <Heading>
                      {currency.value}{" "}
                      {numberFormater(result.initialInvestment || 0)}
                    </Heading>
                    <Text>Initial Investment</Text>
                  </Box>
                  {additional.label != "None" && (
                    <Box>
                      <Heading>
                        {currency.value}{" "}
                        {numberFormater(
                          result.totalDeposits[result.balance.length - 1] || 0
                        )}
                      </Heading>
                      <Text>{additional.value}</Text>
                    </Box>
                  )}
                </SimpleGrid>

                <Chart
                  type="donut"
                  series={
                    result.balance[result.balance.length - 1] > 0
                      ? [
                          result.accrusedInterest[result.balance.length - 1],
                          result.totalDeposits[result.balance.length - 1],
                        ]
                      : [
                          -result.accrusedInterest[result.balance.length - 1],
                          -result.totalDeposits[result.balance.length - 1],
                        ]
                  }
                  options={{
                    labels: ["Total Interest Earned", `${additional.value}`],
                    colors:
                      result.balance[result.balance.length - 1] > 0
                        ? ["#000", "#555"]
                        : ["#f00", "#f55"],
                    fill: {
                      colors:
                        result.balance[result.balance.length - 1] > 0
                          ? ["#000", "#555"]
                          : ["#f00", "#f55"],
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
                  {additional.label != "None" && (
                    <Th textAlign={"right"}>{additional.label}</Th>
                  )}
                  <Th textAlign={"right"}>Interest</Th>
                  {additional.label != "None" && (
                    <Th textAlign={"right"}>{additional.value}</Th>
                  )}
                  <Th textAlign={"right"}>Accrued Interest</Th>
                  <Th textAlign={"right"}>Balance</Th>
                </Tr>
              </Thead>
              <Tbody>
                {breakdown.value == "Month" &&
                  result.balance.map((item, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td>{idx}</Td>
                        {additional.label != "None" && (
                          <Td textAlign={"right"}>
                            {numberFormater(result.deposits[idx])}
                          </Td>
                        )}
                        <Td textAlign={"right"}>
                          {numberFormater(result.interest[idx])}
                        </Td>
                        {additional.label != "None" && (
                          <Td textAlign={"right"}>
                            {numberFormater(result.totalDeposits[idx])}
                          </Td>
                        )}
                        <Td textAlign={"right"}>
                          {numberFormater(result.accrusedInterest[idx])}
                        </Td>
                        <Td textAlign={"right"}>
                          {numberFormater(result.balance[idx])}
                        </Td>
                      </Tr>
                    );
                  })}
                {breakdown.value == "Year" &&
                  result.yearBalance.map((item, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td>{idx}</Td>
                        {additional.label != "None" && (
                          <Td textAlign={"right"}>
                            {numberFormater(result.yearDeposits[idx])}
                          </Td>
                        )}
                        <Td textAlign={"right"}>
                          {numberFormater(result.yearInterest[idx])}
                        </Td>
                        {additional.label != "None" && (
                          <Td textAlign={"right"}>
                            {numberFormater(result.yearTotalDeposits[idx])}
                          </Td>
                        )}
                        <Td textAlign={"right"}>
                          {numberFormater(result.yearAccrusedInterest[idx])}
                        </Td>
                        <Td textAlign={"right"}>
                          {numberFormater(result.yearBalance[idx])}
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
      </Box>
    </ToolsLayout>
  );
};

const AditionalInput = ({
  formik,
  currentValue,
  currentPeriod,
  handlePeriod,
}) => {
  const str = currentValue.label.slice(0, -1);
  if (currentValue.label == "None") {
    return <></>;
  } else {
    return (
      <SimpleGrid mt={5} columns={{ base: 1, md: 2 }} gap={5}>
        <Box>
          <TabInput
            handleChange={handlePeriod}
            options={[
              { label: "Start of the Month", value: "Beginning" },
              { label: "End of the Month", value: "End" },
            ]}
            currentValue={currentPeriod}
          />
        </Box>
        <div></div>
        <FormControl
          isInvalid={formik.touched.deposit && Boolean(formik.errors.deposit)}
        >
          <FormLabel htmlFor="deposit">{str} Amount</FormLabel>
          <InputGroup>
            <Input
              value={formik.values.deposit}
              name="deposit"
              type="number"
              onChange={formik.handleChange}
            />
            <InputRightAddon pr={0}>
              <Select
                value={formik.values.depositsType}
                name="depositsType"
                type="string"
                onChange={formik.handleChange}
                variant="unstyled"
              >
                <option value={1}>Monthly</option>
                <option value={3}>Quarterly</option>
                <option value={6}>Half-Yearly</option>
                <option value={12}>Yearly</option>
              </Select>
            </InputRightAddon>
          </InputGroup>

          {formik.touched.deposit && Boolean(formik.errors.deposit) && (
            <FormErrorMessage>{formik.errors.deposit}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          isInvalid={
            formik.touched.depositRate && Boolean(formik.errors.depositRate)
          }
        >
          <FormLabel htmlFor="depositRate">{str} Rate(Annual)</FormLabel>
          <InputGroup>
            <Input
              value={formik.values.depositRate}
              name="depositRate"
              type="number"
              onChange={formik.handleChange}
            />
            <InputRightElement pointerEvents="none">
              <Text>%</Text>
            </InputRightElement>
          </InputGroup>

          {formik.touched.depositRate && Boolean(formik.errors.depositRate) && (
            <FormErrorMessage>{formik.errors.depositRate}</FormErrorMessage>
          )}
        </FormControl>
      </SimpleGrid>
    );
  }
};
export default EquatedMonthlyInsatllmentCalculator;
