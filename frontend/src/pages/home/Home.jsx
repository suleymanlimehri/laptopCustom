import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-overlay" />
      <div className="glass-card">
        <h1 className="main-title">Welcome to Product Configurator Pro</h1>
        <p className="subtitle">
          Build your dream machine with our advanced product configurator.
        </p>
        <button onClick={() => navigate('/register')} className="btn primary">Get Started</button>
      </div>
    </div>
  );
}
