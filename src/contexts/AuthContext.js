import React, { createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ hey: "asdasd" }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
