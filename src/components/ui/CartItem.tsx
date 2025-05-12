import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { book, quantity } = item;
  
  const decreaseQuantity = () => {
    updateQuantity(book.id, quantity - 1);
  };
  
  const increaseQuantity = () => {
    updateQuantity(book.id, quantity + 1);
  };
  
  return (
    <div className="flex items-center py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={book.cover}
          alt={book.title}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between">
            <Link to={`/book/${book.id}`}>
              <h3 className="text-base font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                {book.title}
              </h3>
            </Link>
            <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
              ${(book.price * quantity).toFixed(2)}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{book.author}</p>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
            <button
              type="button"
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={decreaseQuantity}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-2 text-gray-700 dark:text-gray-300">{quantity}</span>
            <button
              type="button"
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={increaseQuantity}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          <button
            type="button"
            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
            onClick={() => removeFromCart(book.id)}
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;