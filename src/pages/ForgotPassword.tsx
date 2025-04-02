
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast.error(error.message);
        setIsSubmitting(false);
      } else {
        setSubmitted(true);
        toast.success('Password reset instructions sent to your email');
      }
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast.error('Failed to send password reset email. Please try again later.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md px-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>
              {!submitted 
                ? 'Enter your email address and we will send you instructions to reset your password.'
                : 'Check your email for a link to reset your password.'}
            </CardDescription>
          </CardHeader>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-medblue-600 hover:bg-medblue-700" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </Button>
                <p className="text-sm text-center text-gray-600">
                  Remembered your password?{" "}
                  <Link to="/login" className="text-medblue-500 hover:text-medblue-600">
                    Back to login
                  </Link>
                </p>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-4">
              <p className="text-center text-gray-600">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-center text-gray-600">
                Please check your inbox and follow the instructions to reset your password.
              </p>
              <Button 
                className="w-full mt-4 bg-medblue-600 hover:bg-medblue-700" 
                asChild
              >
                <Link to="/login">Back to Login</Link>
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
