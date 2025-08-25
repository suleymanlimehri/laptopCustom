import { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useLanguage } from '../../context/languageContext';
import './AdminPanel.css';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
export default function AdminPanel() {
  const { language, languageData, changeLanguage } = useLanguage();
  const t = languageData[language].adminPage;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '', category: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [roleChangingUser, setRoleChangingUser] = useState(null);
  const [newRole, setNewRole] = useState('user');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      axios.get('/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          setUserRole(res.data.role);
          localStorage.setItem('userRole', res.data.role);
          if (res.data.role !== 'admin') {
            navigate('/access-denied');
          }
        })
        .catch(() => {
          navigate('/access-denied');
        });
    } else {
      navigate('/access-denied');
    }
  }, [token, navigate]);
  useEffect(() => {
    setLoading(true);
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'products') fetchProducts();
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };
  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/auth/all', { headers: { Authorization: `Bearer ${token}` } });
      setUsers(Array.isArray(res.data) ? res.data.filter(u => u.role !== 'admin') : []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  const handleBlockUnblockUser = async (user) => {
    try {
      await axios.put(`/api/auth/block/${user._id}`, { isBlocked: !user.isBlocked }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      console.error('Error blocking/unblocking user:', err);
    }
  };
  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders', { headers: { Authorization: `Bearer ${token}` } });
      setOrders(Array.isArray(res.data) ? res.data : []);

    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateCategory = async () => {
    try {
      await axios.post('/api/categories/create', { name: newCategoryName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategories();
      setNewCategoryName('');
      setShowCategoryModal(false);
    } catch (err) {
      console.error('Error creating category:', err);
      alert('Error creating category: ' + (err?.response?.data?.error ?? err.message));
    }
  };
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
      alert('Error deleting category');
    }
  };
  const activeOrders = orders.filter(o => o.status !== 'cancelled');
  const groupedOrders = activeOrders.reduce((acc, order) => {
    if (!order.user) return acc;
    const existing = acc.find(item => item.user._id === order.user._id);
    if (existing) {
      existing.orders.push(order);
    } else {
      acc.push({
        user: order.user,
        orders: [order]
      });
    }
    return acc;
  }, []);

  const truncate = (text, limit) => {
    if (!text) return '';
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  };
  const handleCreateProduct = async () => {
    try {
      await axios.post('/api/products/create', newProduct);
      fetchProducts();
      setShowModal(false);
      setNewProduct({ name: '', description: '', price: '', image: '', category: '' });
    } catch (err) {
      console.error('Error creating product:', err);
    }
  };
  const handleSaveEditProduct = async () => {
    try {
      await axios.put(`/api/products/${editingProduct._id}`, editingProduct);
      fetchProducts();
      setShowModal(false);
      setEditingProduct(null);
    } catch (err) {
      console.error('Error editing product:', err);
    }
  };
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };
  const handleCancelAllOrdersForUser = async (ordersForUser) => {
    try {
      for (const o of ordersForUser) {
        await axios.put(`/api/orders/cancel/${o._id}`, null, { headers: { Authorization: `Bearer ${token}` } });
      }
      fetchOrders();
    } catch (err) {
      console.error('Error cancelling orders:', err);
    }
  };

  const handleChangeUserRole = async () => {
    try {
      await axios.put(`/api/auth/changerole/${roleChangingUser._id}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
      setRoleChangingUser(null);
      setNewRole('user');
    } catch (err) {
      console.error('Error changing role:', err);
    }
  };
  const filteredProducts = products
    .filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategoryFilter ? p.category === selectedCategoryFilter : true)
    )
    .sort((a, b) => {
      if (sortOption === 'az') return a.name.localeCompare(b.name);
      if (sortOption === 'za') return b.name.localeCompare(a.name);
      if (sortOption === 'priceAsc') return a.price - b.price;
      if (sortOption === 'priceDesc') return b.price - a.price;
      return 0;
    });
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="sidebar-logo">Admin Panel</h2>
        <nav className="sidebar-nav">
          {userRole === 'admin' && (
            <button
              className={activeTab === 'users' ? 'active' : ''}
              onClick={() => setActiveTab('users')}
            >
              👥 {t.buttons.viewUsers}
            </button>
          )}
          <button
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            💻 {t.buttons.viewProducts}
          </button>
          <button
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            📦 {t.buttons.viewOrders}
          </button>
        </nav>
        <div className="language-switcher">
          <span className="language-icon">🌐 {t.language}:</span>
          <div className="language-buttons">
            <button
              className={language === 'en' ? 'active' : ''}
              onClick={() => changeLanguage('en')}
            >
              EN
            </button>
            <button
              className={language === 'az' ? 'active' : ''}
              onClick={() => changeLanguage('az')}
            >
              AZ
            </button>
            <button
              className={language === 'ru' ? 'active' : ''}
              onClick={() => changeLanguage('ru')}
            >
              RU
            </button>
          </div>
        </div>
      </aside>
      <main className="admin-main">
        {loading && <p className="loading-text">{t.loading}</p>}
        {!loading && activeTab === 'orders' && (
          <section className="admin-section">
            <h2>{t.ordersTitle}</h2>
            {groupedOrders.length === 0 ? (
              <p className="no-results">{t.noOrders}</p>
            ) : (
              <div className="admin-grid">
                {groupedOrders.map((group) => {
                  const userTotalAmount = group.orders.reduce((sum, o) => sum + o.totalAmount, 0);
                  return (
                    <div key={group.user._id} className="admin-card">
                      <h3>👤 {group.user.username}</h3>
                      <p>{t.email}: {group.user.email}</p>
                      <p>{t.orderCount}: {group.orders.length}</p>
                      {group.orders.map((o) => (
                        <div key={o._id} className="order-in-user">
                          <p className="order-time">{new Date(o.createdAt).toLocaleString()}</p>
                          <div className="order-items-list">
                            {o.items.map((item, idx) => (
                              <div key={idx} className="order-item">
                                <div className="item-name">
                                  {item.product && item.product.name ? item.product.name : "no Product name available"}
                                </div>
                                <div className="item-qty-price">
                                  <span>{t.qty}: {item.quantity}</span>
                                  <span>${item.price}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <p className="user-total">
                        <strong>{t.total}:</strong> ${userTotalAmount.toFixed(2)}
                      </p>
                      <button
                        className="cancel-order-button"
                        onClick={() => handleCancelAllOrdersForUser(group.orders)}
                      >
                        🚫 {t.buttons.cancelAll}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
        {!loading && activeTab === 'users' && (
          <section className="admin-section">
            <h2>{t.usersTitle}</h2>
            {users.length === 0 ? (
              <p className="no-results">{t.noUsers}</p>
            ) : (
              <div className="admin-grid">
                {users.map((u) => (
                  <div key={u._id} className={`admin-card ${u.isBlocked ? 'blocked' : ''}`}>
                    <p><strong>ID:</strong> {u._id}</p>
                    <p><strong>{t.user}:</strong> {u.username}</p>
                    <p><strong>{t.email}:</strong> {u.email}</p>
                    <p><strong>{t.role}:</strong> {u.role}</p>
                    <div className="user-card-actions">
                      <button
                        className="change-role-button"
                        onClick={() => {
                          setRoleChangingUser(u);
                          setNewRole(u.role);
                        }}
                      >
                        ✏️ {t.buttons.changeRole}
                      </button>
                      <button
                        className={`block-user-button ${u.isBlocked ? 'unblock' : ''}`}
                        onClick={() => handleBlockUnblockUser(u)}
                      >
                        {u.isBlocked ? '🔓 Unblock' : '🔒 Block'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {!loading && activeTab === 'products' && (
          <section className="admin-section">
            <h2>{t.productsTitle}</h2>
            <div className="product-controls">
              <input
                type="text"
                placeholder={t.placeholders.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="">{t.placeholders.sort}</option>
                <option value="az">{t.sort.az}</option>
                <option value="za">{t.sort.za}</option>
                <option value="priceAsc">{t.sort.priceAsc}</option>
                <option value="priceDesc">{t.sort.priceDesc}</option>
              </select>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              >
                <option value="">{t.placeholders.allCategories}</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>

              <button onClick={() => {
                setEditingProduct(null);
                setShowModal(true);
              }}>
                ➕ {t.buttons.newProduct}
              </button>

            </div>
            <div className="category-buttons-container">
              <button
                className="category-button"
                onClick={() => setShowCategoryModal(true)}
              >
                ➕ {t.buttons.newCategory}
              </button>

              <button
                className="category-button"
                onClick={() => setShowDeleteCategoryModal(true)}
              >
                ✂️ {t.buttons.deleteCategory}
              </button>
            </div>
            {filteredProducts.length === 0 ? (
              <p className="no-results">{t.noProducts}</p>
            ) : (
              <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  900: { slidesPerView: 3 },
                  1200: { slidesPerView: 4 },
                }}
              >
                {filteredProducts.map((p) => (
                  <SwiperSlide key={p._id}>
                    <div className="admin-card">
                      <img src={p.image} alt={p.name} className="product-image" />
                      <h5>{truncate(p.name, 12)}</h5>
                      <p>{truncate(p.description, 40)}</p>
                      <p>
                        {p.stock > 0 ? (
                          <span className="stock-indicator in-stock">🟢 {p.stock} in stock</span>
                        ) : (
                          <span className="stock-indicator out-of-stock">🔴 Out of stock</span>
                        )}
                      </p>
                      <p>${p.price}</p>
                      <div className="card-actions">
                        <button
                          className="edit-button"
                          onClick={() => { setEditingProduct({ ...p }); setShowModal(true); }}
                        >
                          ✏️
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteProduct(p._id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </section>
        )}
      </main>


      {roleChangingUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{t.modals.changeRoleTitle} {roleChangingUser.username}</h3>
            <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            <div className="modal-buttons">
              <button onClick={handleChangeUserRole}>{t.buttons.save}</button>
              <button onClick={() => setRoleChangingUser(null)}>{t.buttons.cancel}</button>
            </div>
          </div>
        </div>
      )}

      {(showModal || editingProduct) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingProduct ? t.modals.editProduct : t.modals.newProduct}</h3>
            <input
              type="text"
              placeholder={t.placeholders.name}
              value={editingProduct ? editingProduct.name : newProduct.name}
              onChange={(e) =>
                editingProduct
                  ? setEditingProduct({ ...editingProduct, name: e.target.value })
                  : setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <textarea
              placeholder={t.placeholders.description}
              value={editingProduct ? editingProduct.description : newProduct.description}
              onChange={(e) =>
                editingProduct
                  ? setEditingProduct({ ...editingProduct, description: e.target.value })
                  : setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder={t.placeholders.price}
              value={editingProduct ? editingProduct.price : newProduct.price}
              onChange={(e) =>
                editingProduct
                  ? setEditingProduct({ ...editingProduct, price: e.target.value })
                  : setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <input
              type="text"
              placeholder={t.placeholders.imageUrl}
              value={editingProduct ? editingProduct.image : newProduct.image}
              onChange={(e) =>
                editingProduct
                  ? setEditingProduct({ ...editingProduct, image: e.target.value })
                  : setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Stock count"
              value={editingProduct ? editingProduct.stock : newProduct.stock}
              onChange={(e) =>
                editingProduct
                  ? setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })
                  : setNewProduct({ ...newProduct, stock: Number(e.target.value) })
              }
            />
            <select
              value={editingProduct ? editingProduct.category : newProduct.category}
              onChange={(e) =>
                editingProduct
                  ? setEditingProduct({ ...editingProduct, category: e.target.value })
                  : setNewProduct({ ...newProduct, category: e.target.value })
              }
            >
              <option value="">{t.placeholders?.selectCategory ?? "CATEGORY?"}</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>

            <div className="modal-buttons">
              <button onClick={editingProduct ? handleSaveEditProduct : handleCreateProduct}>
                {editingProduct ? t.buttons.saveChanges : t.buttons.create}
              </button>
              <button onClick={() => {
                setShowModal(false);
                setEditingProduct(null);
                setNewProduct({ name: '', description: '', price: '', image: '', category: '' });
              }}>
                {t.buttons.cancel}
              </button>

            </div>
          </div>
        </div>
      )}
      {showCategoryModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{t.modals.newCategory}</h3>
            <input
              type="text"
              placeholder={t.placeholders.categoryName}
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <div className="modal-buttons">
              <button
                onClick={handleCreateCategory}
                disabled={!newCategoryName.trim()}
              >
                {t.buttons.create}
              </button>
              <button onClick={() => setShowCategoryModal(false)}>{t.buttons.cancel}</button>
            </div>
          </div>
        </div>
      )}
      {showDeleteCategoryModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Category</h3>
            <select
              value={categoryToDelete}
              onChange={(e) => setCategoryToDelete(e.target.value)}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="modal-buttons">
              <button
                onClick={() => {
                  if (categoryToDelete) handleDeleteCategory(categoryToDelete);
                  setShowDeleteCategoryModal(false);
                  setCategoryToDelete('');
                }}
                disabled={!categoryToDelete}
              >
                Delete
              </button>
              <button onClick={() => {
                setShowDeleteCategoryModal(false);
                setCategoryToDelete('');
              }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
