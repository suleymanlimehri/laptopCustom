import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Switch } from '@mui/material';
import { useLanguage } from '../../context/languageContext';
import { useTheme } from '../../context/ThemeContext';
import './Catalog.css';
import ChatButton from '../../components/chat/ChatButton';
import { useWishlist } from '../../context/WishlistContext';
import { FavoriteBorder, Favorite } from '@mui/icons-material';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [brands, setBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [sortOption, setSortOption] = useState('none');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const { toggleWishlist, isInWishlist } = useWishlist();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { language, languageData } = useLanguage();
  const t = languageData[language].catalogPage;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
        setFiltered(res.data);
        const brandList = [...new Set(res.data.map((p) => p.brand))].filter(Boolean);
        setBrands(brandList);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];
    if (searchTerm.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedBrand) {
      result = result.filter((p) => p.brand === selectedBrand);
    }
    result = result.filter((p) => p.price <= maxPrice);
    if (onlyInStock) {
      result = result.filter((p) => Number(p.stock) > 0);
    }
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }
    setFiltered(result);
  }, [searchTerm, selectedBrand, maxPrice, sortOption, onlyInStock, products]);

  const handleCardClick = (product) => {
    navigate(`/product/${product._id}`);
  };

  if (loading) {
    return (
      <div className={`catalog-container ${theme}`}>
        <h2 className="catalog-title">{t.loading}</h2>
        <div className="product-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="product-card skeleton" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <h2 className="catalog-error">{error}</h2>;
  }

  return (
    <div className={`catalog-container ${theme}`}>
      <div className="catalog-header">
        <div className="header-spacer"></div>
        <h1 className="catalog-title">{t.title}</h1>
      </div>

      <div className="catalog-controls">
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {brands.length > 1 && (
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">{t.allBrands}</option>
            {brands.map((brand, i) => (
              <option key={i} value={brand}>{brand}</option>
            ))}
          </select>
        )}

        <div className="price-filter">
          <label>{t.maxPrice}: ${maxPrice}</label>
          <input
            type="range"
            min="300"
            max="3000"
            step="50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="none">{t.sort}</option>
          <option value="price-asc">{t.priceLowHigh}</option>
          <option value="price-desc">{t.priceHighLow}</option>
        </select>

        <div className="stock-switch">
          <Switch
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            color="primary"
          />
          <span>{t.inStockOnly}</span>
        </div>
      </div>

      <div className="product-grid">
        {filtered.length === 0 && <p className="no-results">{t.noResults}</p>}
        {filtered.map((product) => (
          <div
            key={product._id}
            className={`product-card ${product.stock === 0 ? 'out-of-stock-card' : ''}`}
            onClick={() => handleCardClick(product)}
          >
            <div className={`image-wrapper ${product.stock === 0 ? 'disabled' : ''}`}>
              <button
                className="wishlist-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                  if (isInWishlist(product)) {
                    toast.success(`Removed from Wishlist 💔`);
                  } else {
                    toast.success(`Added to Wishlist ❤️`);
                  }
                }}
              >
                {isInWishlist(product) ? <Favorite /> : <FavoriteBorder />}
              </button>
              <img
                src={product.image}
                alt={product.name}
                className="catalog-product-image main-image"
              />
              {product.hoverImage && (
                <img
                  src={product.hoverImage}
                  alt={product.name}
                  className="catalog-product-image hover-image"
                />
              )}
              <div className="overlay">
                <h3>{product.name}</h3>
              </div>
            </div>
            <div className="product-info">
              <span className="price">${product.price}</span>
            </div>
          </div>
        ))}
      </div>

      <ChatButton />
    </div>
  );
}
