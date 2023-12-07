import { Container, Text } from "@chakra-ui/react";
import React from "react";
import Feedpost from "./Feedpost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const Feedposts = () => {
  const {isLoading, posts, setPosts}=useGetFeedPosts()
  return (
    <Container maxW={"container.sm"} py={10} px={2}>
     {!isLoading && posts.length > 0 && posts.map((post) => <Feedpost key={post.id} post={post} />)}
			{!isLoading && posts.length === 0 && (
				<>
					<Text fontSize={"md"} color={"red.400"}>
						Dayuum. Looks like you don&apos;t have any friends.
					</Text>
					<Text color={"red.400"}>Stop coding and go make some!!</Text>
				</>
			)}
    </Container>
  );
};

export default Feedposts;
