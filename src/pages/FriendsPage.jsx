import { useNavigate } from "react-router-dom";

const FriendsPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Icon Circle */}
        <div className={styles.iconWrapper}>
          <span className="text-4xl">👯‍♀️</span>
        </div>

        <h1 className={styles.title}>Social Hub</h1>

        <p className={styles.description}>
          Competitions are better with friends. Soon, you'll be able to follow
          athletes, challenge rivals directly, and build your own squad.
        </p>

        {/* Feature List */}
        <div className={styles.features.container}>
          <div className={styles.features.item}>
            <span className={styles.features.icon}>🤝</span>
            <span className={styles.features.text}>Follow Friends</span>
          </div>
          <div className={styles.features.item}>
            <span className={styles.features.icon}>⚔️</span>
            <span className={styles.features.text}>1v1 Duels</span>
          </div>
          <div className={styles.features.item}>
            <span className={styles.features.icon}>💬</span>
            <span className={styles.features.text}>Trash Talk Chat</span>
          </div>
        </div>

        <div className={styles.badge}>Coming Soon</div>

        <button onClick={() => navigate("/")} className={styles.button}>
          Explore Public Games
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: "max-w-4xl mx-auto px-6 py-16",
  card: "bg-white rounded-3xl p-12 shadow-xl border border-gray-100 text-center max-w-2xl mx-auto",

  iconWrapper:
    "bg-sodal-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-sodal-100",

  title: "text-4xl font-extrabold text-gray-900 mb-4 tracking-tight",

  description: "text-xl text-gray-500 mb-10 leading-relaxed max-w-lg mx-auto",

  features: {
    container: "flex flex-wrap justify-center gap-4 mb-10",
    item: "flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100",
    icon: "text-lg",
    text: "font-bold text-gray-700 text-sm uppercase tracking-wide",
  },

  badge:
    "inline-block bg-gradient-to-r from-sodal-500 to-teal-500 text-white font-bold px-6 py-2 rounded-full text-sm mb-8 shadow-lg shadow-sodal-500/20",

  button:
    "block w-full sm:w-auto mx-auto px-8 py-3 rounded-xl text-sodal-600 font-bold bg-white border-2 border-sodal-100 hover:border-sodal-500 hover:bg-sodal-50 transition-all duration-300",
};

export default FriendsPage;
