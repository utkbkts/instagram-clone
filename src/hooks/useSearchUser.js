import React from "react";
import { useState } from "react";
import useShowToast from "./useToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showtoast = useShowToast();
  const getUserProfile = async (username) => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q)
      if(querySnapshot.empty){
        return showtoast("Error","User Not Found","error")
      }
      querySnapshot.forEach((doc)=>{
        setUser(doc.data())
      })
    } catch (error) {
      showtoast("Error", error.message, "error");
      setIsLoading(false);
    }finally {
        setIsLoading(false);
    }
  };

  return {isLoading,getUserProfile,user,setUser}
};

export default useSearchUser;
