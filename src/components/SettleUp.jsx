import React, { useEffect, useState } from "react";
import { useAuth } from "./JwtToken";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function SettleUp() {
  const { token,setAuthToken } = useAuth();
  const { groupId } = useParams();
  let [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const retreiveTransactions = async () => {
      try{
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}/settleup/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        
      );
      setTransactions(response.data);
      }catch(Error){
        setAuthToken(null);
      localStorage.removeItem("token");
      }
      
    };
    retreiveTransactions();
  }, [token]);
  return (
    <div>
      <table className ="table table-hover">
      <thead>
    <tr>
      <th scope="col">TransactionId</th>
      <th scope="col">Owes</th>
      <th scope="col">To</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>
    {
        transactions.map((transaction,index)=>(
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{transaction.fromUserName}</td>
                <td>{transaction.toUserName}</td>
                <td>{transaction.amount+" "+transaction.currency}</td>
            </tr>
        )

        )
    }
  </tbody>
      </table>
    </div>
  );
}
