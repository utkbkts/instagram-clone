import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import userProfileStore from "../store/useProfleStore";
import useShowToast from "./useToast";
import { db } from "../firebase/config";

const useGetUserProfileByUsername = (username) => {
	const [isLoading, setIsLoading] = useState(true);
	const showToast = useShowToast();
	const { userProfile, setUserProfile } = userProfileStore();

	useEffect(() => {
		const getUserProfile = async () => {
			setIsLoading(true);
			try {
				const q = query(collection(db, "users"), where("username", "==", username));
				const querySnapshot = await getDocs(q);

				if (querySnapshot.empty) return setUserProfile(null);

				let userDoc;
				querySnapshot.forEach((doc) => {
					userDoc = doc.data();
				});
				setUserProfile(userDoc);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};

		getUserProfile();
	}, [setUserProfile, username, showToast]);

	return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;