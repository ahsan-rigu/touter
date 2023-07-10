import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Toaster, toast } from "react-hot-toast";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const signup = async (newUser) => {
    setLoading(true);
    try {
      console.log(newUser);
      await axios.post(
        "https://touter-bak.onrender.com/api/user/signup",
        newUser
      );
      toast.success("Signed Up", {
        id: "signupsuccess",
      });
      signin(newUser.username, newUser.password);
    } catch (error) {
      toast.success(error.message, {
        id: "signupfailed",
      });
    } finally {
      setLoading(false);
    }
  };

  const signin = async (username, password) => {
    setLoading(true);
    try {
      const {
        data: { token },
      } = await axios.post("https://touter-bak.onrender.com/api/user/login", {
        username,
        password,
      });
      localStorage.setItem("token", token);
      setLoggedIn(true);
      toast.success("Welcome Back", {
        id: "loginSuccess",
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        id: "loginfailed",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.setItem("token", "");
    setLoggedIn(false);
    toast.success("Logged Out", {
      id: "loggedout",
    });
  };

  const verify = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.get("https://touter-bak.onrender.com/api/user/authorize", {
          headers: { authorization: `Bearer ${token}` },
        });
        setLoggedIn(true);
        toast.success("Welcome Back", {
          id: "tokenverified",
        });
      } catch (error) {
        toast.error("Login expired", {
          id: "tokenexpired",
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, signin, signup, signOut }}>
      {loading ? <Loader /> : children}
      <Toaster />
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
