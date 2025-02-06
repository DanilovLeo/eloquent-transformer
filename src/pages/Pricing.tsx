import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const calculatePrice = (words: number, isMonthly: boolean) => {
  const minWords = 10000;
  const maxWords = 380000;
  const minPrice = isMonthly ? 11.99 : 4.99;
  const maxPrice = isMonthly ? 199.99 : 149.99;
  
  const priceRange = maxPrice - minPrice;
  const wordRange = maxWords - minWords;
  const pricePerWord = priceRange / wordRange;
  
  const price = minPrice + (words - minWords) * pricePerWord;
  return Math.round(price * 100) / 100;
};

const PricingCard = ({
  title,
  description,
  price,
  words,
  features,
  discount,
  isCustom = false,
  onWordsChange,
  isPopular = false,
}: {
  title: string;
  description: string;
  price: number;
  words: number;
  features: string[];
  discount?: string;
  isCustom?: boolean;
  onWordsChange?: (value: number) => void;
  isPopular?: boolean;
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePricingClick = () => {
    if (!user) {
      navigate('/auth');
    } else {
      // Here we'll implement Stripe checkout
      console.log('Implement Stripe checkout');
    }
  };

  return (
    <Card className={`p-8 flex flex-col justify-between bg-card hover:bg-secondary/50 transition-colors relative ${isPopular ? 'border-2 border-purple-400' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-400 to-pink-600 text-white px-4 py-1 rounded-full text-sm">
          Limited Time - 50% Off
        </div>
      )}
      <div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        {!isCustom ? (
          <>
            <div className="mb-6">
              <p className="text-4xl font-bold mb-2">
                ${price}
                <span className="text-lg font-normal text-muted-foreground">/mo</span>
              </p>
              {discount && (
                <p className="text-sm text-orange-400">{discount}</p>
              )}
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>10,000</span>
                <span>380,000</span>
              </div>
              {onWordsChange && (
                <Slider
                  defaultValue={[words]}
                  max={380000}
                  min={10000}
                  step={1000}
                  onValueChange={(value) => onWordsChange(value[0])}
                />
              )}
              <p className="text-center mt-2">{words.toLocaleString()} words/month</p>
            </div>
          </>
        ) : (
          <div className="mb-6">
            <Label htmlFor="custom-words">How many words do you need?</Label>
            <Input
              id="custom-words"
              placeholder="E.g. 500,000"
              className="mt-2"
            />
          </div>
        )}

        <Button
          className={`w-full mb-4 ${
            isPopular
              ? 'bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-90'
              : ''
          }`}
          variant={isPopular ? 'default' : 'outline'}
          onClick={handlePricingClick}
        >
          Get Started
        </Button>
        
        <p className="text-center text-sm text-muted-foreground mb-6">
          Cancel Anytime
        </p>

        <h4 className="font-semibold mb-4">Quick look at features:</h4>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-purple-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

const Pricing = () => {
  const [monthlyWords, setMonthlyWords] = useState(15000);
  const [yearlyWords, setYearlyWords] = useState(380000);

  const monthlyPrice = calculatePrice(monthlyWords, true);
  const yearlyPrice = calculatePrice(yearlyWords, false);

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
            title="Monthly"
            description="The flexible option for individuals who want to create high quality content."
            price={monthlyPrice}
            words={monthlyWords}
            onWordsChange={setMonthlyWords}
            features={[
              "Passes AI detectors",
              "High quality, legible content",
              "Watermark and future proof",
              "Writing level matching"
            ]}
            discount="0% Discount"
          />
          <PricingCard
            title="Yearly"
            description="Best value for consistent content creation needs."
            price={yearlyPrice}
            words={yearlyWords}
            onWordsChange={setYearlyWords}
            features={[
              "Passes AI detectors",
              "High quality, legible content",
              "Watermark and future proof",
              "Writing level matching"
            ]}
            discount="6 Months Free"
            isPopular={true}
          />
          <PricingCard
            title="For Business"
            description="Need bulk credits? Looking for permanent words with no monthly expiration?"
            price={0}
            words={0}
            features={[
              "Custom Pricing & Plans",
              "Non-expiring credits",
              "Redistribution & white labeling",
              "Built to fit your needs",
              "API compatible"
            ]}
            isCustom={true}
            discount="Custom Discount"
          />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
