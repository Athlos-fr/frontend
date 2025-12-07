import { useEffect, useState } from "react";
import competitionService from "../services/CompetitionService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyCompetitionsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myGames, setMyGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await competitionService.getAllCompetitions();
        // Client-side Filter: Only show games where user is a participant
        const allGames = data.data.competitions || [];
        const filtered = allGames.filter((comp) =>
          comp.participants.some(
            (p) => p.user._id === user._id || p.user === user._id
          )
        );
        setMyGames(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Competitions</h1>
        <button
          onClick={() => navigate("/create-competition")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          + Create New
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {myGames.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 mb-4">
                You haven't joined any competitions yet.
              </p>
              <button
                onClick={() => navigate("/")}
                className="text-blue-600 font-semibold hover:underline"
              >
                Go Discover games
              </button>
            </div>
          )}

          {myGames.map((comp) => (
            <div
              key={comp._id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {comp.title}
                </h3>
                <p className="text-sm text-gray-500">Status: {comp.status}</p>
              </div>
              <button
                onClick={() => navigate(`/competitions/${comp._id}`)}
                className="text-blue-600 font-semibold hover:bg-blue-50 px-4 py-2 rounded transition"
              >
                Enter Arena →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCompetitionsPage;
