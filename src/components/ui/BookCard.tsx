import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../types';
import Rating from './Rating';
import Button from './Button';
import { useCart } from '../../context/CartContext';
import { ShoppingBag } from 'lucide-react';

interface BookCardProps {
  book: Book;
  featured?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, featured = false }) => {
  const { addToCart } = useCart();
  
  return (
    <div className={`group ${featured ? 'flex flex-col md:flex-row gap-6' : 'flex flex-col'} bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300`}>
      <div className={`${featured ? 'w-full md:w-1/3' : 'w-full'} relative overflow-hidden h-60`}>
        <img 
          src={book.cover} 
          alt={book.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        {book.isNewArrival && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            New
          </div>
        )}
        {book.isBestseller && (
          <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
            Bestseller
          </div>
        )}
      </div>
      
      <div className={`${featured ? 'w-full md:w-2/3' : 'w-full'} p-4 flex flex-col`}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{book.category}</p>
            <Link to={`/book/${book.id}`}>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {book.title}
              </h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-300">{book.author}</p>
          </div>
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">${book.price.toFixed(2)}</p>
        </div>
        
        <div className="mt-2">
          <Rating value={book.rating} size="sm" />
        </div>
        
        {featured && (
          <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-3">{book.description}</p>
        )}
        
        <div className="mt-auto pt-4 flex justify-between items-center">
          <Link to={`/book/${book.id}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View Details
          </Link>
          
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => addToCart(book)}
          >
            <ShoppingBag className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;