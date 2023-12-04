import React from "react";
import PostHeader from "./PostHeader";
import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";

const Feedpost = () => {
  return (
    <>
      <PostHeader />
      <Box>
        <Image
          src="https://images.unsplash.com/photo-1701220319318-4b102144f8e8?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="user profile pic"
          borderRadius={5}
        />
      </Box>
      <PostFooter />
    </>
  );
};

export default Feedpost;
