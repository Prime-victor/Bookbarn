export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  price: number;
  rating: number;
  category: string;
  isNewArrival: boolean;
  isBestseller: boolean;
  publishDate: string;
  stock: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  date: string;
  address: string;
}