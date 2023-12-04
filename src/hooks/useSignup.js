import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import useShowToast from "./useToast";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/store";

const useSignUpWithEmailAndPassword = () => {
  const showToast = useShowToast();
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login);

  const signup = async (Form) => {
		if (!Form.email || !Form.password || !Form.username) {
			showToast("Error", "Please fill all the fields", "error");
			return;
		}

		const usersRef = collection(db, "users");
		const q = query(usersRef, where("username", "==", Form.username));
		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			showToast("Error", "Username already exists", "error");
			return;
		}

		try {
			const newUser = await createUserWithEmailAndPassword(auth,Form.email, Form.password);
			if (!newUser && error) {
				showToast("Error", error.message, "error");
				return;
			}
			if (newUser) {
				const userDoc = {
					uid: newUser.user.uid,
					email: Form.email,
					username: Form.username,
					bio: "",
					profilePicURL: "",
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(db, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
        navigate("/")
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};
	return {   signup };
};
export default useSignUpWithEmailAndPassword;
