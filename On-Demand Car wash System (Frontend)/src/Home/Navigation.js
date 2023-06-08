import React from 'react';
import '../CSS/Navigation.css';

const Navigation = () => {
  return (
    <nav>
      <div className="nav-1">
        <div className="nav-main">
          <div className="nav-logo">
            <a href="index.html" className="nav-logo-img">
              <img
                src="https://rvs-product-pricing-page.vercel.app/assets/Logo.svg"
                alt=""
              />
            </a>
          </div>
          <ul>
            <li>
              <a href="index.html">Features</a>
            </li>
            <li>
              <a href="pricing.html">Pricing</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="nav-2">
        <div className="nav-main">
          <ul>
            <li>
              <a href="#">Start Scheduling</a>
            </li>
          </ul>
          <div className="nav-mobile-menu" id="nav-mobile-menu">
            <img
              src="https://rvs-product-pricing-page.vercel.app/assets/Hamburger-Menu.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
