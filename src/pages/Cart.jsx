import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import useCart from '../hooks/useCart';
import { calculateCartTotals, formatCurrency } from '../utils/helpers';

export default function Cart() {
  const { cartItems } = useCart();

  if (!cartItems.length) {
    return (
      <section className="empty-state">
        <div className="empty-state-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add products to your cart to see them here.</p>
        <Link to="/products" className="primary-btn">
          Continue Shopping
        </Link>
      </section>
    );
  }

  const { subtotal, tax, total } = calculateCartTotals(cartItems);

  return (
    <section>
      <h2>Your Cart</h2>

      <div className="cart-list">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="summary-box">
        <p>Subtotal: {formatCurrency(subtotal)}</p>
        <p>Tax: {formatCurrency(tax)}</p>
        <h3>Total: {formatCurrency(total)}</h3>
        <Link to="/checkout" className="primary-btn">
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
}
