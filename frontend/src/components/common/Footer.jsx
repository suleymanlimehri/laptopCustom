import React from 'react';
import './Footer.css';
import { useLanguage } from '../../context/languageContext';

export default function Footer() {
  const { language, languageData } = useLanguage();
  const t = languageData[language].footer;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>💻 {t.brandTitle}</h2>
          <p>{t.brandSlogan}</p>
        </div>

        <div className="footer-links">
          <h4>{t.quickLinks}</h4>
          <ul>
            <li><a href="/catalog">{t.links.catalog}</a></li>
            <li><a href="/cart">{t.links.cart}</a></li>
            <li><a href="/faq">{t.links.faq}</a></li>
            <li><a href="/contact">{t.links.contact}</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>{t.connect}</h4>
          <div className="social-icons">
            <a href="#" className="social-icon">🖥️</a>
            <a href="#" className="social-icon">📱</a>
            <a href="#" className="social-icon">🌐</a>
            <a href="#" className="social-icon">🎮</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 {t.copyright}</p>
      </div>
    </footer>
  );
}
