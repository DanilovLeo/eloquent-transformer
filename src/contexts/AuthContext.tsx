
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  wordCredits: number;
  useWords: (words: number) => boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const FREE_WORD_CREDITS = 200;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [wordCredits, setWordCredits] = useState(FREE_WORD_CREDITS);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Set up Supabase auth state listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchWordCredits(session.user.id);
        }
        setLoading(false);
      });

      // Initial session check
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchWordCredits(session.user.id);
        }
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error("Auth initialization error:", error);
      setLoading(false);
      toast({
        title: "Authentication Error",
        description: "There was a problem initializing authentication. Please try again later.",
        variant: "destructive",
      });
    }
  }, []);

  const fetchWordCredits = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('word_credits')
        .eq('id', userId)
        .single();

      if (error) throw error;
      if (data) {
        setWordCredits(data.word_credits);
      }
    } catch (error) {
      console.error("Error fetching word credits:", error);
    }
  };

  const useWords = async (words: number) => {
    if (!user) return false;
    
    if (wordCredits >= words) {
      const newCredits = wordCredits - words;
      const { error } = await supabase
        .from('profiles')
        .update({ word_credits: newCredits })
        .eq('id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update word credits. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      setWordCredits(newCredits);
      return true;
    }

    toast({
      title: "Insufficient Credits",
      description: "You've run out of free word credits. Please upgrade your plan to continue.",
      variant: "destructive",
    });
    navigate('/pricing');
    return false;
  };

  const handleAuthError = (error: any) => {
    console.error("Auth error:", error);
    let message = "An error occurred during authentication.";
    
    if (error.message) {
      message = error.message;
    }

    toast({
      title: "Authentication Error",
      description: message,
      variant: "destructive",
    });
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      handleAuthError(error);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      handleAuthError(error);
    }
  };

  const value = {
    user,
    loading,
    wordCredits,
    useWords,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
