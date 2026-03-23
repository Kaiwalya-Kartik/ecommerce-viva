export default function CategoryTabs({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="tabs">
      <button
        className={selectedCategory === 'all' ? 'tab active-tab' : 'tab'}
        onClick={() => setSelectedCategory('all')}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? 'tab active-tab' : 'tab'}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
