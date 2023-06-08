import React from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route,Routes } from 'react-router-dom';

import { RiGithubLine, RiWhatsappLine, RiTwitterLine, RiInstagramLine } from 'react-icons/ri';

import AdminList from "./Admin/AdminList";
import AdminDetails from "./Admin/AdminDetails";
import AddAdmin from "./Admin/AddAdmin";
import PackList from "./Admin/PackList";





import Navbar from "./Home/AdminPanel";
import Dashboard from "./Home/Dashboard";




import BookingPage from "./Home/BookingPage";
import AfterLogin from "./Home/AfterLogin";
import PaymentSuccessful from "./Home/PaymentSuccessful";
import CleenComponent from "./Home/CleenComponent";
import UserListPage from "./User/UserListPage";

import Subscription from "./Home/Subscription";
import Navigation from "./Home/Navigation";
import UserList from "./User/UserList";
import UserDemo from "./User/UserDemo";
import RatingPage from "./Admin/RatingPage";
import PaymentForm from "./Home/PaymentForm";
import RatingList from "./Admin/RatingList";
import BookingList from "./Admin/BookingList";
import PaymentList from "./Admin/PaymentList";
import AdminPanel from "./Home/AdminPanel";
import WasherList from "./CarWasher/WasherList";
import OrderList from "./CarWasher/OrderList";
import UserPdf from "./User/UserPdf";
import PaymentPdf from "./User/PaymentPdf";
import Loginn from "./Admin/Loginn";


















function App() {
  return (
    <div className="App">

<CleenComponent/> 

{/* <Loginn/> */}













     
     
     
     
    
     </div>
  );
}





 

export default App;
