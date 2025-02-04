import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PricingCard = ({
  title,
  price,
  yearlyPrice,
  features,
  isEnterprise = false,
}: {
  title: string;
  price: number;
  yearlyPrice?: number;
  features: string[];
  isEnterprise?: boolean;
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: isEnterprise ? "custom" : "price_id_here", // You'll need to replace this with actual Stripe price IDs
          planType: title.toLowerCase(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initiate checkout. Please try again.",
      });
    }
  };

  return (
    <Card className="p-6 flex flex-col justify-between bg-card hover:bg-secondary/50 transition-colors">
      <div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <div className="mb-6">
          {!isEnterprise ? (
            <>
              <p className="text-4xl font-bold mb-2">
                ${price}
                <span className="text-lg font-normal text-muted-foreground">
                  /mo
                </span>
              </p>
              {yearlyPrice && (
                <p className="text-sm text-muted-foreground">
                  ${yearlyPrice}/year (save 17%)
                </p>
              )}
            </>
          ) : (
            <p className="text-4xl font-bold mb-2">Custom</p>
          )}
        </div>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button
        className="w-full bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-90"
        onClick={handleSubscribe}
      >
        {isEnterprise ? "Contact Sales" : "Subscribe Now"}
      </Button>
    </Card>
  );
};

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 gradient-text">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard
            title="Basic"
            price={11.99}
            yearlyPrice={119.90}
            features={[
              "50,000 words per month",
              "High School & University readability",
              "Basic support",
              "Standard processing speed",
              "3 writing purposes"
            ]}
          />
          <PricingCard
            title="Pro"
            price={24.99}
            yearlyPrice={249.90}
            features={[
              "150,000 words per month",
              "All readability levels",
              "Priority support",
              "Faster processing speed",
              "All writing purposes",
              "Advanced humanization options"
            ]}
          />
          <PricingCard
            title="Enterprise"
            price={0}
            features={[
              "Unlimited words",
              "All features included",
              "24/7 Premium support",
              "Fastest processing speed",
              "Custom API access",
              "Dedicated account manager",
              "Custom integration options"
            ]}
            isEnterprise={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Pricing;