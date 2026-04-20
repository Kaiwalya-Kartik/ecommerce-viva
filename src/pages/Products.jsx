import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import CategoryTabs from '../components/CategoryTabs';
import ProductGrid from '../components/ProductGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import useProducts from '../hooks/useProducts';

export default function Products() {
  const {
    products,
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
  } = useProducts();

  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Products</h2>

      <SearchBar search={search} setSearch={setSearch} />

      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Filters
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {loading ? (
        <LoadingSkeleton count={6} />
      ) : products.length ? (
        <ProductGrid products={products} />
      ) : (
        <p>No products found.</p>
      )}
    </section>
  );
}