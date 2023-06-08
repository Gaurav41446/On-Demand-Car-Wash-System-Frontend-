import React from 'react';
import '../CSS/style.css';
import { BrowserRouter as Router,Link} from "react-router-dom";

function Header(){
    return (
    <nav className="navbar">
          
    <div className="container-fluid">
      <div className="logo">
        <a className="navbar-brand">
          <span>C</span>leen
        </a>
      </div>

      <div className="dets">
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          
          <li>
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/AdminPanel">Admin</Link>
          </li>
        </ul>
      </div>
      <Link className ="login-btn" to="/BookingPage">Booking Appointment</Link>
      <Link className="login-btn" to="/Subscription">Susbscription</Link>


      
      
    </div>
    </nav>
    );
}
export default Header;