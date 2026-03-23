import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hero">
      <h1>E-Commerce Product Explorer</h1>
      <p>Browse products, filter items, save wishlist products and manage your cart easily.</p>
      <Link to="/products" className="primary-btn">Explore Products</Link>
    </motion.section>
  );
}
