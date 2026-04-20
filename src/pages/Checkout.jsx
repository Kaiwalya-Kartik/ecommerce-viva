import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useCart from '../hooks/useCart';
import { calculateCartTotals, formatCurrency } from '../utils/helpers';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

    const newOrder = {
      id: Date.now(),
      customer: data,
      items: cartItems,
      status: 'Processing',
      date: new Date().toLocaleString(),
    };

    localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));
    clearCart();
    navigate('/orders');
  };

  if (!cartItems.length) {
    return <p>Your cart is empty. Add items before checkout.</p>;
  }

  const { subtotal, tax, total } = calculateCartTotals(cartItems);

  return (
    <section className="checkout-page">
      <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Checkout</h2>

        <input
          type="text"
          placeholder="Full Name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className="error-text">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email Address"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}

        <input
          type="text"
          placeholder="Phone Number"
          {...register('phone', { required: 'Phone number is required' })}
        />
        {errors.phone && <p className="error-text">{errors.phone.message}</p>}

        <textarea
          rows="4"
          placeholder="Delivery Address"
          {...register('address', { required: 'Address is required' })}
        />
        {errors.address && <p className="error-text">{errors.address.message}</p>}

        <button type="submit" className="primary-btn">
          Place Order
        </button>
      </form>

      <div className="summary-box">
        <h3>Order Summary</h3>
        <p>Subtotal: {formatCurrency(subtotal)}</p>
        <p>Tax: {formatCurrency(tax)}</p>
        <h3>Total: {formatCurrency(total)}</h3>
      </div>
    </section>
  );
}