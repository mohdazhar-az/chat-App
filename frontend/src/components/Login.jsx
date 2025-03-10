import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import './main.css'

const Login = ({ setCurrentUserId, setUsername }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://live-chat-app-backend-gsb6.onrender.com/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      console.log('Login successful');
      const { username, userId } = response.data;
      setUsername(username);
      setCurrentUserId(userId);
      navigate('/home');
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged In",
        showConfirmButton: false,
        timer: 1000
      });

    } catch (error) {
      console.error('Login error:', error.response || error.message || error);
      Swal.fire({
        icon: "error",
        title: "Try Again",
        text: `${error.response?.data?.message || error.message}`,
      });
    }
  };

  return (
    <>
    <nav>
          <ul>
         
              <>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            
          </ul>
    </nav>
    <div className='mainpg'>
      <div className="container">
      <h1>Login to your Account..</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        disabled={isLoading} 
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        disabled={isLoading} 
      />
      <button onClick={handleLogin} disabled={isLoading} > {isLoading ? 'Login...' : 'Login'}</button>
    </div>
    </div>
    </>
  );
};

export default Login;