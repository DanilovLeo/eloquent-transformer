
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";

const Contact = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:humanizingaisupport@gmail.com";
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 gradient-text">About Us</h1>
        
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-6">
            We are a new startup which provides its users the ability to get access to the cutting edge approach of humanizing AI written texts in different spheres such as Marketing, Academic and Article.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Please send your feedback, we will take into account your recommendations
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
