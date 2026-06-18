
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../Api/UserSlice';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Registering with:', formData);

    dispatch(setCredentials(formData));

    router.push('/auth/profile');
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white">
        <CardHeader className="pb-6">
          <CardTitle className="text-center text-3xl font-bold">
            Create Account
          </CardTitle>

          <p className="text-center text-sm text-muted-foreground">
            Create your account to get started
          </p>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>

              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>

              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="h-12"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700"
            >
              Register
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push('/auth/login')}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Already have an account? Login
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
