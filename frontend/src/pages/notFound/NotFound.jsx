import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-wrapper">
      <div className="animated-background"></div>
      <div className="notfound-content">
        <div className="glitch-text" data-text="404">404</div>
        <p className="notfound-subtitle">Ups! Səhifə Tapılmadı</p>
        <p className="notfound-description">
          Bu konfiqurasiya mövcud deyil və ya silinmişdir. Başqa bir URL sınayın və ya geri qayıdın.
        </p>
        <button className="back-button" onClick={() => navigate('/')}>
          Ana Səhifəyə Qayıt
        </button>
      </div>
    </div>
  );
}
