'use client';

import { createClient } from '@/utils/supabase/client';
import { useState, useActionState } from 'react';
import { handleSocialLogin } from '@/features/auth/socialAuth';
import { handleLogin } from '@/features/auth/authentication';
import Link from 'next/link';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Eye, EyeOff } from "lucide-react";


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, action, pending] = useActionState(handleLogin, undefined);
  const [showPassword, setShowPassword] = useState(false);
  
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transform transition-transform duration-300 hover:scale-[1.02]">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Log in to create your polls.
        </p>

        {state?.message && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4">
            <span className="block sm:inline">{state.message}</span>
          </div>
        )}

        <form action={action} className="space-y-4">
          <div>
            <input
              type="email"
              name='email'
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
            { state?.error?.email && (<div className='text-red-500 text-sm mt-1'>{state.error.email[0]}</div>)}
          </div>
          <div className='relative'>
            <input
               type={showPassword ? "text" : "password"}
              placeholder="Password"
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
             <button
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
          <ul>
            { state?.error?.password && (<div className='text-red-500 text-sm mt-1'>{state.error.password.map((text, idx) => (
            <li key={idx}>{text}</li>))}
            </div>)}
          </ul>
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Log In
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or continue with</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            onClick={() => handleSocialLogin('google')}
            className="w-full px-6 py-3 bg-white text-gray-700 border border-gray-300 font-semibold rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <FaGoogle />
            <span>Google</span>
          </button>
          <button
            onClick={() => handleSocialLogin('github')}
            className="w-full px-6 py-3 bg-gray-800 text-white border border-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-900 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <FaGithub />
            <span>GitHub</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}