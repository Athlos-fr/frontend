import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";

// Pages
import LoginPage from "./pages/LoginPage";
import DiscoverPage from "./pages/DiscoverPage";
import MyCompetitionsPage from "./pages/MyCompetitionsPage";
import CreateCompetitionPage from "./pages/CreateCompetitionPage";
import CompetitionDetailsPage from "./pages/CompetitionDetailsPage";
import LogActivityPage from "./pages/LogActivityPage";
import ProfilePage from "./pages/ProfilePage";
import FriendsPage from "./pages/FriendsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        {/* Login Page (No Navbar) */}
        <Route path="/login" element={<LoginPage />} />

        {/* APP LAYOUT ROUTES (With Navbar) */}
        <Route element={<Layout />}>
          {/* 1. Public Landing Page (Discover) */}
          <Route path="/" element={<DiscoverPage />} />

          {/* 2. Protected Pages */}
          <Route
            path="/my-competitions"
            element={
              <ProtectedRoute>
                <MyCompetitionsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/friends"
            element={
              <ProtectedRoute>
                <FriendsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-competition"
            element={
              <ProtectedRoute>
                <CreateCompetitionPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/competitions/:id"
            element={
              <ProtectedRoute>
                <CompetitionDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/competitions/:id/log"
            element={
              <ProtectedRoute>
                <LogActivityPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Redirects & 404 */}
        {/* If user tries accessing /dashboard (old link), send them to My Competitions */}
        <Route
          path="/dashboard"
          element={<Navigate to="/my-competitions" replace />}
        />

        <Route
          path="*"
          element={
            <div className="p-8 text-center text-gray-500">
              404 - Page not found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
