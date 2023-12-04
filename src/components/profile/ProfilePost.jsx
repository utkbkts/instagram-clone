import {
  Avatar,
  Box,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Divider,
  VStack,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Comment from "../comment/Comment";
import PostFooter from "../../pages/feedpost/PostFooter";
import userProfileStore from "../../store/useProfleStore";
import useAuthStore from "../../store/store";
import useShowToast from "../../hooks/useToast";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";
const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authUser = userProfileStore((state) => state.userProfile);
  const User = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;
    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const useref = doc(db, "users", authUser.uid);
      await deleteDoc(doc(db, "posts", post.id));
      await updateDoc(useref, {
        posts: arrayRemove(post.id),
      });
      deletePost(post.id);
      showToast("Success", "Deleted is successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={30}>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post?.likes.length}
              </Text>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <AiOutlineComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post?.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image objectFit={"cover"} src={post?.imageURL} w={"100%"} h={"100%"} />
      </GridItem>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              gap={"4"}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Box
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
              >
                <Image objectFit={"cover"} src={post?.imageURL} />
              </Box>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar src={authUser?.profilePicURL} />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {authUser?.username}
                    </Text>
                  </Flex>
                  {authUser?.uid === User?.uid && (
                    <Button
                      isLoading={isDeleting}
                      _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                      cursor={"pointer"}
                      onClick={handleDeletePost}
                    >
                      <MdDelete />
                    </Button>
                  )}
                </Flex>
                <Divider my={4} bg={"gray.500"} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  {post.comments.map((post) => (
                    <Comment post={post} key={post.id} />
                  ))}
                </VStack>
                <Divider my={4} bg={"gray.500"} />
                <PostFooter post={post}/>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
