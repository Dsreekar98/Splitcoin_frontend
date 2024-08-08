import axios from "axios";
import { useAuth } from "./JwtToken";
import { Link,useNavigate} from "react-router-dom";
import { ClipLoader } from "react-spinners";
import React, { useEffect, useState } from "react";


const calculateDaysAgo = (lastModifiedTimestamp) => {
  const currentTimestamp = Date.now();
  const differenceInMilliseconds = currentTimestamp - lastModifiedTimestamp;

  // Convert milliseconds to days
  const daysAgo = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  return daysAgo;
};

export default function ExpenseDetail({ expense,onDelete }) {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  const { token,setAuthToken,userId} = useAuth();
  const daysAgo = calculateDaysAgo(expense.lastModifiedAt);
  let deleteExpense = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      let response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_HOST}/deleteExpense/${expense.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onDelete(expense.id);
     //window.location.reload();
    } catch (error) {
      setAuthToken(null);
      localStorage.removeItem("token");
      navigate("/");
      console.error("Error deleting the group:", error.message);
    }
    finally{
      setLoading(false)
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ marginTop: "20px", fontSize: "18px", color: "#3498db" }}>
            Deleting...
          </div>
        </div>
      </div>
    );
  }

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
     {expense.createdById==userId?( <div className="btn-group">
        <button
          className="btn btn-sm btn-danger"
          onClick={deleteExpense}
        >
          Delete
        </button>
      </div>):null}
      <br />
    </div>
  );
}
