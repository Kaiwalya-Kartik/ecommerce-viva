import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import useCart from '../hooks/useCart';
import { calculateCartTotals, formatCurrency } from '../utils/helpers';

export default function Cart() {
  const { cartItems } = useCart();
  const { subtotal, tax, total } = calculateCartTotals(cartItems);

  return (
    <section>
      <h2>Cart</h2>
      {!cartItems.length && <p>Your cart is empty.</p>}
      <div className="cart-list">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      {!!cartItems.length && (
        <div className="summary-box">
          <p>Subtotal: {formatCurrency(subtotal)}</p>
          <p>Tax: {formatCurrency(tax)}</p>
          <h3>Total: {formatCurrency(total)}</h3>
          <Link to="/checkout" className="primary-btn">Go to Checkout</Link>
        </div>
      )}
    </section>
  );
}
