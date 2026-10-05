'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/Toast';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { isValidEmail } from '@/lib/utils';
import { GraduationCap, ShieldCheck, UserCheck, Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { loginAdmin, loginUser, isAuthenticated, isLoading: authLoading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'ADMIN' | 'STAFF'>('ADMIN');
  const [email, setEmail] = useState<string>('admin@greenwood.com');
  const [password, setPassword] = useState<string>('123');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (activeTab === 'ADMIN') {
        await loginAdmin({ email, password, rememberMe });
        showToast('Welcome back, Administrator!', 'success', 'Login Successful');
      } else {
        await loginUser({ email, password, rememberMe });
        showToast('Welcome back to Greenwood ERP!', 'success', 'Login Successful');
      }
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Invalid email or password. Please try again.';
      setErrorMessage(msg);
      showToast(msg, 'error', 'Authentication Failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoAdmin = () => {
    setActiveTab('ADMIN');
    setEmail('admin@greenwood.com');
    setPassword('123');
    setErrorMessage(null);
  };

  const fillDemoStaff = () => {
    setActiveTab('STAFF');
    setEmail('user@greenwood.com');
    setPassword('123');
    setErrorMessage(null);
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6">
        {/* Logo & Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-600/25 mb-1">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Greenwood School ERP
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to access the Enterprise Management Portal
          </p>
        </div>

        {/* Login Form Card */}
        <Card className="shadow-xl border-slate-200/80 dark:border-slate-800">
          <CardContent className="p-6 space-y-5">
            {/* Tab Selector: Admin vs Staff */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('ADMIN');
                  setErrorMessage(null);
                }}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'ADMIN'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('STAFF');
                  setErrorMessage(null);
                }}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'STAFF'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Staff Portal</span>
              </button>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-700 dark:text-rose-300 font-medium">
                {errorMessage}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                leftIcon={<Mail className="w-4 h-4" />}
                placeholder={activeTab === 'ADMIN' ? 'admin@greenwood.com' : 'staff@greenwood.com'}
                autoComplete="email"
              />

              <div className="space-y-1.5">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  leftIcon={<Lock className="w-4 h-4" />}
                  rightIcon={
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none pointer-events-auto"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>

              {/* Options: Remember Me */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900"
                  />
                  <span className="text-slate-600 dark:text-slate-400">Remember me</span>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full mt-2"
                isLoading={isSubmitting}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In to {activeTab === 'ADMIN' ? 'Admin Portal' : 'Staff Portal'}
              </Button>
            </form>

            {/* Quick Demo Login Credentials Bar */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center space-y-2">
              <p className="text-[11px] font-medium text-slate-400">Quick Demo Credentials:</p>
              <div className="flex items-center justify-center space-x-2">
                <button
                  type="button"
                  onClick={fillDemoAdmin}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-[11px] font-mono font-medium transition-colors"
                >
                  Admin (admin@greenwood.com)
                </button>
                <button
                  type="button"
                  onClick={fillDemoStaff}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-[11px] font-mono font-medium transition-colors"
                >
                  Staff (user@greenwood.com)
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
