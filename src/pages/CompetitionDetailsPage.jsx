import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import competitionService from "../services/competitionService";
import { useAuth } from "../context/AuthContext";
import ActivityFeed from "../components/ActivityFeed";

const CompetitionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        const data = await competitionService.getCompetition(id);
        setCompetition(data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load competition details");
      } finally {
        setLoading(false);
      }
    };

    fetchCompetition();
  }, [id]);

  if (loading) return <div style={{ padding: "2rem" }}>Loading Arena...</div>;
  if (error)
    return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;
  if (!competition) return null;

  // Check if current user is in the competition
  const isParticipant = competition.participants.some(
    (p) => p.user._id === user._id || p.user === user._id
  );

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: "1rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#666",
        }}
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <header
        style={{
          marginBottom: "2rem",
          borderBottom: "1px solid #eee",
          paddingBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0 }}>{competition.title}</h1>
          <span
            style={{
              background: competition.status === "active" ? "#e8f5e9" : "#eee",
              color: competition.status === "active" ? "green" : "gray",
              padding: "0.25rem 0.75rem",
              borderRadius: "20px",
              fontSize: "0.9rem",
            }}
          >
            {competition.status.toUpperCase()}
          </span>
        </div>
        <p style={{ color: "#666", marginTop: "0.5rem" }}>
          Goal: {competition.winCondition.targetValue}{" "}
          {competition.winCondition.metric}
        </p>
      </header>

      {/* Actions */}
      <div style={{ marginBottom: "2rem" }}>
        {isParticipant && competition.status === "active" && (
          <button
            onClick={() => navigate(`/competitions/${id}/log`)}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            + Log Activity
          </button>
        )}
      </div>

      {/* Leaderboard */}
      <section>
        <h3>Leaderboard</h3>
        <div
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f8f9fa" }}>
              <tr>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  Rank
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  Player
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "right",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {competition.participants.map((p) => {
                const isMe = p.user._id === user._id || p.user === user._id;
                return (
                  <tr
                    key={p._id}
                    style={{ background: isMe ? "#f0f7ff" : "white" }}
                  >
                    <td
                      style={{
                        padding: "1rem",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {p.rank === 1
                        ? "🥇"
                        : p.rank === 2
                        ? "🥈"
                        : p.rank === 3
                        ? "🥉"
                        : `#${p.rank}`}
                    </td>
                    <td
                      style={{
                        padding: "1rem",
                        borderBottom: "1px solid #eee",
                        fontWeight: isMe ? "bold" : "normal",
                      }}
                    >
                      {p.user.username} {isMe && "(You)"}
                    </td>
                    <td
                      style={{
                        padding: "1rem",
                        textAlign: "right",
                        borderBottom: "1px solid #eee",
                        fontWeight: "bold",
                      }}
                    >
                      {p.currentScore}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      {/* --- NEW: Activity Feed Section --- */}
      <section>
        <h3>Recent Activity</h3>
        <div
          style={{
            background: "#fafafa",
            padding: "1.5rem",
            borderRadius: "8px",
          }}
        >
          <ActivityFeed competitionId={id} />
        </div>
      </section>
    </div>
  );
};

export default CompetitionDetailsPage;
