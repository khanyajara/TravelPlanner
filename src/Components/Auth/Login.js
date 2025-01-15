import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import css from './auth.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
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
      const response = await axios.post('https://climateroutebackend.com/api/login', { email, password });
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Error logging User In');
    } finally {
      setLoading(false);
    }
  };



  const ToRegister= ()=>{
    navigate('/register')
    }

    const toForgotPassword=()=>{
      navigate('/forgot-password')
    }

  return (
    <div className="LoginForm slide-in">
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {message && <div style={{ color: 'skyblue' }}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          
          <input
            placeholder='Email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='Input'
          />
        </div>
        <div className="input-container">
          
          <input
          placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='Input'
          />
        </div>
        <p className='Account-link' onClick={toForgotPassword}>ForgotPassword?</p>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className='Account-link' onClick={ToRegister}>Don't have an account? Register</p>
      </form>
    </div>
  );
};

export default Login;