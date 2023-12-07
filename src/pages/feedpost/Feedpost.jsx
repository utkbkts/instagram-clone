import React from "react";
import PostHeader from "./PostHeader";
import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import useGetUserProfileID from "../../hooks/useGetUserProfileID";

const Feedpost = ({post}) => {
  const {userProfile}=useGetUserProfileID(post.createdBy)
  return (
    <>
      <PostHeader post={post} userProfile={userProfile}/>
      <Box>
        <Image
          src={post?.imageURL}
          alt="user profile pic"
          borderRadius={5}
        />
      </Box>
      <PostFooter post={post} userProfile={userProfile}/>
    </>
  );
};

export default Feedpost;
