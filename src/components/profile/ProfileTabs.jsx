import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { BsGrid3X3, BsSave, BsSuitHeart } from "react-icons/bs";
const ProfileTabs = () => {
  const borderColors = useColorModeValue("black", "white");
  return (
    <Flex
      fontWeight={"bold"}
      w={"full"}
      justifyContent={"center"}
      gap={{ base: 4, sm: 10 }}
      textTransform={"uppercase"}
    >
    
      <Flex
        borderTop={"1px solid white"}
        borderColor={borderColors}
        alignItems={"center"}
        p={3}
        gap={1}
        cursor={"pointer"}
      >
        <Box fontSize={20}>
          <BsGrid3X3 />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Posts
        </Text>
      </Flex>
      <Flex
        alignItems={"center"}
        p={3}
        gap={1}
        cursor={"pointer"}
      >
        <Box fontSize={20}>
          <BsSave />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Saved
        </Text>
      </Flex>
      <Flex
        alignItems={"center"}
        p={3}
        gap={1}
        cursor={"pointer"}
      >
        <Box fontSize={20}>
          <BsSuitHeart fontWeight={"bold"} />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Likes
        </Text>
      </Flex>
    </Flex>
  );
};

export default ProfileTabs;
