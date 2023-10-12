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
import ToolsLayout from "../../../src/components/layout/tools";

const validationSchema = yup.object({
  openPrice: yup
    .number("Enter valid price")
    .min(1, "Price should be price 1")
    .required("Enter valid price"),
  closePrice: yup
    .number("Enter valid price")
    .min(1, "Price should be price 1")
    .required("Enter valid price"),
  highPrice: yup
    .number("Enter valid price")
    .min(1, "Price should be price 1")
    .moreThan(yup.ref("lowPrice"), "High price should be more than low price")
    .required("Enter valid price"),
  lowPrice: yup
    .number("Enter valid price")
    .min(1, "Price should be price 1")
    .lessThan(yup.ref("highPrice"), "Low price should be less than high price")
    .required("Enter valid price"),
});

const PivotPointCalculator = () => {
  const [result, setResult] = useState(null);

  const formik = useFormik({
    initialValues: {
      openPrice: 211,
      closePrice: 225,
      highPrice: 234,
      lowPrice: 209,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { openPrice, closePrice, highPrice, lowPrice } = values;
      let temp = [];

      const pivotFloor = (highPrice + lowPrice + closePrice) / 3;
      const pivotWoodie = (highPrice + lowPrice + closePrice * 2) / 4;
      const pivotCamarilla = "";
      const pivotDemark = "";
      const pivotFib = (highPrice + lowPrice + closePrice) / 3;

      let xDemark;
      if (closePrice < openPrice) {
        xDemark = highPrice + 2 * lowPrice + closePrice;
      } else if (closePrice > openPrice) {
        xDemark = 2 * highPrice + lowPrice + closePrice;
      } else {
        xDemark = highPrice + lowPrice + 2 * closePrice;
      }

      const r3Floor = highPrice + 2 * (pivotFloor - lowPrice);
      const r3Camarilla = closePrice + 1.25 * (highPrice - lowPrice);
      const r3Fib = pivotFib + highPrice - lowPrice;
      temp.push([
        "R3",
        r3Floor.toLocaleString(),
        "",
        r3Camarilla.toLocaleString(),
        "",
        r3Fib.toLocaleString(),
      ]);

      const r2Floor = pivotFloor + highPrice - lowPrice;
      const r2Woodie = pivotWoodie + highPrice - lowPrice;
      const r2Camarilla = closePrice + 1.1666 * (highPrice - lowPrice);
      const r2Fib = pivotFib + 0.6182 * (highPrice - lowPrice);
      temp.push([
        "R2",
        r2Floor.toLocaleString(),
        r2Woodie.toLocaleString(),
        r2Camarilla.toLocaleString(),
        "",
        r2Fib.toLocaleString(),
      ]);

      const r1Floor = pivotFloor * 2 - lowPrice;
      const r1Woodie = pivotWoodie * 2 - lowPrice;
      const r1Camarilla = closePrice + 1.0833 * (highPrice - lowPrice);
      const r1Fib = pivotFib + 0.382 * (highPrice - lowPrice);
      const r1Demark = xDemark / 2 - lowPrice;
      temp.push([
        "R1",
        r1Floor.toLocaleString(),
        r1Woodie.toLocaleString(),
        r1Camarilla.toLocaleString(),
        r1Demark.toLocaleString(),
        r1Fib.toLocaleString(),
      ]);

      temp.push([
        "PP",
        pivotFloor.toLocaleString(),
        pivotWoodie.toLocaleString(),
        pivotCamarilla,
        pivotDemark,
        pivotFib.toLocaleString(),
      ]);

      const s1Floor = pivotFloor * 2 - highPrice;
      const s1Woodie = pivotWoodie * 2 - highPrice;
      const s1Camarilla = closePrice - 1.0833 * (highPrice - lowPrice);
      const s1Fib = pivotFib - 0.382 * (highPrice - lowPrice);
      const s1Demark = xDemark / 2 - highPrice;
      temp.push([
        "S1",
        s1Floor.toLocaleString(),
        s1Woodie.toLocaleString(),
        s1Camarilla.toLocaleString(),
        s1Demark.toLocaleString(),
        s1Fib.toLocaleString(),
      ]);

      const s2Floor = pivotFloor - highPrice + lowPrice;
      const s2Woodie = pivotWoodie - highPrice + lowPrice;
      const s2Camarilla = closePrice - 1.1666 * (highPrice - lowPrice);
      const s2Fib = pivotFib - 0.6182 * (highPrice - lowPrice);
      temp.push([
        "S2",
        s2Floor.toLocaleString(),
        s2Woodie.toLocaleString(),
        s2Camarilla.toLocaleString(),
        "",
        s2Fib.toLocaleString(),
      ]);

      const s3Floor = lowPrice - 2 * (highPrice - pivotFloor);
      const s3Camarilla = closePrice - 1.25 * (highPrice - lowPrice);
      const s3Fib = pivotFib + highPrice - lowPrice;
      temp.push([
        "S3",
        s3Floor.toLocaleString(),
        "",
        s3Camarilla.toLocaleString(),
        "",
        s3Fib.toLocaleString(),
      ]);

      setResult(temp);
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
        headline: "Pivot Point Calculator - How to Wealthy",
        publisher: {
          name: "How to Wealthy",
          "@type": "Organization",
        },
        description:
          "Pivot Points Calculator uses a previous period’s high, low, and close price for a specific period to define future support and Resistance levels.",
        dateModified: "2022-03-02",
        datePublished: "2022-03-02",
        mainEntityOfPage: {
          "@id":
            "https://www.howtowealthy.com/tools/trading/pivot-point-calculator",
          "@type": "WebPage",
        },
      },
    ],
  };

  return (
    <ToolsLayout
      path={"/tools/trading/pivot-point-calculator"}
      title="Pivot Point Calculator - How to Wealthy"
      description="Pivot Points Calculator uses a previous period’s high, low, and close price for a specific period to define future support and Resistance levels."
      structuredData={JSON.stringify(structuredData)}
      ogImage={
        "https://assets.howtowealthy.com/ogimg-pivot-point-calculator.png"
      }
    >
      <Box>
        <Box pb={10}>
          <Heading as={"h1"} fontSize={"2xl"} mb={2}>
            Pivot Point Calculator
          </Heading>
          <Text fontSize={"xl"} fontWeight={300}>
            Pivot Points Calculator is a technical analysis indicator. It uses a
            previous period’s high, low, and close price for a specific period
            to define future support and Resistance levels. We have included 5
            Different Kinds of Pivot Points: Floor, Woodie, Camarilla, Demark,
            and Fibonacci.
          </Text>
        </Box>

        <Box>
          <form onSubmit={formik.handleSubmit}>
            <Stack gap={10}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20}>
                <SimpleGrid spacing={5}>
                  <FormControl
                    isInvalid={
                      formik.touched.openPrice &&
                      Boolean(formik.errors.openPrice)
                    }
                  >
                    <FormLabel htmlFor="openPrice">Open Price</FormLabel>
                    <InputGroup>
                      <Input
                        value={formik.values.openPrice}
                        name="openPrice"
                        type="number"
                        onChange={formik.handleChange}
                      />
                    </InputGroup>
                    {formik.touched.openPrice &&
                      Boolean(formik.errors.openPrice) && (
                        <FormErrorMessage>
                          {formik.errors.openPrice}
                        </FormErrorMessage>
                      )}
                  </FormControl>

                  <FormControl
                    isInvalid={
                      formik.touched.closePrice &&
                      Boolean(formik.errors.closePrice)
                    }
                  >
                    <FormLabel htmlFor="closePrice">Close Price</FormLabel>
                    <InputGroup>
                      <Input
                        value={formik.values.closePrice}
                        name="closePrice"
                        type="number"
                        onChange={formik.handleChange}
                      />
                    </InputGroup>
                    {formik.touched.closePrice &&
                      Boolean(formik.errors.closePrice) && (
                        <FormErrorMessage>
                          {formik.errors.closePrice}
                        </FormErrorMessage>
                      )}
                  </FormControl>

                  <FormControl
                    isInvalid={
                      formik.touched.highPrice &&
                      Boolean(formik.errors.highPrice)
                    }
                  >
                    <FormLabel htmlFor="highPrice">High Price</FormLabel>
                    <InputGroup>
                      <Input
                        value={formik.values.highPrice}
                        name="highPrice"
                        type="number"
                        onChange={formik.handleChange}
                      />
                    </InputGroup>
                    {formik.touched.highPrice &&
                      Boolean(formik.errors.highPrice) && (
                        <FormErrorMessage>
                          {formik.errors.highPrice}
                        </FormErrorMessage>
                      )}
                  </FormControl>

                  <FormControl
                    isInvalid={
                      formik.touched.lowPrice && Boolean(formik.errors.lowPrice)
                    }
                  >
                    <FormLabel htmlFor="lowPrice">Low Price</FormLabel>
                    <InputGroup>
                      <Input
                        value={formik.values.lowPrice}
                        name="lowPrice"
                        type="number"
                        onChange={formik.handleChange}
                      />
                    </InputGroup>
                    {formik.touched.lowPrice &&
                      Boolean(formik.errors.lowPrice) && (
                        <FormErrorMessage>
                          {formik.errors.lowPrice}
                        </FormErrorMessage>
                      )}
                  </FormControl>
                  <Button colorScheme={"primary"} type="submit">
                    Calculate
                  </Button>
                </SimpleGrid>

                <Box w={"500px"} maxW={"100%"} m={"auto"}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://assets.howtowealthy.com/basic-candle-geek.png"
                    alt="Basic Candle Geek - Pivot Point Calculator"
                  />
                </Box>
              </SimpleGrid>
            </Stack>
          </form>
        </Box>
        {result && (
          <Box mt={20} fontSize={"18px"} lineHeight={1.7}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Levels</Th>
                  <Th>Floor</Th>
                  <Th>Woodie</Th>
                  <Th>Camarilla</Th>
                  <Th>Demark</Th>
                  <Th>Fibonacci</Th>
                </Tr>
              </Thead>
              <Tbody>
                {result.map((item, i) => {
                  return (
                    <Tr key={i}>
                      {item.map((sub, j) => (
                        <Td key={`${i}${j}`}>{sub}</Td>
                      ))}
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

export default PivotPointCalculator;
