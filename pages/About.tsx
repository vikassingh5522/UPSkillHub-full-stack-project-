import React from 'react';
import { Target, Eye, Heart, Zap, Globe, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      {/* Hero */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                Empowering the Next Generation of <span className="text-primary-600 dark:text-primary-400">Tech Leaders</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                UpSkillHub isn't just a platform; it's a movement. We are dedicated to bridging the gap between ambition and achievement through world-class education.
            </p>
         </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                <div className="flex flex-col justify-center space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl">
                            <Target size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        To democratize tech education and provide every ambitious learner—regardless of their background or geography—with the tools, mentorship, and skills needed to build a thriving career in the digital age. We aim to impact 1 million lives by 2030.
                    </p>
                </div>
                <div className="flex flex-col justify-center space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                            <Eye size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        We envision a world where skills matter more than degrees. A future where anyone with the drive to learn can access high-quality education, unlock their potential, and contribute to global innovation.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Stats Image Section */}
      <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px]">
                  <img 
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent flex items-center">
                      <div className="p-12">
                          <h3 className="text-4xl font-bold text-white mb-2">Join a Global Community</h3>
                          <p className="text-gray-200 text-lg mb-8 max-w-lg">
                              When you learn with us, you are never alone. Join a network of peers, mentors, and alumni working at top tech companies.
                          </p>
                          <div className="flex gap-8 text-white">
                              <div>
                                  <div className="text-3xl font-bold text-primary-400">50k+</div>
                                  <div className="text-sm opacity-80">Students</div>
                              </div>
                              <div>
                                  <div className="text-3xl font-bold text-primary-400">120+</div>
                                  <div className="text-sm opacity-80">Countries</div>
                              </div>
                              <div>
                                  <div className="text-3xl font-bold text-primary-400">4.8/5</div>
                                  <div className="text-sm opacity-80">Rating</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Core Values</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400">The principles that guide every course we create.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: "Student Obsession", icon: <Heart size={28} />, desc: "We don't just teach; we care. Your success is our success, and we go the extra mile to ensure you understand every concept." },
                    { title: "Continuous Innovation", icon: <Zap size={28} />, desc: "Tech moves fast, and so do we. We constantly update our curriculum to reflect the latest industry standards." },
                    { title: "Inclusivity", icon: <Globe size={28} />, desc: "Education is a right, not a privilege. We strive to make our courses accessible and affordable for everyone." }
                ].map((val, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800">
                        <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6">
                            {val.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{val.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {val.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Motivational Quote */}
      <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="text-6xl text-primary-200 dark:text-gray-700 font-serif mb-6">"</div>
              <h2 className="text-3xl font-medium text-gray-900 dark:text-white italic mb-8">
                  The beautiful thing about learning is that no one can take it away from you. Investing in your mind is the only investment that guarantees a return in every market condition.
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">- B.B. King</p>
          </div>
      </section>
    </div>
  );
};