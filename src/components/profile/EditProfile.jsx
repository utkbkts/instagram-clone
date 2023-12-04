import React, { useRef, useState } from "react";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import useAuthStore from "../../store/store";
import usePreviewImage from "../../hooks/usePreviewImage";
import useEditProfile from "../../hooks/useEditProfile";

export default function UserProfileEdit({ onClose }) {
  const [authUser] = useAuthState(auth);
  const [user, setUser] = useState(authUser?.displayName || "");
  const [bio, setBio] = useState("");
  const loginUser = useAuthStore((state) => state.user);
  const fileRef = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } =
    usePreviewImage();
  const { isUpdating, editProfile } = useEditProfile();
  const HandleEditProfile = async () => {
    try {
      await editProfile(user, bio, selectedFile);
      setSelectedFile(null);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex
      position={"absolute"}
      left={"50%"}
      top={"50%"}
      transform={"translate(-50%, -50%)"}
      zIndex={2}
    >
      <Stack
        spacing={4}
        w={"600px"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src={selectedFile || authUser.profilePicURL}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  onClick={() => setSelectedFile("")}
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full" onClick={() => fileRef.current.click()}>
                Change Icon
              </Button>
            </Center>
            <Input
              onChange={handleImageChange}
              type="file"
              hidden
              ref={fileRef}
            />
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            name="user"
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={authUser?.email}
            disabled
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Biography</FormLabel>
          <Input
            value={bio || loginUser?.bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Biography"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            onClick={onClose}
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={HandleEditProfile}
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
