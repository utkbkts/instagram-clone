import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import SuggestedHeader from "./SuggestedHeader";
import useSuggestedUsers from "../../hooks/useSuggestedUsers";
import SuggestedUser from "./SuggestedUser";

const SuggestedUsers = () => {
  const {isLoading, suggestedUsers} = useSuggestedUsers();
  if (isLoading) return null;
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      {suggestedUsers.length !== 0 && (
				<Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
					<Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
						Suggested for you
					</Text>
					<Text fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.400" }} cursor={"pointer"}>
						See All
					</Text>
				</Flex>
			)}
      {suggestedUsers?.map((user)=>(
        <SuggestedUser  user={user} key={user.id}/>
      ))}
      <Box fontSize={12} color={"gray.500"} mt={5}>
        &copy; 2023 Build By{" "}
        <Link target="_blank" color={"blue.500"} fontSize={14} href="">
          Utku BEKTASOGLU
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
