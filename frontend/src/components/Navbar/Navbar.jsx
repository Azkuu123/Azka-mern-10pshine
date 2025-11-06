import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import ThemeToggle from "../ThemeToggle";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div
      className="flex items-center justify-between px-6 py-2 
                 bg-white dark:bg-slate-900 text-slate-900 dark:text-white 
                 shadow-sm transition-colors duration-300"
    >
      {/* App name */}
      <h2
        className="text-xl font-semibold cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Notezka
      </h2>

      {/* Search bar (hide on login/signup) */}
      {!["/login", "/signUp"].includes(location.pathname) && (
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      )}

      {/* Right side: Theme toggle + profile */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Navbar;
