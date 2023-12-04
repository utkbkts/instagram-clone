import React, { useEffect, useState } from "react";
import useShowToast from "./useToast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const useGetUserProfileID = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      setUserProfile(null);
      try {
        const userRef = await getDoc(doc(db, "users", userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [setUserProfile, userId, showToast]);

  return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileID;
