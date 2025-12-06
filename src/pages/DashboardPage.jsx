import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <h1>Welcome, {user?.username}! 🏆</h1>
        <button onClick={logout} style={{ padding: "0.5rem 1rem" }}>
          Logout
        </button>
      </header>

      <section>
        <h3>Your Competitions</h3>
        <p>You haven't joined any competitions yet.</p>
        {/* We will add the list here in the next step */}
        <button style={{ marginTop: "1rem" }}>+ Create New Competition</button>
      </section>
    </div>
  );
};

export default DashboardPage;
