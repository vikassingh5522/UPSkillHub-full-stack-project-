import React, { useState, useEffect } from 'react';
import { X, CreditCard, Lock, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { Course } from '../types';
import { createPayment } from '../services/payments';
import { createEnrollment } from '../services/enrollments';

type PaymentMethodOption = 'card' | 'credit_card' | 'debit_card' | 'upi' | 'netbanking' | 'wallet' | 'subscription' | 'one-time';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  onSuccess: () => void;
  paymentMethod?: PaymentMethodOption;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, course, onSuccess, paymentMethod = 'card' }) => {
  const [step, setStep] = useState<'payment' | 'processing' | 'success' | 'error'>('payment');
  const [error, setError] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodOption>(paymentMethod);
  const [upiId, setUpiId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep('payment');
      setError(null);
      setSelectedMethod(paymentMethod);
      setUpiId('');
    }
  }, [isOpen, paymentMethod]);

  if (!isOpen || !course) return null;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setError(null);
    
    try {
      // For free courses, just enroll directly (or return success if already enrolled)
      if (course.price === 0) {
        const enrollmentResult = await createEnrollment({
          courseId: parseInt(course.id),
          paymentMethod: 'one-time',
        });
        
        // For free courses, enrollment is optional - treat "already enrolled" as success
        if (enrollmentResult.error && enrollmentResult.error !== 'Already enrolled in this course') {
          setStep('error');
          setError(enrollmentResult.error);
          return;
        }
        
        // Success (either enrolled or already enrolled)
        setStep('success');
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2500);
        return;
      }

      // For paid courses, process payment first
      const paymentResult = await createPayment({
        courseId: parseInt(course.id),
        amount: course.price,
        paymentMethod: selectedMethod,
        upiId: selectedMethod === 'upi' ? upiId : undefined,
      });
      
      if (paymentResult.error) {
        setStep('error');
        setError(paymentResult.error);
        return;
      }

      // Payment successful, enrollment is created automatically by backend
      setStep('success');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2500);
    } catch (err) {
      setStep('error');
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          aria-label="Close payment modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 z-10 transition-colors"
        >
          <X size={24} />
        </button>

        {step === 'error' ? (
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mb-6">
              <AlertCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Failed</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{error || 'An error occurred during payment processing.'}</p>
            <button
              onClick={() => {
                setStep('payment');
                setError(null);
              }}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : step === 'success' ? (
           <div className="p-10 flex flex-col items-center text-center">
             <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-6 animate-in zoom-in duration-300">
               <CheckCircle size={40} />
             </div>
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Enrollment Successful!</h2>
             <p className="text-gray-600 dark:text-gray-300">You have successfully enrolled in <br/><span className="font-semibold text-primary-600 dark:text-primary-400">{course.title}</span>.</p>
           </div>
        ) : step === 'processing' ? (
           <div className="p-12 flex flex-col items-center justify-center text-center h-[400px]">
             <Loader2 size={48} className="text-primary-600 dark:text-primary-400 animate-spin mb-6" />
             <p className="text-lg font-medium text-gray-900 dark:text-white">Processing your enrollment...</p>
             <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Please do not close this window.</p>
           </div>
        ) : (
          <div className="p-8">
             <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {course.price === 0 ? 'Confirm Enrollment' : 'Secure Checkout'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-1">{course.title}</p>
             </div>

             <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl mb-6 flex justify-between items-center border border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-300 font-medium">Total Price</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                </span>
             </div>

             <form onSubmit={handlePayment} className="space-y-4">
                {course.price > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">Payment Method</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { value: 'card', label: 'Credit / Debit Card' },
                        { value: 'upi', label: 'UPI' },
                        { value: 'netbanking', label: 'Net Banking' },
                        { value: 'wallet', label: 'Wallet' },
                      ].map(method => (
                        <button
                          key={method.value}
                          type="button"
                          onClick={() => setSelectedMethod(method.value as PaymentMethodOption)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${selectedMethod === method.value ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-200' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-primary-300'}`}
                        >
                          <span className="text-sm font-semibold">{method.label}</span>
                          <span className={`w-4 h-4 rounded-full border ${selectedMethod === method.value ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {course.price > 0 && (selectedMethod === 'card' || selectedMethod === 'credit_card' || selectedMethod === 'debit_card') && (
                  <div className="space-y-4">
                     <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">Card Information</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                              <CreditCard size={18} />
                           </div>
                           <input 
                             type="text" 
                             className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                             placeholder="0000 0000 0000 0000"
                             required
                           />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">Expiry Date</label>
                           <input 
                             type="text" 
                             className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                             placeholder="MM/YY"
                             required
                           />
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">CVC</label>
                           <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                 <Lock size={18} />
                              </div>
                              <input 
                                type="text" 
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                                placeholder="123"
                                required
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                )}

                {course.price > 0 && selectedMethod === 'upi' && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                      placeholder="name@upi"
                      required
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">We will request approval via your UPI app.</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-primary-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
                >
                  {course.price === 0 ? 'Confirm Enrollment' : `Pay $${course.price}`}
                </button>
                
                <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-400">
                   <Lock size={12} />
                   <span>Payments are secure and encrypted</span>
                </div>
             </form>
          </div>
        )}
      </div>
    </div>
  );
};