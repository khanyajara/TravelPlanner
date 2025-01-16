import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const form = document.querySelector('.LoginForm');
    setTimeout(() => {
      form.classList.add('show');
    }, 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://climateroutebackend.onrender.com/api/login', { email, password });
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: response.data.message,
      });
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || 'Error logging User In',
      });
    } finally {
      setLoading(false);
    }
  };

  const toRegister = () => {
    navigate('/register');
  };

  const toForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="LoginForm slide-in">
  
  <div className='Login-container'>
    <div className='Picture-container'><h1>ClimeQuest</h1></div>
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="Input"
          />
        </div>
        <div className="input-container">
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="Input"
          />
        </div>
        <p className="Account-link" onClick={toForgotPassword}>Forgot Password?</p>
        <button type="submit" disabled={loading} className="login-button">
          {loading ? <span className="spinner"></span> : 'Login'}
        </button>
        <p className="Account-link" onClick={toRegister}>Don't have an account? Register</p>
      </form>
    </div>
  </div>
</div>

  );
};

export default Login;
