import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "./JwtToken";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setAuthToken } = useAuth();
  let [email, setEmail] = useState("");
  let [password1, setPassword1] = useState("");
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
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
        navigate("/");
      }
    } catch (error) {
      setMessage("Invalid Email and Password");
      // Handle errors, e.g., display an error message
      console.error("Error:", error.response?.data || error.message);
    } finally {
    }
  };
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
          <div style={{ color: 'red' }}>{message}</div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
