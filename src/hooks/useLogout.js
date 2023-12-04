import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import useShowToast from "./useToast";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/store";

const useLogout = () => {
  const showToast = useShowToast();
    const navigate = useNavigate()
    const logout = useAuthStore((state)=>state.logout)
  const handleLogout = async () => {
    try {
      signOut(auth);
      localStorage.removeItem("user-info");
      navigate("/auth")
      logout()
    } catch (error) {
      showToast(error);
    }
  };
  return { handleLogout };
};
export default useLogout;
