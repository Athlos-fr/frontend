import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // (If you have it)
import { AuthProvider } from "./context/AuthContext.jsx"; // Import it

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {" "}
      {/* Wrap the App */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
