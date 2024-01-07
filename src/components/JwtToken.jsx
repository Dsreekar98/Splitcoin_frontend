import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const JwtToken = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userId,setUserId]=useState(localStorage.getItem("userId") || null)

  const setAuthToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };
  const setUserEmail = (newUserId) => {
    setUserId(newUserId);
    localStorage.setItem("userId", newUserId);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken,userId,setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
