import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Sparkles, FileText, Zap } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 gradient-text leading-tight">
            Transform AI Text into
            <br />
            Natural Writing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our advanced AI technology transforms machine-generated text into natural, human-like writing that passes all detection tools.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-90"
              onClick={() => navigate("/humanize")}
            >
              Start Humanizing
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/pricing")}
            >
              View Pricing
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 bg-card hover:bg-secondary/50 transition-colors">
            <Sparkles className="w-12 h-12 mb-6 text-purple-400" />
            <h3 className="text-xl font-semibold mb-4">Natural Language</h3>
            <p className="text-muted-foreground">
              Our AI transforms text to match natural human writing patterns and styles
            </p>
          </Card>
          <Card className="p-8 bg-card hover:bg-secondary/50 transition-colors">
            <FileText className="w-12 h-12 mb-6 text-pink-400" />
            <h3 className="text-xl font-semibold mb-4">Multiple Styles</h3>
            <p className="text-muted-foreground">
              Choose from academic, professional, or casual writing styles to match your needs
            </p>
          </Card>
          <Card className="p-8 bg-card hover:bg-secondary/50 transition-colors">
            <Zap className="w-12 h-12 mb-6 text-purple-400" />
            <h3 className="text-xl font-semibold mb-4">Real-time Processing</h3>
            <p className="text-muted-foreground">
              See your text transform instantly with highlighted changes and improvements
            </p>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to humanize your text?</h2>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-90"
            onClick={() => navigate("/humanize")}
          >
            Try It Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;