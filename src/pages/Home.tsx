import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/ui/Carousel';
import BookCard from '../components/ui/BookCard';
import { books } from '../data/books';
import { Book } from 'lucide-react';

const Home: React.FC = () => {
  const featuredBooks = books.filter(book => book.isBestseller).slice(0, 3);
  const newArrivals = books.filter(book => book.isNewArrival).slice(0, 4);
  const bestsellers = books.filter(book => book.isBestseller).slice(0, 4);
  
  // Get unique categories
  const categories = [...new Set(books.map(book => book.category))];
  
  return (
    <div className="pt-16 bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="relative bg-blue-600 rounded-xl p-8 sm:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-90"></div>
          <div className="relative z-10 max-w-lg">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Discover Your Next Favorite Book
            </h1>
            <p className="mt-4 text-blue-100 text-lg">
              From bestsellers to hidden gems, find the perfect book for every moment.
            </p>
            <div className="mt-8">
              <Link
                to="/shop"
                className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300"
              >
                Browse Books
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block absolute right-0 bottom-0 transform translate-y-8 translate-x-8">
            <Book className="h-64 w-64 text-blue-300 opacity-30" />
          </div>
        </div>
      </section>
      
      {/* Featured Books Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Featured Books
        </h2>
        <Carousel books={featuredBooks} />
      </section>
      
      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            New Arrivals
          </h2>
          <Link
            to="/shop?new=true"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
      
      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Bestsellers
          </h2>
          <Link
            to="/shop?bestseller=true"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
      
      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map(category => (
            <Link
              key={category}
              to={`/shop?category=${category}`}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{category}</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {books.filter(book => book.category === category).length} Books
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;