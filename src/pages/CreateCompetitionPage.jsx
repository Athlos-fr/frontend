import { useState } from "react";
import { useNavigate } from "react-router-dom";
import competitionService from "../services/competitionService";

const CreateCompetitionPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "fitness",
    startDate: "",
    endDate: "",
    privacy: "public",
    targetValue: 100,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
      navigate("/my-competitions");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create competition");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => navigate("/my-competitions")}
        className={styles.backLink}
      >
        ← Cancel
      </button>

      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>New Challenge</h2>
          <p className={styles.subtitle}>
            Set the rules and invite your friends.
          </p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Title */}
          <div className={styles.section}>
            <label className={styles.label}>Competition Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. 30 Day Abs Challenge"
              className={styles.inputLarge}
            />
          </div>

          {/* Section 2: Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={styles.label}>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="fitness">💪 Fitness</option>
                <option value="coding">💻 Coding</option>
                <option value="habit">📅 Habit</option>
                <option value="other">🎲 Other</option>
              </select>
            </div>
            <div>
              <label className={styles.label}>Privacy</label>
              <select
                name="privacy"
                value={formData.privacy}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="public">🌍 Public</option>
                <option value="private">🔒 Private</option>
              </select>
            </div>
          </div>

          {/* Section 3: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={styles.label}>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div>
              <label className={styles.label}>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </div>

          {/* Section 4: Goal (Highlighted Box) */}
          <div className={styles.goalBox}>
            <label className={styles.label}>Winning Goal</label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                name="targetValue"
                value={formData.targetValue}
                onChange={handleChange}
                min="1"
                required
                className={styles.inputGoal}
              />
              <span className="font-bold text-sodal-700">Points to Win</span>
            </div>
          </div>

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Creating Arena..." : "Launch Competition 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: "max-w-3xl mx-auto px-6 py-10",
  backLink:
    "mb-6 text-gray-400 hover:text-gray-600 transition-colors font-medium flex items-center gap-2",
  card: "bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100",

  header: "mb-8 text-center",
  title: "text-4xl font-extrabold text-gray-900 tracking-tight",
  subtitle: "text-gray-500 mt-2 text-lg",
  error:
    "bg-red-50 text-red-600 p-4 rounded-xl mb-8 text-sm font-medium border border-red-100 text-center",

  section: "space-y-2",
  label: "block text-gray-700 text-xs font-bold mb-2 uppercase tracking-wider",

  input:
    "w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-sodal-100 focus:border-sodal-400 transition-all text-gray-900 bg-white font-medium",
  inputLarge:
    "w-full px-6 py-4 text-xl font-bold text-gray-900 placeholder-gray-300 rounded-2xl border-2 border-gray-100 focus:outline-none focus:border-sodal-500 focus:ring-4 focus:ring-sodal-100 transition-all",
  select:
    "w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-sodal-100 focus:border-sodal-400 transition-all text-gray-900 bg-white font-medium cursor-pointer appearance-none",

  goalBox: "bg-sodal-50 p-6 rounded-2xl border border-sodal-100",
  inputGoal:
    "w-32 px-5 py-3 rounded-xl border-2 border-sodal-200 focus:outline-none focus:border-sodal-500 focus:ring-4 focus:ring-sodal-100 transition-all text-gray-900 font-bold text-center",

  button:
    "w-full py-4 rounded-2xl text-white font-bold text-lg bg-sodal-500 hover:bg-sodal-600 shadow-lg hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70",
};

export default CreateCompetitionPage;
