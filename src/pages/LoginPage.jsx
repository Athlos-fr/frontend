import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      // Redirect to "My Competitions" after login
      navigate("/my-competitions");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header / Logo */}
        <div className={styles.header}>
          <div className={styles.logo}>⚡</div>
          <h2 className={styles.title}>Welcome back</h2>
          <p className={styles.subtitle}>Enter the Sodal Arena</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <p className={styles.footer}>
          Don't have an account?{" "}
          <span className="text-sodal-600 font-bold cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: "min-h-screen flex items-center justify-center bg-gray-50 px-4",
  card: "bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100",

  header: "text-center mb-8",
  logo: "text-4xl mb-4 bg-sodal-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-sodal-600 shadow-sm border border-sodal-100",
  title: "text-3xl font-extrabold text-gray-900 tracking-tight",
  subtitle: "text-gray-500 mt-2 font-medium",

  error:
    "bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 flex items-center gap-2",

  label: "block text-gray-700 text-sm font-bold mb-2 ml-1",
  input:
    "w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-sodal-100 focus:border-sodal-400 transition-all text-gray-900 bg-gray-50 focus:bg-white font-medium",

  button:
    "w-full py-3.5 rounded-xl text-white font-bold bg-sodal-500 hover:bg-sodal-600 focus:ring-4 focus:ring-sodal-200 transition-all duration-200 shadow-lg hover:shadow-glow hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed",

  footer: "text-center text-gray-400 text-sm mt-8 font-medium",
};

export default LoginPage;
