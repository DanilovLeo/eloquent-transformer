
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "humanize": "Humanize",
      "pricing": "Pricing",
      "signIn": "Sign In",
      "signOut": "Sign Out",
      "inputText": "Enter your text here",
      "uploadFile": "Upload File",
      "download": "Download",
      "copyright": "© 2024 AI Humanizer. All rights reserved.",
      // Home page
      "heroTitle": "Transform AI Text into Natural Writing",
      "heroSubtitle": "Our advanced AI technology transforms machine-generated text into natural, human-like writing that passes all detection tools.",
      "startHumanizing": "Start Humanizing",
      "viewPricing": "View Pricing",
      "featureNaturalTitle": "Natural Language",
      "featureNaturalDesc": "Our AI transforms text to match natural human writing patterns and styles",
      "featureStylesTitle": "Multiple Styles",
      "featureStylesDesc": "Choose from academic, professional, or casual writing styles to match your needs",
      "featureProcessingTitle": "Real-time Processing",
      "featureProcessingDesc": "See your text transform instantly with highlighted changes and improvements",
      "readyToStart": "Ready to humanize your text?",
      "tryItNow": "Try It Now",
      // Pricing page
      "pricingTitle": "Simple, Transparent Pricing",
      "pricingSubtitle": "Choose the plan that best fits your needs",
      "monthlyPlan": "Monthly",
      "yearlyPlan": "Yearly",
      "businessPlan": "For Business",
      "monthlyDesc": "The flexible option for individuals who want to create high quality content.",
      "yearlyDesc": "Best value for consistent content creation needs.",
      "businessDesc": "Need bulk credits? Looking for permanent words with no monthly expiration?",
      "getStarted": "Get Started",
      "cancelAnytime": "Cancel Anytime",
      "features": "Quick look at features:",
      // Humanize page
      "humanizeTitle": "Humanize Your Text",
      "directInput": "Direct Text Input",
      "fileUpload": "File Upload",
      "dropText": "Drag & drop a file here, or click to select",
      "supportedFormats": "Supported formats: .txt, .docx, .pdf",
      "selectedFile": "Selected file:",
      "readabilityLevel": "Readability Level",
      "purpose": "Purpose",
      "outputText": "Output Text",
      "processing": "Processing...",
      // Auth page
      "welcomeBack": "Welcome Back",
      "createAccount": "Create Account",
      "email": "Email",
      "password": "Password",
      "orContinueWith": "Or continue with",
      "signInWithGoogle": "Sign in with Google",
      "signUp": "Sign Up",
      // New home page sections
      "whyChooseUs": "Why Choose AI Humanizer",
      "securityTitle": "Secure & Private",
      "securityDesc": "Your content is encrypted and never stored permanently",
      "aiTitle": "Advanced AI",
      "aiDesc": "State-of-the-art AI models for natural text transformation",
      "speedTitle": "Lightning Fast",
      "speedDesc": "Get results in seconds, not minutes",
      "contact": "Contacts",
      "contacts": "Contacts",
      "info": "Info",
      "newCompanyDescription": "We are a new startup which provides its users the ability to get access to the cutting age approach of humanizing the AI written texts in different spheres such as Marketing, Academic and Article.",
      "newFeedbackMessage": "Please send your feedback, we will take into account your recommendations"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

