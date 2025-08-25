import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css';
import { useLanguage } from '../../context/languageContext';

export default function ChatModal({ onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '👋 Salam! Mən OpenAI Chatbotam. Laptoplar haqqında suallarınızı verə bilərsiniz.'
    }
  ]);
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);
  const { language, languageData } = useLanguage();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/chat', {
        message: input.trim()
      });

      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: res.data.reply }
      ]);
    } catch (err) {
      console.error('Error:', err.response?.data);
      setError(err.response?.data?.detail || '❌ Xəta baş verdi. Təkrar cəhd edin.');
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: '❌ Xəta baş verdi. Təkrar cəhd edin.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-overlay">
      <div className="chat-window">
        <div className="chat-header">
          <span>🤖 {languageData[language].OpenAIChatbot}</span>
          <button onClick={onClose} className="close-btn">✖️</button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="loading-dot">...</div>}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Mesaj yaz..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSend}>➤</button>
        </div>
      </div>
    </div>
  );
}
