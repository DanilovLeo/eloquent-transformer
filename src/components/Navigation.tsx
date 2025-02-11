
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { LogIn, LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export const Navigation = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleSignOutClick = () => {
    setShowSignOutDialog(true);
  };

  const handleSignOutConfirm = async () => {
    await logout();
    setShowSignOutDialog(false);
    navigate('/');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-sm bg-background/80">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold gradient-text">
              Humanizing.ai
            </Link>
            <div className="flex items-center gap-4">
              {user && (
                <Link to="/humanize">
                  <Button variant="ghost">{t('humanize')}</Button>
                </Link>
              )}
              <Link to="/pricing">
                <Button variant="ghost">{t('pricing')}</Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost">{t('contacts')}</Button>
              </Link>

              {user ? (
                <Button variant="ghost" onClick={handleSignOutClick}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('signOut')}
                </Button>
              ) : (
                <Button variant="default" onClick={handleAuthClick}>
                  <LogIn className="mr-2 h-4 w-4" />
                  {t('signIn')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AlertDialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">Ready to leave?</AlertDialogTitle>
            <AlertDialogDescription className="text-lg">
              Thank you for using AI Humanizer. We hope to see you again soon!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleSignOutConfirm}
              className="bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-90"
            >
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
