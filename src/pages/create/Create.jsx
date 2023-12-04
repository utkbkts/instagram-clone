import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import usePreviewImage from "../../hooks/usePreviewImage";
import { BsFillImageFill } from "react-icons/bs";
import useShowToast from "../../hooks/useToast";
import useAuthStore from "../../store/store";
import usePostStore from "../../store/postStore";
import userProfileStore from "../../store/useProfleStore";
import { useLocation } from "react-router-dom";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Create = ({ CreateModal, setCreataModal }) => {
  const searchRef = useRef(null);
  const [caption, setCaption] = useState("");
  const imageref = useRef(null);
  const { selectedFile, setSelectedFile, handleImageChange } =
    usePreviewImage();
  const { isLoading, handleCreatePost } = useCreatePost();
  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption);
      setSelectedFile("");
      setCreataModal(true);
      setCaption("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      isOpen={CreateModal}
      onClose={CreateModal}
      motionPreset="slideInLeft"
    >
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Create Post</ModalHeader>
        <ModalCloseButton onClick={() => setCreataModal(!CreateModal)} />
        <ModalBody pb={6} gap={2} display={"flex"} flexDirection={"column"}>
          <Textarea
            placeholder={"Post caption"}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <Input
            hidden
            ref={imageref}
            type="file"
            onChange={handleImageChange}
          />
          <BsFillImageFill onClick={() => imageref.current.click()} size={16} />
          {selectedFile && (
            <Flex
              mt={5}
              w={"full"}
              position={"relative"}
              justifyContent={"center"}
            >
              <Image src={selectedFile} alt="selected img" />
              <CloseButton
                position={"absolute"}
                top={2}
                right={2}
                onClick={() => setSelectedFile("")}
              />
            </Flex>
          )}
          <Flex w={"full"} justifyContent={"flex-end"}>
            <Button
              onClick={handlePostCreation}
              isLoading={isLoading}
              type="submit"
              ml={"auto"}
              size={"sm"}
              my={4}
            >
              Create
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Create;

function useCreatePost() {
  const showtoast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = userProfileStore((state) => state.addPost);
  const userProfile = userProfileStore((state) => state.userProfile);

  const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile, caption) => {
    if (!selectedFile) {
      throw new Error("Please select an image");
    } else {
      setIsLoading(true);
    }
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };
    try {
      const docRef = await addDoc(collection(db, "posts"), newPost);
      const userDocRef = doc(db, "users", authUser.uid);
      const imageRef = ref(storage, `posts/${docRef.id}`);
      await updateDoc(userDocRef, { posts: arrayUnion(docRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(docRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;
      if (userProfile?.uid === authUser?.uid)
        createPost({ ...newPost, id: docRef.id });

      if (pathname !== "/" && userProfile?.uid === authUser?.uid)
        addPost({ ...newPost, id: docRef.id });
      showtoast("Success", "Post created successfully", "success");
      setIsLoading(false);
    } catch (error) {
      showtoast("Error", error.message, "error");
      console.log(error);
      setIsLoading(false);
    }
  };
  return { isLoading, handleCreatePost };
}
