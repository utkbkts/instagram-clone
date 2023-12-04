import { useState } from "react";
import useShowToast from "./useToast";

const usePreviewImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();
  const maxFilesSizeBytes = 6 * 1024 * 2024; 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFilesSizeBytes) {
        showToast("Error", "File size must be less than 2MB", "error");
        setSelectedFile(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Error", "Please image file", "error");
    }
  };
  return { selectedFile, handleImageChange,setSelectedFile };
};

export default usePreviewImage;
