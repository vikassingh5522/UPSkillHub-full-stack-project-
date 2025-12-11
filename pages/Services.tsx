import React, { useState, useEffect } from 'react';
import { SERVICES } from '../constants';
import { BookOpen, Users, Award, Briefcase, CheckCircle2, Rocket, MonitorPlay, MessageSquare, TrendingUp, Star, Play, Building2, Bell, Zap, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Services: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    'BookOpen': <BookOpen size={32} />,
    'Users': <Users size={32} />,
    'Award': <Award size={32} />,
    'Briefcase': <Briefcase size={32} />
  };

  // Live Feed Simulation
  const [activityIndex, setActivityIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const activities = [
    { text: "Sarah J. just enrolled in React Masterclass", icon: <Zap size={16} className="text-yellow-500" /> },
    { text: "Michael Chen got hired at Google as L4 Engineer", icon: <Briefcase size={16} className="text-green-500" /> },
    { text: "Jessica T. completed the Full Stack Path", icon: <Award size={16} className="text-purple-500" /> },
    { text: "David R. posted a question in Python Community", icon: <MessageSquare size={16} className="text-blue-500" /> },
    { text: "New success story: From Cashier to Data Scientist (+140% Salary)", icon: <TrendingUp size={16} className="text-green-500" /> },
    { text: "Maria G. earned her AWS Solutions Architect Certificate", icon: <Award size={16} className="text-orange-500" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActivityIndex((prev) => (prev + 1) % activities.length);
        setFade(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
        name: "Elena Rodriguez",
        role: "Product Designer @ Spotify",
        prevRole: "Graphic Designer",
        salaryHike: "+120%",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        videoThumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        quote: "The mentorship I received was life-changing. I went from making logos to designing complex interfaces for millions of users."
    },
    {
        name: "Marcus Johnson",
        role: "Senior Dev @ Microsoft",
        prevRole: "IT Support",
        salaryHike: "+200%",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        videoThumb: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        quote: "UpSkillHub didn't just teach me code; they taught me how to think like an engineer. The career support was phenomenal."
    },
    {
        name: "Aisha Patel",
        role: "ML Engineer @ Tesla",
        prevRole: "Math Teacher",
        salaryHike: "+150%",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
        videoThumb: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        quote: "I thought AI was out of reach. The step-by-step curriculum made complex topics accessible. Now I work on self-driving cars!"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      
      {/* Live Activity Feed */}
      <div className="bg-gray-900 dark:bg-black text-white py-3 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center sm:justify-between">
              <div className="hidden sm:flex items-center gap-2 text-primary-400 font-bold text-xs uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Live Community Activity
              </div>
              <div className={`flex items-center gap-3 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                  {activities[activityIndex].icon}
                  <span className="text-sm font-medium">{activities[activityIndex].text}</span>
              </div>
          </div>
      </div>

      {/* Hero Header */}
      <div className="bg-primary-900 text-white py-20 mb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Holistic Learning Ecosystem</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                We provide more than just video lectures. We offer a complete ecosystem designed to accelerate your career growth through mentorship, practice, and validation.
            </p>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-24">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="flex gap-6 p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {iconMap[service.icon]}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="h-1 w-12 bg-primary-200 dark:bg-primary-800 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories Section */}
        <div className="mb-24">
            <div className="text-center mb-16">
                <span className="text-green-600 dark:text-green-400 font-bold tracking-widest uppercase text-xs mb-2 block">Real Results</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Career Transformations</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    See how our students are changing their lives, securing massive salary hikes, and landing jobs at top tech giants.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {testimonials.map((story, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-2 transition-transform duration-300">
                        {/* Video Thumbnail */}
                        <div 
                            onClick={() => {
                                // Open video in modal or new tab - using a placeholder YouTube link
                                window.open(`https://www.youtube.com/watch?v=dQw4w9WgXcQ`, '_blank', 'noopener,noreferrer');
                            }}
                            className="relative h-48 bg-gray-900 group cursor-pointer"
                            role="button"
                            tabIndex={0}
                            aria-label={`Watch ${story.name}'s success story`}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    window.open(`https://www.youtube.com/watch?v=dQw4w9WgXcQ`, '_blank', 'noopener,noreferrer');
                                }
                            }}
                        >
                            <img src={story.videoThumb} alt={`${story.name}'s success story`} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border-2 border-white group-hover:scale-110 transition-transform">
                                    <Play size={24} fill="currentColor" className="ml-1" />
                                </div>
                            </div>
                            <div className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                                <TrendingUp size={14} /> Salary {story.salaryHike}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6 -mt-12 relative z-10">
                                <img src={story.image} alt={story.name} className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-800 shadow-md" />
                                <div className="mt-6">
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{story.name}</h3>
                                    <div className="flex text-yellow-400 gap-0.5">
                                        {[1,2,3,4,5].map(star => <Star key={star} size={12} fill="currentColor" />)}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Before</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">{story.prevRole}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">After</span>
                                    <span className="font-bold text-primary-600 dark:text-primary-400 flex items-center gap-1">
                                         {story.role}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl relative">
                                <p className="text-gray-600 dark:text-gray-300 text-sm italic relative z-10">"{story.quote}"</p>
                            </div>
                            
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Hired By</span>
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-bold">
                                    <Building2 size={16} /> 
                                    {story.role.split('@')[1]}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Companies Strip */}
            <div className="mt-16 pt-10 border-t border-gray-100 dark:border-gray-800">
                <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Our Alumni Work At</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {["Google", "Microsoft", "Amazon", "Netflix", "Spotify", "Tesla", "Meta"].map((company) => (
                        <span key={company} className="text-xl md:text-2xl font-black text-gray-800 dark:text-white flex items-center gap-2">
                             {company}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        {/* Community & Forum Section */}
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl overflow-hidden text-white mb-24 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-16 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-indigo-200 text-sm font-medium mb-6">
                        <Users size={16} /> Vibrant Community
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Never Learn Alone</h2>
                    <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                        Join a thriving ecosystem of learners and experts. Stuck on a bug? Need career advice? Our community forum and discussion boards are active 24/7.
                    </p>
                    
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <div className="bg-indigo-500/30 p-3 rounded-lg h-fit">
                                <MessageSquare size={24} className="text-indigo-300" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-1">Course Discussion Boards</h3>
                                <p className="text-indigo-200 text-sm">Dedicated Q&A sections for every single lecture. Get help from peers and TAs.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="bg-purple-500/30 p-3 rounded-lg h-fit">
                                <Users size={24} className="text-purple-300" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-1">Peer-to-Peer Learning</h3>
                                <p className="text-indigo-200 text-sm">Collaborate on projects, review code, and build your network before you even graduate.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="bg-pink-500/30 p-3 rounded-lg h-fit">
                                <Bell size={24} className="text-pink-300" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-1">Instructor Feedback</h3>
                                <p className="text-indigo-200 text-sm">Direct access to industry experts during weekly live office hours.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="bg-gray-900/50 p-8 md:p-12 flex flex-col justify-center relative">
                    {/* Mock Forum UI */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 space-y-4 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                            <span className="font-bold text-gray-900 dark:text-white">Recent Discussions</span>
                            <span className="text-xs text-primary-500 font-bold">View All</span>
                        </div>
                        {[
                            { user: "Alex M.", title: "Help with React useEffect hook dependency", tags: ["React", "Bug"], replies: 12 },
                            { user: "Sarah K.", title: "Best resources for System Design interview?", tags: ["Career", "Interview"], replies: 24 },
                            { user: "DevBot", title: "Weekly Coding Challenge #45 is live!", tags: ["Announcement"], replies: 56 }
                        ].map((post, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                    {post.user.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">{post.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                    <MessageSquare size={12} /> {post.replies}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Corporate Training Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 md:p-16 mb-24 flex flex-col md:flex-row items-center gap-12 border border-gray-100 dark:border-gray-700">
            <div className="flex-1 space-y-6">
                <div className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-bold text-xs uppercase tracking-wider">
                    For Business
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Upskill Your Workforce</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Stay competitive in the digital age. We provide tailored training programs for teams of all sizes, from startups to Fortune 500 companies.
                </p>
                <ul className="space-y-3">
                    {['Custom Learning Paths', 'Progress Tracking Dashboards', 'Hands-on Workshops', 'Dedicated Support'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                            <CheckCircle2 size={20} className="text-green-500" />
                            {item}
                        </li>
                    ))}
                </ul>
                <button 
                    onClick={() => {
                        // Could open a modal or navigate to contact page
                        window.location.href = '/contact?subject=corporate-training';
                    }}
                    aria-label="Request a demo for corporate training"
                    className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                    Request a Demo
                </button>
            </div>
            <div className="flex-1">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Corporate training" className="rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500" />
            </div>
        </div>

        {/* Features List */}
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Everything You Need to Succeed</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6">
                    <MonitorPlay size={40} className="mx-auto text-primary-600 dark:text-primary-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">HD Video Content</h3>
                    <p className="text-gray-600 dark:text-gray-400">Crystal clear video lessons recorded by industry experts.</p>
                </div>
                <div className="p-6">
                    <Rocket size={40} className="mx-auto text-primary-600 dark:text-primary-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Hands-on Projects</h3>
                    <p className="text-gray-600 dark:text-gray-400">Build real-world projects to add to your portfolio.</p>
                </div>
                <div className="p-6">
                    <Award size={40} className="mx-auto text-primary-600 dark:text-primary-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Certification</h3>
                    <p className="text-gray-600 dark:text-gray-400">Earn recognized certificates to validate your skills.</p>
                </div>
            </div>
        </div>
        
        {/* CTA */}
        <div className="bg-primary-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                Join thousands of learners who have successfully transitioned into high-paying tech roles.
            </p>
            <Link to="/skills" className="inline-block px-8 py-3 bg-white text-primary-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
                Explore All Courses
            </Link>
        </div>

      </div>
    </div>
  );
};