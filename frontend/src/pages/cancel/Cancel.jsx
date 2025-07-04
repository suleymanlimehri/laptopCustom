import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/languageContext';
import './Cancel.css';

export default function Cancel() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState('');
  const [shake, setShake] = useState(false);

  const { language, languageData } = useLanguage();
  const t = languageData[language].cancelPage;

  useEffect(() => {
    const random = t.quotes[Math.floor(Math.random() * t.quotes.length)];
    setQuote(random);
  }, [t.quotes]);

  const handleRetry = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
    navigate('/checkout');
  };

  const handleBack = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
    navigate('/catalog');
  };

  return (
    <div className="cancel-page">
      <div className={`cancel-card ${shake ? 'vibrate' : ''}`}>
        <h1 className="cancel-title">{t.title}</h1>
        <p className="cancel-message">{t.message}</p>

        <blockquote className="cancel-quote">
          {quote}
        </blockquote>

        <div className="cancel-buttons">
          <button className="retry-button" onClick={handleRetry}>
            {t.retry}
          </button>
          <button className="back-button" onClick={handleBack}>
            {t.backToCatalog}
          </button>
        </div>
      </div>
    </div>
  );
}
