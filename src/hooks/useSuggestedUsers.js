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
  const [suggedtedUser, setSuggestedUser] = useState([]);
  const authuser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      try {
        const userRef = collection(db, "users");
        const q = query(
          userRef,
          where("uid", "not-in", [authuser.uid, ...authuser.following]),
          orderBy("uid"),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        setSuggestedUser(users);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (authuser) {
      getSuggestedUsers();
    }
  }, [authuser, showToast]);

  return { suggedtedUser, isLoading };
};

export default useSuggestedUsers;
