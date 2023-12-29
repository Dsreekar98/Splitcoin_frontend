import React, { useEffect } from "react";
import { useAuth } from "./JwtToken";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { setAuthToken } = useAuth();
  console.log("logging out");
     const navigate = useNavigate();
  //   setAuthToken(null);
  //   navigate("/");
  useEffect(() => {
    // This effect will run once after the component is rendered
    setAuthToken(null);
    localStorage.removeItem("token");
    navigate("/");
  }, [setAuthToken, navigate]);
  return <div>Logged Out</div>;
}
