import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyProfile } from "../api/profileApi";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated) {
        setError("Please log in to view your profile");
        setLoading(false);
        return;
      }

      try {
        const data = await getMyProfile();
        setProfile(data);
        setAvatarPreview(data.avatarUrl || null);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated]);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    const localUrl = URL.createObjectURL(file);

    // Show preview immediately
    setAvatarPreview(localUrl);

    // Update profile state (frontend only for now)
    setProfile((prev) => ({
      ...prev,
      avatarUrl: localUrl,
    }));

    // TODO: Upload to server when API is ready
    // uploadAvatar(file).then(url => {
    //   setProfile(prev => ({ ...prev, avatarUrl: url }));
    //   setAvatarPreview(url);
    // });
  };

  if (loading) {
    return (
      <div className="profile-page loading-state">
        <div className="loading-content">
          <div className="spinner"></div>
          <p className="loading-text">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="profile-page error-state">
        <div className="error-content">
          <div className="error-message">
            {error || "No profile data available"}
          </div>
          {!isAuthenticated && (
            <button
              onClick={() => (window.location.href = "/login")}
              className="btn btn-primary"
            >
              Go to Login
            </button>
          )}
        </div>
      </div>
    );
  }

  const firstLetter = (profile.name || user?.username || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-card">
          {/* PROFILE HEADER */}
          <div className="profile-header">
            <div className="profile-info-section">
              <div className="avatar-section">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  className="avatar-input"
                  aria-label="Upload avatar"
                />

                <div
                  onClick={handleAvatarClick}
                  className="avatar-wrapper"
                  title="Click to change avatar"
                  role="button"
                  tabIndex={0}
                >
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="User avatar"
                      className="avatar-image"
                    />
                  ) : (
                    <span className="avatar-letter">{firstLetter}</span>
                  )}
                </div>
              </div>

              <div className="user-details">
                <h2 className="user-name">{profile.name}</h2>
                <p className="user-username">@{profile.username}</p>
                <p className="user-email">{profile.email}</p>
              </div>
            </div>

            <button className="btn btn-primary edit-profile-btn">
              Edit Profile
            </button>
          </div>

          {/* STATS */}
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Total Points</p>
              <p className="stat-value points">{profile.points}</p>
            </div>

            <div className="stat-card">
              <p className="stat-label">Completed Challenges</p>
              <p className="stat-value">{profile.completedChallenges}</p>
            </div>

            <div className="stat-card">
              <p className="stat-label">Active Streak</p>
              <p className="stat-value">
                {profile.streak}
                <span className="stat-unit">days</span>
              </p>
            </div>
          </div>

          {/* ABOUT */}
          <div className="about-section">
            <h3 className="section-title">About</h3>
            <p className="about-text">
              I&apos;m using Athlos to stay consistent with my study and daily
              tasks. I like turning my homework and to-do list into small
              challenges with my friends, collecting points and keeping a daily
              streak.
            </p>
          </div>

          {/* RECENT CHALLENGES */}
          <div className="challenges-grid">
            {/* Left column */}
            <div className="challenge-card">
              <h3 className="section-title">Recent Challenges</h3>
              <ul className="challenge-list">
                {profile.recentChallengesLeft.map((ch) => (
                  <li key={ch.id} className="challenge-item">
                    <span className="challenge-title">{ch.title}</span>
                    <span
                      className={`challenge-status ${
                        ch.status === "Completed" ? "completed" : "in-progress"
                      }`}
                    >
                      {ch.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column */}
            <div className="challenge-card">
              <h3 className="section-title">Recent Challenges</h3>
              <ul className="challenge-list">
                {profile.recentChallengesRight.map((ch) => (
                  <li key={ch.id} className="challenge-item-detailed">
                    <div>
                      <p className="challenge-title">{ch.title}</p>
                      <p
                        className={`challenge-status ${
                          ch.status === "Completed"
                            ? "completed"
                            : "in-progress"
                        }`}
                      >
                        {ch.status}
                      </p>
                    </div>
                    <span className="challenge-points">{ch.points} pts</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
