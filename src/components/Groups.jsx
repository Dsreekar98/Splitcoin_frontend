import React, { useEffect, useState } from "react";
import { useAuth } from "./JwtToken";
import axios from "axios";
import GroupDatail from "./GroupDatail";
import { Link, useNavigate } from "react-router-dom";

export default function Groups() {
  const { token, setAuthToken,userId } = useAuth();
  const navigate = useNavigate();
  let [groups, setGroups] = useState([]);
  useEffect(() => {
    if (token == null) {
      navigate("/userlogin");
    }
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_HOST + "/retrieveGroups",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers...
            },
          }
        );
        const data = await response.json();
        setGroups(data);
      } catch (error) {
        setAuthToken(null);

        localStorage.removeItem("token");
        navigate("/");
        console.error("Error fetching groups:", error.message);
      }
    };

    fetchGroups(); // Call the function to fetch groups when the component mounts
  }, [token]);
  return (
    <div>
      <div>
        <h1>Groups</h1>
        <br />
        {groups.map((item) => {
          return <GroupDatail group={item} key={item.id} />;
        })}
      </div>
      <div>
        <br />
        <Link to={"/createGroup"}>
          <button type="button" className="btn btn-primary btn-lg">
            create Group
          </button>
        </Link>
      </div>
    </div>
  );
}
