import { Container, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Profileheader from "../../components/profile/Profileheader";
import ProfileTabs from "../../components/profile/ProfileTabs";
import ProfilePosts from "../../components/profile/ProfilePosts";
import { useParams } from "react-router-dom";
import useGetUserProfileByUsername from "../../hooks/usegetprofile"
const Profile = () => {
  const { username } = useParams();
	const {  userProfile } = useGetUserProfileByUsername(username);
  const borderColors = useColorModeValue("black", "whiteAlpha.300");

  return (
    <Container maxW={"container.lg"} py={5}>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w={"full"}
        mx={"auto"}
        flexDirection={"column"}
      >
        <Profileheader />
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={borderColors}
        direction={"column"}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
};

export default Profile;
