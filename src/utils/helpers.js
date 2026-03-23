export const getPriceBucket = (price) => {
  if (price <= 100) return '0-100';
  if (price <= 500) return '100-500';
  if (price <= 1000) return '500-1000';
  return '1000+';
};

export const calculateCartTotals = (cartItems) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;
  return { subtotal, tax, total };
};

export const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
