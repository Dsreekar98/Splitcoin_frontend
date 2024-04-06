import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const token = params.get("token");
  let [password1, setPassword1] = useState("");
  let [password2, setPassword2] = useState("");
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("");
  console.log("token", token);
  useEffect(() => {
    const token2 = token.substring(32 + 5);
    setEmail(atob(token2.replace(/-/g, "+").replace(/_/g, "/")));
  }, [token]);
  console.log(email);
  function matchFunction() {
    return password1 == password2;
  }
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email: email,
        newPassword: password1,
      };
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_HOST +
          "/passwordreset/reset?token=" +
          token,
        payload,
        {
          headers: {
            "Content-Type": "application/json", // Check if this triggers preflight
            // Other headers...
          },
        }
      );
      setEmail("");
      if (response.status == "200") {
        console.log(response.data);
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Error Occurred");
      // Handle errors, e.g., display an error message
      console.error("Error:", error.response?.data || error.message);
    } finally {
    }
  };

  return (
    <div style={{ width: "50%", textAlign: "left" }}>
      <div>
        <a>Hi {email}, Please provide updated password</a>
      </div>
      <form onSubmit={resetPassword}>
        <div className="mb-3">
          <label htmlFor="Password1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="Password1"
            value={password1}
            onChange={(inputPassword1) => {
              setPassword1(inputPassword1.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Password2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="Password2"
            value={password2}
            onChange={(inputPassword2) => {
              setPassword2(inputPassword2.target.value);
            }}
            required
          />
        </div>
        <div>
          {password2.length > 0 &&
            (matchFunction() == true ? (
              <p>Password Matched ✔</p>
            ) : (
              <p>Password is not Matching</p>
            ))}
        </div>
        <div style={{ color: "red" }}>{message}</div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!matchFunction()}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
