import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import userProfileStore from "../store/useProfleStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import useShowToast from "./useToast";

const useGetUserPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { posts, setPosts } = usePostStore();
	const showToast = useShowToast();
	const userProfile = userProfileStore((state) => state.userProfile);

	useEffect(() => {
		const getPosts = async () => {
			if (!userProfile) return;
			setIsLoading(true);
			setPosts([]);

			try {
				const q = query(collection(db, "posts"), where("createdBy", "==", userProfile.uid));
				const querySnapshot = await getDocs(q);
				const posts = [];
				querySnapshot.forEach((doc) => {
					posts.push({ ...doc.data(), id: doc.id });
				});

				posts.sort((a, b) => b.createdAt - a.createdAt);
				setPosts(posts);
			} catch (error) {
                console.error("Error fetching posts:", error);
				showToast("Error", error.message, "error");
				setPosts([]);
			} finally {
				setIsLoading(false);
			}
		};

		getPosts();
	}, [setPosts, userProfile, showToast]);

	return { isLoading, posts };
};

export default useGetUserPosts;