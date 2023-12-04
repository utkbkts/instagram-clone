import { Avatar, Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/store";
const SuggestedHeader = () => {
  const authUser = useAuthStore((state) => state.user);
  const { logout } = useLogout();
  const navigate = useNavigate()
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar
        zIndex={-1}
          name="avatar"
          size={"md"}
          src={
            authUser?.profilePicURL
          }
        />

        <Text cursor={"pointer"} onClick={()=>navigate(`/${authUser?.username}`)} fontSize={13} fontWeight={"bold"}>
          {authUser?.username}
        </Text>
      </Flex>
      <Link
        as={RouterLink}
        onClick={() => logout()}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
      >
        Log out
      </Link>
    </Flex>
  );
};

export default SuggestedHeader;
