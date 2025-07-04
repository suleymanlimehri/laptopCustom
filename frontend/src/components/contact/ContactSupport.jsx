import { useState } from 'react';
import { useLanguage } from '../../context/languageContext';
import './ContactSupport.css';

export default function Contact() {
  const { language, languageData } = useLanguage();
  const t = languageData[language].contactPage;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: t.subjects[0],
    priority: t.priorities[1],
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus(t.requiredError);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setStatus(t.successMessage);
      setFormData({
        name: '',
        email: '',
        subject: t.subjects[0],
        priority: t.priorities[1],
        message: ''
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">{t.title}</h1>
      <p className="contact-subtitle">{t.subtitle}</p>

      <div className="agent-status">{t.agentStatus}</div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder={t.placeholders.name}
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder={t.placeholders.email}
          value={formData.email}
          onChange={handleChange}
        />

        <label className="subject-label">{t.subjectLabel}</label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        >
          {t.subjects.map((subj, i) => (
            <option key={i}>{subj}</option>
          ))}
        </select>

        <div className="priority-wrapper">
          <label>{t.priorityLabel}</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            {t.priorities.map((prio, i) => (
              <option key={i}>{prio}</option>
            ))}
          </select>
        </div>

        <textarea
          name="message"
          placeholder={t.placeholders.message}
          value={formData.message}
          onChange={handleChange}
          maxLength="300"
          rows="5"
        />
        <div className="char-counter">{formData.message.length}/300</div>

        <button type="submit" disabled={loading}>
          {loading ? t.sending : t.sendButton}
        </button>
      </form>

      {status && (
        <p
          className={`status-message ${
            status.includes('✅') ? 'success' : 'error'
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}
