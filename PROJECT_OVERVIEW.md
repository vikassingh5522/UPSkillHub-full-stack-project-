# UpskillHub - Project Overview

## What is UpskillHub?

UpskillHub is a modern, full-stack online learning platform built with React and TypeScript. It's a course marketplace and learning management system that connects students with high-quality educational content across multiple technology and professional development categories.

## Primary Purpose

UpskillHub serves as a **comprehensive online education platform** where:
- Students can browse, discover, and enroll in courses across diverse skill categories
- Instructors can offer courses with detailed curricula and learning outcomes
- Users receive personalized AI-powered learning recommendations through an integrated AI advisor
- The platform handles user authentication, course enrollment, and payment processing

## Key Features

### 1. **Course Discovery & Browsing**
- Browse 22+ curated courses across 10 categories:
  - Development (Web, Mobile, Game Dev)
  - Data Science & Machine Learning
  - Cloud & DevOps (AWS, GCP, Kubernetes)
  - AI & Generative AI
  - Cybersecurity & Ethical Hacking
  - Design (UI/UX)
  - Business & Project Management
  - Robotics & IoT
  - Marketing & Digital Strategy
  - Future Tech (Quantum Computing, Web3, Blockchain)

### 2. **Course Details**
Each course includes:
- Course title, instructor name, and rating
- Student enrollment count
- Price (free or paid)
- Duration and difficulty level (Beginner/Intermediate/Advanced)
- Detailed description
- Learning outcomes ("What You Will Learn")
- Structured syllabus with modules and topics
- Prerequisites
- Last updated date
- Language information

### 3. **User Authentication**
- Login/signup modal for user registration
- Session management (login/logout)
- Protected enrollment flow (requires authentication)

### 4. **Course Enrollment & Payment**
- Secure enrollment process
- Payment modal for paid courses
- Post-enrollment confirmation
- Enrollment tracking for logged-in users

### 5. **AI-Powered Learning Advisor**
- Floating AI advisor component powered by Google Gemini API
- Provides personalized learning recommendations
- Answers questions about courses and learning paths
- Helps users choose appropriate courses based on their goals

### 6. **Multi-Page Navigation**
- **Home**: Featured courses and platform overview
- **Skills**: Browse all courses by category
- **Course Detail**: In-depth course information
- **Services**: Platform services and offerings
- **About**: Company/platform information
- **Resources**: Learning resources and guides
- **Blog**: Educational articles and insights
- **Contact**: User support and inquiries

### 7. **Responsive Design**
- Mobile-first responsive layout
- Dark mode support
- Tailwind CSS styling
- Smooth transitions and animations

## Technology Stack

### Frontend
- **React 19.2.1** - UI framework
- **TypeScript** - Type-safe development
- **React Router DOM 7.10.1** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

### Backend/APIs
- **Google Gemini API** (@google/genai) - AI-powered recommendations and chat
- **Vite** - Build tool and dev server

### Development Tools
- **Vite 6.2.0** - Fast build and dev server
- **TypeScript 5.8.2** - Type checking

## Project Structure

```
upskillhub/
├── components/              # Reusable React components
│   ├── Navbar.tsx          # Navigation header
│   ├── Footer.tsx          # Footer section
│   ├── CourseCard.tsx      # Course display card
│   ├── AuthModal.tsx       # Login/signup modal
│   ├── PaymentModal.tsx    # Payment processing modal
│   └── AiAdvisor.tsx       # AI chatbot component
├── pages/                   # Page components
│   ├── Home.tsx            # Landing page
│   ├── Skills.tsx          # Course catalog
│   ├── CourseDetail.tsx    # Individual course page
│   ├── Services.tsx        # Services page
│   ├── About.tsx           # About page
│   ├── Resources.tsx       # Resources page
│   ├── Blog.tsx            # Blog listing
│   └── Contact.tsx         # Contact page
├── App.tsx                 # Main app component with routing
├── types.ts                # TypeScript interfaces
├── constants.ts            # Course data and constants
├── index.tsx               # React entry point
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

## Data Models

### Course
```typescript
interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
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
}
```

### User
```typescript
interface User {
  name: string;
  email: string;
  enrolledCourses: string[];
}
```

### Chat Message (for AI Advisor)
```typescript
interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
```

## User Flows

### 1. Course Discovery Flow
1. User lands on Home page
2. Browses featured courses or navigates to Skills page
3. Views course cards with key information
4. Clicks on course to see detailed information

### 2. Enrollment Flow
1. User clicks "Enroll" button on a course
2. If not logged in → Auth Modal appears
3. User logs in/signs up
4. If course is paid → Payment Modal appears
5. User completes payment
6. Enrollment confirmed, course added to user's enrolled courses

### 3. AI Advisor Flow
1. User clicks AI Advisor floating button
2. Chat interface opens
3. User asks questions about courses or learning paths
4. AI provides personalized recommendations using Gemini API
5. User can continue conversation or close advisor

## Key Integrations

### Google Gemini API
- Powers the AI Advisor chatbot
- Provides intelligent course recommendations
- Answers user questions about learning paths
- Requires `GEMINI_API_KEY` environment variable

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Configuration
1. Create `.env.local` file in project root
2. Add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

### Running Locally
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Building for Production
```bash
npm run build
```

## Target Users

1. **Students & Learners**
   - Career changers looking to upskill
   - Professionals seeking certifications
   - Hobbyists interested in new technologies

2. **Career Professionals**
   - Software developers
   - Data scientists
   - Cloud architects
   - Security professionals
   - Project managers

3. **Beginners**
   - No prior experience needed for many courses
   - Clear progression from Beginner to Advanced levels

## Business Model

- **Free Courses**: Attract users and build community
- **Paid Courses**: Generate revenue ($49.99 - $199.99 price range)
- **Premium Content**: Advanced certifications and specialized training

## Future Enhancement Opportunities

1. User dashboard with progress tracking
2. Course completion certificates
3. Discussion forums and peer learning
4. Live instructor sessions
5. Personalized learning paths
6. Course reviews and ratings from students
7. Instructor dashboard for course management
8. Advanced search and filtering
9. Wishlist/bookmarking courses
10. Social sharing and referral programs

## Deployment

The app is built with Vite and can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Google Cloud Platform
- Any static hosting service

## Support & Contact

Users can reach out through:
- Contact page form
- AI Advisor for quick questions
- Email support (to be configured)

---

**Project Name**: UpskillHub  
**Version**: 0.0.0  
**Type**: Educational Platform / Course Marketplace  
**Status**: Active Development
