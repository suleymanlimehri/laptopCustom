import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../../context/languageContext';
import './Configure.css';
import { useTheme } from '../../context/ThemeContext';

export default function ProductConfigure() {
  const { id } = useParams();
  const navigate = useNavigate();
    const { theme } = useTheme();
  const { language, languageData } = useLanguage();
  const t = languageData[language].productConfigure;
  const [product, setProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);

        const initialOptions = {};
        for (const key in res.data.extraPrices) {
          initialOptions[key] = Object.keys(res.data.extraPrices[key])[0];
        }
        setSelectedOptions(initialOptions);
        setFinalPrice(calculatePrice(res.data.price, res.data.extraPrices, initialOptions));
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  const calculatePrice = (basePrice, extraPrices, options) => {
    let total = basePrice;
    for (const key in options) {
      total += extraPrices[key][options[key]] || 0;
    }
    return total;
  };

  const handleOptionChange = (category, option) => {
    const newOptions = { ...selectedOptions, [category]: option };
    setSelectedOptions(newOptions);
    setFinalPrice(calculatePrice(product.price, product.extraPrices, newOptions));
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
      productId: product._id,
      name: product.name,
      image: product.image,
      basePrice: product.price,
      selectedOptions,
      finalPrice,
      quantity: 1
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  if (!product) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>{t.loading}</p>
    </div>
  );

  return (
    <div className={`config-page ${theme}`}> 
      <div className="config-card">
        <div className="product-info">
          <h1 className="config-title">{product.name}</h1>
          <img src={product.image} alt={product.name} className="config-product-image" />
          <p className="product-description">{product.description}</p>
          <h3 className="product-price">{t.basePrice}: ${product.price}</h3>
        </div>

        <div className="config-options">
          <h2 className="config-section-title">{t.configureTitle}</h2>
          <div className="options-section">
            {Object.entries(product.extraPrices).map(([category, options]) => (
              <div key={category} className="option-category">
                <h4>{category}</h4>
                <div className="option-list">
                  {Object.keys(options).map((option) => (
                    <label
                      key={option}
                      className={`option-item ${selectedOptions[category] === option ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name={category}
                        value={option}
                        checked={selectedOptions[category] === option}
                        onChange={() => handleOptionChange(category, option)}
                      />
                      {option} (+${options[option]})
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <h2 className="final-price">{t.totalPrice}: ${finalPrice}</h2>
          <button className="add-to-cart-button" onClick={handleAddToCart}>{t.addToCart}</button>
        </div>
      </div>
    </div>  
  );
}
