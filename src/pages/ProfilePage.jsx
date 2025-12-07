import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Banner */}
        <div className={styles.banner}></div>

        <div className={styles.content}>
          {/* Avatar - Floating */}
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              {user?.username.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* User Info */}
          <div className={styles.userInfo}>
            <h1 className={styles.name}>{user?.username}</h1>
            <p className={styles.email}>{user?.email}</p>
            <span className={styles.roleBadge}>
              {user?.role === "admin" ? "🛡️ Admin" : "🚀 Challenger"}
            </span>
          </div>

          {/* Stats Grid */}
          <div className={styles.stats.container}>
            <div className={styles.stats.title}>Performance Stats</div>
            <div className={styles.stats.grid}>
              <div className={styles.stats.card}>
                <div className={styles.stats.value}>0</div>
                <div className={styles.stats.label}>Wins 🏆</div>
              </div>
              <div className={styles.stats.card}>
                <div className={styles.stats.value}>0</div>
                <div className={styles.stats.label}>Points ⚡</div>
              </div>
              <div className={styles.stats.card}>
                <div className={styles.stats.value}>0</div>
                <div className={styles.stats.label}>Streak 🔥</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: "max-w-3xl mx-auto px-6 py-12",
  card: "bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100",
  banner: "bg-gradient-to-r from-sodal-400 to-teal-600 h-40",
  content: "px-8 pb-10",
  avatarWrapper: "relative -mt-16 mb-6 flex justify-center sm:justify-start",
  avatar:
    "w-32 h-32 bg-white rounded-full p-2 shadow-lg flex items-center justify-center text-5xl font-bold text-sodal-600 bg-clip-padding border-4 border-white",
  userInfo: "text-center sm:text-left mb-8",
  name: "text-3xl font-extrabold text-gray-900 tracking-tight mb-1",
  email: "text-gray-500 font-medium mb-4",
  roleBadge:
    "inline-block bg-sodal-50 text-sodal-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-sodal-100",
  stats: {
    container: "border-t border-gray-100 pt-8",
    title:
      "text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 text-center sm:text-left",
    grid: "grid grid-cols-3 gap-6",
    card: "bg-gray-50 p-4 rounded-2xl text-center hover:bg-sodal-50 transition-colors cursor-default",
    value: "text-3xl font-black text-gray-900 mb-1",
    label: "text-xs font-bold text-gray-500 uppercase tracking-wide",
  },
};

export default ProfilePage;
