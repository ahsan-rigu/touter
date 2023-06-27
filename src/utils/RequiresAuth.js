import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const RequiresAuth = ({ children }) => {
  const { loggedIn } = useContext(AuthContext);

  return loggedIn ? <>{children}</> : <Navigate to="/signin" />;
};

export default RequiresAuth;
