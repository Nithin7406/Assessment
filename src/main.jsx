import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6WgAIlQuuYTONlHIeeA6dRTZWxP3ER9M",
  authDomain: "geekonomy-technologies-project.firebaseapp.com",
  projectId: "geekonomy-technologies-project",
  storageBucket: "geekonomy-technologies-project.firebasestorage.app",
  messagingSenderId: "883452632665",
  appId: "1:883452632665:web:6c82b4dea8e0a11b705b48",
  measurementId: "G-63J7DDCM8C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
