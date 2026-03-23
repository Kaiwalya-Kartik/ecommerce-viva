import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import useCart from '../hooks/useCart';
import { calculateCartTotals, formatCurrency } from '../utils/helpers';

const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  address: yup.string().required('Address is required'),
});

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { subtotal, tax, total } = calculateCartTotals(cartItems);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const orderId = uuidv4().slice(0, 8);
    toast.success(`Order placed. Order ID: ${orderId}`);
    clearCart();
    navigate('/');
  };

  return (
    <section className="checkout-page">
      <div>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
          <input type="text" placeholder="Full Name" {...register('fullName')} />
          <p className="error-text">{errors.fullName?.message}</p>

          <input type="email" placeholder="Email" {...register('email')} />
          <p className="error-text">{errors.email?.message}</p>

          <textarea placeholder="Address" rows="4" {...register('address')} />
          <p className="error-text">{errors.address?.message}</p>

          <button type="submit" className="primary-btn">Place Order</button>
        </form>
      </div>

      <div className="summary-box">
        <h3>Order Summary</h3>
        <p>Items: {cartItems.length}</p>
        <p>Subtotal: {formatCurrency(subtotal)}</p>
        <p>Tax: {formatCurrency(tax)}</p>
        <h3>Total: {formatCurrency(total)}</h3>
      </div>
    </section>
  );
}
