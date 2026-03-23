export interface Program {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'Web' | 'Mobile' | 'Desktop' | 'AI';
  image: string;
  tags: string[];
}

export interface Tutorial {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: 'Coding' | 'Hardware' | 'Networking';
  readTime: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
