import { FaArrowRight } from "react-icons/fa";
import Layout from ".";
import Seo from "../seo";
import { Flex, Box, Container, VStack, Link } from "@chakra-ui/react";

const toolsList = [
  { title: "Reverse CAGR", path: "/tools/reverse-cagr" },
  { title: "CAGR", path: "/tools/cagr" },
];

const ToolsLayout = ({
  title,
  description,
  structuredData,
  ogImg,
  children,
  path,
}) => {
  return (
    <>
      <Seo
        title={title}
        description={description}
        structuredData={JSON.stringify(structuredData)}
        ogImage={ogImg}
      />
      <Layout>
        <Container maxW={"8xl"} py={10}>
          <Flex flexDirection={{ base: "column-reverse", md: "row" }}>
            <VStack minW={{ base: "full", md: "300px" }} spacing={0}>
              <Box
                w={"full"}
                p={5}
                backgroundColor={"#fafafa"}
                fontWeight={700}
              >
                Tools & Calculators
              </Box>
              {toolsList.map((item) => {
                let active = false;
                if (path === item.path) {
                  active = true;
                }
                return (
                  <Link
                    w={"full"}
                    href={item.path}
                    _hover={{ textDecoration: "none" }}
                  >
                    <Flex
                      w={"full"}
                      p={5}
                      backgroundColor={active ? "#fff" : "#fafafa"}
                      borderLeft={active && "2px solid purple"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      {item.title}
                      {!active && <FaArrowRight size={11} color="#999" />}
                    </Flex>
                  </Link>
                );
              })}
            </VStack>
            <Box pl={{ base: 0, md: 20 }}>{children}</Box>
          </Flex>
        </Container>
      </Layout>
    </>
  );
};

export default ToolsLayout;
