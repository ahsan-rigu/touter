import React, { createContext } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  return (
    <UserContext.Provider value={{ hey: "asdj" }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
