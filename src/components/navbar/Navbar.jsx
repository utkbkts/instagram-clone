import React, { useState } from "react";
import { FiSun } from "react-icons/fi";
import { IoMdMoon } from "react-icons/io";
import "./navbar.scss";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const handleClick = () => {
    setActive(!active);
    toggleColorMode();
  };
  return (
    <div className="Container-navbar">
      <div className="wrapper">
        <button onClick={handleClick}>
          {active ? <FiSun color="yellow" className="sun"/> : <IoMdMoon className="moon" />}
        </button>
        <span
          onClick={handleClick}
          className={`__a ${active ? "active" : ""}`}
        ></span>
      </div>
    </div>
  );
};

export default Navbar;
