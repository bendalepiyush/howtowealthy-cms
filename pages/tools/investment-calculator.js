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
} from "@chakra-ui/react";
import Layout from "../../src/components/layout";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useRef, useCallback, useState } from "react";
import numberFormater from "../../src/utils/number_format";
import Seo from "../../src/components/seo";

const validationSchema = yup.object({});

const InvestmentCalculator = () => {
  const workerRef = useRef();
  const [currency, setCurrency] = useState("$");
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
    };
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  useEffect(() => {
    console.log(result.chartPerMonth);
  }, [result]);

  const handleSubmit = useCallback(async (values) => {
    workerRef.current.postMessage(values);
  }, []);

  return (
    <>
      <Seo
        title="Investment Calculator - How to Wealthy"
        description="HowToWealthy is where we write about personal finance,
              investments, the stock market, and economics that interest us most
              and will help others make better decisions about their money."
      />
      <Layout>
        <Box py={20}>
          <Container maxW={"5xl"}>
            <Box pb={20} maxW={"2xl"}>
              <Heading as={"h1"} mb={2}>
                Investment Calculator
              </Heading>
              <Text fontSize={"2xl"} fontWeight={300}>
                Are you ready to start living the life of financial freedom?
                You&apos;re about to discover the secrets to becoming wealthy.
              </Text>
            </Box>

            <Box>
              <form onSubmit={formik.handleSubmit}>
                <Stack gap={10}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <FormControl>
                      <FormLabel htmlFor="currentAge">
                        What&apos;s your current age?
                      </FormLabel>
                      <Input
                        value={formik.values.currentAge}
                        name="currentAge"
                        type="number"
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="retirementAge">
                        At what age you want to retire?
                      </FormLabel>
                      <Input
                        value={formik.values.retirementAge}
                        name="retirementAge"
                        type="number"
                        onChange={formik.handleChange}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="monthlyInvestment">
                        How much monthly investment you can do?
                      </FormLabel>
                      <Input
                        value={formik.values.monthlyInvestment}
                        name="monthlyInvestment"
                        type="number"
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="increaseMonthlyInvestment">
                        How much yearly contribution you can increase?
                      </FormLabel>
                      <Input
                        value={formik.values.increaseMonthlyInvestment}
                        name="increaseMonthlyInvestment"
                        type="number"
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="yearlyReturnsRate">
                        How much yearly return you can generate?
                      </FormLabel>
                      <Input
                        value={formik.values.yearlyReturnsRate}
                        name="yearlyReturnsRate"
                        type="number"
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="inflationRate">
                        What is the inflation rate in your country?
                      </FormLabel>
                      <Input
                        value={formik.values.inflationRate}
                        name="inflationRate"
                        type="number"
                        onChange={formik.handleChange}
                      />
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
                      {currency}{" "}
                      {numberFormater(
                        result.chartPerMonth[result.chartPerMonth.length - 1] ||
                          0
                      )}
                    </Heading>
                    <Text>Maturity Value</Text>
                  </Box>
                  <Spacer />
                  <Box textAlign={{ base: "left", md: "right" }}>
                    <Heading>
                      {currency} {numberFormater(result.inflationAdjusted || 0)}
                    </Heading>
                    <Text>Inflation Adjusted</Text>
                  </Box>
                </Flex>

                <Box mb={10} background={"gray.50"} p={5} textAlign={"center"}>
                  <Text fontSize={"xl"}>
                    In other words, at the end of your retirement age, you will
                    have{" "}
                    <strong>
                      {currency} {numberFormater(result.inflationAdjusted || 0)}
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
                          Total Deposits (in {currency})
                        </Th>
                        <Th textAlign={"right"}>
                          Accrued Earnings (in {currency})
                        </Th>
                        <Th textAlign={"right"}>Balance (in {currency})</Th>
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
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export default InvestmentCalculator;
