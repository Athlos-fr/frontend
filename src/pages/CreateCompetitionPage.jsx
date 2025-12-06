import { useState } from "react";
import { useNavigate } from "react-router-dom";
import competitionService from "../services/competitionService";

const CreateCompetitionPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "fitness", // Default
    startDate: "",
    endDate: "",
    privacy: "public",
    targetValue: 100, // Default target score
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Format the payload to match Backend Schema
    const payload = {
      title: formData.title,
      category: formData.category,
      startDate: formData.startDate,
      endDate: formData.endDate,
      privacy: formData.privacy,
      winCondition: {
        type: "target_score",
        targetValue: Number(formData.targetValue),
        metric: "points",
      },
    };

    try {
      await competitionService.createCompetition(payload);
      alert("Competition Created! 🎉");
      navigate("/dashboard"); // Go back to home
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create competition");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
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

      <h2>Create New Competition</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        {/* Title */}
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g. 30 Day Abs Challenge"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        {/* Category & Privacy (Side by Side) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem" }}
            >
              <option value="fitness">Fitness</option>
              <option value="coding">Coding</option>
              <option value="habit">Habit</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Privacy
            </label>
            <select
              name="privacy"
              value={formData.privacy}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem" }}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>

        {/* Dates */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
        </div>

        {/* Win Condition */}
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Goal (Target Score)
          </label>
          <input
            type="number"
            name="targetValue"
            value={formData.targetValue}
            onChange={handleChange}
            min="1"
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
          <small style={{ color: "gray" }}>
            Users must reach this score to win.
          </small>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            background: loading ? "#ccc" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Creating..." : "Launch Competition 🚀"}
        </button>
      </form>
    </div>
  );
};

export default CreateCompetitionPage;
