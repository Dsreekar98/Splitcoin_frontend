import React, { useEffect, useState } from "react";
import { useAuth } from "./JwtToken";
import { Link, useParams, useNavigate } from "react-router-dom";
import ExpenseDetail from "./ExpenseDetail";
import { ClipLoader } from "react-spinners";

export default function Expenses(props) {
  const { token, setAuthToken,userId } = useAuth();
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  //   const group = props.location?.state?.groupData;
  //   console.log("group datails",group);
  //const group=groupData;
  let { groupId } = useParams();
  let [expenses, setExpenses] = useState([]);
  let [owner,setOwner]=useState("");
  useEffect(() => {
    if (token == null) {
      navigate("/userlogin");
    }

    const fetchExpenses = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_HOST + "/retrieveExpenses/" + groupId,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers...
            },
          }
        );
        const data = await response.json();
        setExpenses(data.expenseDTOS);
        setOwner(data.groupOwner);
      } catch (error) {
        setAuthToken(null);
        localStorage.removeItem("token");
        navigate("/");
        console.error("Error fetching groups:", error.message);
      }
      finally{
        setLoading(false)
      }
    };

    fetchExpenses(); // Call the function to fetch groups when the component mounts
  }, [token]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <ClipLoader color="#3498db" loading={loading} size={150} />
      </div>
    );
  }
  return (
    <div>
      <div>
        <h1>Expenses</h1>
        <br />
        {expenses.map((item) => {
          return <ExpenseDetail expense={item} key={item.id} />;
        })}
      </div>
      <div>
        <br />
        {owner==userId?(<Link to={`/createExpense/${groupId}`}>
          <button type="button" className="btn btn-primary btn-lg">
            create new Expense
          </button>
        </Link>):null}
      </div>
    </div>
  );
}
