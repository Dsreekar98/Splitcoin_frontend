import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword1() {
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("");
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
        const payload = {
          email: email,
        };
        const response = await axios.post(
            process.env.REACT_APP_BACKEND_HOST + "/passwordreset/",
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
            setMessage("Invalid Email and Password");
            // Handle errors, e.g., display an error message
            console.error("Error:", error.response?.data || error.message);
          } finally {
          }
  };
  return (
    <div style={{ width: "50%", textAlign: "left" }}>
      <form onSubmit={resetPassword}>
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
          <div style={{ color: "red" }}>{message}</div>
        </div>
        <br />
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
