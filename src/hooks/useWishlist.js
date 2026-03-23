import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

export default function useWishlist() {
  return useContext(StoreContext);
}
