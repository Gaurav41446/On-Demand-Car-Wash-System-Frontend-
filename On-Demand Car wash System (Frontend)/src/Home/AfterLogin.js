import React from 'react';
import '../CSS/style.css';
import '../CSS/Dashboard.css';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import BookingPage from '../Home/BookingPage';
import Subscription from '../Home/Subscription';
import Dashboard from './Dashboard';
import { Navbar } from 'reactstrap';
import LandingContent from './LandingConent';
import Navcontent from './Navcontent';
import AdminPanel from './AdminPanel';
import PaymentForm from './PaymentForm';
import PaymentSuccessful from './PaymentSuccessful';
import RatingPage from '../Admin/RatingPage';
import user from '../img/user-img.jpg';
import BookingSuccessful from './BookingSuccessful';
import SubscriptionPayment from './SubscriptionPayment';
import FranchiseApplicationForm from './FranchiseApplicationForm';

function AfterLogin() {
  // const { userId } = useParams();

  const email = localStorage.getItem('email');
  const userId = localStorage.getItem('userId');
 console.log("After Login user Id: " + userId);

 function handleLogout() {
  
  
 
  localStorage.removeItem('userId');
  localStorage.removeItem('email');
  
  window.location.href = '/';
}

  return (
    <>
      <div id="main">
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
                  <a href="/">Home</a>
                </li>
                
                <li> 
                  { 
                       localStorage.getItem('role') =="admin"?"": <a href="/#services">Service</a>
                    
                  }

                  </li>
                
                
               
                  <li>  
                    {
                 
                  localStorage.getItem('role') =="admin"?"": <Link to={`/AfterLogin/Dashboard`}>Dashboard</Link>
                 
                  }
                   </li>
                
                <li>
                  {
                localStorage.getItem('role') =="user"?"": <Link to={`/AfterLogin/AdminPanel`}>Admin</Link>
                  }
                </li>
                
              </ul>
            </div>

         { localStorage.getItem('role') =="admin"?"":  <button className="link-button">
              <Link to={`/AfterLogin/BookingPage`}> Book Appointment </Link>
            </button>
}
           { localStorage.getItem('role') =="admin"?"":<button className="link-button">
              <Link to={`/AfterLogin/Subscription`}>Subscription</Link>
            </button>
}
          
           {/* <button className="link-button">
            <Link to={`/`}>Logout</Link>
             </button> */}

<button className="link-button" onClick={handleLogout}>
      <Link to={`/`}>Logout</Link>
    </button>
            
          <div className="dropdown-menu" >
         
         <div>
          <img src = {user} style={{width: '30px', height: '30px', borderRadius: '50%', marginRight: '70px', marginTop: '3px'}}></img>
          <h5 style={{marginRight: '70px' }}>{email}</h5>
         </div>
         
    </div>
  
            
          </div>
        </nav>
      </div>

      <Routes>
        <Route exact path="/" element={<Navcontent />} />
        <Route path="/BookingPage" element={<BookingPage />} />
        <Route path="/BookingSuccessful" element={<BookingSuccessful/>}/>
        <Route path="/paymentForm" element={<PaymentForm />} />
        <Route path="/paymentSuccessfull" element={<PaymentSuccessful />} />
        <Route path="/SubscriptionPayment"element={<SubscriptionPayment/>}/>
        <Route path="/Rating" element={<RatingPage />} />
        <Route path="/Subscription" element={<Subscription />} />
        <Route path="/Dashboard/*" element={<Dashboard />} />
        <Route path="/AdminPanel/*" element={<AdminPanel />} />
        <Route path="/FranchiseApplicationFrom" element={<FranchiseApplicationForm/>}/>
      </Routes>
    </>
  );
}

export default AfterLogin;