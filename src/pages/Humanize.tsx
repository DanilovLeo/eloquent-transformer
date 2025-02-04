import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const API_KEY = "e7cf14dc-7f79-42c8-9b8b-88484c006486";

interface HumanizeResponse {
  status: string;
  id: string;
}

interface DocumentResponse {
  id: string;
  output: string;
  input: string;
  readability: string;
  createdDate: string;
  purpose: string;
}

const Humanize = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [readability, setReadability] = useState("High School");
  const [purpose, setPurpose] = useState("General Writing");
  const { toast } = useToast();

  const checkDocument = async (id: string) => {
    try {
      const response = await fetch("https://humanize.undetectable.ai/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: API_KEY,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to check document status");
      }

      const data: DocumentResponse = await response.json();
      if (data.output) {
        setOutput(data.output);
        setIsProcessing(false);
        toast({
          title: "Success",
          description: "Text has been humanized successfully!",
        });
      } else {
        setTimeout(() => checkDocument(id), 5000);
      }
    } catch (error) {
      console.error("Error checking document:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to check document status",
      });
      setIsProcessing(false);
    }
  };

  const handleSubmit = async () => {
    if (input.length < 50) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Text must be at least 50 characters long",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch("https://humanize.undetectable.ai/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: API_KEY,
        },
        body: JSON.stringify({
          content: input,
          readability,
          purpose,
          strength: "More Human",
          model: "v11",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit text");
      }

      const data: HumanizeResponse = await response.json();
      checkDocument(data.id);
    } catch (error) {
      console.error("Error submitting text:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit text for humanization",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 gradient-text text-center">
          Humanize Your Text
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-4">Input Text</h2>
              <Textarea
                placeholder="Enter your text here (minimum 50 characters)"
                className="min-h-[300px]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2">Readability Level</label>
                <Select
                  value={readability}
                  onValueChange={setReadability}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High School">High School</SelectItem>
                    <SelectItem value="University">University</SelectItem>
                    <SelectItem value="Doctorate">Doctorate</SelectItem>
                    <SelectItem value="Journalist">Journalist</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm mb-2">Purpose</label>
                <Select
                  value={purpose}
                  onValueChange={setPurpose}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Writing">General Writing</SelectItem>
                    <SelectItem value="Essay">Essay</SelectItem>
                    <SelectItem value="Article">Article</SelectItem>
                    <SelectItem value="Marketing Material">Marketing Material</SelectItem>
                    <SelectItem value="Story">Story</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-90"
              onClick={handleSubmit}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Humanize Text"
              )}
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Output Text</h2>
            <div className="min-h-[300px] p-4 bg-secondary/30 rounded-lg">
              {output ? (
                <p className="highlight-change">{output}</p>
              ) : (
                <p className="text-muted-foreground">
                  Humanized text will appear here...
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Humanize;