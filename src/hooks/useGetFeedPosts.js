import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/store";
import useShowToast from "./useToast";
import userProfileStore from "../store/useProfleStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);

  const { setUserProfile } = userProfileStore();
  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      if (authUser.following.length === 0) {
        setIsLoading(false);
        setPosts([]);
        return;
      }
      const q = query(
        collection(db, "posts"),
        where("createdBy", "in", authUser.following)
      );
      try {
        const querySnapshot = await getDocs(q);
        const feedPosts = [];

        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });

        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(feedPosts);
      setIsLoading(false);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getFeedPosts();
  }, [authUser, showToast, setPosts, setUserProfile]);

  return { isLoading, posts };
};

export default useGetFeedPosts;
