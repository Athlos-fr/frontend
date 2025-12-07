import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import competitionService from "../services/CompetitionService";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const data = await competitionService.getAllCompetitions();
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
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header.wrapper}>
        <div>
          <h1 className={styles.header.title}>Welcome, {user?.username}! 🏆</h1>
          <p className={styles.header.subtitle}>Ready to compete?</p>
        </div>
        <button onClick={logout} className={styles.header.logoutBtn}>
          Logout
        </button>
      </header>

      {/* Main Content */}
      <section>
        <div className={styles.controls.wrapper}>
          <h3 className={styles.controls.title}>Available Competitions</h3>
          <button
            onClick={() => navigate("/create-competition")}
            className={styles.controls.createBtn}
          >
            + Create New
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className={styles.grid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.loadingCard}></div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && <div className={styles.error}>{error}</div>}

        {/* Empty State */}
        {!loading && !error && competitions.length === 0 && (
          <div className={styles.emptyState}>
            <p className="text-gray-500 mb-4">
              No competitions found. Create one to get started!
            </p>
            <button
              onClick={() => navigate("/create-competition")}
              className="text-sodal-600 font-bold hover:underline"
            >
              Create First Game
            </button>
          </div>
        )}

        {/* List of Competitions */}
        <div className={styles.grid}>
          {competitions.map((comp) => (
            <div key={comp._id || comp.id} className={styles.card.container}>
              {/* Decorative Blob */}
              <div className={styles.card.blob}></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h4 className={styles.card.title}>{comp.title}</h4>
                  {comp.status === "active" && (
                    <span className="flex h-2.5 w-2.5 mt-1.5">
                      <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-sodal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sodal-500"></span>
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mb-4">
                  <span className={styles.card.tag}>{comp.category}</span>
                  <span
                    className={
                      comp.status === "active"
                        ? styles.card.tagActive
                        : styles.card.tag
                    }
                  >
                    {comp.status}
                  </span>
                </div>

                <p className={styles.card.meta}>
                  <strong>Goal:</strong>{" "}
                  {comp.winCondition?.targetValue || "Max"}{" "}
                  {comp.winCondition?.metric}
                </p>

                <div className="mt-auto pt-4">
                  <button
                    onClick={() =>
                      navigate(`/competitions/${comp._id || comp.id}`)
                    }
                    className={styles.card.button}
                  >
                    View Leaderboard
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: "max-w-7xl mx-auto px-6 py-12",

  header: {
    wrapper:
      "flex justify-between items-end mb-12 border-b border-gray-100 pb-8",
    title: "text-4xl font-extrabold text-gray-900 tracking-tight",
    subtitle: "text-gray-500 mt-2 font-medium text-lg",
    logoutBtn:
      "px-6 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 hover:text-red-500 transition-colors shadow-sm",
  },

  controls: {
    wrapper: "flex justify-between items-center mb-8",
    title: "text-2xl font-bold text-gray-800",
    createBtn:
      "bg-sodal-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300",
  },

  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",

  loadingCard: "h-64 bg-gray-100 rounded-3xl animate-pulse",

  error:
    "bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-100 text-center font-medium",

  emptyState:
    "text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200",

  card: {
    container:
      "group bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-sodal-500/10 hover:border-sodal-200 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden",
    blob: "absolute top-0 right-0 w-32 h-32 bg-sodal-50 rounded-full -mr-10 -mt-10 group-hover:bg-sodal-100 transition-colors duration-300",
    title:
      "text-xl font-bold text-gray-900 group-hover:text-sodal-600 transition-colors line-clamp-1",
    tag: "bg-gray-50 text-gray-500 text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide border border-gray-100",
    tagActive:
      "bg-green-50 text-green-600 text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide border border-green-100",
    meta: "text-gray-500 text-sm mb-2",
    button:
      "w-full py-2.5 rounded-xl text-sodal-600 font-bold bg-sodal-50 hover:bg-sodal-500 hover:text-white transition-all duration-200",
  },
};

export default DashboardPage;
