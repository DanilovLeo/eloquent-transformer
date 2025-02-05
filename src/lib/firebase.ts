import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGiUAL_ux9Jv2hgc-H4pGdPtzXyBl4rUo",
  authDomain: "humanizing-ai.firebaseapp.com",
  projectId: "humanizing-ai",
  storageBucket: "humanizing-ai.firebasestorage.app",
  messagingSenderId: "854011482336",
  appId: "1:854011482336:web:637961c6c2f6f4bc864085",
  measurementId: "G-9D5BYS6P16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Auth
export const auth = getAuth(app);

// Export app instance if needed elsewhere
export default app;