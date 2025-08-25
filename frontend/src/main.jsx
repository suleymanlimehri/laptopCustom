import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from './context/ThemeContext.jsx';
import 'antd/dist/reset.css';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

console.log('Using Google Client ID:', clientId);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <GoogleOAuthProvider clientId={clientId} >
      <App />
    </GoogleOAuthProvider>
  </ThemeProvider>

);
