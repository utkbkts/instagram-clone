import React from "react";
import { useState } from "react";
import useShowToast from "./useToast";
import useAuthStore from "../store/store";
import { arrayRemove, arrayUnion, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import usePostStore from "../store/postStore";

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);
  const deleteComments = usePostStore((state) => state.deleteComment);


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
      addComment(postId, newComment);
    } catch (error) {
      console.log(error);
      showToast("Error", error.message, "error");
    } finally {
      setIsCommenting(false);
    }
  };
  const deleteComment = async (postId, commentToDelete) => {
    try {
      await updateDoc(doc(db, "posts", postId), {
        comments: arrayRemove(commentToDelete),
      });
      deleteComments(postId, commentToDelete);
      showToast("Success","Deleted is Successfully","success")
    } catch (error) {
      console.log(error);
      showToast("Error", error.message, "error");
    }
  };
  return { isCommenting, handlePostComment,deleteComment };
};

export default usePostComment;
