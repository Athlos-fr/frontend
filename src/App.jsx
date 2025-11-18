import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import Layout from "./components/layout/layout";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      {/* The Layout wrapper (Navbar + Footer) */}
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route path="profile" element={<ProfilePage />} />

        {/* Catch-all: Redirect unknown URLs to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
