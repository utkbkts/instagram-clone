import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [Form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });
  const {login}=useLogin()
  return (
    <>
      <input
        type="text"
        name="name"
        placeholder="name"
        value={Form.name}
        onChange={(e) => setForm({ ...Form, name: e.target.value })}
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
      <div className="button__a">
        <Button onClick={()=>login(Form)} colorScheme="teal" variant="solid">
          Login
        </Button>
      </div>
    </>
  );
};

export default Login;
