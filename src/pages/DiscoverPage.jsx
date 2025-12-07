import { useEffect, useState } from "react";
import competitionService from "../services/CompetitionService";
import { useNavigate } from "react-router-dom";

const DiscoverPage = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await competitionService.getAllCompetitions();
        setCompetitions(data.data.competitions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <div className={styles.hero.wrapper}>
        <span className={styles.hero.badge}>Community Challenges</span>
        <h1 className={styles.hero.title}>
          Find your next <span className={styles.hero.highlight}>Victory</span>
        </h1>
        <p className={styles.hero.subtitle}>
          Join a Sodal community, track your progress, and compete with friends
          in fitness, reading, or coding.
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className={styles.grid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.loadingCard}></div>
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {competitions.map((comp) => (
            <div
              key={comp._id}
              onClick={() => navigate(`/competitions/${comp._id}`)}
              className={styles.card.container}
            >
              {/* Decorative Blob */}
              <div className={styles.card.blob}></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <span className={styles.card.category}>{comp.category}</span>
                  {comp.status === "active" && (
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-sodal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-sodal-500"></span>
                    </span>
                  )}
                </div>

                <h3 className={styles.card.title}>{comp.title}</h3>

                <p className={styles.card.goal}>
                  Goal:{" "}
                  <strong className="text-gray-800">
                    {comp.winCondition.targetValue} {comp.winCondition.metric}
                  </strong>
                </p>

                <div className={styles.card.footer}>
                  <div className="text-sm text-gray-400 font-medium flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    {comp.participants?.length || 0}
                  </div>
                  <span className={styles.card.link}>
                    View Arena <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- STYLES ---
const styles = {
  pageContainer: "max-w-7xl mx-auto px-6 py-12",
  hero: {
    wrapper: "text-center mb-16 space-y-4",
    badge:
      "text-sodal-600 font-bold tracking-wider uppercase text-xs bg-sodal-50 px-3 py-1 rounded-full border border-sodal-100",
    title: "text-5xl font-extrabold text-gray-900 tracking-tight leading-tight",
    highlight:
      "text-transparent bg-clip-text bg-gradient-to-r from-sodal-500 to-teal-500",
    subtitle: "text-lg text-gray-500 max-w-2xl mx-auto",
  },
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  loadingCard: "h-64 bg-gray-100 rounded-3xl animate-pulse",
  card: {
    container:
      "group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-sodal-500/10 hover:border-sodal-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden",
    blob: "absolute top-0 right-0 w-32 h-32 bg-sodal-50 rounded-full -mr-10 -mt-10 group-hover:bg-sodal-100 transition-colors duration-300",
    category:
      "bg-gray-50 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide group-hover:bg-white transition-colors border border-gray-100",
    title:
      "text-2xl font-bold text-gray-900 mb-3 group-hover:text-sodal-600 transition-colors line-clamp-2",
    goal: "text-gray-500 text-sm mb-6",
    footer:
      "flex items-center justify-between border-t border-gray-100 pt-4 mt-auto",
    link: "text-sodal-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all",
  },
};

export default DiscoverPage;
