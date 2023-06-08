import React, { useState } from 'react';
import '../CSS/style.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import LandingContent from './LandingConent';
import AfterLogin from './AfterLogin';
import Login from '../User/Login';
import FranchiseApplicationForm from './FranchiseApplicationForm';


function CleenComponent() {
  
  return (
    <Router>

   <Routes>
          <Route path="/LoginPage" element={<Login  />} />
          <Route exact path="/" element={<LandingContent/>} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/AfterLogin/*" element={<AfterLogin />} />
          <Route path="/FranchiseApplicationForm"element={<FranchiseApplicationForm/>}/>
          
 </Routes>

</Router>
     
  );
}

export default CleenComponent;
