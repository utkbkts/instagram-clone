import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/homepage/Home";
import Authpage from "./pages/authpage/Authpage";
import Navbar from "./components/navbar/Navbar";
import PageLayout from "./layout/PageLayout";
import Profile from "./pages/profile/Profile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import useAuthStore from "./store/store";

const App = () => {
  const [authUser] = useAuthState(auth);
  return (
    <>
      <Navbar/>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Authpage />} />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </PageLayout>
    </>
  );
};

export default App;
