import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { User, UserRole } from '@/lib/types';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { DbProfile, DoctorWithProfile, PatientWithProfile } from '@/lib/database.types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Initialize auth state from Supabase
  useEffect(() => {
    console.log("Setting up auth state listener");
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, !!session);
        setLoading(true);
        if (session?.user) {
          await fetchUserData(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      console.log("Checking for existing session");
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Existing session:", !!session);
      if (session?.user) {
        await fetchUserData(session.user);
      }
      setLoading(false);
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile data from Supabase
  const fetchUserData = async (supabaseUser: SupabaseUser) => {
    try {
      console.log("Fetching user data for:", supabaseUser.id);
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (profileError || !profile) {
        console.error('Error fetching user profile:', profileError);
        return;
      }

      console.log("Profile fetched:", profile);

      // Based on role, fetch additional data
      let additionalData = {};
      if (profile.role === 'patient') {
        const { data: patient, error } = await supabase
          .from('patients')
          .select('*')
          .eq('id', supabaseUser.id)
          .single();
          
        if (!error && patient) {
          additionalData = patient;
        }
      } else if (profile.role === 'doctor') {
        const { data: doctor, error } = await supabase
          .from('doctors')
          .select('*')
          .eq('id', supabaseUser.id)
          .single();
          
        if (!error && doctor) {
          additionalData = doctor;
        }
      }

      const userData: User = {
        id: supabaseUser.id,
        name: profile.name,
        email: supabaseUser.email || '',
        role: profile.role as UserRole,
        createdAt: new Date(profile.created_at),
        ...additionalData
      };

      console.log("Setting user data:", userData);
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    console.log("Login attempt:", { email, role });
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Login error:", error.message);
        toast.error(error.message || 'Failed to log in');
        setLoading(false);
        return false;
      }

      if (!data.user) {
        console.error("No user returned");
        toast.error('User not found');
        setLoading(false);
        return false;
      }

      console.log("User authenticated:", data.user.id);

      // Check if the user has the correct role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError || !profile) {
        console.error("Profile error:", profileError);
        toast.error('User profile not found');
        await supabase.auth.signOut();
        setLoading(false);
        return false;
      }

      // Allow the user to sign in regardless of their role (for users with multiple roles)
      toast.success(`Welcome back!`);
      
      // Redirect based on the selected role
      switch (role) {
        case 'patient':
          navigate('/patient');
          break;
        case 'doctor':
          navigate('/doctor');
          break;
        case 'hospital':
          navigate('/hospital');
          break;
        case 'caretaker':
          navigate('/caretaker');
          break;
        default:
          navigate('/');
      }
      
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error("Login exception:", error);
      toast.error(error.message || 'An unexpected error occurred');
      setLoading(false);
      return false;
    }
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email || '',
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: userData.role,
          },
          // Make email verification optional
          emailRedirectTo: window.location.origin,
        },
      });
      
      if (error) {
        console.error("Registration error:", error.message);
        toast.error(error.message || 'Failed to register');
        setLoading(false);
        return false;
      }

      if (!data.user) {
        console.error("Registration failed");
        toast.error('Registration failed');
        setLoading(false);
        return false;
      }

      toast.success('Account created successfully');
      
      // Redirect based on role
      if (userData.role) {
        switch (userData.role) {
          case 'patient':
            navigate('/patient');
            break;
          case 'doctor':
            navigate('/doctor');
            break;
          case 'hospital':
            navigate('/hospital');
            break;
          case 'caretaker':
            navigate('/caretaker');
            break;
          default:
            navigate('/');
        }
      }
      
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error("Registration exception:", error);
      toast.error(error.message || 'An unexpected error occurred');
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
