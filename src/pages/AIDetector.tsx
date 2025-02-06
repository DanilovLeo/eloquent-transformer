
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const AIDetector = () => {
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const detectAI = async () => {
    if (text.length < 50) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter at least 50 characters",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch("https://api.openai-detector.com/api/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze text");
      }

      const data = await response.json();
      setResult(data.score * 100);
      
      toast({
        title: "Analysis Complete",
        description: "Text has been analyzed successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to analyze text. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 gradient-text">AI Content Detector</h1>
        
        <Card className="p-6 mb-8">
          <div className="mb-4">
            <Textarea
              placeholder="Enter your text here (minimum 50 characters)"
              className="min-h-[200px]"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <Button
            className="w-full bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-90"
            onClick={detectAI}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Detect AI Content"
            )}
          </Button>
        </Card>

        {result !== null && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>
            <Progress value={result} className="mb-2" />
            <p className="text-center text-sm text-muted-foreground">
              {result}% likely to be AI-generated
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AIDetector;
