import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignup";
const SignupPage = () => {
  const [Form, setForm] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    username: "",
  });
  const { signup } = useSignUpWithEmailAndPassword();
  
  const handleClick = (e) => {
    e.preventDefault();
    signup(Form);
  };
  return (
    <>
      <input
        type="text"
        name="username"
        placeholder="username"
        value={Form.username}
        onChange={(e) => setForm({ ...Form, username: e.target.value })}
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="email"
        value={Form.email}
        onChange={(e) => setForm({ ...Form, email: e.target.value })}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        value={Form.password}
        onChange={(e) => setForm({ ...Form, password: e.target.value })}
      />
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="confirmPassword"
        value={Form.confirmpassword}
        onChange={(e) => setForm({ ...Form, confirmpassword: e.target.value })}
      />
      <div className="button__a">
        <Button type="submit" onClick={handleClick} colorScheme="teal" variant="solid">
          Sign up
        </Button>
      </div>
    </>
  );
};

export default SignupPage;
