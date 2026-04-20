import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import useCart from '../hooks/useCart';
import { formatCurrency } from '../utils/helpers';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlistItems } = useCart();

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  return (
    <div className="card">
      <Link to={`/products/${product.id}`} className="image-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </Link>

      <div className="card-body">
        <p className="category-text">{product.category}</p>

        <Link to={`/products/${product.id}`} className="product-title-link">
          <h3>{product.title}</h3>
        </Link>

        <p className="rating-text">
          Rating: {product.rating?.rate ?? 'NA'}
        </p>

        <p className="price-text">
          {formatCurrency(product.price)}
        </p>

        <div className="card-actions">
          <button
            className="cart-btn"
            onClick={() => addToCart(product)}
          >
            <FiShoppingCart style={{ marginRight: 6 }} />
            Add to Cart
          </button>

          <button
            className="wishlist-btn"
            onClick={() => toggleWishlist(product)}
          >
            <FiHeart
              style={{ marginRight: 6 }}
              color={isWishlisted ? '#ffffff' : '#ffffff'}
            />
            {isWishlisted ? 'Wishlisted' : 'Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
}