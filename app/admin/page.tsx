'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { SystemLabel, MemoryAddress } from '@/components/ui/brutalist-elements';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call API route to authenticate
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Set localStorage as backup (for client-side checks)
        localStorage.setItem('admin_authenticated', 'true');
        toast.success('Authentication successful');
        router.push('/admin/dashboard');
      } else {
        toast.error(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      {/* Background Grid Pattern - Subtle */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, black 1px, transparent 1px),
              linear-gradient(to bottom, black 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0 0)' }}
        transition={{ duration: 0.3, ease: 'linear' }}
        className="w-full max-w-md relative z-10"
      >
        {/* Terminal Window Header */}
        <div className="border border-black rounded-none bg-white">
          {/* Window Title Bar */}
          <div className="h-10 bg-black flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-white" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-white">
                ADMIN.AUTH
              </span>
            </div>
            <MemoryAddress code="0xADMIN" />
          </div>

          {/* Status Bar */}
          <div className="h-8 border-b border-black flex items-center justify-between px-4 bg-white">
            <SystemLabel label="AUTH_REQUIRED" />
            <span className="text-[10px] font-mono text-gray-400">
              {new Date().toLocaleTimeString('en-US', { hour12: false })}
            </span>
          </div>

          {/* Login Form Content */}
          <div className="p-8 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Admin Access
              </h1>
              <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">
                // AUTHENTICATE TO CONTINUE
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-3">
                <label
                  htmlFor="email"
                  className="block text-[10px] font-mono uppercase tracking-widest text-gray-600"
                >
                  USER.EMAIL
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials({ ...credentials, email: e.target.value })
                    }
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="admin@decoisme.com"
                    required
                    className={`w-full px-4 py-3 border-2 rounded-none bg-white font-mono text-sm transition-colors duration-0 focus:outline-none ${
                      focusedField === 'email'
                        ? 'border-black'
                        : 'border-gray-300'
                    }`}
                  />
                  {focusedField === 'email' && (
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2">
                      <div className="w-1 h-6 bg-black" />
                    </div>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <label
                  htmlFor="password"
                  className="block text-[10px] font-mono uppercase tracking-widest text-gray-600"
                >
                  USER.PASS
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({ ...credentials, password: e.target.value })
                    }
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••••••"
                    required
                    className={`w-full px-4 py-3 border-2 rounded-none bg-white font-mono text-sm transition-colors duration-0 focus:outline-none ${
                      focusedField === 'password'
                        ? 'border-black'
                        : 'border-gray-300'
                    }`}
                  />
                  {focusedField === 'password' && (
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2">
                      <div className="w-1 h-6 bg-black" />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors duration-0 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-2 h-2 bg-white animate-pulse" />
                    AUTHENTICATING...
                  </>
                ) : (
                  <>
                    <Terminal className="h-3.5 w-3.5" />
                    AUTHENTICATE
                  </>
                )}
              </button>
            </form>

            {/* Demo Info */}
            <div className="border border-gray-200 p-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                // DEMO.CREDENTIALS
              </div>
              <div className="text-xs font-mono text-gray-600 space-y-1">
                <div>EMAIL: admin@decoisme.com</div>
                <div>PASS: [contact_admin]</div>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="h-8 border-t border-black flex items-center justify-between px-4 bg-gray-50">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-gray-600 hover:text-black transition-colors duration-0"
            >
              <ArrowLeft className="h-3 w-3" />
              RETURN.HOME
            </Link>
            <span className="text-[10px] font-mono text-gray-400">
              v1.0.0
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
