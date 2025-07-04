import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const productsRes = await axios.get('/api/laptops');
      setProducts(productsRes.data);

      const cartRes = await axios.get('/api/cart', { withCredentials: true });
      setCartItems(cartRes.data.items);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };
  fetchData();
}, []);


  const addToCart = async (item) => {
    try {
      const res = await axios.post(
        '/api/cart',
        {
          productId: item._id,
          selectedOptions: item.selectedOptions,
          quantity: 1
        },
        { withCredentials: true }
      );
      setCartItems(res.data.items);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`/api/cart/${productId}`, { withCredentials: true });
      setCartItems(res.data.items);
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  const clearCart = async () => {
    try {
      const res = await axios.delete('/api/cart/clear', { withCredentials: true });
      setCartItems(res.data.items);
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, isLoading, products }}>
      {children}
    </CartContext.Provider>
  );
}
