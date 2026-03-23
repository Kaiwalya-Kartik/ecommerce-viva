import { createContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

export const StoreContext = createContext();

const getInitialState = (key) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
};

export function StoreProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => getInitialState('cartItems'));
  const [wishlistItems, setWishlistItems] = useState(() => getInitialState('wishlistItems'));

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success('Added to cart');
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.info('Removed from cart');
  };

  const updateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const newQuantity = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQuantity };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleWishlist = (product) => {
    const exists = wishlistItems.some((item) => item.id === product.id);
    if (exists) {
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
      toast.info('Removed from wishlist');
    } else {
      setWishlistItems((prev) => [...prev, product]);
      toast.success('Added to wishlist');
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = useMemo(
    () => ({
      cartItems,
      wishlistItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      clearCart,
    }),
    [cartItems, wishlistItems]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
