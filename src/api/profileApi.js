export async function getMyProfile() {
    // Dummy Data For Testing
  return Promise.resolve({
    name: "Seif Abdelkader",
    username: "seifhero",
    email: "seif@example.com",
    points: 1250,
    completedChallenges: 18,
    streak: 5,
    recentChallengesLeft: [
      { id: 1, title: "Finish React HW", status: "Completed" },
      { id: 2, title: "Math Assignment", status: "In Progress" },
    ],
    recentChallengesRight: [
      { id: 3, title: "Finish React HW", status: "Completed", points: 50 },
      { id: 4, title: "Daily Study 1h", status: "In Progress", points: 40 },
    ],
  });
}
