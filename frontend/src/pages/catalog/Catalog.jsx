import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useLanguage } from '../../context/languageContext';
import './Catalog.css';
import ChatButton from '../../components/chat/ChatButton';

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

    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    setFiltered(result);
  }, [searchTerm, selectedBrand, maxPrice, sortOption, products]);

  const handleCardClick = (product) => {
    navigate(`/product/${product._id}`);
  };

  if (loading) {
    return (
      <div className="catalog-container">
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
    <div className="catalog-container">
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
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: 'white' }}>{t.sort}</InputLabel>
          <Select
            value={sortOption}
            label={t.sort}
            onChange={(e) => setSortOption(e.target.value)}
            sx={{
              color: 'white',
              '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#38bdf8' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#38bdf8' },
              backgroundColor: '#0f172a'
            }}
          >
            <MenuItem value="none">{t.sort}</MenuItem>
            <MenuItem value="price-asc">{t.priceLowHigh}</MenuItem>
            <MenuItem value="price-desc">{t.priceHighLow}</MenuItem>
          </Select>
        </FormControl>
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
              <img
                src={product.image}
                alt={product.name}
                className="catalog-product-image"
              />
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
