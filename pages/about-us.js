import { Container, Box, Heading } from "@chakra-ui/react";
import Layout from "../src/components/layout";

const AboutUs = () => {
  return (
    <>
      <Layout>
        <Container maxW={"6xl"} minH={"50vh"} py={10}>
          <Box py={{ base: 10, md: 20 }}>
            <Heading as={"h1"}>About Us</Heading>
          </Box>

          <Box my={10} className={"post-content"}>
            <p>
              Hello there! My name is Piyush Bendale and I am the admin of
              HowToWealthy.
            </p>

            <p>
              HowToWealthy is a place where we write about things related to
              personal finance, investments, the stock market and economics that
              interest us most and will help others make better decisions about
              their money.
            </p>

            <p>
              Our mission is to awaken a financial planner inside our readers by
              educating, and creating awareness by following the simplistic and
              easy-to-follow articles.
            </p>

            <p>
              We neither a finance professional nor SEBI Registered advisor. Me
              or my team never went to work for a financial organisation, so be
              warned - you are reading stuff written by a blogger and not a
              professional. We are writing this stuff on basis of our
              experience. Use the information present here keeping that in mind.
            </p>

            <p>
              If you need professional advice tailored to your situation - We
              are sure there are good professionals doing that but HowToWealthy
              is not the place for it.
            </p>

            <p>
              We hope you find the site useful, and it can help you in your
              quest of making better financial decisions.
            </p>
          </Box>
        </Container>
      </Layout>
    </>
  );
};

export default AboutUs;
