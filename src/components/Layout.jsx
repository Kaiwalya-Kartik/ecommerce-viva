import { Link, NavLink, Outlet } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import useCart from '../hooks/useCart';

export default function Layout() {
  const { cartItems, wishlistItems } = useCart();

  return (
    <div className="app-shell">
      <header className="header">
        <Link to="/" className="logo">ShopEasy</Link>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/wishlist" className="icon-link">
            <FiHeart /> {wishlistItems.length}
          </NavLink>
          <NavLink to="/cart" className="icon-link">
            <FiShoppingCart /> {cartItems.length}
          </NavLink>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
