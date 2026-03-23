import ProductGrid from '../components/ProductGrid';
import useWishlist from '../hooks/useWishlist';

export default function Wishlist() {
  const { wishlistItems } = useWishlist();

  return (
    <section>
      <h2>Wishlist</h2>
      {wishlistItems.length ? <ProductGrid products={wishlistItems} /> : <p>Your wishlist is empty.</p>}
    </section>
  );
}
