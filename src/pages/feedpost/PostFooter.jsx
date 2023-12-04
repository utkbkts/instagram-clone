import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaRegCommentAlt } from "react-icons/fa";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import userProfileStore from "../../store/useProfleStore";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/store";
import useLikePost from "../../hooks/useLikePost";

const PostFooter = ({ post }) => {
  if (!post) {
    console.error("Invalid post object:", post);
    return null;
  }

  const { isCommenting, handlePostComment } = usePostComment();
  const authuser = useAuthStore((state) => state.user);
  const [comment, setComment] = useState("");
  const commentref = useRef(null);
  const { isLiked, likes, handleLikePost, isUpdating } = useLikePost(post);
  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };

  return (
    <Box mb={10} marginTop={"auto"}>
      {" "}
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={"5px"}>
        <Box onClick={handleLikePost}>
          {!isLiked ? <IoMdHeartEmpty /> : <IoMdHeart />}
        </Box>
        <Box cursor={"pointer"} onClick={() => commentref.current.focus()}>
          <FaRegCommentAlt size={12} />
        </Box>
      </Flex>
      <Text>{likes} Likes</Text>
      <Text fontWeight={600} fontSize={"sm"}>
        utku
        <Text as={"span"} fontWeight={400} ml={2}>
          feeling
        </Text>
        <Text fontSize={"sm"} color={"gray"}>
          View all 1,000 comments
        </Text>
      </Text>
      {authuser && (
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder={"Add a comment..."}
              fontSize={14}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              ref={commentref}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default PostFooter;
