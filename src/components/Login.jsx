import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "./JwtToken";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function Login() {
  const { setAuthToken, setUserEmail } = useAuth();
  let [email, setEmail] = useState("");
  let [password1, setPassword1] = useState("");
  let [message, setMessage] = useState("");
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const forgotPassword = () => {};
  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Loading state set to:", loading);
    try {
      const payload = {
        email: email,
        password: password1,
      };
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_HOST + "/api/v1/auth/authenticate",
        payload,
        {
          headers: {
            "Content-Type": "application/json", // Check if this triggers preflight
            // Other headers...
          },
        }
      );
      setEmail("");
      setPassword1("");
      if (response.status == "200") {
        setAuthToken(response.data.token);
        setUserEmail(email);
        navigate("/");
      }
    } catch (error) {
      setMessage("Invalid Email and Password");
      // Handle errors, e.g., display an error message
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }

  };
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <ClipLoader color="#3498db" loading={loading} size={150} />
      </div>
    );
  }
  return (
    <div style={{ width: "50%", textAlign: "left" }}>
      <form onSubmit={login}>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="Email"
            value={email}
            onChange={(input) => {
              return setEmail(input.target.value);
            }}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password1}
            onChange={(input) => {
              return setPassword1(input.target.value);
            }}
            className="form-control"
            id="Password"
          />
          <div style={{ color: "red" }}>{message}</div>
        </div>
        <Link to="/forgotpassword">Forgot password?</Link>
         <br />
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
