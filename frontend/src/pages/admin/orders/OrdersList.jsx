import React, { useEffect, useState } from 'react';
import axios from '../../../axiosInstance';
import './OrdersList.css';

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/orders/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError('🚫 Sifarişləri yükləmək alınmadı.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  if (loading) {
    return <div className="orderslist-container">🔄 Yüklənir...</div>;
  }

  if (error) {
    return <div className="orderslist-container error">{error}</div>;
  }

  return (
    <div className="orderslist-container">
      <h2 className="orderslist-title">🛒 Mənim Sifarişlərim</h2>

      {orders.length === 0 ? (
        <p className="orderslist-empty">Hələ heç bir sifariş etməmisiniz.</p>
      ) : (
        <div className="orders-cards-grid">
          {orders
            .filter(order => order.status !== 'cancelled')
            .map((o) => (
              <div
                key={o._id}
                className={`order-card ${o.status === 'cancelled' ? 'cancelled' : ''}`}
              >
                <div className="order-header">
                  <span className="order-date">
                    {new Date(o.createdAt).toLocaleString()}
                  </span>
                  <span className={`badge ${o.status}`}>{o.status}</span>
                </div>
                <div className="order-body">
                  <p><strong>Ünvan:</strong> {o.shippingAddress}</p>
                  <p><strong>Məbləğ:</strong> ${o.totalAmount?.toFixed(2)}</p>
                  <div className="order-items">
                    <p><strong>Məhsullar:</strong></p>
                    <ul>
                      {o.items.map((item, idx) => (
                        <li key={idx}>
                          {item.product?.name ?? '❓ Məhsul tapılmadı'}
                        </li>
                      ))}
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
