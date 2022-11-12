import { Container, Box, Heading } from "@chakra-ui/react";
import Layout from "../src/components/layout";
import Seo from "../src/components/seo";

const AboutUs = () => {
  return (
    <>
      <Seo
        title="About Us - How to Wealthy"
        description="HowToWealthy is where we write about personal finance,
              investments, the stock market, and economics that interest us most
              and will help others make better decisions about their money."
      />
      <Layout>
        <Container maxW={"70ch"} minH={"50vh"} py={10}>
          <Box py={{ base: 10, md: 20 }}>
            <Heading as={"h1"}>About Us</Heading>
          </Box>

          <Box my={10} className={"post-content"}>
            <p>
              Hello there! My name is Piyush Bendale, and I am the admin of
              HowToWealthy.
            </p>

            <p>
              HowToWealthy is where we write about personal finance,
              investments, the stock market, and economics that interest us most
              and will help others make better decisions about their money.
            </p>

            <p>
              Our mission is to awaken a financial planner inside our readers by
              educating and creating awareness by following the simplistic and
              easy-to-follow articles.
            </p>

            <p>
              We are neither finance professionals, nor SEBI Registered
              advisory. My team nor I went to work for a financial organization,
              so be warned - you are reading stuff written by a blogger and not
              a professional. We are writing this stuff based on our experience.
              So use the information present here, keeping that in mind.
            </p>

            <p>
              If you need professional advice tailored to your situation - We
              are sure good professionals are doing that, but HowToWealthy is
              not the place for it.
            </p>

            <p>
              We hope you find the site useful and that it can help you in your
              quest to make better financial decisions.
            </p>
          </Box>
        </Container>
      </Layout>
    </>
  );
};

export default AboutUs;
