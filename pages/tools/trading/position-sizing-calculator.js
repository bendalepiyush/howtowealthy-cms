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
    .integer("Enter valid capital")
    .min(1000, "Capital should be minimum 1000")
    .required("Enter valid capital"),
  stopLoss: yup
    .number("Enter valid stop loss")
    .moreThan(0, "Enter valid stop loss")
    .required("Enter valid stop loss"),
  buyPrice: yup
    .number("Enter valid buy price")
    .moreThan(0, "Enter valid buy price")
    .required("Enter valid buy price"),
  lotSize: yup
    .number("Enter valid lot size")
    .min(1, "Enter valid lot size")
    .required("Enter valid lot size"),
});

const LoanPayOfOrInvest = () => {
  const [currency, setCurrency] = useState({ label: "INR (₹)", value: "₹" });

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
                Position Sizing
              </Heading>
              <Text fontSize={"2xl"} fontWeight={300}>
                Position sizing is the number of units invested in a particular
                security by a trader. To help you to determine position sizing
                we have created this simple tool.
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
                    <div>
                      Total Risk you can take:{" "}
                      {(formik.values.totalCapital *
                        formik.values.riskOnCapital) /
                        100}
                    </div>
                    <div></div>
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

                    <FormControl
                      isInvalid={
                        formik.touched.lotSize && Boolean(formik.errors.lotSize)
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

                    <div></div>
                    <div>
                      {/* <p>
                        Margin required for each lot: {currency.value}
                        {formik.values.buyPrice * formik.values.lotSize}
                      </p>
                      <p>
                        Risk per lot: {currency.value}
                        {(formik.values.buyPrice - formik.values.stopLoss) *
                          formik.values.lotSize}
                      </p>
                      <p>
                        Total lot you can buy:{" "}
                        {Math.floor(
                          formik.values.totalCapital /
                            (formik.values.buyPrice * formik.values.lotSize)
                        )}
                      </p> */}

                      <p>
                        Position Sizing should be:{" "}
                        {Math.floor(
                          (formik.values.totalCapital *
                            formik.values.riskOnCapital) /
                            100 /
                            ((formik.values.buyPrice - formik.values.stopLoss) *
                              formik.values.lotSize)
                        )}
                      </p>

                      <p>
                        Total margin deployed: {currency.value}
                        {Math.floor(
                          (formik.values.totalCapital *
                            formik.values.riskOnCapital) /
                            100 /
                            ((formik.values.buyPrice - formik.values.stopLoss) *
                              formik.values.lotSize)
                        ) *
                          formik.values.buyPrice *
                          formik.values.lotSize}
                      </p>

                      <p>
                        Total risk if proper position sizing: {currency.value}
                        {Math.floor(
                          (formik.values.totalCapital *
                            formik.values.riskOnCapital) /
                            100 /
                            ((formik.values.buyPrice - formik.values.stopLoss) *
                              formik.values.lotSize)
                        ) *
                          (formik.values.buyPrice - formik.values.stopLoss) *
                          formik.values.lotSize}
                      </p>
                    </div>
                  </SimpleGrid>
                </Stack>
              </form>
            </Box>

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
