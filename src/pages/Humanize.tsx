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
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Download } from "lucide-react";
import { useDropzone } from 'react-dropzone';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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
  const [activeTab, setActiveTab] = useState("text");
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const { toast } = useToast();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFileName(file.name);
        if (file.type === 'text/plain') {
          const text = await file.text();
          setFileContent(text);
          setInput(text);
        } else {
          toast({
            title: "File Upload",
            description: "File uploaded successfully. Processing...",
          });
          // In a real implementation, we would handle PDF and DOCX conversion here
          // For now, we'll just show a message
          setFileContent("File content would be processed here");
          setInput("File content would be processed here");
        }
      }
    }
  });

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
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to check document status");
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
        description: error.message || "Failed to check document status",
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
        const errorData = await response.json();
        if (errorData.error === "Insufficient credits") {
          throw new Error("You have insufficient credits. Please purchase more credits to continue using the service.");
        }
        throw new Error(errorData.error || "Failed to submit text");
      }

      const data: HumanizeResponse = await response.json();
      checkDocument(data.id);
    } catch (error) {
      console.error("Error submitting text:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to submit text for humanization",
      });
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `humanized-${fileName || 'text'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 gradient-text text-center animate-fade-in">
          Humanize Your Text
        </h1>

        <Tabs defaultValue="text" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="text">Direct Text Input</TabsTrigger>
            <TabsTrigger value="file">File Upload</TabsTrigger>
          </TabsList>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 animate-fade-in">
              <TabsContent value="text" className="mt-0">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-4">Input Text</h2>
                  <Textarea
                    placeholder="Enter your text here (minimum 50 characters)"
                    className="min-h-[300px] transition-all duration-300"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="file" className="mt-0">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-4">Upload File</h2>
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-primary/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                  >
                    <input {...getInputProps()} />
                    <Upload className="mx-auto mb-4 text-primary" />
                    <p>Drag & drop a file here, or click to select</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Supported formats: .txt, .docx, .pdf
                    </p>
                  </div>
                  {fileName && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Selected file: {fileName}
                    </p>
                  )}
                </div>
              </TabsContent>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm mb-2">Readability Level</label>
                  <Select value={readability} onValueChange={setReadability}>
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
                  <Select value={purpose} onValueChange={setPurpose}>
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

            <Card className="p-6 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Output Text</h2>
                {output && (
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                )}
              </div>
              <div className="min-h-[300px] p-4 bg-secondary/30 rounded-lg overflow-auto">
                {output ? (
                  <p className="highlight-change animate-fade-in">{output}</p>
                ) : (
                  <p className="text-muted-foreground">
                    Humanized text will appear here...
                  </p>
                )}
              </div>
            </Card>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Humanize;