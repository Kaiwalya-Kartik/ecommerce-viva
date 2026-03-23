import useCart from '../hooks/useCart';
import { formatCurrency } from '../utils/helpers';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} className="cart-image" />
      <div className="cart-details">
        <h4>{item.title}</h4>
        <p>{formatCurrency(item.price)}</p>
        <div className="qty-controls">
          <button onClick={() => updateQuantity(item.id, 'dec')}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, 'inc')}>+</button>
        </div>
      </div>
      <button onClick={() => removeFromCart(item.id)} className="danger-btn">Remove</button>
    </div>
  );
}
