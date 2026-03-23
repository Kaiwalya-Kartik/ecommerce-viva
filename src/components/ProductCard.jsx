import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import useCart from '../hooks/useCart';
import { formatCurrency } from '../utils/helpers';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlistItems } = useCart();
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  return (
    <div className="card">
      <Link to={`/products/${product.id}`} className="image-wrap">
        <img src={product.image} alt={product.title} className="product-image" />
      </Link>
      <div className="card-body">
        <p className="category-text">{product.category}</p>
        <h3>{product.title}</h3>
        <p className="rating-text">Rating: {product.rating?.rate ?? 'NA'}</p>
        <p className="price-text">{formatCurrency(product.price)}</p>
        <div className="card-actions">
          <button onClick={() => addToCart(product)}><FiShoppingCart /> Cart</button>
          <button onClick={() => toggleWishlist(product)}>
            <FiHeart color={isWishlisted ? 'red' : 'inherit'} />
          </button>
        </div>
      </div>
    </div>
  );
}
