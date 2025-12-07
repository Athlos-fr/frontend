import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? styles.linkActive : styles.linkInactive;

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* Logo */}
          <Link to="/" className={styles.logoGroup}>
            <div className={styles.logoIcon}>⚡</div>
            <span className={styles.logoText}>Sodal</span>
          </Link>

          {/* Desktop Links */}
          <div className={styles.desktopNav}>
            <Link to="/" className={isActive("/")}>
              Discover
            </Link>
            {user && (
              <>
                <Link
                  to="/my-competitions"
                  className={isActive("/my-competitions")}
                >
                  My Games
                </Link>
                <Link to="/friends" className={isActive("/friends")}>
                  Friends
                </Link>
              </>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/profile" className={styles.profilePill}>
                  <div className={styles.avatar}>
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block font-medium text-gray-700">
                    {user.username}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className={styles.logoutBtn}
                  title="Logout"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <Link to="/login" className={styles.loginBtn}>
                Join Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- STYLES separated from Logic ---
const styles = {
  nav: "bg-white/80 backdrop-blur-md border-b border-sodal-100 sticky top-0 z-50 transition-all duration-300",
  container: "max-w-7xl mx-auto px-6",
  wrapper: "flex justify-between items-center h-20",

  logoGroup: "flex items-center gap-2 group",
  logoIcon:
    "bg-sodal-500 text-white w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:rotate-12 transition-transform duration-300",
  logoText:
    "font-extrabold text-2xl text-gray-900 tracking-tight group-hover:text-sodal-600 transition-colors",

  desktopNav:
    "hidden md:flex items-center space-x-2 bg-gray-100/50 p-1.5 rounded-xl border border-gray-200/50",
  linkActive:
    "text-sodal-600 font-bold bg-sodal-50 px-6 py-2 rounded-lg text-sm transition-all",
  linkInactive:
    "text-gray-500 hover:text-sodal-500 hover:bg-white/50 px-6 py-2 rounded-lg text-sm transition-all duration-300",

  profilePill:
    "flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200",
  avatar:
    "w-9 h-9 bg-gradient-to-tr from-sodal-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-md",
  logoutBtn: "text-gray-400 hover:text-red-500 transition-colors p-2",
  loginBtn:
    "bg-sodal-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300",
};

export default Navbar;
