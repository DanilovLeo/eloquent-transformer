import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 gradient-text">
            AI Text Humanizer
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Transform AI-generated text into natural, human-like writing
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-90"
            onClick={() => navigate("/humanize")}
          >
            Start Humanizing
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 bg-card hover:bg-secondary/50 transition-colors">
            <h3 className="text-xl font-semibold mb-4">Natural Language</h3>
            <p className="text-muted-foreground">
              Our AI transforms text to match natural human writing patterns
            </p>
          </Card>
          <Card className="p-6 bg-card hover:bg-secondary/50 transition-colors">
            <h3 className="text-xl font-semibold mb-4">Multiple Styles</h3>
            <p className="text-muted-foreground">
              Choose from academic, professional, or casual writing styles
            </p>
          </Card>
          <Card className="p-6 bg-card hover:bg-secondary/50 transition-colors">
            <h3 className="text-xl font-semibold mb-4">Real-time Processing</h3>
            <p className="text-muted-foreground">
              See your text transform instantly with highlighted changes
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;