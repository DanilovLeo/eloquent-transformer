import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, LogIn, LogOut } from "lucide-react";

export const Navigation = () => {
  const { user, signInWithGoogle, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'ru', name: 'Русский' },
    { code: 'ar', name: 'العربية' },
    { code: 'de', name: 'Deutsch' },
    { code: 'sv', name: 'Svenska' },
    { code: 'fr', name: 'Français' }
  ];

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-sm bg-background/80">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold gradient-text">
            AI Humanizer
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/humanize">
              <Button variant="ghost">{t('humanize')}</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="ghost">{t('pricing')}</Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <Button variant="ghost" onClick={logout}>
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
  );
};