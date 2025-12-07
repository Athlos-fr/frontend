import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import competitionService from "../services/CompetitionService";

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
      // Redirect back to the Arena
      navigate(`/competitions/${id}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to log activity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => navigate(`/competitions/${id}`)}
        className={styles.backLink}
      >
        ← Cancel
      </button>

      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Log Progress</h2>
          <p className={styles.subtitle}>
            Add to your score and climb the ranks.
          </p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Value Input (Large & Prominent) */}
          <div>
            <label className={styles.label}>Amount / Score</label>
            <div className="relative">
              <input
                type="number"
                name="value"
                step="0.1"
                value={formData.value}
                onChange={handleChange}
                required
                placeholder="0"
                className={styles.valueInput}
              />
              <div className={styles.valueSuffix}>PTS</div>
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="What did you accomplish today?"
              rows="3"
              className={styles.textarea}
            />
          </div>

          {/* Proof URL */}
          <div>
            <label className={styles.label}>
              Proof Link{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="url"
              name="proofUrl"
              value={formData.proofUrl}
              onChange={handleChange}
              placeholder="https://strava.com/..."
              className={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Submitting..." : "Confirm Activity"}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: "max-w-xl mx-auto px-6 py-10",
  backLink:
    "mb-6 text-gray-400 hover:text-gray-600 transition-colors font-medium flex items-center gap-2",

  card: "bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100",

  header: "mb-8 text-center",
  title: "text-3xl font-extrabold text-gray-900 tracking-tight",
  subtitle: "text-gray-500 mt-2 font-medium",

  error:
    "bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 text-center",

  label:
    "block text-gray-700 text-xs font-bold mb-2 ml-1 uppercase tracking-wide",

  // Large input for the score
  valueInput:
    "w-full px-5 py-4 text-4xl font-black text-gray-900 placeholder-gray-200 rounded-2xl border-2 border-gray-100 focus:outline-none focus:border-sodal-500 focus:ring-4 focus:ring-sodal-100 transition-all bg-gray-50 focus:bg-white",
  valueSuffix:
    "absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold pointer-events-none text-sm",

  textarea:
    "w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:outline-none focus:border-sodal-500 focus:ring-4 focus:ring-sodal-100 transition-all resize-none bg-gray-50 focus:bg-white",
  input:
    "w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:outline-none focus:border-sodal-500 focus:ring-4 focus:ring-sodal-100 transition-all bg-gray-50 focus:bg-white",

  button:
    "w-full py-4 rounded-2xl text-white font-bold text-lg bg-sodal-500 hover:bg-sodal-600 shadow-lg hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 mt-4 disabled:opacity-70 disabled:cursor-not-allowed",
};

export default LogActivityPage;
