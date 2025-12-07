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

  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        const data = await competitionService.getCompetition(id);
        setCompetition(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompetition();
  }, [id]);

  if (!competition)
    return (
      <div className="p-8 text-center text-gray-500">Loading Arena...</div>
    );

  const isParticipant = competition.participants.some(
    (p) => p.user._id === user._id || p.user === user._id
  );

  return (
    <div className={styles.container}>
      <button
        onClick={() => navigate("/my-competitions")}
        className={styles.backLink}
      >
        ← Back to Games
      </button>

      {/* Hero Header */}
      <div className={styles.hero.container}>
        <div className={styles.hero.bgBlob}></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex gap-3 mb-4">
              <span className={styles.hero.category}>
                {competition.category}
              </span>
              <span className={styles.hero.status}>{competition.status}</span>
            </div>
            <h1 className={styles.hero.title}>{competition.title}</h1>
            <p className="text-gray-400 text-lg">
              Race to{" "}
              <span className="text-white font-bold">
                {competition.winCondition.targetValue}{" "}
                {competition.winCondition.metric}
              </span>
            </p>
          </div>

          {isParticipant && competition.status === "active" && (
            <button
              onClick={() => navigate(`/competitions/${id}/log-activity`)}
              className={styles.hero.actionBtn}
            >
              <span className="text-xl">+</span> Log Activity
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Leaderboard */}
        <div className="lg:col-span-2">
          <h3 className={styles.sectionTitle}>🏆 Leaderboard</h3>
          <div className={styles.table.container}>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className={styles.table.thLeft}>Rank</th>
                  <th className={styles.table.thLeft}>Player</th>
                  <th className={styles.table.thRight}>Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {competition.participants.map((p) => {
                  const isMe = p.user._id === user._id || p.user === user._id;
                  return (
                    <tr
                      key={p._id}
                      className={
                        isMe
                          ? "bg-sodal-50/50"
                          : "hover:bg-gray-50 transition-colors"
                      }
                    >
                      <td className={styles.table.td}>
                        {p.rank === 1 ? (
                          <span className="text-2xl">🥇</span>
                        ) : p.rank === 2 ? (
                          <span className="text-2xl">🥈</span>
                        ) : p.rank === 3 ? (
                          <span className="text-2xl">🥉</span>
                        ) : (
                          <span className="font-bold text-gray-400">
                            #{p.rank}
                          </span>
                        )}
                      </td>
                      <td className={styles.table.td}>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              isMe
                                ? "bg-sodal-200 text-sodal-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {p.user.username.charAt(0).toUpperCase()}
                          </div>
                          <span
                            className={`font-medium ${
                              isMe ? "text-sodal-900" : "text-gray-900"
                            }`}
                          >
                            {p.user.username}{" "}
                            {isMe && (
                              <span className="text-xs text-sodal-500 bg-sodal-100 px-2 py-0.5 rounded-full ml-2">
                                You
                              </span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className={styles.table.tdRight}>
                        <span className="text-lg font-bold text-gray-900">
                          {p.currentScore}
                        </span>
                        <span className="text-xs text-gray-400 ml-1">
                          {competition.winCondition.metric}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar / Feed */}
        <div className="lg:col-span-1">
          <h3 className={styles.sectionTitle}>Recent Activity</h3>
          <div className={styles.feedContainer}>
            <ActivityFeed competitionId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: "max-w-6xl mx-auto px-6 py-10",
  backLink:
    "mb-6 text-gray-400 hover:text-sodal-600 transition-colors font-medium flex items-center gap-2",
  hero: {
    container:
      "bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-12 relative overflow-hidden",
    bgBlob:
      "absolute top-0 right-0 w-64 h-64 bg-sodal-500 rounded-full opacity-10 blur-3xl -mr-16 -mt-16",
    category:
      "bg-gray-700/50 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-sodal-300 border border-gray-600",
    status:
      "bg-sodal-500/20 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-sodal-300 border border-sodal-500/30",
    title:
      "text-4xl md:text-5xl font-extrabold mb-2 tracking-tight leading-tight",
    actionBtn:
      "bg-sodal-500 hover:bg-sodal-400 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-glow hover:-translate-y-1 transition-all duration-300 flex items-center gap-2",
  },
  sectionTitle: "text-xl font-bold text-gray-900 mb-6 flex items-center gap-2",
  table: {
    container:
      "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
    thLeft:
      "px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider",
    thRight:
      "px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider",
    td: "px-6 py-4 whitespace-nowrap",
    tdRight: "px-6 py-4 text-right",
  },
  feedContainer: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6",
};

export default CompetitionDetailsPage;
