import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import competitionService from "../services/competitionService";

const LogActivityPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    value: "",
    description: "",
    proofUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await competitionService.logActivity(id, {
        value: Number(formData.value),
        description: formData.description,
        proofUrl: formData.proofUrl,
      });

      alert("Activity Logged! Points added. 🚀");
      navigate(`/competitions/${id}`); // Go back to Leaderboard
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to log activity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <button
        onClick={() => navigate(`/competitions/${id}`)}
        style={{
          marginBottom: "1rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#666",
        }}
      >
        ← Back to Leaderboard
      </button>

      <h2>Log Activity</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.5rem" }}>
        {/* Value Input */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Amount (Value)
          </label>
          <input
            type="number"
            name="value"
            step="0.1"
            value={formData.value}
            onChange={handleChange}
            required
            placeholder="e.g. 5 (for 5km)"
            style={{ width: "100%", padding: "0.75rem", fontSize: "1rem" }}
          />
          <small style={{ color: "gray" }}>
            Enter the number of points/km/reps you achieved.
          </small>
        </div>

        {/* Description Input */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="e.g. Morning run around the park 🏃‍♂️"
            rows="3"
            style={{ width: "100%", padding: "0.75rem", fontSize: "1rem" }}
          />
        </div>

        {/* Proof URL (Optional) */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Proof URL (Optional)
          </label>
          <input
            type="url"
            name="proofUrl"
            value={formData.proofUrl}
            onChange={handleChange}
            placeholder="https://strava.com/..."
            style={{ width: "100%", padding: "0.75rem", fontSize: "1rem" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: loading ? "#ccc" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "1.1rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging..." : "Submit Activity ✅"}
        </button>
      </form>
    </div>
  );
};

export default LogActivityPage;
