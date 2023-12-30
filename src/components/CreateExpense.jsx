import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "./JwtToken";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateExpense() {
  let [description, setDescription] = useState("");
  let [currency, setCurrency] = useState("");
  let [status, setStatus] = useState("");
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const { token,setAuthToken } = useAuth();
  let navigate = useNavigate();
  let {groupId}=useParams();

  useEffect(() => {
    // Fetch available currencies from the backend
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_HOST}/availableCurrencies`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers...
            },
          }
        );
        setAvailableCurrencies(response.data);
      } catch (error) {
        setAuthToken(null);
      localStorage.removeItem("token");
        console.error("Error fetching available currencies:", error.message);
      }
    };

    fetchCurrencies();
  }, [token]);
  let save = async (e) => {
    e.preventDefault();
    const payload = {
      description: description,
      currency:currency
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

        <div className="mb-3">
          <label htmlFor="currency" className="form-label">
            Currency
          </label>
          <select
            id="currency"
            className="form-control"
            value={currency}
            onChange={(input) => {
              setCurrency(input.target.value);
            }}
          >
            <option value="" disabled>
              Select Currency
            </option>
            {availableCurrencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
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
