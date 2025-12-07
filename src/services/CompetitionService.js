import api from "./api";

const competitionService = {
  // Get all competitions (public ones)
  getAllCompetitions: async () => {
    const response = await api.get("/competitions");
    return response.data;
  },

  // Get details for one competition
  getCompetition: async (id) => {
    const response = await api.get(`/competitions/${id}`);
    return response.data;
  },

  // Create a new competition
  createCompetition: async (data) => {
    const response = await api.post("/competitions", data);
    return response.data;
  },

  // Join a competition
  joinCompetition: async (id) => {
    const response = await api.post(`/competitions/${id}/join`);
    return response.data;
  },

  // Log activity for a competition
  logActivity: async (competitionId, activityData) => {
    // URL must match the backend route: /api/competitions/:id/activity
    const response = await api.post(
      `/competitions/${competitionId}/activity`,
      activityData
    );
    return response.data;
  },

  getActivityLogs: async (competitionId) => {
    const response = await api.get(
      `/competitions/${competitionId}/activity`
    );
    return response.data;
  }
};

export default CompetitionService;
