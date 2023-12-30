import React, { useEffect, useState } from "react";
import { useAuth } from "./JwtToken";
import axios from "axios";
import GroupDatail from "./GroupDatail";
import { Link } from "react-router-dom";

export default function Groups() {
  const { token,setAuthToken } = useAuth();
  let [groups, setGroups]=useState([]);
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND_HOST+"/retrieveGroups", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            // Other headers...
          },
        });
        const data = await response.json();
<<<<<<< HEAD
=======
        
>>>>>>> 8f1141f80fe0bf998d159fbf4c11ff777cfd1fd3
        setGroups(data);
      } catch (error) {
        setAuthToken(null);
      localStorage.removeItem("token");
        console.error("Error fetching groups:", error.message);
      }
    };

    fetchGroups(); // Call the function to fetch groups when the component mounts
  }, [token]);
  return <div><div>
    <h1>Groups</h1>
    <br/>
    {groups.map((item)=>{
      return <GroupDatail group={item} key={item.id}/>
    } )}
    </div>
    <div>
      <br/>
      <Link to={"/createGroup"}>
      <button type="button" className="btn btn-primary btn-lg">create Group</button>
      </Link>
    </div>
  </div>
}
