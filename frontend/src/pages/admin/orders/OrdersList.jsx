import React, { useEffect, useState } from 'react';
import axios from '../../../axiosInstance';
import './OrdersList.css';
import { useTheme } from '../../../context/ThemeContext';

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/orders/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (err) {
        console.error('FETCH ORDERS ERROR:', err);
        setError('🚫 Sifarişləri yükləmək alınmadı. Zəhmət olmasa bir az sonra yenidən cəhd edin.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  if (loading) {
    return (
      <div className={`orderslist-container ${theme}`}>
        <div className="loading">🔄 Yüklənir...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`orderslist-container ${theme}`}>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className={`orderslist-container ${theme}`}>
      <h2 className="orderslist-title">🛒 Mənim Sifarişlərim</h2>

      {orders.length === 0 ? (
        <p className="orderslist-empty">Hələ heç bir sifariş etməmisiniz.</p>
      ) : (
        <div className="orders-cards-grid">
          {orders
            .filter(order => order.status !== 'cancelled')
            .map((order) => (
              <div
                key={order._id}
                className={`order-card ${order.status === 'cancelled' ? 'cancelled' : ''}`}
              >
                <div className="order-header">
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                  <span className={`badge ${order.status}`}>{order.status}</span>
                </div>

                <div className="order-body">
                  <p><strong>Ünvan:</strong> {order.shippingAddress}</p>
                  <p><strong>Məbləğ:</strong> ${order.totalAmount?.toFixed(2)}</p>
                  <div className="order-items">
                    <p><strong>Məhsullar:</strong></p>
                    <ul>
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.product?.name 
                              ? item.product.name 
                              : '❓ Məhsul məlumatı mövcud deyil'}
                          </li>
                        ))
                      ) : (
                        <li>❓ Məhsul tapılmadı</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
