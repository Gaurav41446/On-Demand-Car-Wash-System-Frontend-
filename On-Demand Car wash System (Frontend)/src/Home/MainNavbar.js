import React from 'react'

import '../CSS/style.css';

import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";


const MainNavbar=()=>
{
    return (
        <>
                <nav className="navbar">
                  <div className="container-fluid">
                    <div className="logo">
                      <a className="navbar-brand" href="/">
                        <span>C</span>leen
                      </a>
                    </div>

                    <div className="dets">
                      <ul>
                        <li>
                          <a href="/">Home</a>
                        </li>
                        <li>
                          <a href="#services">Services</a>
                        </li>
                        <li>
                          <a href="#about">About</a>
                        </li>
                        <li>
                          <a href="#contact">Contact</a>
                        </li>
                      </ul>
                    </div>
                    <button className="link-button" to="/LoginPage">
                        <Link to="/LoginPage">Login</Link>
                      </button>
                      <button className="link-button" to="/SignUpPage">
                        <Link to="/SignUpPage">Sign Up</Link>
                      </button>

                  </div>
                </nav>
        </>
    )
}

export default MainNavbar;