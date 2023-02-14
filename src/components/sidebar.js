import {
  Stack,
  Box,
  Heading,
  Text,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import randomQuote from "../api/get_random_quote";
import * as yup from "yup";
import { subscibeByEmail } from "../api/subscriber";
import Script from "next/script";

const validationSchema = yup.object({
  query: yup.string("Enter valid query.").required("Enter valid query."),
});

const SideBar = () => {
  const [resquote, setResquote] = useState({
    quote: null,
    author: null,
  });

  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      var res = await subscibeByEmail(values.email, "", "");
      setLoading(false);
    },
  });

  useEffect(() => {
    setResquote(randomQuote());
  }, []);

  return (
    <Stack h={"100%"} spacing={14}>
      <Box>
        <Heading
          as={"h2"}
          size={"sm"}
          textTransform={"uppercase"}
          fontWeight={"400"}
        >
          Quote
        </Heading>

        <Box bg={"gray.100"} h={"1px"} mt={3} mb={8}>
          <Box w={`12ch`} bg={"black.900"} h={"1px"}></Box>
        </Box>

        <Text fontSize={"xl"} fontWeight={300} fontStyle={"italic"} mb={3}>
          {resquote.quote}
        </Text>
        {resquote.author && <Text fontSize={"md"}>- by {resquote.author}</Text>}
      </Box>

      <Box>
        <Heading
          as={"h2"}
          size={"sm"}
          textTransform={"uppercase"}
          fontWeight={"400"}
        >
          Subscribe
        </Heading>

        <Box bg={"gray.100"} h={"1px"} mt={3} mb={8}>
          <Box w={`12ch`} bg={"black.900"} h={"1px"}></Box>
        </Box>

        <Text fontSize={"md"} mb={6}>
          We&apos;re sharing our secrets and experiences on how to get your
          Personal Finances sorted and helping you to make better decisions
        </Text>

        <form onSubmit={formik.handleSubmit}>
          <Stack gap={2}>
            <FormControl
              isInvalid={formik.touched.email && Boolean(formik.errors.email)}
            >
              <Input
                name="email"
                id="email"
                placeholder="Email Address"
                size="lg"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && Boolean(formik.errors.email) && (
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              )}
            </FormControl>
            <Button
              isLoading={loading}
              loadingText="Submitting"
              type="submit"
              colorScheme={"black"}
              size="lg"
            >
              Subscribe
            </Button>
          </Stack>
        </form>
      </Box>

      {/* <Box h={"100%"}>
        <Heading
          as={"h2"}
          size={"sm"}
          textTransform={"uppercase"}
          fontWeight={"400"}
        >
          Economic Calendar
        </Heading>

        <Box bg={"gray.100"} h={"1px"} mt={3} mb={8}>
          <Box w={`20ch`} bg={"black.900"} h={"1px"}></Box>
        </Box>

        <Box
          h={"100%"}
          id="show-banner"
          dangerouslySetInnerHTML={{
            __html: `<div class="tradingview-widget-container">
            <div class="tradingview-widget-container__widget"></div>
            <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-events.js" async>
            {
              "width": "100%",
              "height": "100%",
              "colorTheme": "light",
              "isTransparent": true,
              "locale": "in",
              "importanceFilter": "0,1"
            }
            </script>
          </div>`,
          }}
        />
      </Box> */}
    </Stack>
  );
};

export default SideBar;
