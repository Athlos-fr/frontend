import React from "react";

export default function ProfileNavBar() {
  return (
    <header className="relative h-16 border-b border-[rgba(142,45,226,0.4)] bg-black/30 backdrop-blur-md px-4 md:px-10 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-gradient-to-tr from-[#8E2DE2] via-[#00FFFF] to-[#FF00A0] shadow-[0_0_15px_rgba(142,45,226,0.7)]" />
        <div>
          <h1 className="text-lg font-bold tracking-wide">Athlos</h1>
          <p className="text-[11px] text-[#00FFFF] uppercase tracking-[0.2em]">
            Points • Challenges • Focus
          </p>
        </div>
      </div>

      <nav className="flex items-center gap-4 text-xs md:text-sm">
        <button className="uppercase tracking-wide text-[#EAEAEA] hover:text-[#00FFFF] transition">Profile</button>
        <button className="uppercase tracking-wide text-[#FF00A0] hover:text-[#EAEAEA] transition">Logout</button>
      </nav>
    </header>
  );
}
