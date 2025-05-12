import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookCard from '../components/ui/BookCard';
import { books, categories } from '../data/books';
import { Book } from '../types';
import { Filter, X, ChevronDown } from 'lucide-react';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get filter values from URL
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const isNewArrival = searchParams.get('new') === 'true';
  const isBestseller = searchParams.get('bestseller') === 'true';
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 1000;
  const sortBy = searchParams.get('sort') || 'default';
  
  // Filter books based on URL parameters
  useEffect(() => {
    let results = [...books];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        book => 
          book.title.toLowerCase().includes(query) || 
          book.author.toLowerCase().includes(query) ||
          book.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (categoryFilter) {
      results = results.filter(book => book.category === categoryFilter);
    }
    
    // Filter by new arrivals
    if (isNewArrival) {
      results = results.filter(book => book.isNewArrival);
    }
    
    // Filter by bestsellers
    if (isBestseller) {
      results = results.filter(book => book.isBestseller);
    }
    
    // Filter by price range
    results = results.filter(book => book.price >= minPrice && book.price <= maxPrice);
    
    // Sort results
    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        results.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating-desc':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting (newest first)
        results.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    }
    
    setFilteredBooks(results);
  }, [searchQuery, categoryFilter, isNewArrival, isBestseller, minPrice, maxPrice, sortBy]);
  
  // Update URL when filters change
  const updateFilters = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    
    setSearchParams(newParams);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchParams({});
  };
  
  return (
    <div className="pt-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {categoryFilter || searchQuery 
                ? `${categoryFilter || 'Search results for'} ${searchQuery ? `"${searchQuery}"` : ''}`
                : isNewArrival
                  ? 'New Arrivals'
                  : isBestseller
                    ? 'Bestsellers'
                    : 'All Books'}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
            </p>
          </div>
          
          <button 
            className="mt-4 sm:mt-0 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 sm:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-1" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
                <button 
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
              </div>
              
              {/* Category filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        type="checkbox"
                        checked={categoryFilter === category}
                        onChange={() => updateFilters('category', categoryFilter === category ? null : category)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700 dark:text-gray-200">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price range filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Price Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="min-price" className="sr-only">Min Price</label>
                    <input
                      type="number"
                      id="min-price"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => updateFilters('minPrice', e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="sr-only">Max Price</label>
                    <input
                      type="number"
                      id="max-price"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => updateFilters('maxPrice', e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
              
              {/* Book type filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Book Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="new-arrivals"
                      type="checkbox"
                      checked={isNewArrival}
                      onChange={() => updateFilters('new', isNewArrival ? null : 'true')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="new-arrivals" className="ml-2 text-sm text-gray-700 dark:text-gray-200">
                      New Arrivals
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="bestsellers"
                      type="checkbox"
                      checked={isBestseller}
                      onChange={() => updateFilters('bestseller', isBestseller ? null : 'true')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="bestsellers" className="ml-2 text-sm text-gray-700 dark:text-gray-200">
                      Bestsellers
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {/* Sort dropdown */}
            <div className="flex justify-end mb-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => updateFilters('sort', e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="default">Latest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="rating-desc">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            {/* Applied filters */}
            {(searchQuery || categoryFilter || isNewArrival || isBestseller || minPrice > 0 || maxPrice < 1000) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {searchQuery && (
                  <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-sm">
                    <span>Search: {searchQuery}</span>
                    <button 
                      onClick={() => updateFilters('search', null)}
                      className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {categoryFilter && (
                  <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-sm">
                    <span>Category: {categoryFilter}</span>
                    <button 
                      onClick={() => updateFilters('category', null)}
                      className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {isNewArrival && (
                  <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-sm">
                    <span>New Arrivals</span>
                    <button 
                      onClick={() => updateFilters('new', null)}
                      className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {isBestseller && (
                  <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-sm">
                    <span>Bestsellers</span>
                    <button 
                      onClick={() => updateFilters('bestseller', null)}
                      className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {(minPrice > 0 || maxPrice < 1000) && (
                  <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-sm">
                    <span>Price: ${minPrice} - ${maxPrice}</span>
                    <button 
                      onClick={() => {
                        updateFilters('minPrice', '0');
                        updateFilters('maxPrice', '1000');
                      }}
                      className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Book grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-400">No books found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;