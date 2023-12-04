import React, { useRef } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Flex,
  Button,
} from "@chakra-ui/react";
import useSearchUser from "../../hooks/useSearchUser";
import SuggestedUser from "../suggedted/SuggestedUser";
const Search = ({SearchActive,setSearchActive}) => {
  const { isLoading, getUserProfile, user, setUser } = useSearchUser();
  const searchRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };
  return (
    <Modal isOpen={SearchActive} onClose={SearchActive} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Search user</ModalHeader>
        <ModalCloseButton onClick={()=>setSearchActive(!SearchActive)}/>
        <ModalBody pb={6}>
          <form onSubmit={handleSearchSubmit}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Search is Username" ref={searchRef} />
            </FormControl>

            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button isLoading={isLoading} type="submit" ml={"auto"} size={"sm"} my={4}>
                Search
              </Button>
            </Flex>
          </form>
          {user && <SuggestedUser user={user} setUser={setUser} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Search;
