import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar, FiZap } from 'react-icons/fi';
import { fetchProductByIdApi } from '../services/api';
import useCart from '../hooks/useCart';
import { formatCurrency } from '../utils/helpers';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart, toggleWishlist, wishlistItems } = useCart();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductByIdApi(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  return (
    <>
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span> / </span>
        <Link to="/products">Products</Link>
        <span> / </span>
        <span className="breadcrumb-current">{product.title}</span>
      </div>

      <section className="details-page premium-details-page">
        <div className="details-image-box premium-image-box">
          <img
            src={product.image}
            alt={product.title}
            className="details-image"
          />
        </div>

        <div className="details-info premium-details-info">
          <span className="details-category-badge">{product.category}</span>

          <h1 className="details-title">{product.title}</h1>

          <div className="details-rating-row">
            <div className="details-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  className={
                    product.rating?.rate >= star
                      ? 'details-star filled'
                      : 'details-star'
                  }
                />
              ))}
            </div>

            <span className="details-rating-number">
              {product.rating?.rate ?? 'NA'}
            </span>

            <span className="details-rating-count">
              ({product.rating?.count ?? 0} reviews)
            </span>
          </div>

          <div className="details-price-box">
            <p className="details-price-label">Special Price</p>
            <h2 className="details-price">{formatCurrency(product.price)}</h2>
          </div>

          <p className="details-description">{product.description}</p>

          <div className="details-actions">
            <button
              onClick={() => addToCart(product)}
              className="cart-btn details-cart-btn"
            >
              <FiShoppingCart />
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="buy-now-btn"
            >
              <FiZap />
              Buy Now
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`wishlist-btn details-wishlist-btn ${isWishlisted ? 'active' : ''}`}
            >
              <FiHeart />
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
