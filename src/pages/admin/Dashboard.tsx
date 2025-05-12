import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import { Book as Books, ShoppingBag, Users, Plus, BarChart, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="pt-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
              <Books className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Books</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">86</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
              <ShoppingBag className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Orders</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">24</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Users</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">162</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">$4,256</p>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link to="/admin/books">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Manage Books</h3>
                <Books className="h-5 w-5 text-gray-400" />
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Add, edit, or remove books from your inventory
              </p>
            </div>
          </Link>
          
          <Link to="/admin/orders">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Manage Orders</h3>
                <ShoppingBag className="h-5 w-5 text-gray-400" />
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                View and update order status and details
              </p>
            </div>
          </Link>
          
          <Link to="/admin/users">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Manage Users</h3>
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                View and manage user accounts and permissions
              </p>
            </div>
          </Link>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">New order received</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Order #12345 - $89.97</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">10 minutes ago</span>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">New user registered</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">sarah.johnson@example.com</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</span>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Book out of stock</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Empire of Sand - Marcus A. Johnson</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">3 hours ago</span>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Order status updated</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Order #12342 - Shipped</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">5 hours ago</span>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 text-center">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View All Activity
            </button>
          </div>
        </div>
        
        {/* Add New Book Button */}
        <div className="flex justify-center">
          <Link to="/admin/books/new">
            <Button variant="primary" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Add New Book
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;