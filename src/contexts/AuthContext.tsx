
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  wordCredits: number;
  useWords: (words: number) => Promise<boolean>;
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
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchWordCredits(session.user.id);
          if (event === 'SIGNED_IN') {
            navigate('/humanize');
          }
        }
        setLoading(false);
      });

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
    }
  }, [navigate]);

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

  const useWords = async (words: number): Promise<boolean> => {
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

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    
    if (error) {
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });
    
    if (error) {
      throw error;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    navigate('/');
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
