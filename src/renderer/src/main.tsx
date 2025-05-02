import "./assets/main.css";

import App from "./App";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const root: HTMLElement | null = document.getElementById("root");

if (!root) {
  throw new Error("root document not found.");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
