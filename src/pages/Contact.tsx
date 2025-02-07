
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  
  const handleEmailClick = () => {
    window.location.href = "mailto:humanizingaisupport@gmail.com";
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 gradient-text">{t('aboutUs')}</h1>
        
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('ourMission')}</h2>
          <p className="text-lg text-muted-foreground mb-6">
            {t('companyDescription')}
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{t('contactUs')}</h2>
          <p className="text-lg text-muted-foreground mb-6">
            {t('feedbackMessage')}
          </p>
          
          <Button
            onClick={handleEmailClick}
            className="gap-2 bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-90"
          >
            <Mail className="h-4 w-4" />
            humanizingaisupport@gmail.com
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
