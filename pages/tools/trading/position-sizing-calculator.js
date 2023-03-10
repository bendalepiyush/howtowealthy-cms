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
  GridItem,
} from "@chakra-ui/react";
import Layout from "../../../src/components/layout";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useRef, useCallback, useState } from "react";
import numberFormater from "../../../src/utils/number_format";
import Seo from "../../../src/components/seo";
import Link from "next/link";

const validationSchema = yup.object({
  totalCapital: yup
    .number("Enter valid capital")
    .min(1000, "Capital should be minimum 1000")
    .required("Enter valid capital"),
  stopLoss: yup
    .number("Enter valid stop loss")
    .moreThan(0, "Enter valid stop loss")
    .lessThan(yup.ref("buyPrice"), "Stop loss should be less than buy price")
    .required("Enter valid stop loss"),
  buyPrice: yup
    .number("Enter valid buy price")
    .min(0, "Enter valid buy price")
    .moreThan(yup.ref("stopLoss"), "Stop loss should be less than buy price")
    .required("Enter valid buy price"),
  lotSize: yup
    .number("Enter valid lot size")
    .min(1, "Enter valid lot size")
    .required("Enter valid lot size"),
});

const LoanPayOfOrInvest = () => {
  const [currency, setCurrency] = useState({ label: "INR (₹)", value: "₹" });
  const [type, setType] = useState({ label: "Equity", value: "Equity" });

  const formik = useFormik({
    initialValues: {
      totalCapital: 100000,
      riskOnCapital: 1,
      stopLoss: 195,
      buyPrice: 200,
      lotSize: 25,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Submit");
    },
  });

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
        headline: "Position Sizing Calculator - How to Wealthy",
        publisher: {
          name: "How to Wealthy",
          "@type": "Organization",
        },
        description:
          "Position sizing is the number of units invested in a particular security by a trader. To help you to determine position sizing we have created this simple tool.",
        dateModified: "2022-03-01",
        datePublished: "2022-03-01",
        mainEntityOfPage: {
          "@id":
            "https://www.howtowealthy.com/tools/trading/position-sizing-calculator",
          "@type": "WebPage",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.howtowealthy.com/tools/trading/position-sizing-calculator#breadcrumb`,
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
            name: "Position Sizing Calculator - How to Wealthy",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Seo
        title="Position Sizing Calculator - How to Wealthy"
        description="Position sizing is the number of units invested in a particular security by a trader. To help you to determine position sizing we have created this simple tool."
        structuredData={JSON.stringify(structuredData)}
        ogImage={
          "https://assets.howtowealthy.com/ogimg-position-sizing-calculator.png"
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
                Position Sizing
              </Heading>
              <Text fontSize={"2xl"} fontWeight={300}>
                Position sizing is the number of units invested in a particular
                security by a trader. To help you to determine position sizing
                we have created this simple tool.
              </Text>
            </Box>

            <Flex mb={10} justifyContent={"space-between"}>
              <TabInput
                handleChange={setCurrency}
                options={[
                  { label: "USD ($)", value: "$" },
                  { label: "GBP (£)", value: "£" },
                  { label: "INR (₹)", value: "₹" },
                ]}
                currentValue={currency}
              />

              <TabInput
                handleChange={setType}
                options={[
                  { label: "Equity", value: "Equity" },
                  { label: "FnO", value: "FnO" },
                ]}
                currentValue={type}
              />
            </Flex>

            <Box>
              <form onSubmit={formik.handleSubmit}>
                <Stack gap={10}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <FormControl
                      isInvalid={
                        formik.touched.totalCapital &&
                        Boolean(formik.errors.totalCapital)
                      }
                    >
                      <FormLabel htmlFor="totalCapital">
                        Total Capital
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Text>{currency.value}</Text>
                        </InputLeftElement>
                        <Input
                          value={formik.values.totalCapital}
                          name="totalCapital"
                          type="number"
                          onChange={formik.handleChange}
                        />
                      </InputGroup>
                      {formik.touched.totalCapital &&
                        Boolean(formik.errors.totalCapital) && (
                          <FormErrorMessage>
                            {formik.errors.totalCapital}
                          </FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl
                      isInvalid={
                        formik.touched.riskOnCapital &&
                        Boolean(formik.errors.riskOnCapital)
                      }
                    >
                      <FormLabel htmlFor="riskOnCapital">
                        % Risk of Capital
                      </FormLabel>
                      <InputGroup>
                        <Input
                          value={formik.values.riskOnCapital}
                          name="riskOnCapital"
                          type="number"
                          onChange={formik.handleChange}
                        />
                        <InputRightElement pointerEvents="none">
                          <Text pr={5}>%</Text>
                        </InputRightElement>
                      </InputGroup>

                      {formik.touched.riskOnCapital &&
                        Boolean(formik.errors.riskOnCapital) && (
                          <FormErrorMessage>
                            {formik.errors.riskOnCapital}
                          </FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl
                      isInvalid={
                        formik.touched.buyPrice &&
                        Boolean(formik.errors.buyPrice)
                      }
                    >
                      <FormLabel htmlFor="buyPrice">Buy Price</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Text>{currency.value}</Text>
                        </InputLeftElement>
                        <Input
                          value={formik.values.buyPrice}
                          name="buyPrice"
                          type="number"
                          onChange={formik.handleChange}
                        />
                      </InputGroup>
                      {formik.touched.buyPrice &&
                        Boolean(formik.errors.buyPrice) && (
                          <FormErrorMessage>
                            {formik.errors.buyPrice}
                          </FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl
                      isInvalid={
                        formik.touched.stopLoss &&
                        Boolean(formik.errors.stopLoss)
                      }
                    >
                      <FormLabel htmlFor="stopLoss">Stop Loss</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Text>{currency.value}</Text>
                        </InputLeftElement>
                        <Input
                          value={formik.values.stopLoss}
                          name="stopLoss"
                          type="number"
                          onChange={formik.handleChange}
                        />
                      </InputGroup>
                      {formik.touched.stopLoss &&
                        Boolean(formik.errors.stopLoss) && (
                          <FormErrorMessage>
                            {formik.errors.stopLoss}
                          </FormErrorMessage>
                        )}
                    </FormControl>

                    {type.value == "FnO" && (
                      <FormControl
                        isInvalid={
                          formik.touched.lotSize &&
                          Boolean(formik.errors.lotSize)
                        }
                      >
                        <FormLabel htmlFor="lotSize">Lot Size</FormLabel>
                        <InputGroup>
                          <Input
                            value={formik.values.lotSize}
                            name="lotSize"
                            type="number"
                            onChange={formik.handleChange}
                          />
                        </InputGroup>
                        {formik.touched.lotSize &&
                          Boolean(formik.errors.lotSize) && (
                            <FormErrorMessage>
                              {formik.errors.lotSize}
                            </FormErrorMessage>
                          )}
                      </FormControl>
                    )}

                    <GridItem colSpan={2}>
                      <Box p={10} backgroundColor={"purple"} color={"white"}>
                        <SimpleGrid columns={2} gap={10}>
                          <Box>
                            Total Risk you can take:{" "}
                            <Text fontSize={"2xl"}>
                              {currency.value}
                              {(formik.values.totalCapital *
                                formik.values.riskOnCapital) /
                                100}
                            </Text>
                          </Box>
                          <Box>
                            Position Sizing should be:{" "}
                            <Text fontSize={"2xl"}>
                              {Math.floor(
                                (formik.values.totalCapital *
                                  formik.values.riskOnCapital) /
                                  100 /
                                  ((formik.values.buyPrice -
                                    formik.values.stopLoss) *
                                    (type.value == "FnO"
                                      ? formik.values.lotSize
                                      : 1))
                              )}
                            </Text>
                          </Box>

                          <Box>
                            Total margin deployed:
                            <Text fontSize={"2xl"}>
                              {currency.value}
                              {Math.floor(
                                (formik.values.totalCapital *
                                  formik.values.riskOnCapital) /
                                  100 /
                                  ((formik.values.buyPrice -
                                    formik.values.stopLoss) *
                                    (type.value == "FnO"
                                      ? formik.values.lotSize
                                      : 1))
                              ) *
                                formik.values.buyPrice *
                                (type.value == "FnO"
                                  ? formik.values.lotSize
                                  : 1)}
                            </Text>
                          </Box>

                          <Box>
                            Total risk if proper position sizing:{" "}
                            <Text fontSize={"2xl"}>
                              {currency.value}
                              {Math.floor(
                                (formik.values.totalCapital *
                                  formik.values.riskOnCapital) /
                                  100 /
                                  ((formik.values.buyPrice -
                                    formik.values.stopLoss) *
                                    formik.values.lotSize)
                              ) *
                                (formik.values.buyPrice -
                                  formik.values.stopLoss) *
                                formik.values.lotSize}
                            </Text>
                          </Box>
                        </SimpleGrid>
                      </Box>
                    </GridItem>
                  </SimpleGrid>
                </Stack>
              </form>
            </Box>

            <Box mt={20} fontSize={"18px"} lineHeight={1.7}>
              <div className={"post-content"}>
                <p>
                  Managing your risk is one of the most crucial things you must
                  do as a trader. Position sizing is an essential part of risk
                  management because it tells you how much money you are willing
                  to lose on each trade. If you exercise caution while sizing
                  your positions, you can avoid losing more money than you can
                  afford.
                </p>
                <p>
                  We&apos;ve devised a simple tool to help you minimise your
                  risk and maximise your profits: the Position Size Calculator.
                  In this article, we&apos;ll define a position sizing
                  calculator, describe how to use it, and discuss its benefits.
                </p>
                <h2>What is a position sizing calculator?</h2>
                <p>
                  You can use a position sizing calculator to help you decide
                  how much money is the right amount to invest in a specific
                  security. It considers elements including your account
                  balance, the trade size, and the risk level you&apos;re
                  willing to accept. Using a position sizing calculator, you can
                  maximise your potential gains and ensure you&apos;re not
                  taking on more risk than you can bear.
                </p>
                <h2>How to Use a Position-Sizing Calculator</h2>
                <p>
                  It&apos;s simple to use a position sizing calculator. The
                  following steps:
                </p>
                <ol>
                  <li>
                    <strong>Determine your account balance or capital:</strong>{" "}
                    The first step is to determine how much money is in your
                    trading account and how much money you will trade as
                    capital.
                  </li>
                  <li>
                    <strong>
                      Determine the risk you&apos;re willing to take.
                    </strong>{" "}
                    The next stage is choosing how much trouble you want to
                    accept in a specific trade. This might be shown as a
                    percentage of the total amount in your account.
                  </li>
                  <li>
                    <strong>Determine the security pricey:</strong> The third
                    step is establishing the price you wish to trade.
                  </li>
                  <li>
                    <strong>Choose your stop-loss:</strong> Selecting your
                    stop-loss level is the fourth step. If the deal swings
                    against you, you will close it at this price.
                  </li>
                  <li>
                    <strong>Calculate your position size:</strong> Calculating
                    your position size is the last stage. The formula shown
                    below can be used to accomplish this:
                  </li>
                </ol>
                <p>
                  <strong>
                    <em>
                      Position size = (account balance x risk percentage) /
                      (entry price - stop loss)
                    </em>
                  </strong>
                </p>
                <h2>Advantages of the Position Sizing Calculator</h2>
                <p>
                  Using a position sizing calculator has various advantages.
                </p>
                <ul>
                  <li>
                    <strong>Accurately calculating position sizes: </strong>
                    Using a position sizing calculator, you can ensure that your
                    position size calculation is accurate. Doing this will make
                    it less likely that you&apos;ll make mistakes that will cost
                    you money and increase your overall profits.
                  </li>
                  <li>
                    <strong>How to lower the risks of trading:</strong> Managing
                    your position size well will help you reduce the risks of
                    trading. This can lower the chance of losing a lot of money
                    and give you more faith in your trading method.
                  </li>
                  <li>
                    <strong>Maximising profits:</strong> Using a position sizing
                    calculator, you can increase your prospective earnings. This
                    is because you&apos;ll be able to choose the right
                    transaction size, enabling you to seize profitable
                    possibilities.
                  </li>
                  <li>
                    <strong>Consistent trading strategy:</strong> A position
                    sizing calculator can help you develop a consistent
                    approach. This can help you keep calm and avoid making hasty
                    decisions that could hurt your trading performance.
                  </li>
                  <li>
                    <strong>Improved trading psychology:</strong> Position
                    sizing can significantly impact your trading mentality.
                    Using a position sizing calculator will help you trade with
                    greater assurance and prevent feelings of greed, anxiety, or
                    panic.
                  </li>
                  <li>
                    <strong>More efficient use of capital:</strong> Using the
                    correct position sizing, you can use your trading capital
                    more effectively. By carefully investing your money, you can
                    take advantage of good chances while lowering your risks.
                  </li>
                </ul>
                <h2>Conclusion</h2>
                <p>
                  For traders, position sizing is a crucial component of risk
                  management. Using a position sizing calculator, you can ensure
                  you&apos;re managing your risk effectively and maximise your
                  potential profits. The calculator makes it simple to decide
                  the ideal position size for each transaction by considering
                  variables like your account balance, the trade size, and the
                  level of risk you&apos;re willing to accept. This tool may
                  enhance your trading outcomes and create a more reliable and
                  methodical trading strategy.
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

export default LoanPayOfOrInvest;
