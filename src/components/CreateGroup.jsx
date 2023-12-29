import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "./JwtToken";
import { useNavigate } from "react-router-dom";

export default function CreateGroup() {
  const { token } = useAuth();
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [currency, setCurrency] = useState("");
  let [status, setStatus] = useState("");
  let [users,setUsers]=useState([]);
  const handleAddUser = () => {
    setUsers([...users, { name: '', email: '' }]);
  };
  const handleInputChange = (index, key, value) => {
    const newUsers = [...users];
    newUsers[index][key] = value;
    setUsers(newUsers);
    console.log(users);
  };

  const handleDeleteUser=(index)=>{
    const newUsers=[...users];
    newUsers.splice(index,1);
    setUsers(newUsers);
  }
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const navigate = useNavigate();
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
        console.error("Error fetching available currencies:", error.message);
      }
    };

    fetchCurrencies();
  }, [token]);
  let save = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: name,
        description: description,
        currency: currency,
        users:users
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/creategroup`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            // Other headers...
          },
        }
      );
      setName("");
      setDescription("");
      setCurrency("");
      console.log("stats", response.status);
      if (response.status == "200") navigate("/retrieveGroups");
      else {
        setStatus("Failed to save");
      }
    } catch (error) {
      console.error("Error fetching available currencies:", error.message);
    }
  };
  return (
    <div style={{ width: "50%", textAlign: "left" }}>
      <form onSubmit={save}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Group Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(input) => {
              return setName(input.target.value);
            }}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(input) => {
              return setDescription(input.target.value);
            }}
            className="form-control"
            id="description"
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

        {users.length>0?<h3>Enter User Details</h3>:""}
        {users.map((user, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <br/>
          <label htmlFor="name">
            User Name:
            <input
              type="text"
              value={user.name}
              id="name"
              required
              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
            />
          </label>
          <label htmlFor="Email">
            User Email:
            <input
              type="email"
              id="Email"
              value={user.age}
              required
              onChange={(e) => handleInputChange(index, 'email', e.target.value)}
            />
          </label>
          <button type="button" onClick={() => handleDeleteUser(index)}>
            Delete
          </button>
        </div>
      ))}

        <button type="button" className="btn btn-primary" onClick={handleAddUser}>
        Add User
      </button>
      <br/><br/>
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
