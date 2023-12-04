import { signInWithEmailAndPassword } from "firebase/auth";
import useShowToast from "./useToast";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/store";
import {  useNavigate } from "react-router-dom";

const useLogin = () => {
  const showtoast = useShowToast();
  const navigate = useNavigate()
  const userLogin = useAuthStore((state) => state.login);
  const login = async (Form) => {
    if (!Form.name || !Form.email || !Form.password) {
      showtoast("Error", "Please fill all the fields","error");
      return;
    }
    try {
      const userResponse = await signInWithEmailAndPassword(
        auth,
        Form.email,
        Form.password
      );
      if (userResponse.user) {
        const docref = doc(db, "users", userResponse.user.uid);
        const docSnap = await getDoc(docref);
        localStorage.setItem("user-info", JSON.stringify(docSnap));
        userLogin(docSnap.data());
      }
      navigate("/")
      return userResponse.user;
    } catch (error) {
      showtoast("Error",error.message,"error");
    }
  };
  return { login };
};

export default useLogin;
