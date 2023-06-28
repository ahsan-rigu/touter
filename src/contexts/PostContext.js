import axios from "axios";
import React, { createContext, useState } from "react";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [createPostModal, setCreatePostModal] = useState(false);

  const createPost = async (post) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.post("http://localhost:8080/api/post/create-post", post, {
          headers: { authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("unauthorized");
    }
  };
  return (
    <PostContext.Provider
      value={{ createPost, createPostModal, setCreatePostModal }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
