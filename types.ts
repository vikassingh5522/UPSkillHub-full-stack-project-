export type Category =
  | "Development"
  | "Data Science"
  | "Design"
  | "Business"
  | "Marketing"
  | "Cloud"
  | "Cybersecurity"
  | "AI"
  | "Robotics"
  | "Future Tech";

export interface CourseLecture {
  title: string;
  duration?: string;
  videoId?: string;
  videoUrl?: string;
}

export interface CourseModule {
  title: string;
  items?: string[];
  lectures?: CourseLecture[];
}

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
  level: "Beginner" | "Intermediate" | "Advanced";
  description?: string;
  whatYouWillLearn?: string[];
  syllabus?: CourseModule[];
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
  role: "user" | "model";
  text: string;
}

// Authentication Types

export interface Organization {
  id: number;
  name: string;
  role: "member" | "admin" | "owner";
}

export interface AuthUser {
  id: number;
  email: string;
  name: string | null;
  organizationId?: number;
  organizations?: Organization[];
}

export interface SignUpRequest {
  email: string;
  password: string;
  name?: string;
  organizationName: string;
}

export interface SignInRequest {
  email: string;
  password: string;
  organizationName: string;
}

export interface SignUpResponse {
  success: boolean;
  token: string;
  user: {
    id: number;
    email: string;
    name: string | null;
  };
  organization: {
    id: number;
    name: string;
  };
}

export interface SignInResponse {
  success: boolean;
  token: string;
  user: {
    id: number;
    email: string;
    name: string | null;
    organizationId: number;
    organizations: Organization[];
  };
}

export interface ApiError {
  error: string;
  details?: {
    issues?: Array<{
      code: string;
      message: string;
      path: string[];
    }>;
  };
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (
    email: string,
    password: string,
    name?: string
  ) => Promise<{ success: boolean; error?: string }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}
