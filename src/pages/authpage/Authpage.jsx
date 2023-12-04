import React, { useEffect, useState } from "react";
import "./auth.scss";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";
import Intro from "../../components/Intro/intro";
import Login from "./Login";
import SignupPage from "./Signup";
import useShowToast from "../../hooks/useToast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import useAuthStore from "../../store/store";

const Authpage = () => {
  const [isLogin, setisLogin] = useState(true);
  const [loading, setloading] = useState(true);
  const loginuser = useAuthStore((state) => state.login);
  const navigate = useNavigate()
  const showToast = useShowToast();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setloading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);
  if (loading) {
    return <Intro />;
  }
  //!GoogleAuth
  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userResponse = await signInWithPopup(auth,provider);

      if (userResponse) {
        const userDoc = {
          uid: userResponse.user.uid,
          email: userResponse.user.email,
          displayName: userResponse.user.displayName,
          bio: "",
          profilePicURL: userResponse.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(db, "users", userResponse.user.uid), userDoc);
        const docref = doc(db, "users", userResponse.user.uid);
        const docSnap = await getDoc(docref);
        localStorage.setItem("user-info", JSON.stringify(docSnap));
        loginuser(docSnap.data());
      }
      navigate("/")
    } catch (error) {
      showToast("Error", error);
    }
  };
  return (
    <div className="Container-auth">
      <div className="left">
        <div className="image_a">
          <img
            src="https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1535451801241-b5395e1d4a1b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
      <div className="right">
        <form action="">
          <div>
            <h1>Instagram</h1>
          </div>
          <div className="form__a">{isLogin ? <Login /> : <SignupPage />}</div>

          <div className="linear">
            <span className="linear-left"></span>
            <span>OR</span>
            <span className="linear-right"></span>
          </div>
          <div className="google_a">
            <span onClick={()=>handleGoogleAuth()} className="__a">
              <FcGoogle className="icon" />{" "}
              <span className="__b">Log in with Google</span>
            </span>
          </div>
        </form>
        <div className="__link">
          <span>
            {isLogin ? " Don't have an account ?" : "Do you have an account"}{" "}
            <Link
              onClick={() => {
                setisLogin(!isLogin);
              }}
            >
              {isLogin ? "Sign up" : "Log in"}
            </Link>
          </span>
        </div>
        <div className="bottom">
          <span className="getapp">Get the app.</span>
          <div className="__a">
            <div className="left">
              <span className="faplay">
                <FaPlay fontSize={40} />
                <div>
                  <span className="__a">Get IT ON</span>{" "}
                  <span>Google Play</span>
                </div>
              </span>
            </div>
            <div className="right">
              <span className="__a">
                <FaMicrosoft fontSize={40} />
                <div>
                  <span className="__b">Get it from </span>
                  <span>Microsoft</span>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authpage;
