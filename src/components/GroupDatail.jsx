import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./JwtToken";
import Expenses from "./Expenses";

const calculateDaysAgo = (lastModifiedTimestamp) => {
  const currentTimestamp = Date.now();
  const differenceInMilliseconds = currentTimestamp - lastModifiedTimestamp;

  // Convert milliseconds to days
  const daysAgo = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  return daysAgo;
};

export default function GroupDatail({ group }) {
  const { token } = useAuth();
  const navigate = useNavigate();
  const daysAgo = calculateDaysAgo(group.lastModifiedAt);

  console.log(daysAgo);
  let deleteGroup = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_HOST}/deleteGroup/${group.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("stats", response.status);
      window.location.reload();
      navigate("/retrieveGroups");
    } catch (error) {
      console.error("Error deleting the group:", error.message);
    }
  };

  return (
    <div>
      <div
        className="list-group"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <div
          className="list-group-item list-group-item-action active"
          aria-current="true"
        >
          <div className="d-flex w-100 justify-content-between">
            <Link
              className="nav-link active"
              //to={"/retrieveExpense/" + group.id}
              to={`/retrieveExpense/${group.id}`}
              
            >
              <h5 className="mb-1">{group.name}</h5>
              <h6 className="mb-1">{group.description}</h6>
            </Link>
            <small>Modified {daysAgo} days ago</small>
            
          </div>
        </div>
        <div className="btn-group">
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={deleteGroup}
          >
            Delete
          </button>
          <Link to={"/SettleUp/"+group.id}>
          <button className="btn btn-sm btn-outline-secondary" >SettleUp</button></Link>
        </div>
      </div>
      <br />
    </div>
  );
}
