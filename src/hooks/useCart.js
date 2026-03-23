import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

export default function useCart() {
  return useContext(StoreContext);
}
