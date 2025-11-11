'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { OTPVerificationForm } from './otp-verification-form';

// TODO: Replace with your actual authentication and admin verification logic
async function signIn(email, password) {
  // This is a placeholder. In a real scenario, you would call your auth provider.
  if (email === 'admin@ebonidating.com' && password === 'password') {
    return { success: true }; // Simulate successful authentication
  }
  return { success: false, error: 'Invalid credentials' };
}

async function isAdmin() {
  // This is a placeholder. In a real scenario, you would check the user's roles or permissions.
  return true; // Simulate that the user is an admin
}

export function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpRequired, setOtpRequired] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { success, error } = await signIn(email, password);

      if (!success) {
        throw new Error(error);
      }

      await checkAdminAndRedirect();

    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const checkAdminAndRedirect = async () => {
    const userIsAdmin = await isAdmin();

    if (!userIsAdmin) {
      setError('You do not have admin access.');
    } else {
      router.push('/admin');
      router.refresh();
    }
  }

  if (otpRequired) {
    return <OTPVerificationForm email={email} onVerificationSuccess={checkAdminAndRedirect} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your admin credentials to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {error && (
            <Alert variant='destructive'>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='admin@ebonidating.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
