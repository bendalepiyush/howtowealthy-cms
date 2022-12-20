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
  useToast,
} from "@chakra-ui/react";
import AuthHeader from "../../src/components/sections/auth/auth_header";
import Link from "next/link";

import { useFormik } from "formik";
import {
  auth,
  logInWithEmailAndPassword,
  logInWithEmailAndPasswordRememberMe,
  resetPassword,
} from "../../src/services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import * as yup from "yup";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Seo from "../../src/components/seo";

const validationSchema = yup.object({
  email: yup
    .string("Enter valid email")
    .email("Enter valid email")
    .required("Email is required"),
});

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      await resetPassword(values.email);
      toast({
        title: "Password reset link sent!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      router.back();
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
        title="Forgot Password - How To Wealthy"
        description="Forgot password page"
      />
      <AuthHeader />

      <Flex minH={"80vh"} align={"center"} justify={"center"}>
        <Box w={"100%"} maxW={"xl"} p={8}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={20}>
              <Stack spacing={2}>
                <Heading as={"h1"} textAlign={"center"} fontSize={"3xl"}>
                  Forgot Password?
                </Heading>
                <Text textAlign={"center"} fontSize={"lg"} color={"gray.600"}>
                  Receive password reset link
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

                <Stack spacing={10}>
                  <Stack gap={2}>
                    <Button
                      isLoading={isLoading}
                      type={"submit"}
                      colorScheme={"primary"}
                    >
                      Send Password Reset Link
                    </Button>
                    <Text textAlign={"center"}>or</Text>
                    <Link href="/auth/login">
                      <Button
                        width={"100%"}
                        colorScheme={"primary"}
                        variant={"outline"}
                      >
                        Go back
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
