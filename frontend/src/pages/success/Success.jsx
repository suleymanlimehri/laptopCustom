import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/languageContext';
import './Success.css';

export default function Success() {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState('');
  const [countdown, setCountdown] = useState(10);

  const { language, languageData } = useLanguage();
  const t = languageData[language].successPage;

  useEffect(() => {
    const fakeOrder = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(fakeOrder);

    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          navigate('/catalog');
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="success-container">
      <div className="success-card">
        <h1 className="success-title">{t.title}</h1>
        <p className="success-message">{t.message}</p>
        
        <div className="order-summary">
          <p><strong>{t.orderNumber}:</strong> {orderNumber}</p>
          <p>{t.confirmation}</p>
        </div>

        <div className="suggestions">
          <button className="success-button" onClick={() => navigate('/catalog')}>
            {t.backToCatalog}
          </button>
          <button className="success-button secondary" onClick={() => navigate('/order')}>
            {t.viewOrders}
          </button>
        </div>

        <p className="auto-redirect">{t.redirecting} {countdown} {t.seconds}</p>
      </div>
    </div>
  );
}
