import { Flex, Box, Text } from "@chakra-ui/react";

const TabInput = ({ handleChange, options, currentValue }) => {
  return (
    <>
      <Flex>
        {options.map((item) => (
          <Box
            px={5}
            py={2}
            key={item.value}
            color={item.value === currentValue.value ? "white" : "black"}
            border={"1px solid #eaeaea"}
            background={item.value === currentValue.value ? "black" : ""}
            cursor={"pointer"}
            onClick={() => handleChange(item)}
          >
            <Text fontSize={"sm"}>{item.label}</Text>
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default TabInput;
