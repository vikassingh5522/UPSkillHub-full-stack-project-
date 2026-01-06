import React, { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Zap, Globe, Users, Award, BookOpen, Briefcase, GraduationCap, Star, ArrowRight, Play, CheckCircle, Linkedin, Twitter } from 'lucide-react';
import { About3DScene } from '../components/About3DScene';
import { VideoModal } from '../components/VideoPlayer';

export const About: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const stats = [
    { value: '50K+', label: 'Active Learners', icon: <Users size={24} /> },
    { value: '120+', label: 'Countries', icon: <Globe size={24} /> },
    { value: '500+', label: 'Expert Courses', icon: <BookOpen size={24} /> },
    { value: '95%', label: 'Success Rate', icon: <Award size={24} /> },
  ];

  const values = [
    {
      title: 'Student Obsession',
      icon: <Heart size={28} />,
      desc: "We don't just teach; we care. Your success is our success, and we go the extra mile to ensure you understand every concept.",
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      title: 'Continuous Innovation',
      icon: <Zap size={28} />,
      desc: 'Tech moves fast, and so do we. We constantly update our curriculum to reflect the latest industry standards and trends.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Global Inclusivity',
      icon: <Globe size={28} />,
      desc: 'Education is a right, not a privilege. We strive to make our courses accessible and affordable for everyone worldwide.',
      gradient: 'from-emerald-500 to-teal-500',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400',
      bio: 'Former Google engineer with 15+ years in tech education',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400',
      bio: 'Ex-Meta architect, passionate about scalable learning platforms',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Curriculum',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&h=400',
      bio: 'PhD in Education, designed courses for 100K+ students',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'David Kim',
      role: 'Head of Engineering',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400',
      bio: 'Full-stack expert, built products used by millions',
      linkedin: '#',
      twitter: '#',
    },
  ];

  const milestones = [
    { year: '2020', title: 'Founded', desc: 'Started with a vision to democratize tech education' },
    { year: '2021', title: '10K Students', desc: 'Reached our first major milestone' },
    { year: '2022', title: 'Global Expansion', desc: 'Expanded to 50+ countries' },
    { year: '2023', title: '50K Community', desc: 'Built a thriving global learning community' },
    { year: '2024', title: 'AI Integration', desc: 'Launched AI-powered personalized learning' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      {/* Hero Section with 3D */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-hidden flex items-center">
        {/* 3D Scene Background */}
        <Suspense fallback={null}>
          <About3DScene variant="hero" className="opacity-70" />
        </Suspense>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/80 z-[1]" />

        {/* Animated Grid */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8 animate-fade-in-up">
              <GraduationCap size={18} />
              About UpSkillHub
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight animate-fade-in-up">
              Empowering the Next
              <span className="block bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                Generation of Tech Leaders
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10 animate-fade-in-up">
              UpSkillHub isn't just a platform; it's a movement. We are dedicated to bridging the gap between ambition and achievement through world-class education.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <Link
                to="/skills"
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-white bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 transition-all shadow-lg shadow-primary-500/30 transform hover:-translate-y-1"
              >
                Explore Our Courses
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => setIsVideoOpen(true)}
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                </div>
                Our Story
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all animate-slide-up stagger-${i + 1}`}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-50 to-transparent dark:from-primary-900/10 dark:to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mission */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                <Target size={20} />
                <span className="font-semibold">Our Mission</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Democratizing Tech Education for
                <span className="text-primary-600 dark:text-primary-400"> Everyone</span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                To provide every ambitious learner—regardless of their background or geography—with the tools, mentorship, and skills needed to build a thriving career in the digital age.
              </p>

              <div className="flex flex-wrap gap-4">
                {['Accessible Learning', 'Expert Mentorship', 'Career Growth'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                    <CheckCircle size={16} className="text-green-500" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <div className="text-5xl font-extrabold text-primary-600 dark:text-primary-400">1M+</div>
                <div className="text-gray-500 dark:text-gray-400">Lives to impact by 2030</div>
              </div>
            </div>

            {/* Vision */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20" />
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-10 rounded-3xl text-white">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 mb-6">
                  <Eye size={20} />
                  <span className="font-semibold">Our Vision</span>
                </div>

                <h3 className="text-3xl font-bold mb-6">
                  A World Where Skills Matter More Than Degrees
                </h3>

                <p className="text-gray-300 leading-relaxed mb-8">
                  We envision a future where anyone with the drive to learn can access high-quality education, unlock their potential, and contribute to global innovation.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <BookOpen size={20} />, label: 'Self-Paced Learning' },
                    { icon: <Users size={20} />, label: 'Global Community' },
                    { icon: <Award size={20} />, label: 'Industry Recognition' },
                    { icon: <Briefcase size={20} />, label: 'Career Support' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                      <div className="text-primary-400">{item.icon}</div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values with 3D */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
              What We Stand For
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide every course we create and every student we support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <div
                key={i}
                className={`group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden animate-slide-up stagger-${i + 1}`}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${val.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className={`relative z-10`}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${val.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    {val.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {val.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Growing Together
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 via-purple-500 to-pink-500 rounded-full hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <div
                  key={i}
                  className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`inline-block p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all animate-slide-up stagger-${i + 1}`}>
                      <div className="text-primary-600 dark:text-primary-400 font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 border-4 border-white dark:border-gray-900 shadow-lg hidden md:block" />

                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
              Meet the Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              The People Behind UpSkillHub
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Passionate educators and technologists committed to your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className={`group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 animate-slide-up stagger-${i + 1}`}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

                  {/* Social links */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={member.linkedin} className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
                      <Linkedin size={18} />
                    </a>
                    <a href={member.twitter} className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
                      <Twitter size={18} />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-gradient-to-br from-primary-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="text-8xl text-white/20 font-serif mb-6">"</div>
          <blockquote className="text-3xl md:text-4xl font-medium text-white italic mb-8 leading-relaxed">
            The beautiful thing about learning is that no one can take it away from you. Investing in your mind is the only investment that guarantees a return in every market condition.
          </blockquote>
          <cite className="text-primary-300 font-bold text-lg not-italic">— B.B. King</cite>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of learners who are already transforming their careers with UpSkillHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/skills"
              className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-primary-500 hover:to-purple-500 transform hover:-translate-y-1 transition-all"
            >
              Browse Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        videoId="5MgBikgcWnY"
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title="Our Story"
      />
    </div>
  );
};
