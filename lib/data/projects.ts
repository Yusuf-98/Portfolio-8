// --- Types ---
export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit?: 'contain';
}

export interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  highlights: string[];
  stack: string[];
  liveUrl: string;
  repoUrl: string;
  frameRatio: number;
  gallery: ProjectImage[];
}

// --- Projects ---
export const projects: Project[] = [
  {
    id: 1,
    title: 'Sociality',
    image: '/images/projects/sociality.webp',
    description:
      'Social media app with a feed, posts, comments, likes, saves, follows and profiles, built on a REST API.',
    highlights: [
      'Feed, post detail, comments, likes and saves',
      'Follow system with followers and following lists',
      'Create and edit posts and profiles with validated forms',
      'Unit tests with Vitest and Testing Library',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'TanStack Query',
      'Redux Toolkit',
      'Tailwind CSS',
    ],
    liveUrl: 'https://social-media-app-by-yusuf.vercel.app/',
    repoUrl: 'https://github.com/Yusuf-98/social-media-app-by-yusuf',
    frameRatio: 1.3,
    gallery: [
      {
        src: '/images/projects/gallery/sociality/feed.webp',
        width: 1400,
        height: 669,
        alt: 'Sociality home feed showing a photo post',
      },
      {
        src: '/images/projects/gallery/sociality/post-detail.webp',
        width: 1147,
        height: 863,
        alt: 'Sociality post detail with comments',
      },
      {
        src: '/images/projects/gallery/sociality/create-post.webp',
        width: 797,
        height: 843,
        alt: 'Sociality create post dialog',
      },
      {
        src: '/images/projects/gallery/sociality/profile.webp',
        width: 1031,
        height: 881,
        alt: 'Sociality profile page with photo gallery',
      },
      {
        src: '/images/projects/gallery/sociality/search.webp',
        width: 1029,
        height: 875,
        alt: 'Sociality user search',
      },
      {
        src: '/images/projects/gallery/sociality/login.webp',
        width: 1400,
        height: 656,
        alt: 'Sociality login page',
      },
    ],
  },
  {
    id: 2,
    title: 'Booky Library App',
    image: '/images/projects/library.webp',
    description:
      'Library web app for browsing, borrowing and reviewing books, with an admin area for books, users and loans.',
    highlights: [
      'Catalogue with category, author and debounced search filters',
      'Book details with stock, ratings and reviews',
      'Cart and checkout with configurable borrow duration',
      'Admin tools for books, users and loan returns',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'TanStack Query', 'Redux Toolkit'],
    liveUrl: 'https://library-web-by-yusuf.vercel.app/',
    repoUrl: 'https://github.com/Yusuf-98/Library-Web-App',
    frameRatio: 1.4,
    gallery: [
      {
        src: '/images/projects/gallery/library/home.webp',
        width: 1263,
        height: 825,
        fit: 'contain',
        alt: 'Booky home page with welcome banner and categories',
      },
      {
        src: '/images/projects/gallery/library/catalogue.webp',
        width: 1065,
        height: 881,
        alt: 'Booky book list with category and rating filters',
      },
      {
        src: '/images/projects/gallery/library/book-detail.webp',
        width: 1249,
        height: 873,
        alt: 'Booky book detail page',
      },
      {
        src: '/images/projects/gallery/library/checkout.webp',
        width: 1227,
        height: 871,
        alt: 'Booky checkout with borrow duration options',
      },
      {
        src: '/images/projects/gallery/library/my-loans.webp',
        width: 1221,
        height: 875,
        alt: 'Booky borrowed list with status filters',
      },
      {
        src: '/images/projects/gallery/library/admin-books.webp',
        width: 1241,
        height: 877,
        alt: 'Booky admin book management list',
      },
    ],
  },
  {
    id: 3,
    title: 'Foody Restaurant App',
    image: '/images/projects/resto.webp',
    description:
      'Restaurant ordering app: browse and filter restaurants, manage a cart, check out and track orders.',
    highlights: [
      'Restaurant browsing with filters and menu pages',
      'Cart, checkout and payment method selection',
      'Order history with status tracking',
      'Validated forms with React Hook Form and Zod',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'TanStack Query',
      'Zustand',
      'Tailwind CSS',
    ],
    liveUrl: 'https://resto-app-by-yusuf-ar.vercel.app/',
    repoUrl: 'https://github.com/Yusuf-98/Resto-App-by-Yusuf-AR',
    frameRatio: 1.6,
    gallery: [
      {
        src: '/images/projects/gallery/resto/hero.webp',
        width: 1400,
        height: 642,
        alt: 'Foody landing page with restaurant search',
      },
      {
        src: '/images/projects/gallery/resto/restaurants.webp',
        width: 1400,
        height: 636,
        alt: 'Foody restaurant list',
      },
      {
        src: '/images/projects/gallery/resto/restaurant-detail.webp',
        width: 543,
        height: 867,
        alt: 'Foody restaurant detail with menu',
      },
      {
        src: '/images/projects/gallery/resto/cart.webp',
        width: 1400,
        height: 779,
        fit: 'contain',
        alt: 'Foody shopping cart',
      },
      {
        src: '/images/projects/gallery/resto/checkout.webp',
        width: 1243,
        height: 869,
        fit: 'contain',
        alt: 'Foody checkout with payment methods',
      },
      {
        src: '/images/projects/gallery/resto/my-orders.webp',
        width: 1400,
        height: 866,
        alt: 'Foody order history with status filters',
      },
    ],
  },
  {
    id: 4,
    title: 'Movie Explorer',
    image: '/images/projects/movie.webp',
    description:
      'Movie discovery app on the TMDB API with trending titles, search, cast and trailers, and a persistent favorites list.',
    highlights: [
      'Trending and new-release rows with a featured hero',
      'Search, movie details, cast and trailers',
      'Favorites list that persists across sessions',
      'Server state with TanStack Query, client state with Zustand',
    ],
    stack: ['React', 'TypeScript', 'TanStack Query', 'Zustand', 'Tailwind CSS'],
    liveUrl: 'https://movie-app-by-yusuf-ar.vercel.app/',
    repoUrl: 'https://github.com/Yusuf-98/Movie-App',
    frameRatio: 2.15,
    gallery: [
      {
        src: '/images/projects/gallery/movie/home.webp',
        width: 1280,
        height: 600,
        alt: 'Movie Explorer home hero',
      },
      {
        src: '/images/projects/gallery/movie/trending.webp',
        width: 1280,
        height: 592,
        alt: 'Movie Explorer trending row',
      },
      {
        src: '/images/projects/gallery/movie/detail.webp',
        width: 1280,
        height: 596,
        alt: 'Movie Explorer movie detail',
      },
      {
        src: '/images/projects/gallery/movie/search.webp',
        width: 1280,
        height: 590,
        alt: 'Movie Explorer search results',
      },
      {
        src: '/images/projects/gallery/movie/favorites.webp',
        width: 1280,
        height: 591,
        alt: 'Movie Explorer favorites list',
      },
      {
        src: '/images/projects/gallery/movie/trailer.webp',
        width: 1280,
        height: 591,
        alt: 'Movie Explorer trailer modal',
      },
    ],
  },
  {
    id: 5,
    title: 'Company Profile',
    image: '/images/projects/company-profile.webp',
    description:
      'Responsive, animated company-profile landing page with a light and dark theme toggle.',
    highlights: [
      'Hero, About, Service, Projects, Testimonials, FAQ and Footer',
      'Light and dark theme toggle',
      'Unit tests with Vitest and Testing Library',
      'GitHub Actions CI with ESLint',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Vitest'],
    liveUrl: 'https://company-profile-by-yusuf-ar.vercel.app/',
    repoUrl: 'https://github.com/Yusuf-98/Company-Profile-by-Yusuf-AR',
    frameRatio: 2.2,
    gallery: [
      {
        src: '/images/projects/gallery/company-profile/hero.webp',
        width: 1280,
        height: 581,
        alt: 'Company profile hero in dark theme',
      },
      {
        src: '/images/projects/gallery/company-profile/light-theme.webp',
        width: 1280,
        height: 581,
        alt: 'Company profile hero in light theme',
      },
      {
        src: '/images/projects/gallery/company-profile/stats.webp',
        width: 1280,
        height: 580,
        alt: 'Company profile statistics section',
      },
      {
        src: '/images/projects/gallery/company-profile/testimonials.webp',
        width: 1280,
        height: 586,
        alt: 'Company profile testimonials carousel',
      },
      {
        src: '/images/projects/gallery/company-profile/faq.webp',
        width: 1280,
        height: 586,
        alt: 'Company profile FAQ section',
      },
    ],
  },
  {
    id: 6,
    title: 'To-Do List',
    image: '/images/projects/todo-list.webp',
    description:
      'To-do app in vanilla JavaScript with task priorities, progress tracking and localStorage persistence.',
    highlights: [
      'No framework and no build step',
      'Task priorities with a live progress ring',
      'Add, edit, complete and delete tasks',
      'localStorage persistence with an initial Fetch API load',
    ],
    stack: [
      'HTML',
      'CSS',
      'JavaScript',
      'DOM API',
      'Fetch API',
      'LocalStorage',
    ],
    liveUrl: 'https://todo-list-by-yusuf-ar.vercel.app/',
    repoUrl: 'https://github.com/Yusuf-98/Todo-List-by-Yusuf-AR',
    frameRatio: 1.6,
    gallery: [
      {
        src: '/images/projects/gallery/todo-list/progress.webp',
        width: 607,
        height: 879,
        alt: 'To-do list with completed tasks and progress bar',
      },
      {
        src: '/images/projects/gallery/todo-list/add-task.webp',
        width: 653,
        height: 857,
        alt: 'To-do list adding a task with a priority dropdown',
      },
      {
        src: '/images/projects/gallery/todo-list/edit-task.webp',
        width: 647,
        height: 839,
        alt: 'To-do list editing a task inline',
      },
      {
        src: '/images/projects/gallery/todo-list/empty-state.webp',
        width: 659,
        height: 871,
        alt: 'To-do list empty state',
      },
    ],
  },
];
