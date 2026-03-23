# E-Commerce Product Explorer & Cart Management App

A viva-friendly React project based on the provided PRD.

## Run in VS Code

```bash
npm install
npm run dev
```

## Main Features
- Product listing
- Search with debounce
- Category tabs + filter dropdown
- Price filter
- Sort by price, rating, newest
- Product details page
- Wishlist
- Cart with quantity controls
- Checkout summary + validated form
- Routing with React Router
- Context API for global cart/wishlist state
- LocalStorage persistence
- Loading and error handling

## Viva Notes
- `useEffect` is used for API calls.
- `useState` stores filters and fetched products.
- `Context API` stores cart and wishlist globally.
- `useDebounce` improves search performance.
- `react-hook-form + yup` validate checkout form.
- `Swiper` is used on the product details page.
- `framer-motion` is used for small animation.
- `react-toastify` shows feedback messages.
