import React, { useEffect, useState } from "react";
import Intro from "../Intro/intro";
import ProfilePost from "./ProfilePost";
import { Flex, Grid, Text } from "@chakra-ui/react";
import useGetUserPosts from "../../hooks/useGetUserPosts";

const ProfilePosts = () => {
  const [loading, setloading] = useState(true);
  const { isLoading, posts } = useGetUserPosts();
  const noPostsFound = !isLoading && posts.length === 0;
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setloading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [setloading]);
  if (loading) {
    return <Intro />;
  }
  return (
    <div>
      {noPostsFound ? (
        <NoPostsFound />
      ) : (
        <Grid templateColumns={{ sm: "repeat(1,1fr)", md: "repeat(3,1fr)" }}>
          {posts.map((post) => (
            <ProfilePost post={post} key={post.id} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ProfilePosts;

function NoPostsFound() {
  return (
    <Flex flexDir={"column"} textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Posts Found</Text>
    </Flex>
  );
}
