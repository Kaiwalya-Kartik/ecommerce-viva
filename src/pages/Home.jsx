import { Link } from 'react-router-dom';
import {
  FiShoppingBag,
  FiTruck,
  FiHeart,
  FiMonitor,
  FiGift,
  FiBriefcase,
  FiShoppingCart,
} from 'react-icons/fi';

export default function Home() {
  return (
    <section className="home-page">
      <div className="hero premium-hero">
        <div className="hero-content">
          <span className="hero-badge">Smart Shopping Starts Here</span>

          <h1 className="hero-title">
            Discover products you love, all in one place.
          </h1>

          <p className="hero-subtitle">
            Browse trending items, filter by category, save your favourites,
            and manage your cart with a clean modern shopping experience.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="primary-btn hero-btn">
              Explore Products
            </Link>

            <Link
              to="/wishlist"
              className="secondary-btn hero-btn secondary-hero-btn"
            >
              View Wishlist
            </Link>
          </div>
        </div>
      </div>

      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">
            <FiShoppingBag />
          </div>
          <h3>Wide Product Range</h3>
          <p>
            Explore fashion, electronics, jewellery and more in one place.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FiHeart />
          </div>
          <h3>Wishlist Support</h3>
          <p>
            Save products you like and revisit them anytime easily.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FiTruck />
          </div>
          <h3>Easy Checkout Flow</h3>
          <p>
            Add items to cart, update quantity and complete checkout smoothly.
          </p>
        </div>
      </section>

      <section className="home-categories">
        <h2 className="section-title">Shop by Category</h2>

        <div className="category-preview-grid">
          <Link to="/products" className="category-preview-card">
            <div className="category-preview-icon">
              <FiMonitor />
            </div>
            <span className="category-preview-name">Electronics</span>
          </Link>

          <Link to="/products" className="category-preview-card">
            <div className="category-preview-icon">
              <FiGift />
            </div>
            <span className="category-preview-name">Jewellery</span>
          </Link>

          <Link to="/products" className="category-preview-card">
            <div className="category-preview-icon">
              <FiBriefcase />
            </div>
            <span className="category-preview-name">Men&apos;s Clothing</span>
          </Link>

          <Link to="/products" className="category-preview-card">
            <div className="category-preview-icon">
              <FiShoppingCart />
            </div>
            <span className="category-preview-name">Women&apos;s Clothing</span>
          </Link>
        </div>
      </section>
    </section>
  );
}
