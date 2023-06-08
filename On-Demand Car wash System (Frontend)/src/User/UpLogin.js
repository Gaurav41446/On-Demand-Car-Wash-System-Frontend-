import React from 'react';
import '../CSS/UpLogin.css';
import waveImage from '../img/bg.svg';
import avatarImage from '../img/avatar.svg';
import wave from '../img/wave.png';



const UpLogin = () => {
  return (
    
    
    <div className="container">
       <div className='wave'>
    <img src={wave} alt="Background"/>
    </div>
    
      <div className="img">
        <img src={waveImage}alt="Background" />
      </div>
      <div className="login-content">
        
          <img src={avatarImage} alt="Avatar" />
          <h2 className="title">Login</h2>
          <div className="form-inp">
            <input type="text" placeholder="Email" autoComplete="off" />
            <input type="password" placeholder="Password" autoComplete="off" />
          </div>
          <div className="btm-link2">
            Don't have an account? <a href="/signup.html">SignUp</a>
          </div>
          <input type="submit" className="btn" value="Login" />
       
      </div>
    </div>
   
  );
}

export default UpLogin;
