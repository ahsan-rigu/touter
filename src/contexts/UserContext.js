import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

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
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loggedIn === true) fetchUser();
  }, [loggedIn]);

  return (
    <UserContext.Provider value={{ hey: "asdj" }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
