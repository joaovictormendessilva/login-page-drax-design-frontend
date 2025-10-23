import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { App } from "./App";
import "./index.css";
import { SENTRY_KEY } from "./utils/env-keys";

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: SENTRY_KEY,
  sendDefaultPii: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ToastContainer />
  </StrictMode>,
);
