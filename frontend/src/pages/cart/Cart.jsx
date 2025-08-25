import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/languageContext';
import './Cart.css';
import { useTheme } from '../../context/ThemeContext';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { theme } = useTheme();

  const { language, languageData } = useLanguage();
  const t = languageData[language].cartPage;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const normalized = storedCart.map(item => ({
      ...item,
      prices: Array.isArray(item.prices)
        ? item.prices
        : [item.finalPrice || item.basePrice || 0]
    }));
    setCartItems(normalized);
    localStorage.setItem('cart', JSON.stringify(normalized));
  }, []);

  const saveCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + (item.prices?.reduce((a, b) => a + b, 0) || 0);
    }, 0);
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    const lastPrice = updatedCart[index].prices[updatedCart[index].prices.length - 1] || 0;
    updatedCart[index].prices.push(lastPrice);
    saveCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].prices.length > 1) {
      updatedCart[index].prices.pop();
      saveCart(updatedCart);
    }
  };

  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty">
        <h1>{t.yourCart}</h1>
        <p className="empty-message">{t.emptyMessage}</p>
        <button className="explore-btn" onClick={() => navigate('/catalog')}>
          {t.explore}
        </button>
      </div>
    );
  }

  return (
    <div className={`cart-page ${theme}`}>
      <h1 className="cart-title">{t.yourCart}</h1>
      <div className="cart-controls">
        <button className="clear-cart-btn" onClick={clearCart}>
          {t.clearCart}
        </button>
      </div>

      <div className="cart-items">
        {cartItems.map((item, idx) => (
          <div key={idx} className="cart-card">
            <img
              src={item.image || '/placeholder.jpg'}
              alt={item.name?.slice(0, 20) || 'Product Image'}
              className="cart-image"
            />

            <div className="cart-content">
              <h3 className="cart-name">{item.name || 'Unnamed Product'}</h3>
              <p className="cart-price">{t.basePrice}: ${item.basePrice ?? 'N/A'}</p>

              {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                <div className="cart-options">
                  <p>{t.selectedOptions}:</p>
                  <ul>
                    {Object.entries(item.selectedOptions).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="cart-quantity-control">
                <button onClick={() => decreaseQuantity(idx)} className="quantity-btn">-</button>
                <span>{item.prices?.length ?? 1}</span>
                <button onClick={() => increaseQuantity(idx)} className="quantity-btn">+</button>
              </div>

              {item.prices && item.prices.length > 1 && (
                <div className="price-breakdown">
                  <p>{t.individualPrices}:</p>
                  <ul>
                    {item.prices.map((p, i) => (
                      <li key={i}>${p}</li>
                    ))}
                  </ul>
                </div>
              )}

              <h4 className="cart-final">
                {t.totalForItem}: ${item.prices?.reduce((a, b) => a + b, 0) || 0}
              </h4>

              <div className="cart-buttons">
                <button onClick={() => removeItem(idx)} className="remove-button">
                  {t.remove}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary-section">
        <h2 className="cart-summary">{t.total}: ${calculateTotal()}</h2>
        <button onClick={handleCheckout} className="checkout-button">
          {t.proceed}
        </button>
      </div>
    </div>
  );
}
