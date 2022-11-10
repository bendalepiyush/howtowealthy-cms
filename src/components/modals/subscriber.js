import {
  ModalBody,
  ModalCloseButton,
  Heading,
  Box,
  Input,
  Button,
  Stack,
  FormErrorMessage,
  FormControl,
  AspectRatio,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { subscibeByEmail } from "../../api/subscriber";

const validationSchema = yup.object({
  email: yup
    .string("Enter valid email.")
    .email("Enter valid email.")
    .required("Enter valid email."),
});

function SubscriptionModal({ toggle }) {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      var res = await subscibeByEmail(values.email, "", "");
      console.log(res);
      toggle();
    },
  });
  return (
    <>
      <Box>
        <AspectRatio w={"100%"} zIndex={0} ratio={1200 / 630}>
          <picture style={{ objectFit: "cover" }}>
            <source
              srcSet={"https://assets.howtowealthy.com/subsciber.png?webp"}
              type="image/webp"
            />
            <img
              src={"https://assets.howtowealthy.com/subsciber.png"}
              alt={"Subscribed Image"}
            />
          </picture>
        </AspectRatio>
        <ModalCloseButton />
      </Box>
      <ModalBody>
        <Box p={8}>
          <Heading
            as="h1"
            textAlign={"center"}
            size={{ base: "md", lg: "lg" }}
            mb={5}
            fontWeight={300}
          >
            Get the latest updates on Finance right to your inbox.
          </Heading>

          <Heading
            textAlign={"center"}
            as="h2"
            size={{ base: "md" }}
            mb={7}
            fontWeight={300}
          >
            We&apos;re sharing our secrets and experiences on how to get your
            Personal Finances sorted and helping you to make better decisions
          </Heading>

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
      </ModalBody>
    </>
  );
}

export default SubscriptionModal;
