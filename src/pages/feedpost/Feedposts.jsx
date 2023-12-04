import { Container } from "@chakra-ui/react";
import React from "react";
import Feedpost from "./Feedpost";

const Feedposts = () => {
  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      <Feedpost />
      <Feedpost />
    </Container>
  );
};

export default Feedposts;
