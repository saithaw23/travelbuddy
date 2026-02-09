'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, Sparkles, Check } from 'lucide-react';
import { ModeToggle } from './mode/mode-toggle';
import { toast } from 'sonner';

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { label: 'Contains number', met: /[0-9]/.test(formData.password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!passwordRequirements.every(req => req.met)) {
      toast.error('Password does not meet requirements');
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error('Please agree to the Terms of Service');
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('Creating your account...');

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.dismiss(loadingToast);
      toast.success('Account created successfully!', {
        description: 'Welcome to TravelBuddy'
      });
      
      setTimeout(() => router.push('/auth/signin'), 1000);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to create account', {
        description: 'Please try again later'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const loadingToast = toast.loading('Connecting to Google...');
    
    try {
      // TODO: Implement actual Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.dismiss(loadingToast);
      toast.info('Google OAuth coming soon!');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to connect with Google');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">TravelBuddy</span>
          </Link>
          <ModeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-md mx-auto">
          {/* Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Create Account
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Start planning your dream trips today
              </p>
            </div>

            {/* Google Sign Up */}
            <button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or sign up with email
                </span>
              </div>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create a strong password"
                    className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Requirements */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    {passwordRequirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <Check className={`w-3 h-3 ${req.met ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className={req.met ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                )}
              </div>

              {/* Terms Agreement */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{' '}
                    <Link href="/terms-of-service" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-medium">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy-policy" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-medium">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            {/* Sign In Link */}
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                href="/auth/signin"
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/privacy-policy" className="hover:text-purple-600 dark:hover:text-purple-400">
                Privacy
              </Link>
              <span>•</span>
              <Link href="/terms-of-service" className="hover:text-purple-600 dark:hover:text-purple-400">
                Terms
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-purple-600 dark:hover:text-purple-400">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
