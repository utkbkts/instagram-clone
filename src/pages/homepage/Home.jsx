import { Box, Container, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Feedposts from "../feedpost/Feedposts";
import Intro from "../../components/Intro/intro";
import SuggestedUsers from "../../components/suggedted/SuggedtedUsers";

const Home = () => {
  const [loading,setloading]=useState(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setloading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);
  if(loading){
    return <Intro/>
  }

  return (
    <Container maxW={"container-lg"}>
      <Flex gap={20}>
        <Box flex={2} py={10}>
         <Feedposts/>
        </Box>
        <Box flex={3} mr={20}
        display={{base:"none",lg:"block"}}
        maxW={"300px"}
        >
          <SuggestedUsers/>
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
