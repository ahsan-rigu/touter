import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { loggedIn } = useContext(AuthContext);

  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios.get(
          "http://localhost:8080/api/user/fetch-user",
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const followUnfollow = async (followingID) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8080/api/user/follow",
        { followingID },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      fetchUser();
      toast.success(res.data.message, {
        id: "followedUnfollowed",
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        id: "cantfolloworunfollow",
      });
    }
  };

  const bookmark = async (_id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/bookmark",
        {
          postID: _id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      fetchUser();
      toast.success(res.data.message, {
        id: "bookmarksuccess",
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        id: "cantbookmark",
      });
    }
  };

  const removeBookmark = async (_id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/remove-bookmark",
        {
          postID: _id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      fetchUser();
      toast.success(res.data.message, {
        id: "bookmarkremovesuccess",
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        id: "cantremovebookmark",
      });
    }
  };

  useEffect(() => {
    if (loggedIn === true) fetchUser();
  }, [loggedIn]);

  return (
    <UserContext.Provider
      value={{ user, fetchUser, followUnfollow, bookmark, removeBookmark }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export default UserContextProvider;
