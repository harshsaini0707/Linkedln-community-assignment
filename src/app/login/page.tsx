"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e :  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      const { status, message } = res.data;

      if (status === 200) {
        setMessage('Login successful!');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setMessage(message);
      }
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-xl p-8 space-y-6">
     
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 text-base">Sign in to your account</p>
        </div>

      
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-800">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black transition-all text-sm"
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-800">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black/10 focus:border-black transition-all text-sm"
            placeholder="Enter your password"
          />
        </div>

        {msg && (
          <div
            className={`border rounded-lg p-2 text-sm text-center font-medium ${
              msg.includes('successful')
                ? 'bg-green-50 border-green-200 text-green-600'
                : 'bg-red-50 border-red-200 text-red-600'
            }`}
          >
            {msg}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-black/20 shadow-md text-sm"
        >
          Sign In
        </button>
        <div className="text-sm text-center text-gray-600 pt-2">
          Don’t have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
