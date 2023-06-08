import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/UpLogin.css';
import bgImage from '../img/bg.svg';
import avatarImage from '../img/avatar.svg';
import wave from '../img/wave.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  // const [userId, setUserId] = useState('');
  // const [role,setRole] =useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8181/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage('Login successful');
        // setUserId(data.userId);
        // setRole(data.role);


        localStorage.setItem('userId', data.userId);
        localStorage.setItem('email', email);
        localStorage.setItem('role',data.role);

        navigate(`/AfterLogin?email=${encodeURIComponent(email)}`);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Invalid username or password');
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
          <form onSubmit={handleLogin}>
            <img src={avatarImage} alt="Avatar" />
            <h2 className="title">Login</h2>
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
              Don't have an account? <Link to="/SignUpPage">SignUp</Link>
            </div>
            <input type="submit" className="btn" value="Login" />
          </form>
        </div>
      </div>
      {message && <p>{JSON.stringify(message)}</p>}
    </>
  );
};

export default Login;
