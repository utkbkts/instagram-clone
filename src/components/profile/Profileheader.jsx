import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import userProfileStore from "../../store/useProfleStore";
import UserProfileEdit from "./EditProfile";
import useAuthStore from "../../store/store";
import useFolowUser from "../../hooks/useFolowUser";

const Profileheader = () => {
  const { userProfile } = userProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {handleFollowUser,isFollowing}=useFolowUser(userProfile?.uid)

  const visitingOwnProfileAndAuth =
    authUser && authUser?.username === userProfile?.username;
  const visitingAnotherProfileAndAuth =
    authUser && authUser?.username !== userProfile?.username;
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"flex-start"}
        mx={"auto"}
      >
        <Avatar src={userProfile?.profilePicURL} />
      </AvatarGroup>
      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          w={"full"}
        >
          <Text
            fontSize={{ base: "sm", md: "lg" }}
            alignItems={"center"}
            display={"flex"}
            justifyContent={"center"}
          >
            {userProfile?.username}
          </Text>
          <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
            {visitingOwnProfileAndAuth && (
              <Button
                bg={"white"}
                color={"black"}
                _hover={{ bg: "whiteAlpha.800" }}
                size={{ base: "xs", md: "sm" }}
                onClick={onOpen}
              >
                Edit Profile
              </Button>
            )}
            {visitingAnotherProfileAndAuth && (
              <Button
                bg={"white"}
                color={"black"}
                _hover={{ bg: "whiteAlpha.800" }}
                size={{ base: "xs", md: "sm" }}
                onClick={handleFollowUser}
              >
                {isFollowing ? "UnFollow":"Follow"}
              </Button>
            )}
          </Flex>
        </Flex>
        <Flex
          w={"full"}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          gap={{ base: 2, sm: 4 }}
        >
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile?.posts.length}
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile?.followers.length}
            </Text>
            Followers
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile?.following.length}
            </Text>
            Following
          </Text>
        </Flex>
        <Text fontSize={"sm"} fontWeight={"bold"}>
          {userProfile?.bio}
        </Text>
      </VStack>
      {isOpen && <UserProfileEdit isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default Profileheader;
