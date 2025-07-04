import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [errors, setErrors]     = useState({});

  // Password strength indicator
  const getPasswordStrength = (pass) => {
    if (pass.length < 6) return 'Very Weak';
    if (/^[a-z]+$/.test(pass)) return 'Weak';
    if (/[a-zA-Z0-9]+$/.test(pass)) return 'Medium';
    if (/[a-zA-Z0-9@#$%^&*!]+$/.test(pass)) return 'Strong';
    return 'Unknown';
  };

  const passwordStrength = getPasswordStrength(password);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage('');

    const newErrors = {};

    if (!username.trim() || username.length < 3) {
      newErrors.username = '❗ Username must be at least 3 characters.';
    }

    if (!validateEmail(email)) {
      newErrors.email = '❗ Please enter a valid email address.';
    }

    if (password.length < 6) {
      newErrors.password = '❗ Password must be at least 6 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password
      });
      setMessage('✅ Registered successfully! Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setErrors({ form: err.response?.data?.msg || '❗ Error registering. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fancy-register-container">
      <div className="background-overlay" />
      <div className="fancy-card">
        <h1>Join Us Today</h1>
        <p className="subtitle">Create your account to unlock exclusive configurations and offers</p>
        <form onSubmit={handleRegister} noValidate>
          <div className="error-container">
            {errors.username && <div className="input-error">{errors.username}</div>}
            {errors.email && <div className="input-error">{errors.email}</div>}
            {errors.password && <div className="input-error">{errors.password}</div>}
            {errors.form && <div className="input-error">{errors.form}</div>}
          </div>

          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={errors.username ? 'invalid' : ''}
            />
            <label>Username</label>
          </div>

          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={errors.email ? 'invalid' : ''}
            />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={errors.password ? 'invalid' : ''}
            />
            <label>Password</label>
            {password && (
              <small className={`strength-${passwordStrength.toLowerCase()}`}>
                Strength: {passwordStrength}
              </small>
            )}
          </div>

          <button type="submit" className="gradient-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <button className="alt-link" onClick={() => navigate('/login')}>
          Already a member? <span>Sign In</span> →
        </button>

        {message && <p className="feedback success">{message}</p>}
      </div>
    </div>
  );
}
