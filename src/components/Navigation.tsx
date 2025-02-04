import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-sm bg-background/80">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold gradient-text">
            AI Humanizer
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/humanize">
              <Button variant="ghost">Humanize</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};