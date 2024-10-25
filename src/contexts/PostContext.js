import axios from "axios";
import React, { createContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [createPostModal, setCreatePostModal] = useState(false);
  const [editPost, setEditPost] = useState({});
  const [refresh, setRefresh] = useState(false);

  const createPost = async (post) => {
    setRefresh(false);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.post(
          "https://touter-f228e9b8c7a1.herokuapp.com/api/post/create-post",
          post,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        toast.success("Post Created", {
          id: "postcreationsucess",
        });
        setCreatePostModal(false);
      } catch (error) {
        toast.error("Post Creation Failed", {
          id: "postcreatefail",
        });
      }
    } else {
      console.log("unauthorized");
    }
    setRefresh(true);
  };
  const editPostCall = async (post) => {
    setRefresh(false);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.post(
          "https://touter-f228e9b8c7a1.herokuapp.com/api/post/edit-post",
          post,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setEditPost({});
        toast.success("Post Edited", {
          id: "postEditSucess",
        });
      } catch (error) {
        toast.error("Edit Failed", {
          id: "editpostfail",
        });
      }
    } else {
      console.log("unauthorized");
    }
    setRefresh(true);
  };

  const like = async (postID) => {
    setRefresh(false);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "https://touter-f228e9b8c7a1.herokuapp.com/api/post/like",
        {
          postID,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message, {
        id: "likeunlikesuccess",
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        id: "likeunlikefailes",
      });
    }
    setRefresh(true);
  };

  const deleteComment = async (comment, _id) => {
    setRefresh(false);
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://touter-f228e9b8c7a1.herokuapp.com/api/post/remove-comment",
        {
          postID: _id,
          comment,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      toast.success("Comment Deleted", {
        id: "deletecommentsucess",
      });
    } catch (error) {
      toast.error("Couldn't Delete", {
        id: "deletefailed",
      });
    }
    setRefresh(true);
  };

  const comment = async (_id, comment) => {
    setRefresh(false);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://touter-f228e9b8c7a1.herokuapp.com/api/post/comment",
        {
          postID: _id,
          comment,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      toast.success("Comment Posted", {
        id: "writecommentsuccess",
      });
    } catch (error) {
      toast.error("Couldn't Post Comment", {
        id: "likeunlikefailes",
      });
    }
    setRefresh(true);
  };

  const deletePost = async (_id) => {
    setRefresh(false);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.post(
          "https://touter-f228e9b8c7a1.herokuapp.com/api/post/delete-post",
          { postID: _id },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        toast.success("Post Deleted", {
          id: "postDeleteSuccess",
        });
      } catch (error) {
        toast.error("Can't Delete Post", {
          id: "deleteerror",
        });
      }
    } else {
      console.log("unauthorized");
    }
    setRefresh(true);
  };
  return (
    <PostContext.Provider
      value={{
        createPost,
        createPostModal,
        setCreatePostModal,
        editPost,
        setEditPost,
        editPostCall,
        deletePost,
        refresh,
        like,
        deleteComment,
        comment,
      }}
    >
      {children}
      <Toaster />
    </PostContext.Provider>
  );
};

export default PostContextProvider;
