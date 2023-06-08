import React, { useState } from 'react';
import '../CSS/Navbar.css';
// import '../CSS/table.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddAdmin from '../Admin/AddAdmin';
import AdminDetails from '../Admin/AdminDetails';
import AdminList from '../Admin/AdminList';
import PackList from '../Admin/PackList';

import UserListPage from '../User/UserListPage';
import UserList from '../User/UserList';
import RatingList from '../Admin/RatingList';
import BookingList from '../Admin/BookingList';

import PaymentSuccessful from './PaymentSuccessful';
import WasherList from '../CarWasher/WasherList';
import AllUserList from '../Admin/AllUserList';
import PaymentList from '../Admin/PaymentList';
import SubscriptionPage from '../Admin/SubscriptionPage';

function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* <header>
        <label htmlFor="check">
          <i className="fas fa-bars" id="sidebar_btn" onClick={toggleSidebar}></i>
        </label>
        <div className="left_area">
          <h3>
            <span>Cleen</span>
          </h3>
        </div>
        
      </header> */}

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="dropdown">
          <a href="#">Customer &#9662;</a>
          <div className="dropdown-content">
            <Link to="/AfterLogin/AdminPanel/ViewAllProfile">View Profile </Link>
            {/* <Link to="/AfterLogin/AdminPanel/viewAllRatings">View Ratings</Link> */}
            
           
          </div>
        </div>

        <div className="dropdown">
          <a href="#">Washer &#9662;</a>
          <div className="dropdown-content">
            <Link to="/AfterLogin/AdminPanel/editWasher">View/Delete Washer</Link>
            <Link to="/AfterLogin/AdminPanel/customerRating">View Customer Ratings</Link>
            
          </div>
        </div>

        <div className="dropdown">
          <a href="#"> Payment Management &#9662;</a>
          <div className="dropdown-content">
            <Link to="/AfterLogin/AdminPanel/PaymentDetails">View Payments</Link>
           
          </div>
        </div>
        <div className="dropdown">
          <a href="#"> Booking Management &#9662;</a>
          <div className="dropdown-content">
          <Link to="/AfterLogin/AdminPanel/BookingDetails">View Bookings</Link>
          </div>
          <div className="dropdown">
          <a href="#"> Subscription Management &#9662;</a>
          <div className="dropdown-content">
          <Link to="/AfterLogin/AdminPanel/Subscription">View Subscriptions</Link>
           
          </div>
        </div>

        </div>
       
      </div>

      <div className="content">
        <Routes>
          <Route path="/ViewAllProfile" element={<AllUserList/>}/>
          <Route path="/viewAllRatings" element={<RatingList />}/>
          <Route path="/editWasher" element={<WasherList />}/>
          <Route path="/customerRating" element={<RatingList />}/>


          <Route path="/PaymentDetails" element={<PaymentList />}/>
          <Route path="/BookingDetails" element={<BookingList />}/>
          <Route path="/Subscription" element={<SubscriptionPage/>}/>
        </Routes>
      </div>



      
    </>
  );
}

export default AdminPanel;