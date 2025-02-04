import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const PricingCard = ({
  title,
  price,
  yearlyPrice,
  features,
  isPopular = false,
  isEnterprise = false,
}: {
  title: string;
  price: number;
  yearlyPrice?: number;
  features: string[];
  isPopular?: boolean;
  isEnterprise?: boolean;
}) => {
  return (
    <Card className={`p-8 flex flex-col justify-between bg-card hover:bg-secondary/50 transition-colors relative ${isPopular ? 'border-2 border-purple-400' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-400 to-pink-600 text-white px-4 py-1 rounded-full text-sm">
          Most Popular
        </div>
      )}
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
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-purple-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button
        className={`w-full ${
          isPopular
            ? 'bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-90'
            : ''
        }`}
        variant={isPopular ? 'default' : 'outline'}
      >
        {isEnterprise ? 'Contact Sales' : 'Get Started'}
      </Button>
    </Card>
  );
};

const Pricing = () => {
  return (
    <div className="min-h-screen pt-20">
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
            isPopular={true}
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