import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaRegCommentAlt } from "react-icons/fa";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/store";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../../components/modals/CommentModal";

const PostFooter = ({ post, userProfile }) => {
  if (!post) {
    console.error("Invalid post object:", post);
    return null;
  }
  const { isCommenting, handlePostComment } = usePostComment();
  const authuser = useAuthStore((state) => state.user);
  const [comment, setComment] = useState("");
  const commentref = useRef(null);
  const { isLiked, likes, handleLikePost, isUpdating } = useLikePost(post);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmitComment = async () => {
    if(comment === ""){
      return;
    }else{
      await handlePostComment(post.id, comment);
      setComment("");
    }
    
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
        {timeAgo(post.createdAt)}
      </Text>
      <Text fontWeight={600} fontSize={"sm"}>
        {userProfile?.username}
        <Text as={"span"} fontWeight={400} ml={2}>
          {userProfile?.caption}
        </Text>
        <Text onClick={onOpen} fontSize={"sm"} color={"gray"}>
          View all {post.comments.length} comments
        </Text>
      </Text>
      {isOpen ? (
        <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />
      ) : null}
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
