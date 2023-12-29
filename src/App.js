import logo from "./logo.svg";
import "./App.css";
import UserCreation from "./components/UserCreation";
import { Link, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { JwtToken } from "./components/JwtToken";
import Logout from "./components/Logout";
import Groups from "./components/Groups";
import Expenses from "./components/Expenses";
import CreateGroup from "./components/CreateGroup";
import Home from "./components/Home";
import CreateExpense from "./components/CreateExpense";
import UserExpenses from "./components/UserExpenses";
import SettleUp from "./components/SettleUp";

function App() {
  return (
    <div className="App">
      <JwtToken>
        <Navbar />
        <Routes>
          <Route path="/createUser" element={<UserCreation />} />
          <Route path="/userlogin" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/retrieveGroups" element={<Groups />} />
          <Route path="/retrieveExpense/:groupId" element={<Expenses/>}/>
          <Route path="/createGroup" element={<CreateGroup/>}/>
          <Route path="/createExpense/:groupId" element={<CreateExpense/>}/>
          <Route path="/retrieveUserExpenses/:expenseId" element={<UserExpenses/>}/>
          <Route path="/SettleUp/:groupId" element={<SettleUp/>}/>
          <Route path="/" element={<Home/>}/>

        </Routes>
      </JwtToken>
    </div>
  );
}

export default App;
