import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useAuthStore from "../store/store";
import userProfileStore from "../store/useProfleStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const useFolowUser = (userId) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const authUser = useAuthStore((state)=>state.user)
  const setUser = useAuthStore((state)=>state.setUser)
  const { userProfile, setUserProfile } = userProfileStore();
  const handleFollowUser = async () => {
    try {
      const currentUserRef = doc(db, "users", authUser.uid);
      const userFollowUnFollowRef = doc(db, "users", userId);

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });
      await updateDoc(userFollowUnFollowRef, {
        followers: isFollowing
          ? arrayRemove(authUser.uid)
          : arrayUnion(authUser.uid),
      });
      if (isFollowing) {
        //unfollow
        setUser({
          ...authUser,
          following: authUser.following.filter((uid) => uid !== userId),
        });
        if(userProfile){
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter(
              (uid) => uid !== authUser.uid
            ),
          });
        }
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: authUser.following.filter((uid) => uid !== userId),
          })
        );
        setIsFollowing(false);
      } else {
        // Follow
        setUser({
          ...authUser,
          following: [...authUser.following, userId],
        });
        setUserProfile({
          ...userProfile,
          followers: [...userProfile.followers, authUser.uid],
        });
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: [...authUser.following, userId],
          })
        );
        setIsFollowing(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authUser && authUser.following) {
      const isFollowing = authUser.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [authUser, userId]);

  return { isFollowing, handleFollowUser };
};

export default useFolowUser;
