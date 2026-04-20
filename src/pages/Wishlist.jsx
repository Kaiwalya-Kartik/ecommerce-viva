import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import useCart from '../hooks/useCart';

export default function Wishlist() {
  const { wishlistItems } = useCart();

  if (!wishlistItems.length) {
    return (
      <section className="empty-state">
        <div className="empty-state-icon">❤️</div>
        <h2>Your wishlist is empty</h2>
        <p>Save products you like and they will appear here.</p>
        <Link to="/products" className="primary-btn">
          Explore Products
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h2>Your Wishlist</h2>
      <ProductGrid products={wishlistItems} />
    </section>
  );
}
