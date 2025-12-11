import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { submitContactForm } from '../services/contact';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage(null);
    
    const result = await submitContactForm({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      message: formData.message,
    });
    
    if (result.data) {
      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } else if (result.error) {
      setSubmitStatus('error');
      setErrorMessage(result.error);
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Let's Connect</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Whether you have a question about a course, need career advice, or just want to share your success story, we are here to listen.
            </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
            
            {/* Info & Cards */}
            <div className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                            <Mail size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Email Us</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">For general inquiries and support.</p>
                        <a href="mailto:support@upskillhub.com" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">support@upskillhub.com</a>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                            <Phone size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Call Us</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Mon-Fri from 9am to 6pm EST.</p>
                        <a href="tel:+15551234567" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">+1 (555) 123-4567</a>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start gap-4">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg text-purple-600 dark:text-purple-400 shrink-0">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Global Headquarters</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                123 Tech Avenue, Innovation District,<br />
                                Silicon Valley, CA 94025, USA
                            </p>
                            <p className="text-sm text-gray-500 italic">"We love visitors! Drop by for a coffee and a chat about the future of tech."</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>
                
                {submitStatus === 'success' && (
                    <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-2">
                        <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                        <p className="text-sm text-green-600 dark:text-green-400">Message sent successfully! We'll get back to you soon.</p>
                    </div>
                )}
                
                {submitStatus === 'error' && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-2">
                        <AlertCircle size={20} className="text-red-600 dark:text-red-400" />
                        <p className="text-sm text-red-600 dark:text-red-400">{errorMessage || 'Failed to send message. Please try again.'}</p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                            <input 
                                type="text" 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all" 
                                placeholder="John" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                            <input 
                                type="text" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all" 
                                placeholder="Doe" 
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all" 
                            placeholder="john@example.com" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                        <textarea 
                            rows={4} 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all" 
                            placeholder="How can we help you grow?"
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full flex justify-center items-center gap-2 bg-primary-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-primary-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Message <Send size={18} />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {[
                    { q: "Can I access the courses forever?", a: "Yes! Once you buy a course, you have lifetime access to all its materials and future updates." },
                    { q: "Do you offer certificates?", a: "Absolutely. Every completed course comes with a verified certificate you can add to your LinkedIn profile." },
                    { q: "What if I'm not satisfied?", a: "We offer a 30-day money-back guarantee. If you don't feel you're learning, we'll refund you, no questions asked." },
                    { q: "Is there a student community?", a: "Yes, we have an active Discord server where students help each other, share jobs, and collaborate on projects." }
                ].map((faq, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                            <HelpCircle size={20} className="text-primary-500" /> {faq.q}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 ml-7">{faq.a}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};