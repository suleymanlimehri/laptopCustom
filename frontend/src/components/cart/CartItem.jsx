import '../../App.css';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

export default function CartItem({ item, index, removeFromCart }) {
  const { products } = useContext(CartContext);
  const product = products.find(p => p._id === item.productId);

  if (!product) return null;

  let extraCost = 0;
  if (product.extraPrices && item.selectedOptions) {
    Object.entries(item.selectedOptions).forEach(([option, value]) => {
      const optionPrices = product.extraPrices[option];
      if (optionPrices && optionPrices[value]) {
        extraCost += optionPrices[value];
      }
    });
  }

  return (
    <div className="cart-item">
      <img src={product.image} alt={product.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{product.name.slice(0,20)}</h3>
        <p><strong>Base Price:</strong> ${product.price}</p>
        {item.selectedOptions && Object.entries(item.selectedOptions).map(([key, value]) => (
          <p key={key}><strong>{key}:</strong> {value}</p>
        ))}
        {extraCost > 0 && <p><strong>Extras:</strong> +${extraCost}</p>}
        <p><strong>Item Total:</strong> ${product.price + extraCost}</p>
      </div>
      <button className="remove-button" onClick={() => removeFromCart(item.productId)}>Remove</button>
    </div>
  );
}
