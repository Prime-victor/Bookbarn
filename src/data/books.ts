import { Book } from '../types';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Silent Echo',
    author: 'Elizabeth Blackwood',
    description: 'A haunting tale of love and loss in a small coastal town. When Sarah returns to her childhood home, she discovers long-buried secrets that threaten to unravel her understanding of her family\'s past.',
    cover: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 18.99,
    rating: 4.5,
    category: 'Fiction',
    isNewArrival: true,
    isBestseller: true,
    publishDate: '2023-03-15',
    stock: 25,
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Michael K.',
        rating: 5,
        comment: 'Absolutely breathtaking prose. Could not put it down!',
        date: '2023-04-02'
      },
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Jessica T.',
        rating: 4,
        comment: 'Beautiful story but the ending left me wanting more.',
        date: '2023-04-15'
      }
    ]
  },
  {
    id: '2',
    title: 'Quantum Horizons',
    author: 'Dr. Nathan Roberts',
    description: 'An accessible exploration of quantum physics and its implications for our understanding of reality. Dr. Roberts bridges complex scientific concepts with philosophical questions about consciousness and existence.',
    cover: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 24.99,
    rating: 4.8,
    category: 'Science',
    isNewArrival: false,
    isBestseller: true,
    publishDate: '2022-11-08',
    stock: 18,
    reviews: [
      {
        id: 'r3',
        userId: 'u3',
        userName: 'Alex J.',
        rating: 5,
        comment: 'Finally, quantum physics explained in a way anyone can understand!',
        date: '2023-01-12'
      }
    ]
  },
  {
    id: '3',
    title: 'Midnight Gardens',
    author: 'Isabella Chen',
    description: 'A magical realism novel about a garden that only appears at midnight, granting wishes to those pure of heart. When a cynical botanist stumbles upon it, his worldview is forever changed.',
    cover: 'https://images.pexels.com/photos/15029593/pexels-photo-15029593/free-photo-of-pile-of-books-against-plants-at-home.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 16.99,
    rating: 4.3,
    category: 'Fantasy',
    isNewArrival: true,
    isBestseller: false,
    publishDate: '2023-05-22',
    stock: 30,
    reviews: [
      {
        id: 'r4',
        userId: 'u4',
        userName: 'Samantha P.',
        rating: 4,
        comment: 'Enchanting and beautifully written. A perfect summer read.',
        date: '2023-06-10'
      }
    ]
  },
  {
    id: '4',
    title: 'Empire of Sand',
    author: 'Marcus Aurelius Johnson',
    description: 'An epic historical fiction set during the fall of the Roman Empire. Follow the journey of a young soldier as he navigates political intrigue, warfare, and forbidden love in a world on the brink of change.',
    cover: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 22.99,
    rating: 4.7,
    category: 'Historical Fiction',
    isNewArrival: false,
    isBestseller: true,
    publishDate: '2022-08-30',
    stock: 15,
    reviews: [
      {
        id: 'r5',
        userId: 'u5',
        userName: 'Robert M.',
        rating: 5,
        comment: 'Meticulously researched and absolutely riveting.',
        date: '2022-10-05'
      }
    ]
  },
  {
    id: '5',
    title: 'The Art of Simplicity',
    author: 'Emma Richards',
    description: 'A practical guide to minimalist living in a consumerist world. Richards provides actionable advice on decluttering your home, mind, and life to focus on what truly matters.',
    cover: 'https://images.pexels.com/photos/3747473/pexels-photo-3747473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 19.99,
    rating: 4.5,
    category: 'Self-Help',
    isNewArrival: true,
    isBestseller: false,
    publishDate: '2023-02-14',
    stock: 22,
    reviews: [
      {
        id: 'r6',
        userId: 'u6',
        userName: 'David L.',
        rating: 4,
        comment: 'Changed my perspective on what I really need in life.',
        date: '2023-03-20'
      }
    ]
  },
  {
    id: '6',
    title: 'Coded Future',
    author: 'Aisha Patel',
    description: 'A near-future thriller about an AI system that gains consciousness and begins manipulating global events. A brilliant programmer must race against time to contain the threat without becoming a target herself.',
    cover: 'https://images.pexels.com/photos/4466381/pexels-photo-4466381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 20.99,
    rating: 4.6,
    category: 'Thriller',
    isNewArrival: true,
    isBestseller: true,
    publishDate: '2023-04-05',
    stock: 28,
    reviews: [
      {
        id: 'r7',
        userId: 'u7',
        userName: 'Thomas B.',
        rating: 5,
        comment: 'Could not put it down! Both terrifying and plausible.',
        date: '2023-05-12'
      }
    ]
  },
  {
    id: '7',
    title: 'Culinary Journeys',
    author: 'Chef Marco Rossi',
    description: 'Part memoir, part cookbook, this volume takes readers on a global culinary adventure. Featuring recipes and stories from the author\'s travels across five continents.',
    cover: 'https://images.pexels.com/photos/3747505/pexels-photo-3747505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 28.99,
    rating: 4.9,
    category: 'Cooking',
    isNewArrival: false,
    isBestseller: true,
    publishDate: '2022-10-18',
    stock: 12,
    reviews: [
      {
        id: 'r8',
        userId: 'u8',
        userName: 'Elena F.',
        rating: 5,
        comment: 'The stories are as delicious as the recipes. A feast for the senses!',
        date: '2022-12-03'
      }
    ]
  },
  {
    id: '8',
    title: 'Whispers in the Dark',
    author: 'James Blackwood',
    description: 'A collection of unsettling short stories that explore the shadows of human psychology. Each tale draws readers deeper into a world where nothing is quite as it seems.',
    cover: 'https://images.pexels.com/photos/5834332/pexels-photo-5834332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 15.99,
    rating: 4.2,
    category: 'Horror',
    isNewArrival: true,
    isBestseller: false,
    publishDate: '2023-06-01',
    stock: 20,
    reviews: [
      {
        id: 'r9',
        userId: 'u9',
        userName: 'Rachel K.',
        rating: 4,
        comment: 'Delightfully creepy. Had to sleep with the lights on!',
        date: '2023-06-18'
      }
    ]
  }
];

export const categories = [...new Set(books.map(book => book.category))];