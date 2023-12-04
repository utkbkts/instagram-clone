import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const PostHeader = () => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar
          src="https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          size={"sm"}
        />
        <Flex fontSize={"12px"} fontWeight={"bold"} gap={2}>
          utku bektasoglu
          <Box color={"gray.500"}>1w</Box>
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <Text
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={"white"}
          transition={"0.2s ease-in-out"}
        >
          UnFollow
        </Text>
      </Box>
    </Flex>
  );
};

export default PostHeader;
