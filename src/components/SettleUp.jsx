import React, { useEffect, useState } from "react";
import { useAuth } from "./JwtToken";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
export default function SettleUp() {
  const navigate = useNavigate();
  const { token,setAuthToken } = useAuth();
  const { groupId } = useParams();
  let [loading, setLoading] = useState(false);
  let [transactions, setTransactions] = useState([]);
  useEffect(() => {
    if(token==null)
    {
      navigate("/userlogin");
    }
    const retreiveTransactions = async () => {
      setLoading(true)
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
        navigate("/");
      }
      finally{
        setLoading(false)
      }
      
    };
    retreiveTransactions();
  }, [token]);

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
