import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { FaHeart } from 'react-icons/fa';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useLanguage } from '../../context/languageContext';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { language, changeLanguage, languageData } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) setUsername(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
    navigate('/login');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <>
      <nav className={`navbar ${theme}`}>
        <div className="navbar-left" onClick={() => navigate('/')}>
          💻 {languageData[language].logo}
        </div>

        <div className="navbar-links">
          {['catalog', 'checkout', 'faq', 'contact', 'aboutus'].map(page => (
            <span
              key={page}
              onClick={() => navigate(`/${page === 'aboutus' ? 'about' : page}`)}
            >
              {languageData[language][page]}
            </span>
          ))}
        </div>

        <div className="navbar-right">
          <div className="icon-buttons">
            <Link to="/wishlist" className="icon-button" title="Wishlist">
              <FaHeart />
            </Link>
            <Link to="/cart" className="icon-button" title="Cart">
              <HiOutlineShoppingBag />
            </Link>
          </div>

          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </button>

          <select
            className="language-select"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">EN</option>
            <option value="az">AZ</option>
            <option value="ru">RU</option>
          </select>

          {username && (
            <div className="navbar-user">
              <span className="navbar-username">{username}</span>
              <button className="logout-btn" onClick={handleLogout}>
                <FiLogOut className="logout-icon" />
              </button>
            </div>
          )}

          <button className={`burger-btn ${drawerOpen ? 'open' : ''}`} onClick={toggleDrawer}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
        </div>
      </nav>

      <div className={`drawer ${drawerOpen ? 'open' : ''} ${theme}`}>
        <div className="drawer-header">
          <button className="close-btn" onClick={toggleDrawer}>✕</button>
          <span className="drawer-title"> 💻 {languageData[language].logo}</span>
        </div>
        <div className="drawer-links">
          {['catalog', 'checkout', 'faq', 'contact', 'aboutus'].map(page => (
            <span
              key={page}
              onClick={() => {
                navigate(`/${page === 'aboutus' ? 'about' : page}`);
                setDrawerOpen(false);
              }}
            >
              {languageData[language][page]}
            </span>
          ))}
          <Link
            to="/wishlist"
            className="drawer-link-icon"
            onClick={() => setDrawerOpen(false)}
          >
            <FaHeart className="drawer-icon" /> Wishlist
          </Link>
          <Link
            to="/cart"
            className="drawer-link-icon"
            onClick={() => setDrawerOpen(false)}
          >
            <HiOutlineShoppingBag className="drawer-icon" /> Cart
          </Link>
        </div>
        <div className="drawer-footer">
          <select
            className="language-select"
            value={language}
            onChange={(e) => {
              handleLanguageChange(e);
              setDrawerOpen(false);
            }}
          >
            <option value="en">EN</option>
            <option value="az">AZ</option>
            <option value="ru">RU</option>
          </select>
        </div>
      </div>
    </>
  );
}
