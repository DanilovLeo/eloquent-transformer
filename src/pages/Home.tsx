import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sparkles, FileText, Zap, Shield, Brain, Rocket } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleStartHumanizing = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 gradient-text leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-90"
              onClick={handleStartHumanizing}
            >
              {t("startHumanizing")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/pricing")}
            >
              {t("viewPricing")}
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 bg-card hover:bg-secondary/50 transition-colors">
            <Sparkles className="w-12 h-12 mb-6 text-purple-400" />
            <h3 className="text-xl font-semibold mb-4">{t("featureNaturalTitle")}</h3>
            <p className="text-muted-foreground">
              {t("featureNaturalDesc")}
            </p>
          </Card>
          <Card className="p-8 bg-card hover:bg-secondary/50 transition-colors">
            <FileText className="w-12 h-12 mb-6 text-pink-400" />
            <h3 className="text-xl font-semibold mb-4">{t("featureStylesTitle")}</h3>
            <p className="text-muted-foreground">
              {t("featureStylesDesc")}
            </p>
          </Card>
          <Card className="p-8 bg-card hover:bg-secondary/50 transition-colors">
            <Zap className="w-12 h-12 mb-6 text-purple-400" />
            <h3 className="text-xl font-semibold mb-4">{t("featureProcessingTitle")}</h3>
            <p className="text-muted-foreground">
              {t("featureProcessingDesc")}
            </p>
          </Card>
        </div>

        {/* New sections */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">{t("whyChooseUs")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8">
              <Shield className="w-12 h-12 mb-6 text-purple-400" />
              <h3 className="text-xl font-semibold mb-4">{t("securityTitle")}</h3>
              <p className="text-muted-foreground">{t("securityDesc")}</p>
              <Button 
                className="mt-6"
                variant="outline"
                onClick={handleStartHumanizing}
              >
                {t("startHumanizing")}
              </Button>
            </Card>
            <Card className="p-8">
              <Brain className="w-12 h-12 mb-6 text-pink-400" />
              <h3 className="text-xl font-semibold mb-4">{t("aiTitle")}</h3>
              <p className="text-muted-foreground">{t("aiDesc")}</p>
              <Button 
                className="mt-6"
                variant="outline"
                onClick={handleStartHumanizing}
              >
                {t("startHumanizing")}
              </Button>
            </Card>
            <Card className="p-8">
              <Rocket className="w-12 h-12 mb-6 text-purple-400" />
              <h3 className="text-xl font-semibold mb-4">{t("speedTitle")}</h3>
              <p className="text-muted-foreground">{t("speedDesc")}</p>
              <Button 
                className="mt-6"
                variant="outline"
                onClick={handleStartHumanizing}
              >
                {t("startHumanizing")}
              </Button>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">{t("readyToStart")}</h2>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-90"
            onClick={handleStartHumanizing}
          >
            {t("tryItNow")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;