import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchProductByIdApi } from '../services/api';
import useCart from '../hooks/useCart';
import { formatCurrency } from '../utils/helpers';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart, toggleWishlist } = useCart();

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

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="details-page">
      <div className="details-image-box">
        <Swiper spaceBetween={12} slidesPerView={1}>
          <SwiperSlide>
            <img src={product.image} alt={product.title} className="details-image" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div>
        <h2>{product.title}</h2>
        <p className="category-text">{product.category}</p>
        <p>{product.description}</p>
        <p className="rating-text">Rating: {product.rating?.rate}</p>
        <h3>{formatCurrency(product.price)}</h3>
        <div className="details-actions">
          <button onClick={() => addToCart(product)} className="primary-btn">Add to Cart</button>
          <button onClick={() => toggleWishlist(product)} className="secondary-btn">Add to Wishlist</button>
        </div>
      </div>
    </section>
  );
}
