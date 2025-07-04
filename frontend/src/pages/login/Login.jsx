import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const processLogin = (res) => {
    localStorage.setItem('username', res.data.username);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userId', res.data.id);
    navigate(res.data.role === 'admin' ? '/admin' : '/catalog');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      processLogin(res);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Login failed');
    }
  };

 const handleGoogleSuccess = async (cred) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/google', {
        token: cred.credential,  
      });
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.id);
      window.location.href = res.data.role === 'admin' ? '/admin' : '/catalog';
    } catch (err) {
      setMessage('Google login failed');
      console.error('Google login error:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="glass-card">
        <h1 className="title">🚀 Welcome Back</h1>
        <p className="subtitle">Sign in to continue</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="divider">OR</div>
        <div className="google-button">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setMessage('Google login failed')}
          />
        </div>
        {message && <p className="feedback">{message}</p>}
      </div>
    </div>
  );
}
