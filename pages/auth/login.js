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
  FormErrorMessage,
} from "@chakra-ui/react";
import AuthHeader from "../../src/components/sections/auth/auth_header";
import Link from "next/link";

import { useFormik } from "formik";
import {
  auth,
  logInWithEmailAndPassword,
  logInWithEmailAndPasswordRememberMe,
} from "../../src/services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import * as yup from "yup";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const validationSchema = yup.object({
  email: yup
    .string("Enter valid email")
    .email("Enter valid email")
    .required("Email is required"),
  password: yup
    .string("Enter valid password")
    .required("Enter valid password")
    .min(6, "Password must contain min 6 characters")
    .max(16, "Password must contain max 16 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      if (values.remember) {
        logInWithEmailAndPassword(values.email, values.password);
      } else {
        logInWithEmailAndPasswordRememberMe(values.email, values.password);
      }
      setIsLoading(false);
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
      <AuthHeader />

      <Flex minH={"80vh"} align={"center"} justify={"center"}>
        <Box w={"100%"} maxW={"xl"} p={8}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={20}>
              <Stack spacing={2}>
                <Heading textAlign={"center"} fontSize={"3xl"}>
                  Sign in to your account
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
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox
                      id="remember"
                      name="remember"
                      value={formik.values.remember}
                      onChange={formik.handleChange}
                    >
                      Remember me
                    </Checkbox>
                    <Link href={"/auth/forgot-password"} color={"primary.900"}>
                      Forgot password?
                    </Link>
                  </Stack>
                  <Stack gap={2}>
                    <Button
                      isLoading={isLoading}
                      type={"submit"}
                      colorScheme={"primary"}
                    >
                      Sign in
                    </Button>
                    <Text textAlign={"center"}>
                      Don&apos;t have an account?
                    </Text>
                    <Link href="/auth/register">
                      <Button
                        width={"100%"}
                        colorScheme={"primary"}
                        variant={"outline"}
                      >
                        Sign Up
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

export default LoginPage;
