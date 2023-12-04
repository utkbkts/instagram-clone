import React from "react";
import { useState } from "react";
import useShowToast from "./useToast";
import useAuthStore from "../store/store";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import usePostStore from "../store/postStore";

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const addCommnet = usePostStore((state) => state.addComment);
  const deleteComment = usePostStore((state) => state.deleteComment);

  const handlePostComment = async (postId, comment) => {
    if (isCommenting) return;
    if (!authUser)
      return showToast("Error", "You must be logged in to comment", "error");
    setIsCommenting(true);
    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };
 
    try {
      await updateDoc(doc(db, "posts", postId), {
        comments: arrayUnion(newComment),
      });
      addCommnet(postId, newComment);
      deleteComment(postId,newComment)
    } catch (error) {
      console.log(error);
      showToast("Error", error.message, "error");
      return;
    } finally {
      setIsCommenting(false);
    }
  };
  return { isCommenting, handlePostComment };
};

export default usePostComment;
