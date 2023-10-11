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
  niftyPrice: yup
    .number("Enter valid price")
    .min(1, "Price should be price 1")
    .required("Enter valid price"),
  indiavix: yup
    .number("Enter valid price")
    .min(1, "Price should be price 1")
    .required("Enter valid price"),
});

const NiftyRangeCalculator = () => {
  const [day, setDay] = useState(null);
  const [week, setWeek] = useState(null);
  const [month, setMonth] = useState(null);

  const formik = useFormik({
    initialValues: {
      niftyPrice: 19653.5,
      indiavix: 11,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const factor = 19.1049732;
      const volatility = values.indiavix / factor;
      const diff = (values.niftyPrice * volatility) / 100;

      setLow((values.niftyPrice - diff).toLocaleString());
      setHigh((values.niftyPrice + diff).toLocaleString());
    },
  });

  useEffect(() => {
    const factor = 19.1049732;
    const factorWeek = 7.21110255093;
    const factorMonth = 3.46410161514;
    const volatility = formik.values.indiavix / factor;
    const volatilityWeek = formik.values.indiavix / factorWeek;
    const volatilityMonth = formik.values.indiavix / factorMonth;
    const diff = (formik.values.niftyPrice * volatility) / 100;
    const diffWeek = (formik.values.niftyPrice * volatilityWeek) / 100;
    const diffMonth = (formik.values.niftyPrice * volatilityMonth) / 100;

    setDay({
      low: (formik.values.niftyPrice - diff).toLocaleString(),
      high: (formik.values.niftyPrice + diff).toLocaleString(),
    });

    setWeek({
      low: (formik.values.niftyPrice - diffWeek).toLocaleString(),
      high: (formik.values.niftyPrice + diffWeek).toLocaleString(),
    });

    setMonth({
      low: (formik.values.niftyPrice - diffMonth).toLocaleString(),
      high: (formik.values.niftyPrice + diffMonth).toLocaleString(),
    });
  }, [formik.values]);

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
        headline: "Nifty Range Calculator - How to Wealthy",
        publisher: {
          name: "How to Wealthy",
          "@type": "Organization",
        },
        description:
          "For Nifty, this calculator calculates the possible range of price within which the nifty is expected to move till the expiry date that is entered, based on vix.",
        dateModified: "2022-03-02",
        datePublished: "2022-03-02",
        mainEntityOfPage: {
          "@id":
            "https://www.howtowealthy.com/tools/trading/nifty-range-calculator",
          "@type": "WebPage",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.howtowealthy.com/tools/trading/nifty-range-calculator#breadcrumb`,
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
            name: "Nifty Range Calculator - How to Wealthy",
          },
        ],
      },
    ],
  };

  return (
    <ToolsLayout
      path={"/tools/trading/nifty-range-calculator"}
      title="Nifty Range Calculator - How to Wealthy"
      description="For Nifty, this calculator calculates the possible range of price within which the nifty is expected to move till the expiry date that is entered, based on vix."
      structuredData={JSON.stringify(structuredData)}
      ogImage={
        "https://assets.howtowealthy.com/ogimg-nifty-range-calculator.png"
      }
    >
      <Box>
        <Box pb={10}>
          <Heading as={"h1"} fontSize={"2xl"} mb={2}>
            Nifty Range Calculator
          </Heading>
          <Text fontSize={"xl"} fontWeight={300}>
            For Nifty, this calculator calculates the possible range of price
            within which the nifty is expected to move till the expiry date that
            is entered, based on vix.
          </Text>
        </Box>

        <Box>
          <form onSubmit={formik.handleSubmit}>
            <Stack gap={10}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                <FormControl
                  isInvalid={
                    formik.touched.niftyPrice &&
                    Boolean(formik.errors.niftyPrice)
                  }
                >
                  <FormLabel htmlFor="niftyPrice">
                    Nifty Current Price
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Text>₹</Text>
                    </InputLeftElement>
                    <Input
                      value={formik.values.niftyPrice}
                      name="niftyPrice"
                      type="number"
                      onChange={formik.handleChange}
                    />
                  </InputGroup>
                  {formik.touched.niftyPrice &&
                    Boolean(formik.errors.niftyPrice) && (
                      <FormErrorMessage>
                        {formik.errors.niftyPrice}
                      </FormErrorMessage>
                    )}
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.touched.indiavix && Boolean(formik.errors.indiavix)
                  }
                >
                  <FormLabel htmlFor="indiavix">India VIX</FormLabel>
                  <InputGroup>
                    <Input
                      value={formik.values.indiavix}
                      name="indiavix"
                      type="number"
                      onChange={formik.handleChange}
                    />
                  </InputGroup>
                  {formik.touched.indiavix &&
                    Boolean(formik.errors.indiavix) && (
                      <FormErrorMessage>
                        {formik.errors.indiavix}
                      </FormErrorMessage>
                    )}
                </FormControl>
              </SimpleGrid>
            </Stack>
          </form>
        </Box>
        {day && (
          <Box mt={10} p={10} backgroundColor={"purple"} color={"white"}>
            <SimpleGrid columns={2} gap={10}>
              <Box>
                Nifty Daily Range:{" "}
                <Text fontSize={"2xl"}>
                  {day.low} - {day.high}
                </Text>
              </Box>

              <Box>
                Nifty Weekly Range:
                <Text fontSize={"2xl"}>
                  {week.low} - {week.high}
                </Text>
              </Box>

              <Box>
                Nifty Monthly Range:{" "}
                <Text fontSize={"2xl"}>
                  {month.low} - {month.high}
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        )}

        <Box mt={20} fontSize={"18px"} lineHeight={1.7}>
          <div className={"post-content"}></div>
        </Box>
      </Box>
    </ToolsLayout>
  );
};

export default NiftyRangeCalculator;
