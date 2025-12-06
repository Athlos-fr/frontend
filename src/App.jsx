import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateCompetitionPage from "./pages/CreateCompetitionPage";
import CompetitionDetailsPage from "./pages/CompetitionDetailsPage";
import LogActivityPage from "./pages/LogActivityPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
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

        {/* Redirect root "/" to dashboard (which will redirect to login if needed) */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
