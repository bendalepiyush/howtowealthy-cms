import {
  Flex,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Heading,
  Text,
  HStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import AuthHeader from "../../src/components/sections/auth/auth_header";
import Link from "next/link";
import { useFormik } from "formik";
import {
  auth,
  registerWithEmailAndPassword,
} from "../../src/services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import * as yup from "yup";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Seo from "../../src/components/seo";

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
  password: yup
    .string("Enter valid password")
    .required("Enter valid password")
    .min(6, "Password must contain min 6 characters")
    .max(16, "Password must contain max 16 characters"),

  agree: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      agree: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.agree) {
        setIsLoading(true);
        registerWithEmailAndPassword(
          {
            firstName: values.firstName,
            lastName: values.lastName,
          },
          values.email,
          values.password
        );

        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) router.back();
  }, [user, loading, router]);

  return (
    <>
      <Seo
        title="Register - How To Wealthy"
        description="Register page"
        noIndex={true}
      />
      <AuthHeader />

      <Flex minH={"80vh"} align={"center"} justify={"center"}>
        <Box w={"100%"} maxW={"xl"} p={8}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={20}>
              <Stack spacing={2}>
                <Heading textAlign={"center"} fontSize={"3xl"}>
                  Sign up to your account
                </Heading>
                <Text textAlign={"center"} fontSize={"lg"} color={"gray.600"}>
                  to enjoy all of our cool{" "}
                  <Text as={"span"} color={"black.900"}>
                    features
                  </Text>{" "}
                  ✌️
                </Text>
              </Stack>
              <Stack spacing={4}>
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
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
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
                  isInvalid={
                    formik.touched.email && Boolean(formik.errors.email)
                  }
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
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    type="password"
                  />
                  {formik.touched.password &&
                    Boolean(formik.errors.password) && (
                      <FormErrorMessage>
                        {formik.errors.password}
                      </FormErrorMessage>
                    )}
                </FormControl>
                <Stack spacing={10}>
                  <FormControl
                    isInvalid={
                      formik.touched.agree && Boolean(formik.errors.agree)
                    }
                  >
                    <Checkbox
                      id="agree"
                      name="agree"
                      value={formik.values.agree}
                      onChange={formik.handleChange}
                    >
                      Agree to Terms and Condtions and Privacy Poliy
                    </Checkbox>
                    {formik.touched.agree && Boolean(formik.errors.agree) && (
                      <FormErrorMessage>{formik.errors.agree}</FormErrorMessage>
                    )}
                  </FormControl>
                  <Stack gap={2}>
                    <Button
                      isLoading={isLoading}
                      type={"submit"}
                      colorScheme={"primary"}
                    >
                      Sign Up
                    </Button>
                    <Text textAlign={"center"}>Have an account?</Text>
                    <Link href="/auth/login">
                      <Button
                        width={"100%"}
                        colorScheme={"primary"}
                        variant={"outline"}
                      >
                        Sign In
                      </Button>
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default RegisterPage;
