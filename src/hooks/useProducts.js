import { useEffect, useState } from 'react';
import { fetchCategoriesApi, fetchProductsApi } from '../services/api';
import useDebounce from './useDebounce';
import { getPriceBucket } from '../utils/helpers';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchProductsApi(),
          fetchCategoriesApi(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = [...products]
    .filter((product) =>
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .filter((product) =>
      selectedCategory === 'all' ? true : product.category === selectedCategory
    )
    .filter((product) =>
      priceRange === 'all' ? true : getPriceBucket(product.price) === priceRange
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating?.rate - a.rating?.rate;
      if (sortBy === 'newest') return b.id - a.id;
      return 0;
    });

  return {
    products: filteredProducts,
    categories,
    loading,
    error,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
  };
}
