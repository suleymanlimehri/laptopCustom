import { useState } from 'react';
import { useLanguage } from '../../context/languageContext';
import { useTheme } from '../../context/ThemeContext';
import './Faq.css';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  const { language, languageData } = useLanguage();
  const t = languageData[language].faqPage;

  const toggleIndex = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className={`faq-page ${isLightMode ? 'light' : ''}`}>
      <h1 className="faq-title">{t.title}</h1>
      <div className="faq-list">
        {t.items.map((faq, i) => (
          <div
            key={i}
            className={`faq-item ${openIndex === i ? 'open' : ''} ${isLightMode ? 'light' : ''}`}
            onClick={() => toggleIndex(i)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <span className="faq-toggle">{openIndex === i ? '-' : '+'}</span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
