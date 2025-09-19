import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ParamStoreProvider } from "./ParamStore";
import { StoredStateStoreProvider } from "./StoredStateStore.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ParamStoreProvider>
      <StoredStateStoreProvider>
        <App />
      </StoredStateStoreProvider>
    </ParamStoreProvider>
  </StrictMode>
);
