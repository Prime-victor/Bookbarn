import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { books } from '../data/books';
import Rating from '../components/ui/Rating';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Heart, Share2, MessageCircle, ArrowLeft } from 'lucide-react';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  
  const book = books.find(book => book.id === id);
  
  if (!book) {
    return (
      <div className="pt-20 flex flex-col items-center justify-center h-[70vh] bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Book not found</h2>
        <Button variant="primary" onClick={() => navigate('/shop')}>
          Return to Shop
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(book);
  };
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/book/${id}` } });
      return;
    }
    
    // In a real app, we would send this to the server
    console.log('Review submitted:', { rating: reviewRating, content: reviewContent });
    setReviewContent('');
    setReviewRating(5);
  };
  
  return (
    <div className="pt-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
        
        {/* Book details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Book cover */}
            <div className="md:w-1/3 p-6">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
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
            </div>
            
            {/* Book info */}
            <div className="md:w-2/3 p-6">
              <div className="mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">{book.category}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{book.title}</h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">by {book.author}</p>
              
              <div className="flex items-center mb-4">
                <Rating value={book.rating} size="md" />
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  ({book.reviews.length} reviews)
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Published on {new Date(book.publishDate).toLocaleDateString()}
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {book.description}
              </p>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">${book.price.toFixed(2)}</span>
                  {book.stock > 0 ? (
                    <span className="ml-3 text-sm text-green-600 dark:text-green-400">
                      In Stock ({book.stock} available)
                    </span>
                  ) : (
                    <span className="ml-3 text-sm text-red-600 dark:text-red-400">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={book.stock <= 0}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5 mr-2" />
                  Save for Later
                </Button>
                
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <MessageCircle className="h-6 w-6 mr-2" />
            Customer Reviews
          </h2>
          
          {/* Review form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Write a Review</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Rating
                </label>
                <Rating
                  value={reviewRating}
                  size="lg"
                  interactive={true}
                  onChange={setReviewRating}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="review" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Review
                </label>
                <textarea
                  id="review"
                  rows={4}
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  placeholder="Share your thoughts about this book..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                ></textarea>
              </div>
              
              <Button type="submit" variant="primary">
                Submit Review
              </Button>
            </form>
          </div>
          
          {/* Reviews list */}
          {book.reviews.length > 0 ? (
            <div className="space-y-6">
              {book.reviews.map(review => (
                <div key={review.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{review.userName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Rating value={review.rating} size="sm" />
                  </div>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to review this book!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;