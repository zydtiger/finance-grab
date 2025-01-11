/**
 * The application entry point that creates the React root.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import React from "react";
import ReactDOM from "react-dom/client";
import ThemeProvider from "./theme/ThemeProvider";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
