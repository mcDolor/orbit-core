import BackButton from '@/components/auth/back-button';
import LoginForm from '@/components/auth/login-form';
import { GoogleButton } from '@/components/auth/google-button';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Orbit',
  description: 'Log in to your Orbit account to manage your organization with ease.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen relative bg-cover bg-center" style={{
      backgroundImage: 'url(/images/login-bg.webp)',
    }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Content on left side - visible only on lg screens */}
      <div className="hidden lg:flex flex-col justify-between absolute inset-0 w-1/2 p-10 z-10">
        {/* Logo and back button */}
        <div className="flex items-center justify-between">
          <BackButton />
          <Image 
            src="/images/logo-white.png" 
            alt="Orbit Logo" 
            width={64} 
            height={67} 
            className="object-contain" 
          />
        </div>

        {/* Bottom text */}
        <div className="max-w-max">
          <h1 className="text-5xl font-bold text-white mb-4 text-balance">
            Clear the Chaos. Connect the Campus. Built for VSU.
          </h1>
          <p className="text-lg text-gray-200">
            The all-in-one platform that turns organization management from a semester-long headache into a streamlined, transparent experience.
          </p>
        </div>
      </div>

      {/* Floating Login Card - Right side */}
      <div className="relative z-20 min-h-screen flex items-center justify-end p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
          {/* Mobile back button */}
          <div className="lg:hidden mb-6">
            <BackButton />
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 text-balance">
              Welcome Back!
            </h2>
            <p className="text-gray-600">
              Log in to start managing your organization with ease.
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with:</span>
            </div>
          </div>

          {/* Google OAuth */}
          <GoogleButton />
        </div>
      </div>
    </div>
  );
}
