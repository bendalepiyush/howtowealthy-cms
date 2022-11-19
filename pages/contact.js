import {
  Box,
  Container,
  FormControl,
  Heading,
  Stack,
  Text,
  FormLabel,
  HStack,
  Input,
  FormErrorMessage,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Layout from "../src/components/layout";
import Seo from "../src/components/seo";
import * as yup from "yup";
import { useState } from "react";
import { contact } from "../src/api/contact_form";

const validationSchema = yup.object({
  firstName: yup
    .string("Enter valid firstname")
    .required("Enter valid firstname")
    .min(3, "Firstname should minimum 3 charaters")
    .max(20, "Firstname should maximum 20 charaters")
    .typeError("Enter valid firstname"),
  lastName: yup
    .string("Enter valid lastname")
    .required("Enter valid lastname")
    .min(3, "Lastname should minimum 3 charaters")
    .max(20, "Lastname should maximum 20 charaters")
    .typeError("Enter valid lastname"),
  email: yup
    .string("Enter valid email")
    .email("Enter valid email")
    .required("Email is required"),
  message: yup
    .string("Enter valid message")
    .required("Enter valid message")
    .min(3, "Message should minimum 3 charaters"),
});

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      contact(values.email, values.firstName, values.lastName, values.message)
        .then((res) => {
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
        });
    },
  });

  return (
    <>
      <Seo
        title="Contact Us - How to Wealthy"
        description="HowToWealthy is where we write about personal finance,
        investments, the stock market, and economics that interest us most
        and will help others make better decisions about their money."
      />
      <Layout>
        <Container maxW={"70ch"} pb={{ base: 10, md: 20 }}>
          <Box py={{ base: 10, md: 20 }}>
            <Heading as={"h1"}>Contact Us</Heading>
          </Box>

          <Stack gap={3} mb={20}>
            <Text fontSize={"lg"}>
              <b>Mobile Number:</b> +91 915-867-4554
            </Text>
            <Text fontSize={"lg"}>
              <b>Email:</b> contact@howtowealthy.com
            </Text>
            <Text fontSize={"lg"}>
              <b>Address:</b> Pune Maharashtra, India
            </Text>
          </Stack>

          <form onSubmit={formik.handleSubmit}>
            <Stack gap={4}>
              <HStack align={"top"}>
                <Box w={"100%"}>
                  <FormControl
                    isInvalid={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                  >
                    <FormLabel htmlFor={"firstName"}>First Name</FormLabel>
                    <Input
                      name="firstName"
                      id="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      type="text"
                    />
                    {formik.touched.firstName &&
                      Boolean(formik.errors.firstName) && (
                        <FormErrorMessage>
                          {formik.errors.firstName}
                        </FormErrorMessage>
                      )}
                  </FormControl>
                </Box>
                <Box w={"100%"}>
                  <FormControl
                    isInvalid={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                  >
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      type="text"
                    />
                    {formik.touched.lastName &&
                      Boolean(formik.errors.lastName) && (
                        <FormErrorMessage>
                          {formik.errors.lastName}
                        </FormErrorMessage>
                      )}
                  </FormControl>
                </Box>
              </HStack>
              <FormControl
                isInvalid={formik.touched.email && Boolean(formik.errors.email)}
              >
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  type="text"
                />
                {formik.touched.email && Boolean(formik.errors.email) && (
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                isInvalid={
                  formik.touched.message && Boolean(formik.errors.message)
                }
              >
                <FormLabel htmlFor="message">Message</FormLabel>
                <Textarea
                  id="message"
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  type="text"
                />
                {formik.touched.message && Boolean(formik.errors.message) && (
                  <FormErrorMessage>{formik.errors.message}</FormErrorMessage>
                )}
              </FormControl>
              <Button
                isLoading={isLoading}
                type={"submit"}
                colorScheme={"primary"}
              >
                Send Message
              </Button>
            </Stack>
          </form>
        </Container>
      </Layout>
    </>
  );
};

export default Contact;
