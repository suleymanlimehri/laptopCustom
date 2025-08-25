import { useWishlist } from '../../context/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/languageContext';
import './Wishlist.css';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  const { language, languageData } = useLanguage();
  const t = languageData[language].wishlistPage;

  return (
    <div className={`wishlist-container ${isLightMode ? 'light' : ''}`}>
      <h2 className={`wishlist-header ${isLightMode ? 'light' : ''}`}>{t.title}</h2>

      {wishlist.length === 0 ? (
        <Empty
          description={t.empty}
          style={{ marginTop: 50 }}
        />
      ) : (
        <div className={`wishlist-table ${isLightMode ? 'light' : ''}`}>
          <div className={`wishlist-row wishlist-table-header ${isLightMode ? 'light' : ''}`}>
            <div className="wishlist-cell product-cell">{t.headers.product}</div>
            <div className="wishlist-cell price-cell">{t.headers.price}</div>
            <div className="wishlist-cell stock-cell">{t.headers.stock}</div>
            <div className="wishlist-cell remove-cell">{t.headers.remove}</div>
          </div>

          {wishlist.map((product) => {
            const stockCount = Number(product?.stock) || 0;
            const inStock = stockCount > 0;

            return (
              <div key={product._id} className={`wishlist-row ${isLightMode ? 'light' : ''}`}>
                <div className="wishlist-cell product-cell">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="wishlist-product-img"
                    onClick={() => navigate(`/product/${product._id}`)}
                  />
                  <div className="wishlist-product-info">
                    <span className={`wishlist-product-name ${isLightMode ? 'light' : ''}`}>{product.name}</span>
                    <span className={`wishlist-product-desc ${isLightMode ? 'light' : ''}`}>
                      {product.description?.slice(0, 55) || 'Awesome product'}
                    </span>
                  </div>
                </div>

                <div className={`wishlist-cell price-cell ${isLightMode ? 'light' : ''}`}>
                  <strong>${product.price}</strong>
                </div>

                <div className={`wishlist-cell stock-cell ${isLightMode ? 'light' : ''}`}>
                  <span className={`wishlist-stock-badge ${inStock ? 'in-stock' : 'out-of-stock'} ${isLightMode ? 'light' : ''}`}>
                    {inStock
                      ? `${t.inStock} (${stockCount})`
                      : `${t.outOfStock} (${stockCount})`}
                  </span>
                </div>

                <div className="wishlist-cell remove-cell">
                  <DeleteOutlined
                    className={`remove-icon ${isLightMode ? 'light' : ''}`}
                    onClick={() => toggleWishlist(product)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
