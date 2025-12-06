import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import competitionService from "../services/competitionService";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompetitions = async () => {
      console.log("Dashboard: Starting fetch..."); // Debug Log
      try {
        const data = await competitionService.getAllCompetitions();
        console.log("Dashboard: Data received", data); // Debug Log

        // Ensure we are setting the array correctly based on backend response structure
        // Backend sends: { success: true, data: { competitions: [...] } }
        const compList = data.data?.competitions || [];
        setCompetitions(compList);
      } catch (err) {
        console.error("Dashboard: Fetch failed", err);
        setError("Failed to load competitions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header Section */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          paddingBottom: "1rem",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Welcome, {user?.username}! 🏆</h1>
          <p style={{ color: "gray", margin: "0.5rem 0 0 0" }}>
            Ready to compete?
          </p>
        </div>
        <button
          onClick={logout}
          style={{
            padding: "0.5rem 1rem",
            cursor: "pointer",
            backgroundColor: "#f8f9fa",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h3>Available Competitions</h3>
          <button
            onClick={() => navigate("/create-competition")}
            style={{
              padding: "0.5rem 1rem",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            + Create New
          </button>
        </div>

        {/* Loading State */}
        {loading && <p>Loading games...</p>}

        {/* Error State */}
        {error && (
          <div
            style={{
              color: "red",
              background: "#fff0f0",
              padding: "1rem",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && competitions.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              background: "#f9f9f9",
              borderRadius: "8px",
            }}
          >
            <p>No competitions found. Create one to get started!</p>
          </div>
        )}

        {/* List of Competitions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {competitions.map((comp) => (
            <div
              key={comp._id || comp.id}
              style={{
                border: "1px solid #e0e0e0",
                padding: "1.5rem",
                borderRadius: "8px",
                background: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.2rem" }}>
                {comp.title}
              </h4>

              <div
                style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
              >
                <span
                  style={{
                    background: "#e3f2fd",
                    color: "#0d47a1",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    textTransform: "capitalize",
                  }}
                >
                  {comp.category}
                </span>
                <span
                  style={{
                    background:
                      comp.status === "active" ? "#e8f5e9" : "#fafafa",
                    color: comp.status === "active" ? "#1b5e20" : "#757575",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    textTransform: "capitalize",
                  }}
                >
                  {comp.status}
                </span>
              </div>

              <p
                style={{
                  margin: "0 0 1rem 0",
                  fontSize: "0.9rem",
                  color: "#666",
                }}
              >
                <strong>Goal:</strong> {comp.winCondition?.targetValue || "Max"}{" "}
                {comp.winCondition?.metric}
              </p>

              <button
                onClick={() => navigate(`/competitions/${comp._id || comp.id}`)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  background: "white",
                  border: "1px solid #007bff",
                  color: "#007bff",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                View Leaderboard
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
