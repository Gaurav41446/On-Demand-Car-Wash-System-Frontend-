import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/UpLogin.css';
import bgImage from '../img/bg.svg';
import avatarImage from '../img/avatar.svg';
import wave from '../img/wave.png';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (message === 'User registered successfully') {
      alert('User registered successfully');
    }
  }, [message]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8181/user/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('User registered successfully');
        // Redirect to the login page after successful signup
        window.location.href = 'http://localhost:3000/LoginPage';
      } else {
        setMessage('Failed to add user');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <img className="wave" src={wave} alt="Wave" />
      <div className="containerr">
        <div className="img">
          <img src={bgImage} alt="Background" />
        </div>
        <div className="login-content">
          <form onSubmit={handleSignUp}>
            <img src={avatarImage} alt="Avatar" />
            <h2 className="title">SignUp</h2>
            <div className="form-inp">
              <input
                type="text"
                placeholder="Email"
                autoComplete="off"
                value={email}
                onChange={handleEmailChange}
              />
              <input
                type="password"
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="btm-link2">
              Already have an account? <Link to="/LoginPage">LogIn</Link>
            </div>
            <button className="btn" type="submit">
              SignUp
            </button>
          </form>
        </div>
      </div>
      <p>{message}</p>
    </>
  );
};

export default SignUpPage;
