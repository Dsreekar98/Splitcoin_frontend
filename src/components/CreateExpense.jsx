import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "./JwtToken";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateExpense() {
  let [description, setDescription] = useState("");
  let [currency, setCurrency] = useState("");
  let [status, setStatus] = useState("");
  const { token,setAuthToken } = useAuth();
  let navigate = useNavigate();
  let {groupId}=useParams();

  useEffect(() => {
    if(token==null)
    {
      navigate("/userlogin");
    }
    // Fetch available currencies from the backend
  }, [token]);
  let save = async (e) => {
    e.preventDefault();
    const payload = {
      description: description,
    };
    try {
      let response = await axios.post(
        process.env.REACT_APP_BACKEND_HOST +
          "/groupid/" +
          groupId +
          "/createexpense",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == "200") navigate("/retrieveExpense/" + groupId);
      else {
        setStatus("Failed to save");
      }
      
    } catch (error) {
      setAuthToken(null);
      localStorage.removeItem("token");
      console.error("Error while storing expense: " + error.message);
    }
  };
  return (
    <div style={{ width: "50%", textAlign: "left" }}>
      <form onSubmit={save}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(input) => {
              return setDescription(input.target.value);
            }}
            aria-describedby="emailHelp"
          />
        </div>

        

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
      <div>
        <h6>{status}</h6>
      </div>
    </div>
  );
}
