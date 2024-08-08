import React, { useEffect, useState } from "react";
import { useAuth } from "./JwtToken";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserExpenseDetail from "./UserExpenseDetail";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function UserExpenses() {
  let navigate = useNavigate();
  const { token, setAuthToken, userId } = useAuth();
  const { expenseId } = useParams();
  const [isChecked, setIsChecked] = useState(false);
  let [UserExpenses, setUserExpenses] = useState([]);
  let [totalAmount, setTotalAmount] = useState(0);
  let [message, setMessage] = useState();
  let [currency, setCurrency] = useState();
  let [createdById, setCreatedById] = useState("");
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token == null) {
      navigate("/userlogin");
    }

    const fetchDetails = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_HOST +
            "/expenseId/" +
            expenseId +
            "/retrieveuserexpenses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserExpenses(response.data);
        let totalAmount = 0;
        response.data.forEach((userExpense) => {
          if (userExpense.userExpenseType == "INCLUDE")
            totalAmount += userExpense.amount;
        });
        setTotalAmount(totalAmount);
        setCurrency(response.data[0].currency);
        setCreatedById(response.data[0].createdById);
      } catch (error) {
        setAuthToken(null);
        localStorage.removeItem("token");
        navigate("/");
      }
      finally{
        setLoading(false)
      }
    };
    fetchDetails();
  }, [token, expenseId]);

  const divide = (e) => {
    let val = e.target.value;
    let dividedVal = val / UserExpenses.length;
    let temp = [...UserExpenses];
    temp.forEach((expense) => {
      expense.amount = parseFloat(dividedVal);
    });
    setUserExpenses(temp);
  };
  const handleInputChangeAmount = (index, key, value) => {
    if (isChecked == false) {
      let temp = [...UserExpenses];
      let val = "";
      if (value != "") val = parseFloat(value);

      temp[index][key] = val;
      setUserExpenses(temp);
      let sum = 0;
      UserExpenses.forEach((e) => {
        if (e.amount != "") sum = parseFloat(sum) + parseFloat(e.amount);
      });
      setTotalAmount(sum);
    } else {
      let temp = [...UserExpenses];

      let dividedVal = value / UserExpenses.length;
      temp.forEach((single) => {
        single[key] = dividedVal;
        // single["userExpenseType"] = "";
      });
      temp[index][key] = parseFloat(value);
      temp[index]["userExpenseType"] = "INCLUDE";
      setUserExpenses(temp);
    }
  };
  const handleInputChangeExpenseType = (index, key, value) => {
    let temp = [...UserExpenses];
    temp[index][key] = value;
    setUserExpenses(temp);
  };
  const hitEndpoint = async () => {
    setLoading(true)

    const payload = UserExpenses;
    try{
    const response = axios.post(
      process.env.REACT_APP_BACKEND_HOST +
        "/expense/" +
        expenseId +
        "/createuserexpense",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      
    );
    if ((await response).status == "200") {
      setMessage("Saved Successfully");
    } else {
      setMessage("Error while saving");
    }
    }catch{}
    finally{
      setLoading(false)
    }
    
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <ClipLoader color="#3498db" loading={loading} size={150} />
          <div style={{ marginTop: "20px", fontSize: "18px", color: "#3498db" }}>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <table className="table table-striped">
        <tbody>
          <tr>
            <td> Total Amount</td>
            <td>{totalAmount + " " + currency}</td>
          </tr>
        </tbody>
      </table>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">User Name:</th>
            <th scope="col">Amount</th>
            <th scope="col">Part of the Expnse?</th>
          </tr>
        </thead>
        <tbody>
          {UserExpenses.map((userExpense, index) => (
            <tr key={index}>
              {/* {setCreatedById(userExpense.createdById)} */}
              <td>{userExpense.user.name}</td>
              <td>
                {
                  <input
                    type="number"
                    value={userExpense.amount}
                    id="amount"
                    required
                    onChange={(e) =>
                      handleInputChangeAmount(index, "amount", e.target.value)
                    }
                    disabled={userExpense.createdById == userId ? false : true}
                  />
                }
              </td>
              <td>
                <select
                  id="currency"
                  className="form-control"
                  value={
                    userExpense.userExpenseType == null
                      ? ""
                      : userExpense.userExpenseType
                  }
                  onChange={(e) =>
                    handleInputChangeExpenseType(
                      index,
                      "userExpenseType",
                      e.target.value
                    )
                  }
                  disabled={userExpense.createdById == userId ? false : true}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {userExpense.userExpenseTypeList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          <tr>
            {createdById==userId?(<td colSpan="6">
              
                <input type="button" onClick={hitEndpoint} value="SUBMIT" />
            
            </td>):null}
          </tr>
        </tbody>
      </table>
      <div>{message}</div>
    </div>
  );
}
