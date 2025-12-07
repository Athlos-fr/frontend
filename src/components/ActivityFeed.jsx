import { useEffect, useState } from "react";
import competitionService from "../services/CompetitionService";

const ActivityFeed = ({ competitionId }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        console.log("Feed: Fetching for ID:", competitionId); // 1. Is the ID correct?

        const response = await competitionService.getActivityLogs(
          competitionId
        );
        console.log("Feed: Full API Response:", response); // 2. What did we get?

        // Adjust this line based on what you see in the console!
        // If response is { success: true, data: [...] }, then response.data is the array.
        const logsArray = response.data || response || [];

        console.log("Feed: Logs Array to set:", logsArray); // 3. Is this an array?
        setLogs(logsArray);
      } catch (err) {
        console.error("Failed to load logs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [competitionId]);

  if (loading) return <p>Loading feed...</p>;
  if (logs.length === 0)
    return <p style={{ color: "gray" }}>No activity yet. Be the first!</p>;

  return (
    <div style={{ marginTop: "1rem" }}>
      {logs.map((log) => (
        <div
          key={log._id}
          style={{
            borderBottom: "1px solid #eee",
            padding: "1rem 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <span style={{ fontWeight: "bold", color: "#007bff" }}>
              {log.user?.username || "Unknown User"}
            </span>
            <span style={{ margin: "0 0.5rem", color: "#666" }}>logged</span>
            <span style={{ fontWeight: "bold" }}>{log.value} points</span>

            <p style={{ margin: "0.25rem 0 0 0", color: "#444" }}>
              "{log.description}"
            </p>

            {log.proofUrl && (
              <a
                href={log.proofUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.8rem",
                  color: "#007bff",
                  display: "block",
                  marginTop: "0.25rem",
                }}
              >
                View Proof 📎
              </a>
            )}
          </div>

          <small style={{ color: "#999" }}>
            {new Date(log.createdAt).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
