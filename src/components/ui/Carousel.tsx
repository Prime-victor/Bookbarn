import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Book } from '../../types';
import BookCard from './BookCard';

interface CarouselProps {
  books: Book[];
  autoPlay?: boolean;
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  books,
  autoPlay = true,
  interval = 5000
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextSlide = () => {
    setActiveIndex((current) => (current === books.length - 1 ? 0 : current + 1));
  };
  
  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? books.length - 1 : current - 1));
  };
  
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, interval]);
  
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="relative h-full">
        {books.map((book, index) => (
          <div
            key={book.id}
            className={`transition-opacity duration-500 absolute w-full ${
              index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <BookCard book={book} featured={true} />
          </div>
        ))}
      </div>
      
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors"
        onClick={prevSlide}
        aria-label="Previous book"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800 dark:text-white" />
      </button>
      
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors"
        onClick={nextSlide}
        aria-label="Next book"
      >
        <ChevronRight className="h-6 w-6 text-gray-800 dark:text-white" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {books.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === activeIndex
                ? 'bg-blue-600'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;