'use client';

import { useState } from 'react';
import { Mail, Check, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus('error');
      setMessage('Email is required');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed!');
        setEmail('');
        
        // Reset after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe');
        
        // Reset error after 3 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('[Newsletter] Error:', error);
      setStatus('error');
      setMessage('Network error. Please try again.');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Field */}
        <div className="relative">
          <div className="flex items-stretch">
            {/* Email Icon */}
            <div className="flex items-center justify-center px-4 border-4 border-r-0 border-black bg-black text-white">
              <Mail className="h-5 w-5" />
            </div>
            
            {/* Input */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR@EMAIL.COM"
              disabled={status === 'loading' || status === 'success'}
              className="flex-1 px-4 py-3 border-4 border-black font-mono text-sm uppercase tracking-wider
                       focus:outline-none focus:bg-black focus:text-white focus:placeholder-gray-500
                       disabled:bg-gray-100 disabled:text-gray-500 transition-colors duration-0"
              required
            />
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`px-6 py-3 border-4 border-l-0 border-black font-mono text-sm uppercase tracking-wider
                       transition-all duration-0 flex items-center gap-2
                ${status === 'loading' 
                  ? 'bg-gray-300 text-gray-600 cursor-wait' 
                  : status === 'success'
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-black text-white hover:bg-white hover:text-black'
                }`}
            >
              {status === 'loading' && (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  SENDING
                </>
              )}
              {status === 'success' && (
                <>
                  <Check className="h-4 w-4" />
                  DONE
                </>
              )}
              {status !== 'loading' && status !== 'success' && (
                <>
                  SUBSCRIBE
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status Message */}
        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className={`
                p-4 border-4 font-mono text-sm flex items-start gap-3
                ${status === 'success' 
                  ? 'bg-green-50 border-green-600 text-green-900' 
                  : 'bg-red-50 border-red-600 text-red-900'
                }
              `}>
                {status === 'success' ? (
                  <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold uppercase mb-1">
                    {status === 'success' ? 'SUCCESS!' : 'ERROR!'}
                  </div>
                  <div className="text-xs">
                    {message}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Privacy Notice */}
      <div className="mt-4 text-xs font-mono text-gray-500 leading-relaxed">
        By subscribing, you agree to receive updates about new posts and projects. 
        Unsubscribe anytime. No spam, ever.
      </div>
    </div>
  );
}
