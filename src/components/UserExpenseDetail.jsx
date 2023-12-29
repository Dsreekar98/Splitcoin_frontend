import React, { useEffect, useState } from "react";

export default function UserExpenseDetail({ userExpense }) {
    let [amount, setAmount]=useState();
    let [expenseType, setExpenseType]=useState();
    let [availableExpenseType,setAvailableExpenseType]=useState(userExpense?.userExpenseTypeList || []);
  const tableStyle = {
    width: "100%",
    tableLayout: "fixed",
  };

  const cellStyle = {
    width: '25%', // Adjust the width as needed
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd',
  };
  

  return (
    <div style={{ width: "50%", textAlign: "left" }}>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td style={cellStyle}>User Name:</td>
            <td style={cellStyle}>{userExpense.user.name}</td>
          </tr>
          <tr>
            <td style={cellStyle}> Amount:</td>
            <td style={cellStyle}>
              <input
                type="text"
                value={userExpense.amount}
                id="Amount"
                required
                // onChange={(e) => handleInputChange(index, "name", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td style={cellStyle}>Expense Type:</td>
            <td style={cellStyle}>
            <select
            id="currency"
            className="form-control"
            value={expenseType}
            onChange={(input) => {
              setExpenseType(input.target.value);
            }}
          >
            <option value="" disabled>
              Expense Type
            </option>
            {availableExpenseType.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
