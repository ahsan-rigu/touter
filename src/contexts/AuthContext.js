import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const signup = async (newUser) => {
    try {
      console.log(newUser);
      await axios.post("http://localhost:8080/api/user/signup", newUser);

      signin(newUser.username, newUser.password);
      return "Signed Up";
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async (username, password) => {
    try {
      const {
        data: { token },
      } = await axios.post("http://localhost:8080/api/user/login", {
        username,
        password,
      });
      localStorage.setItem("token", token);
      setLoggedIn(true);
      return "Signed In";
    } catch (error) {
      return Promise.reject();
    }
  };

  const signOut = () => {
    localStorage.setItem("token", "");
    setLoggedIn(false);
  };

  const verify = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      try {
        await axios.get("http://localhost:8080/api/user/verify", {
          headers: { authorization: `Bearer ${token}` },
        });
        setLoggedIn(true);
        return "Logged In";
      } catch (error) {
        return "Token Invalid";
      }
    } else {
      return "No Token Found";
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, signin, signup, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
