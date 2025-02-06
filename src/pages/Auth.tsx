import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleEmailAuth = async (isSignUp: boolean) => {
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      navigate("/humanize");
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/humanize");
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 backdrop-blur-sm bg-background/95 shadow-xl border-2 border-primary/20">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signin">{t("signIn")}</TabsTrigger>
                <TabsTrigger value="signup">{t("signUp")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4">
                <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  {t("welcomeBack")}
                </h2>
                <Input
                  type="email"
                  placeholder={t("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-primary/20"
                />
                <Input
                  type="password"
                  placeholder={t("password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-primary/20"
                />
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-purple-500 hover:opacity-90"
                  onClick={() => handleEmailAuth(false)}
                >
                  {t("signIn")}
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  {t("createAccount")}
                </h2>
                <Input
                  type="email"
                  placeholder={t("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-primary/20"
                />
                <Input
                  type="password"
                  placeholder={t("password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-primary/20"
                />
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-purple-500 hover:opacity-90"
                  onClick={() => handleEmailAuth(true)}
                >
                  {t("signUp")}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-primary/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {t("orContinueWith")}
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-4 border-primary/20 hover:bg-primary/5"
                onClick={handleGoogleSignIn}
              >
                {t("signInWithGoogle")}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;