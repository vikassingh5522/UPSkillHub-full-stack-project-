import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Skills } from './pages/Skills';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Resources } from './pages/Resources';
import { Contact } from './pages/Contact';
import { CourseDetail } from './pages/CourseDetail';
import { AuthModal } from './components/AuthModal';
import { PaymentModal } from './components/PaymentModal';
import { AiAdvisor } from './components/AiAdvisor';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Course } from './types';

const AppContent: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [pendingEnrollResolve, setPendingEnrollResolve] = useState<((value: { success: boolean }) => void) | null>(null);

  const { isAuthenticated } = useAuth();

  const handleEnroll = (course: Course) => {
    // For free courses, enrollment is optional - skip if not authenticated
    if (course.price === 0 && !isAuthenticated) {
      // Videos are accessible without enrollment, so just return success
      return { success: true };
    }

    // For paid courses or authenticated users, proceed with enrollment
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return { success: false };
    }

    return new Promise<{ success: boolean }>((resolve) => {
      setSelectedCourse(course);
      setPendingEnrollResolve(() => resolve);
      setIsPaymentModalOpen(true);
    });
  };

  const ScrollToTop = () => {
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    return null;
  }

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-slate-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Navbar 
          onLoginClick={() => setIsAuthModalOpen(true)}
        />

        <main className="grow">
          <Routes>
            <Route path="/" element={<Home onEnroll={handleEnroll} />} />
            <Route path="/skills" element={<Skills onEnroll={handleEnroll} />} />
            <Route path="/course/:id" element={<CourseDetail onEnroll={handleEnroll} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
        <AiAdvisor />

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
        />

        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            if (pendingEnrollResolve) pendingEnrollResolve({ success: false });
            setPendingEnrollResolve(null);
            setTimeout(() => setSelectedCourse(null), 300);
          }}
          course={selectedCourse}
          onSuccess={() => {
             if (pendingEnrollResolve) pendingEnrollResolve({ success: true });
             setPendingEnrollResolve(null);
             setIsPaymentModalOpen(false);
             setTimeout(() => setSelectedCourse(null), 300);
          }}
        />
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
