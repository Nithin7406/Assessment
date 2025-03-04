import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { app } from "./firebaseConfig"; // Import Firebase setup

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
