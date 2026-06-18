'use client';
import { useState } from 'react';
import LoginModule from '../components/logingPage';
import RegisterModule from '../components/registerPage';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLogin ? <LoginModule /> : <RegisterModule />}

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-sm text-blue-600 hover:underline"
      >
        {isLogin ? "Need an account? Register" : "Already have an account? Login"}
      </button>
    </div>
  );
}