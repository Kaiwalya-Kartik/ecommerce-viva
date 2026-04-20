import { Link, NavLink, Outlet } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiPackage } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import useCart from '../hooks/useCart';

export default function Layout() {
  const { cartItems, wishlistItems } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <div className="app-shell">
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <Link to="/" className="logo">
          ShopEasy
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/orders" className="icon-link nav-icon-btn">
            <FiPackage />
            <span>Orders</span>
          </NavLink>

          <NavLink to="/wishlist" className="icon-link nav-icon-btn">
            <span className="icon-badge-wrap">
              <FiHeart />
              {wishlistCount > 0 && (
                <span className="nav-badge wishlist-badge">{wishlistCount}</span>
              )}
            </span>
            <span>Wishlist</span>
          </NavLink>

          <NavLink to="/cart" className="icon-link nav-icon-btn">
            <span className="icon-badge-wrap">
              <FiShoppingCart />
              {cartCount > 0 && (
                <span className="nav-badge cart-badge">{cartCount}</span>
              )}
            </span>
            <span>Cart</span>
          </NavLink>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}