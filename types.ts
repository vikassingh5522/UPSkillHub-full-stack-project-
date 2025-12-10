export type Category = 'Development' | 'Data Science' | 'Design' | 'Business' | 'Marketing' | 'Cloud' | 'Cybersecurity' | 'AI' | 'Robotics' | 'Future Tech';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: number; // 0 for free
  category: Category;
  image: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description?: string;
  whatYouWillLearn?: string[];
  syllabus?: { title: string; items: string[] }[];
  lastUpdated?: string;
  language?: string;
  prerequisites?: string[];
  previewVideoId?: string;
}

export interface User {
  name: string;
  email: string;
  enrolledCourses: string[];
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: string;
  link: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}