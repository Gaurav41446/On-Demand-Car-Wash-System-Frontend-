import React, { useState } from 'react';
import '../CSS/style.css';
import { BrowserRouter as Router, Route, Routes, Link, useParams, Navigate } from 'react-router-dom';
import img1 from '../img/img1.png';
import img2 from '../img/img2.png';
import img3 from '../img/img3.png';
import img4 from '../img/img4.png';



const Navcontent = () => {

  

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Message send succesfully,we will contact you soon")
    window.location.href = '/';
  };

  
  return (
    <>
      <section className="main-header">
        <div className="left-h">
          <h1>
            Keep your <span>car clean</span> always
          </h1>
        </div>
        <div className="right-h">
          <img src={img1} alt="" />
        </div>
      </section>

      <section className="experience">
        <h1>
          Based On <span>Experience</span>
        </h1>
        <div className="box">
          <div className="fbox">
            <img src={img2} alt="" />
          </div>
          <div className="mbox">
            <img src={img3} alt="" />
          </div>
          <div className="lbox">
            <img src={img4} alt="" />
            <h3>Our Statistics</h3>
            <input type="checkbox" /> We have 5+ years of Experience
            <br />
            <input type="checkbox" /> We have more than 1k+ cars serviced
          </div>
        </div>

        <div className="statics"></div>
      </section>

      <section id="services" className="services">
        <h1>
          Cleen Car Wash <span>Services</span>
        </h1>
        <h2>LOVE YOUR CAR, WE MAKE IT MORE ADORABLE</h2>

        <div className="service-box">
          <div className="sbox">
            <div className="img">
              <img src="https://media.istockphoto.com/id/174942860/photo/tire-wash.jpg?s=612x612&w=0&k=20&c=IHqUkH8UZl1vyS02BAU5zbJ2xvE-_NMFwSXOgfr2jdI=" alt="" />
            </div>
            <p>
              <span> NORMAL WASHING</span> The normal wash is a basic car wash service that focuses on cleaning the exterior of the vehicle. It typically includes a thorough cleaning of the car's body, windows, and wheels.
              The normal wash is designed to remove dirt, dust. It is a great option for regular maintenance and general cleanliness of the car.
            </p>
            <button>Know More</button>
          </div>
          <div className="sbox">
            <div className="img">
              <img src="https://media.istockphoto.com/id/1332908487/photo/car-washing-cleaning-car-using-high-pressure-water-autowashing-outdoors.jpg?s=612x612&w=0&k=20&c=S7v7BoeEsTb7riQ5fgBrTXfDdK8gvG7isN3GY48YwFo=" alt="" />
            </div>
            <p>
              <span>MEDIUM Washing</span> The medium wash offers a more comprehensive cleaning compared to the normal wash. In addition to cleaning the exterior of the car, it also includes interior cleaning and detailing. The medium wash involves vacuuming and wiping down the seats, dashboard., and other interior surfaces to remove dust, debris, and stains.

            </p>
            <button>Know More</button>
          </div>
          <div className="sbox">
            <div className="img">
              <img src="https://media.istockphoto.com/id/1394573624/photo/washing-the-car-in-an-automatic-washing-machine-brushed-car-washing-machine.jpg?s=612x612&w=0&k=20&c=uZDexpx4YEvSkhuG95bs_n-gOV4mR11NF4LhaeFD8wY=" alt="" />
            </div>
            <p>
              <span>PREMIUM WASHING</span> The premium wash is a top-tier car wash service that goes above and beyond in terms of cleaning and detailing. It encompasses both the exterior and interior cleaning and
              protection of the vehicle. The premium wash often includes services such as waxing or polishing the car's exterior, treating the tires and trim, and providing special attention to the interior,
              It aims to provide a premium level of cleanliness, shine;
            </p>
            <button>Know More</button>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <h1>
          <span>ABOUT US</span>
        </h1>
        <h2>Cleen for Clean Shiny Sparkling Cars in a hassle-free way...</h2>
        <p>
          Cleen is a brand that is literally going to change the way people think about car cleaning. It is a unique mechanized car cleaning concept where cars are pampered with the latest equipment, including high-pressure cleaning machines, spray injection and extraction machines, high-powered vacuum cleaners, steam cleaners, and more.
        </p>
        <p>
          With branches in Bhopal, Indore, and Jabalpur, Cleen offers its exceptional car cleaning services in multiple locations. Our head office is strategically located in Bhopal, at MP Nagar Zone 1, Sai Block Complex, near SBI Office. This prime location serves as the central hub for our operations and innovations, enabling us to efficiently serve our customers with top-notch car cleaning solutions.
          Whether you visit our Bhopal, Indore, or Jabalpur branches, you can expect the same level of excellence and dedication to providing a hassle-free, convenient, and high-quality car cleaning experience. </p>
        <button className="franchise-button"> <a href='/#contact'>Franchise With Us</a>
        </button>

      </section>

      <section id="contact">
        <h1 className="section-header">Contact</h1>

        <div className="contact-wrapper">
          <div className="form-img"><img src="https://cdn.pixabay.com/photo/2017/12/02/14/38/contact-us-2993000_640.jpg"></img></div>

          <form id="contact-form" className="form-horizontal" role="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="NAME"
                  name="name"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="EMAIL"
                  name="email"
                  required
                />
              </div>
            </div>
            <textarea
              className="form-control"
              rows="5"
              placeholder="MESSAGE"
              name="message"
              required
            ></textarea>
            <div className="form-group">
              <div className="col-sm-12">
                <select className="form-control" id="query" name="query" required>
                  <option value="" disabled selected>Select a Query</option>
                  <option value="car wash packages">Car wash packages and pricing</option>
                  <option value="interior cleaning">Interior cleaning services</option>
                  <option value="exterior polishing">Exterior polishing and waxing</option>
                  <option value="appointment scheduling">Appointment scheduling</option>
                  <option value="eco-friendly products">Use of eco-friendly cleaning products</option>
                  <option value="additional services">Additional services available</option>
                  <option value="duration of service">Duration of the car wash service</option>
                  <option value="payment methods">Accepted payment methods</option>
                  <option value="Franchise with us"> interested in franchising with us</option>
                </select>
              </div>
            </div>
            <button className="send-button" id="submit" type="submit" value="SEND">
              <div className="alt-send-button">
                <i className="fa fa-paper-plane"></i>
                <span className="send-text">SEND</span> 
              </div>
            </button>
          </form>

        
          

          
        </div>
      </section>
    </>
  );
};

export default Navcontent;
