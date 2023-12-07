import { Flex, Avatar, Text, SkeletonCircle } from "@chakra-ui/react";
import useGetUserProfileID from "../../hooks/useGetUserProfileID";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import { MdDelete } from "react-icons/md";
import useAuthStore from "../../store/store";
import usePostComment from "../../hooks/usePostComment";
const Comment = ({ comment }) => {
  const { userProfile } = useGetUserProfileID(comment?.createdBy);
  const User = useAuthStore((state) => state.user);
  return (
    <Flex gap={4} alignItems={"center"}>
     <Link to={`/${userProfile?.username}`}> <Avatar src={userProfile?.profilePicURL} alt="profile" size={"sm"} /></Link>
      <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontWeight={"bold"}>{userProfile?.username}</Text>
          <Text>{comment?.comment}</Text>
          {User.uid === userProfile?.uid && (<MdDelete  />)}
        </Flex>
        <Text fontSize={12} color={"gray"}>
          {timeAgo(comment?.createdAt)}
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
