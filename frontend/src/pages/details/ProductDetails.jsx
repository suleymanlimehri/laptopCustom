import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiShare2, FiHome } from 'react-icons/fi';
import { Helmet } from 'react-helmet';
import { useLanguage } from '../../context/languageContext';
import { useTheme } from '../../context/ThemeContext';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { language, languageData } = useLanguage();
  const t = languageData[language].productDetails;

  const [product, setProduct] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [recommended, setRecommended] = useState([]);
  const [copySuccess, setCopySuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);

        const all = await axios.get(`http://localhost:5000/api/products`);
        const others = all.data.filter(p => p._id !== id);
        setRecommended(others.slice(0, 4));

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleConfigure = () => {
    if (Number(product?.stock) > 0) {
      navigate(`/configure/${product._id}`);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(t.copied);
    setTimeout(() => setCopySuccess(''), 2000);
  };

  if (loading) {
    return (
      <div className={`details-container ${theme}`}>
        <div className="details-skeleton"></div>
        <h2 className="details-loading">{t.loading}</h2>
      </div>
    );
  }

  if (!product) return <h2 className={`details-error ${theme}`}>{t.notFound}</h2>;

  const stockCount = Number(product.stock) || 0;
  const inStock = stockCount > 0;

  return (
    <div className={`details-container ${theme}`}>
      <Helmet>
        <title>Laptop Configurator Pro - {product.name}</title>
      </Helmet>

      <nav className="breadcrumb">
        <Link to="/"><FiHome /> {t.home}</Link> / 
        <Link to="/catalog"> {t.catalog}</Link> / 
        <span> {product.name}</span>
      </nav>

      <div className="details-card">
        <h1 className="details-title">{product.name}</h1>

        <div className="details-main">
          <div className="details-gallery">
            <img
              src={product.images ? product.images[galleryIndex] : product.image}
              alt={product.name}
              className="details-image"
            />
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-row">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    className={`thumbnail ${idx === galleryIndex ? 'active' : ''}`}
                    onClick={() => setGalleryIndex(idx)}
                  />
                ))}
              </div>
            )}
            <div className={`stock-badge ${inStock ? 'in-stock' : 'out-of-stock'}`}>
              {inStock ? t.inStock : t.outOfStock}
            </div>
          </div>

          <div className="details-info">
            <p className="details-description">{product.description}</p>
            <h3 className="base-price">{t.price}: ${product.price}</h3>

            <div className="rating">
              ⭐ {product.rating || '4.5'} / 5
              <span className="reviews-count">({product.reviewsCount || 24} {t.reviews})</span>
            </div>

            <table className="specs-table">
              <tbody>
                <tr><td>{t.brand}</td><td>{product.brand}</td></tr>
                <tr><td>{t.processor}</td><td>{product.specs?.processor || 'Intel i7'}</td></tr>
                <tr><td>{t.ram}</td><td>{product.specs?.ram || '16GB'}</td></tr>
                <tr><td>{t.storage}</td><td>{product.specs?.storage || '512GB SSD'}</td></tr>
                <tr><td>{t.display}</td><td>{product.specs?.display || '14" FHD'}</td></tr>
                <tr><td>{t.gpu}</td><td>{product.specs?.gpu || t.integre}</td></tr>
              </tbody>
            </table>

            <div className="details-buttons">
              <button 
                className="button" 
                onClick={handleConfigure} 
                disabled={!inStock}>
                {t.configure}
              </button>
            </div>

            <div className="share-section">
              <button className="share-btn" onClick={handleCopyLink}>
                <FiShare2 /> {t.share}
              </button>
              {copySuccess && <span className="copy-message">{copySuccess}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="recommended-section">
        <h2>{t.youMayAlsoLike}</h2>
        <div className="recommended-grid">
          {recommended.map((item) => (
            <div
              key={item._id}
              className="recommended-card"
              onClick={() => navigate(`/product/${item._id}`)}
            >
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
