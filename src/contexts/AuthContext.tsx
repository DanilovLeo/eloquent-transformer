
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false);
      });

      return unsubscribe;
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

  const handleAuthError = (error: any) => {
    console.error("Auth error:", error);
    let message = "An error occurred during authentication.";
    
    if (error.code === 'auth/unauthorized-domain') {
      message = "This domain is not authorized for authentication. Please contact support.";
    } else if (error.code === 'auth/configuration-not-found') {
      message = "Authentication service is not properly configured. Please try again later.";
    } else if (error.code === 'auth/popup-closed-by-user') {
      message = "Authentication was cancelled. Please try again.";
    }

    toast({
      title: "Authentication Error",
      description: message,
      variant: "destructive",
    });
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const value = {
    user,
    loading,
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
