import axios from "axios";
import React from "react";
import { useAuth } from "./JwtToken";
import { Link } from "react-router-dom";

const calculateDaysAgo = (lastModifiedTimestamp) => {
  const currentTimestamp = Date.now();
  const differenceInMilliseconds = currentTimestamp - lastModifiedTimestamp;

  // Convert milliseconds to days
  const daysAgo = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  return daysAgo;
};

export default function ExpenseDetail({ expense }) {
  const { token,setAuthToken } = useAuth();
  const daysAgo = calculateDaysAgo(expense.lastModifiedAt);
  let deleteExpense = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_HOST}/deleteExpense/${expense.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      setAuthToken(null);
      localStorage.removeItem("token");
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
          href="#"
          className="list-group-item list-group-item-action active"
          aria-current="true"
        >
          <Link
            className="nav-link active"
            aria-current="true"
            to={"/retrieveUserExpenses/" + expense.id}
          >
            <div className="d-flex w-100 justify-content-begin">
              <h6 className="mb-1">{expense.description}</h6>
              <small className="d-flex w-100 justify-content-end">
                Modified {daysAgo} days ago
              </small>
            </div>

            <div>
              <small className="d-flex justify-content-begin">
                Price: {expense.amount}
              </small>
            </div>
          </Link>
        </div>
      </div>
      <div className="btn-group">
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={deleteExpense}
        >
          Delete
        </button>
      </div>
      <br />
    </div>
  );
}
