import React, { useState } from "react";
import { Flex, Avatar, Text, SkeletonCircle } from "@chakra-ui/react";
import useGetUserProfileID from "../../hooks/useGetUserProfileID";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import { MdDelete } from "react-icons/md";
import userProfileStore from "../../store/useProfleStore";
import useAuthStore from "../../store/store";
import useShowToast from "../../hooks/useToast";
const Comment = ({ post }) => {
  const { userProfile, isLoading } = useGetUserProfileID(post.createdBy);
  const authUser = userProfileStore((state) => state.userProfile);
  const User = useAuthStore((state) => state.user);
  const showToast = useShowToast()
  return (
    <Flex gap={4} alignItems={"center"}>
     <Link to={`/${userProfile?.username}`}> <Avatar src={userProfile?.profilePicURL} alt="profile" size={"sm"} /></Link>
      <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontWeight={"bold"}>{userProfile?.username}</Text>
          <Text>{post?.comment}</Text>
          {User.uid === authUser.uid && (<MdDelete/>)}
        </Flex>
        <Text fontSize={12} color={"gray"}>
          {timeAgo(post.createdAt)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Comment;

function CommentSkeleton() {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}>
      <SkeletonCircle h={10} alignItems={"center"}/>
      <Flex>
        <Skeleton height={2} width={100}/>
        <Skeleton height={2} width={50}/>
      </Flex>
    </Flex>
  );
}
