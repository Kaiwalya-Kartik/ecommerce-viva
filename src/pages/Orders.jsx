import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/helpers';

export default function Orders() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  if (!orders.length) {
    return (
      <section className="empty-state">
        <div className="empty-state-icon">📦</div>
        <h2>No orders yet</h2>
        <p>Your placed orders will appear here.</p>
        <Link to="/products" className="primary-btn">
          Shop Now
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h2 className="orders-title">My Orders</h2>

      <div className="orders-list">
        {orders.map((order) => {
          const total = order.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return (
            <div className="order-card" key={order.id}>
              <div className="order-top">
                <div>
                  <p className="order-id">Order ID: #{order.id}</p>
                  <p className="order-date">{order.date}</p>
                </div>

                <span className="order-status">{order.status}</span>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div className="order-item" key={item.id}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="order-item-image"
                    />
                    <div className="order-item-details">
                      <h4>{item.title}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>{formatCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="order-total">
                Total: {formatCurrency(total)}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}