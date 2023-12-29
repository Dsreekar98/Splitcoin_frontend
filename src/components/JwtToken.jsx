import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const JwtToken = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const setAuthToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
