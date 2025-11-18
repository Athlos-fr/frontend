import React, { useEffect, useState, } from "react";
import { getMyProfile } from "../api/profileApi";

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getMyProfile();
                setProfile(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);


    if (loading) {
        return (
            <div className="h-screen w-screen text-[#EAEAEA]">
                <div className="relative h-full w-full bg-gradient-to-br from-[#03030F] via-[#2D0F5C] to-[#050515]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1A0B3A_0%,#03030F_70%)] opacity-80" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_60%,rgba(45,15,92,0.35)_80%,rgba(3,3,15,0.6)_100%)]" />
                    <div className="relative z-10 flex h-full w-full items-center justify-center">
                        <p className="text-sm text-[#00FFFF] tracking-[0.25em] uppercase">
                            Loading profile...
                        </p>
                    </div>
                </div>
            </div>
        );
    }


    if (error || !profile) {
        return (
            <div className="h-screen w-screen text-[#EAEAEA]">
                <div className="relative h-full w-full bg-gradient-to-br from-[#03030F] via-[#2D0F5C] to-[#050515]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1A0B3A_0%,#03030F_70%)] opacity-80" />
                    <div className="relative z-10 flex h-full w-full items-center justify-center">
                        <p className="text-sm text-[#FF00A0] bg-[rgba(255,0,160,0.15)] border-l-4 border-[#FF00A0] px-4 py-2 rounded-md shadow-[0_0_15px_rgba(255,0,160,0.3)]">
                            {error || "No profile data"}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const firstLetter = profile.name.charAt(0).toUpperCase();

    return (
        <div className="min-h-screen w-full text-[#EAEAEA] overflow-hidden">
        <div className="relative min-h-screen w-full bg-gradient-to-br from-[#03030F] via-[#2D0F5C] to-[#050515]">
        {/* glow layers */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1A0B3A_0%,#03030F_70%)] opacity-80" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_60%,rgba(45,15,92,0.35)_80%,rgba(3,3,15,0.6)_100%)]" />



        <div className="relative z-10 flex flex-col min-h-screen">
                    {/* NAVBAR */}

                    <ProfileNavBar />
                    
                    {/* MAIN CONTENT */}
                            <main className="flex-grow flex items-center justify-center px-4 md:px-8 py-6">
                    <div className="w-full max-w-5xl min-h-[85vh] mx-auto rounded-3xl border border-[rgba(142,45,226,0.5)] bg-[rgba(13,13,13,0.9)] px-5 py-8 md:px-10 md:py-10 backdrop-blur-md shadow-[0_0_30px_rgba(142,45,226,0.25)] overflow-y-auto">

                            {/* HEADER PROFILE */}
                            <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                                <div className="flex items-center gap-4">
                                    {/* Avatar */}
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#8E2DE2] via-[#00FFFF] to-[#FF00A0] text-3xl font-bold text-[#0D0D0D] shadow-[0_0_20px_#8E2DE2]">
                                        {firstLetter}
                                    </div>

                                    {/* Info */}
                                    <div>
                                        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                                            {profile.name}
                                        </h2>
                                        <p className="text-sm text-[#00FFFF]">@{profile.username}</p>
                                        <p className="text-sm text-[#EAEAEA]">{profile.email}</p>
                                        <p className="text-sm text-[#C3FF00]">
                                         Joined on{" "}
                                        {new Date(profile.joinDate).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                     })}
                                        </p>

                                    </div>
                                </div>


                            </div>

                            {/* STATS */}
                            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl border border-[rgba(142,45,226,0.5)] bg-[rgba(5,5,15,0.9)] px-4 py-3 shadow-[0_0_20px_rgba(0,0,0,0.7)]">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#00FFFF]">
                                        Total Points
                                    </p>
                                    <p className="mt-2 text-2xl font-bold text-[#C3FF00]">
                                        {profile.points}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[rgba(142,45,226,0.5)] bg-[rgba(5,5,15,0.9)] px-4 py-3 shadow-[0_0_20px_rgba(0,0,0,0.7)]">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#00FFFF]">
                                        Completed Challenges
                                    </p>
                                    <p className="mt-2 text-2xl font-bold text-[#EAEAEA]">
                                        {profile.completedChallenges}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[rgba(142,45,226,0.5)] bg-[rgba(5,5,15,0.9)] px-4 py-3 shadow-[0_0_20px_rgba(0,0,0,0.7)]">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#00FFFF]">
                                        Active Streak
                                    </p>
                                    <p className="mt-2 text-2xl font-bold text-[#EAEAEA]">
                                        {profile.streak}
                                        <span className="ml-1 text-sm font-normal text-[#C3FF00]">
                                            days
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* ABOUT */}
                            <div className="mb-6 rounded-2xl border border-[rgba(142,45,226,0.5)] bg-[rgba(13,13,13,0.9)] px-5 py-5 shadow-[0_0_18px_rgba(142,45,226,0.25)]">
                                <h3 className="mb-2 text-lg font-semibold text-[#00FFFF] drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                                    About
                                </h3>
                                <p className="text-sm text-[#EAEAEA]">
                                    I&apos;m using Athlos to stay consistent with my study and daily
                                    tasks. I like turning my homework and to-do list into small
                                    challenges with my friends, collecting points and keeping a daily
                                    streak.
                                </p>
                            </div>

                            {/* RECENT CHALLENGES */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Left column */}
                                <div className="rounded-2xl border border-[rgba(142,45,226,0.5)] bg-[rgba(13,13,13,0.9)] px-5 py-5 shadow-[0_0_18px_rgba(142,45,226,0.25)]">
                                    <h3 className="mb-3 text-lg font-semibold text-[#00FFFF] drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                                        Recent Challenges
                                    </h3>
                                    <ul className="space-y-3">
                                        {profile.recentChallengesLeft.map((ch) => (
                                            <li key={ch.id} className="flex flex-col">
                                                <span className="text-sm font-medium text-[#EAEAEA]">
                                                    {ch.title}
                                                </span>
                                                <span
                                                    className={"mt-1 text-xs font-semibold " +
                                                        (ch.status === "Completed"
                                                            ? "text-[#C3FF00]"
                                                            : "text-[#FF00A0]")}
                                                >
                                                    {ch.status}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Right column */}
                                <div className="rounded-2xl border border-[rgba(142,45,226,0.5)] bg-[rgba(13,13,13,0.9)] px-5 py-5 shadow-[0_0_18px_rgba(142,45,226,0.25)]">
                                    <h3 className="mb-3 text-lg font-semibold text-[#00FFFF] drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                                        Recent Challenges
                                    </h3>
                                    <ul className="space-y-3">
                                        {profile.recentChallengesRight.map((ch) => (
                                            <li
                                                key={ch.id}
                                                className="flex items-center justify-between gap-3"
                                            >
                                                <div>
                                                    <p className="text-sm font-medium text-[#EAEAEA]">
                                                        {ch.title}
                                                    </p>
                                                    <p
                                                        className={"mt-1 text-xs font-semibold " +
                                                            (ch.status === "Completed"
                                                                ? "text-[#C3FF00]"
                                                                : "text-[#FF00A0]")}
                                                    >
                                                        {ch.status}
                                                    </p>
                                                </div>
                                                <span className="text-sm font-semibold text-[#00FFFF] drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
                                                    {ch.points} pts
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
