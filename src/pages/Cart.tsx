import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/ui/CartItem';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { ShoppingBag, CreditCard, ArrowRight } from 'lucide-react';

const Cart: React.FC = () => {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  
  // Calculate shipping cost
  const shippingCost = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08; // Assume 8% tax
  const finalTotal = totalPrice + shippingCost + tax;
  
  if (cartItems.length === 0) {
    return (
      <div className="pt-20 flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Looks like you haven't added any books to your cart yet.</p>
          <Link to="/shop">
            <Button variant="primary" size="lg">
              Browse Books
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Cart</h1>
        
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flow-root">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cartItems.map(item => (
                    <CartItem key={item.book.id} item={item} />
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
                
                <Link to="/shop">
                  <Button variant="outline">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Summary</h2>
              
              <div className="flow-root">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="py-4">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Subtotal ({totalItems} items)</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">${totalPrice.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex justify-between mt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Shipping</p>
                      {shippingCost === 0 ? (
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">Free</p>
                      ) : (
                        <p className="text-sm font-medium text-gray-900 dark:text-white">${shippingCost.toFixed(2)}</p>
                      )}
                    </div>
                    
                    <div className="flex justify-between mt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tax (estimated)</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="py-4">
                    <div className="flex justify-between">
                      <p className="text-base font-semibold text-gray-900 dark:text-white">Total</p>
                      <p className="text-base font-semibold text-gray-900 dark:text-white">${finalTotal.toFixed(2)}</p>
                    </div>
                    {shippingCost === 0 && (
                      <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                        You qualified for free shipping!
                      </p>
                    )}
                    {shippingCost > 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Add ${(50 - totalPrice).toFixed(2)} more to qualify for free shipping.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => console.log('Checkout clicked')}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to Checkout
              </Button>
              
              <div className="mt-4 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                <Link to="/shop" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                  <span>Continue Shopping</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;