import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ParamStoreProvider } from "./ParamStore";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ParamStoreProvider>
      <App />
    </ParamStoreProvider>
  </StrictMode>
);
