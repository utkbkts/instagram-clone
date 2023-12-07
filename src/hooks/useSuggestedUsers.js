import React, { useEffect } from "react";
import { useState } from "react";
import useAuthStore from "../store/store";
import useShowToast from "./useToast";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

const useSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
	const [suggestedUsers, setSuggestedUsers] = useState([]);
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();

	useEffect(() => {
		const getSuggestedUsers = async () => {
			setIsLoading(true);
      if (!authUser || !authUser.following) {
        setIsLoading(false);
        setSuggestedUsers([]);
        return;
      }
			try {
				const usersRef = collection(db, "users");
				const q = query(
					usersRef,
					where("uid", "not-in", [authUser.uid, ...authUser.following]),
					orderBy("uid"),
					limit(3)
				);

				const querySnapshot = await getDocs(q);
				const users = [];

				querySnapshot.forEach((doc) => {
					users.push({ ...doc.data(), id: doc.id });
				});

				setSuggestedUsers(users);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};

		if (authUser) getSuggestedUsers();
	}, [authUser, showToast]);

	return { isLoading, suggestedUsers };
};

export default useSuggestedUsers;
