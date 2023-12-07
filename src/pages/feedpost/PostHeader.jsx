import {
  Avatar,
  Box,
  Button,
  Flex,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import useFolowUser from "../../hooks/useFolowUser";

const PostHeader = ({ post, userProfile }) => {
  const { isFollowing, handleFollowUser } = useFolowUser(post.createdBy);
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        {userProfile ? (
          <Link to={`/${userProfile?.username}`}>
            <Avatar src={userProfile?.profilePicURL} size={"sm"} />
          </Link>
        ) : (
          <SkeletonCircle size={10} />
        )}
        <Flex fontSize={"12px"} fontWeight={"bold"} gap={2}>
          {userProfile ? (
            <Link to={`/${userProfile?.username}`}>
              {userProfile?.username}
            </Link>
          ) : (
            <SkeletonCircle />
          )}
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <Button
          onClick={handleFollowUser}
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={"white"}
          transition={"0.2s ease-in-out"}
        >
          {isFollowing ? "UnFollow":"Follow"}
        </Button>
      </Box>
    </Flex>
  );
};

export default PostHeader;
