import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./JwtToken";

export default function UserCreation() {
  const { setAuthToken } = useAuth();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password1, setPassword1] = useState("");
  let [password2, setPassword2] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [isMatched, setIsMatched] = useState(false);
  let [submitted, setSubmitted] = useState();
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  function matchFunction() {
    return password1 == password2;
  }

  const submitUser = async (e) => {
    e.preventDefault();
    matchFunction();
    try {
      const payload = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: password1,
        role: "ADMIN",
      };
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_HOST + "/api/v1/auth/register",
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
      setPassword2("");
      setSubmitted(true);
      setAuthToken(response.data.token);
      navigate("/");
    } catch (error) {
      setMessage("Account already created with this Email address");
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div style={{ width: "50%", textAlign: "left" }}>
      <form onSubmit={submitUser}>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="Name"
            value={name}
            onChange={(inputName) => {
              return setName(inputName.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="Email"
            value={email}
            onChange={(inputEmail) => {
              return setEmail(inputEmail.target.value);
            }}
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phonenumber" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phonenumber"
            value={phoneNumber}
            onChange={(inputPhoneNumber) => {
              return setPhoneNumber(inputPhoneNumber.target.value);
            }}
          />
        </div>
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
