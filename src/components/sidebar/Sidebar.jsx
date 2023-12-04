import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, {  useState } from "react";
import { Link as RouterLink, } from "react-router-dom";
import { FaCreativeCommonsNc, FaInstagram, FaSearch } from "react-icons/fa";
import { AiFillHome, AiFillNotification } from "react-icons/ai";
import { useColorModeValue } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { CiLogin } from "react-icons/ci";
import { PiSignInThin } from "react-icons/pi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import useAuthStore from "../../store/store";
import Search from "./Search";
import Create from "../../pages/create/Create";

const Sidebar = () => {
  const borderColors = useColorModeValue("black", "whiteAlpha.300");
  const { handleLogout } = useLogout();
  const [SearchActive, setSearchActive] = useState(false);
  const [authUser] = useAuthState(auth);
  const userGetProfile = useAuthStore((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [CreateModal,setCreataModal]=useState(false)
  const sidebarItems = [
    {
      id: 1,
      icons: <AiFillHome />,
      text: "Home",
      link: "/",
    },
    {
      id: 2,

      icons: <FaSearch onClick={()=>setSearchActive(!SearchActive)} />,
      text: "Search",
    },
    {
      id: 3,

      icons: <AiFillNotification />,
      text: "Notifications",
      link: "/Notifications",
    },
    {
      id: 4,
      icons: <FaCreativeCommonsNc onClick={()=>setCreataModal(!CreateModal)}/>,
      text: "Create",
    },
    {
      id: 5,

      icons: <Avatar src={`${userGetProfile?.profilePicURL}`} alt="" />,
      text: "Profile",
      link: `/${userGetProfile?.username}`,
    },
  ];
  return (
    <Box
      height="100vh"
      borderRight="1px solid"
      borderColor={borderColors}
      py={"8"}
      position={"sticky"}
      left={"0"}
      top={"0"}
      w={{ base: "100px", md: "full" }}
      px={{ base: 2, md: 4 }}
    >
      {SearchActive && <Search  SearchActive={SearchActive} setSearchActive={setSearchActive}/>}
      {CreateModal && <Create  CreateModal={CreateModal} setCreataModal={setCreataModal}/>}
      <Flex
        direction={"column"}
        gap={"10"}
        w={"full"}
        height={"full"}
        marginTop={"10px"}
      >
        <Link
          to={"/"}
          as={RouterLink}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
        >
          <img src="/public/images/instagram-text-icon.svg" alt="" />
        </Link>
        <Link
          to={"/"}
          as={RouterLink}
          p={2}
          display={{ base: "flex", md: "none" }}
          borderRadius={6}
          _hover={{ bg: "whiteAlpha.300" }}
          cursor={"pointer"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <FaInstagram />
        </Link>
        <Flex
          direction={"column"}
          gap={5}
          cursor={"pointer"}
          alignItems={{ base: "center", md: "flex-start" }}
          w={"full"}
        >
          {sidebarItems.map((item) => (
            <Tooltip
              key={item.id}
              hasArrow
              label={item.text}
              placement="right"
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Link
                display={"flex"}
                to={item.link || null}
                as={RouterLink}
                alignItems={"center"}
                justifyContent={{ base: "center", md: "flex-start" }}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                p={"2"}
                w={{ base: "full", md: "full" }}
              >
                {item.icons}
                <Box display={{ base: "none", md: "block" }}>{item.text}</Box>
              </Link>
            </Tooltip>
          ))}
        </Flex>

        {authUser ? (
          <Tooltip
            hasArrow
            label={"Logout"}
            placement="right"
            openDelay={500}
            display={{ base: "block", md: "none" }}
          >
            <Flex
              onClick={handleLogout}
              cursor={"pointer"}
              alignItems={"center"}
              justifyContent={{ base: "center", md: "flex-start" }}
              gap={4}
              _hover={{ bg: "whiteAlpha.400" }}
              mt={"auto"}
              p={"2"}
              w={{ base: "full", md: "full" }}
            >
              <BiLogOut size={25} />
              <Button
                variant={"ghost"}
                _hover={{ bg: "transparent" }}
                display={{ base: "none", md: "block" }}
              >
                Logout
              </Button>
            </Flex>
          </Tooltip>
        ) : (
          <Flex
            cursor={"pointer"}
            alignItems={"center"}
            justifyContent={{ base: "center", md: "center" }}
            gap={4}
            mt={"auto"}
            w={{ base: "full", md: "full" }}
          >
            <Flex
              w={{ base: "full", md: "full" }}
              _hover={{ bg: "whiteAlpha.400" }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Link
                display={"flex"}
                alignItems={"center"}
                as={RouterLink}
                to={"/auth"}
              >
                {" "}
                <CiLogin size={25} />
                <Button
                  variant={"ghost"}
                  _hover={{ bg: "transparent" }}
                  display={{ base: "none", md: "block" }}
                >
                  Log In
                </Button>
              </Link>
            </Flex>
            <Flex
              w={{ base: "full", md: "full" }}
              _hover={{ bg: "whiteAlpha.400" }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Link
                display={"flex"}
                alignItems={"center"}
                as={RouterLink}
                to={"/auth"}
              >
                <PiSignInThin size={30} />
                <Button
                  variant={"ghost"}
                  _hover={{ bg: "transparent" }}
                  display={{ base: "none", md: "block" }}
                >
                  Sign Up
                </Button>
              </Link>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Sidebar;
