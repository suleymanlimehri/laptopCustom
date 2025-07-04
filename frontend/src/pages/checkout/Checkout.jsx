import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosInstance';
import { useLanguage } from '../../context/languageContext';
import './Checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { language, languageData } = useLanguage();
  const t = languageData[language].checkoutPage;

  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [shippingType, setShippingType] = useState('Standard');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [showCardModal, setShowCardModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + (item.prices?.reduce((a, b) => a + b, 0) || 0);
    }, 0);
  };

  const getShippingCost = () => {
    return shippingType === 'Express' ? 20 : 0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingCost = getShippingCost();
    return Math.max(subtotal + shippingCost - discount, 0);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'mehri10') {
      setDiscount(10);
      setPromoMessage(t.promoApplied);
    } else {
      setDiscount(0);
      setPromoMessage(t.promoInvalid);
    }
  };

  const handleCompletePayment = () => {
    if (shippingAddress.trim().length < 10) {
      setErrorMessage(t.invalidAddress);
      return;
    }
    if (paymentMethod === 'Card') {
      setShowCardModal(true);
    } else {
      setShowModal(true);
    }
  };

  const handleConfirmOrder = async () => {
    setProcessing(true);
    setErrorMessage('');
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      // Correct mapping: use productId
      const items = cartItems.map(item => ({
        product: item.productId,  // Corrected
        quantity: item.prices?.length || 1,
        price: item.prices?.reduce((a, b) => a + b, 0) || 0,
        selectedOptions: item.selectedOptions || {},
      }));

      await axios.post('/api/orders', {
        userId,
        items,
        shippingAddress,
        totalAmount: calculateTotal(),
      }, {
        headers: { Authorization: `Bearer ${token}` },  
      });

      localStorage.removeItem('cart');
      setCartItems([]);
      navigate('/success');
    } catch (err) {
      console.error(err);
      setErrorMessage(t.failedOrder);
    } finally {
      setProcessing(false);
      setShowModal(false);
      setShowCardModal(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1>{t.checkout}</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart">{t.emptyCartMessage}</p>
      ) : (
        <>
          <div className="checkout-items">
            {cartItems.map((item, idx) => (
              <div key={idx} className="checkout-card">
                <img
                  src={item.image || '/placeholder.jpg'}
                  alt={item.name?.slice(0, 20) || 'Product'}
                  className="checkout-image"
                />
                <div className="checkout-info">
                  <h3>{item.name}</h3>
                  <p>{t.basePrice}: ${item.basePrice}</p>

                  {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                    <div className="checkout-options">
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

                  <p className="checkout-quantity">{t.quantity}: {item.prices?.length || 1}</p>
                  <p className="checkout-total">{t.totalForItem}: ${item.prices?.reduce((a, b) => a + b, 0) || 0}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-summary">
            <h2>{t.total}: ${calculateTotal()}</h2>

            <textarea
              placeholder={t.shippingAddress}
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="shipping-input"
            />

            <div className="payment-methods">
              <label>
                <input
                  type="radio"
                  value="Card"
                  checked={paymentMethod === 'Card'}
                  onChange={() => setPaymentMethod('Card')}
                /> {t.card}
              </label>
              <label>
                <input
                  type="radio"
                  value="Cash"
                  checked={paymentMethod === 'Cash'}
                  onChange={() => setPaymentMethod('Cash')}
                /> {t.cash}
              </label>
            </div>

            <div className="shipping-options">
              <label>
                <input
                  type="radio"
                  value="Standard"
                  checked={shippingType === 'Standard'}
                  onChange={() => setShippingType('Standard')}
                /> {t.standard}
              </label>
              <label>
                <input
                  type="radio"
                  value="Express"
                  checked={shippingType === 'Express'}
                  onChange={() => setShippingType('Express')}
                /> {t.express}
              </label>
            </div>

            <div className="promo-code">
              <input
                type="text"
                placeholder={t.promoCode}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handleApplyPromo}>{t.apply}</button>
              {promoMessage && <p className="promo-message">{promoMessage}</p>}
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {discount > 0 && (
              <p className="discount-info">{t.discountInfo}: -${discount}</p>
            )}

            <button
              onClick={handleCompletePayment}
              className="place-order-button"
              disabled={processing || shippingAddress.trim().length < 10}
            >
              {processing ? t.processing : t.completePayment}
            </button>
          </div>
        </>
      )}

      {showModal && (
        <div className="modal-container">
          <div className="modal-box">
            <h3>{t.areYouSure}</h3>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleConfirmOrder}>{t.confirmOrder}</button>
              <button className="cancel-btn" onClick={() => {
                setShowModal(false);
                navigate('/cancel');
              }}>{t.cancelOrder}</button>
            </div>
          </div>
        </div>
      )}

      {showCardModal && (
        <div className="modal-container">
          <div className="modal-box">
            <h3>{t.enterCardDetails}</h3>
            <input
              type="text"
              placeholder={t.cardNumber}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder={t.expiryDate}
              value={cardExpiry}
              onChange={(e) => setCardExpiry(e.target.value)}
            />
            <input
              type="password"
              placeholder={t.cvv}
              value={cardCVV}
              onChange={(e) => setCardCVV(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleConfirmOrder}>{t.pay}</button>
              <button className="cancel-btn" onClick={() => {
                setShowCardModal(false);
                navigate('/cancel');
              }}>{t.cancelOrder}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
