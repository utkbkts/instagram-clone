import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import useFolowUser from "../../hooks/useFolowUser";
import useAuthStore from "../../store/store";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user, setUser }) => {
  const [Followers, setFollowers] = useState(false);
  const { isFollowing, handleFollowUser, isLoading } = useFolowUser(user?.uid);
  const authUser = useAuthStore((state) => state.user);
  const onFollowUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((follower) => follower.uid !== authUser.uid)
        : [...user.followers, authUser.uid],
    });
  };
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={user?.profilePicURL} name="avatar" size={"md"} />
        <VStack>
          <Link to={`/${user?.username}`}>
            {" "}
            <Box fontSize={12} fontWeight={"bold"}>
              {user?.username}
            </Box>
          </Link>
          <Box fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            {user?.followers.length} Followers
          </Box>
        </VStack>
      </Flex>
      {authUser.uid !== user?.uid && (
        <Button
          isLoading={isLoading}
          onClick={() => {
            setFollowers(!Followers);
            onFollowUser(); // Parantez eklenmiş çağrı
          }}
          fontSize={13}
        >
          {Followers ? "UnFollow" : "Follow"}
        </Button>
      )}
    </Flex>
  );
};

export default SuggestedUser;
