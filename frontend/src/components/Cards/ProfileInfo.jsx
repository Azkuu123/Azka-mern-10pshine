import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setShowDropdown(false);
    navigate("/profile");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    userInfo && (
      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        {/* Avatar with dropdown */}
        <div
          className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {getInitials(userInfo?.fullName)}
        </div>

        {/* Name and Logout */}
        <div>
          <p className="text-sm font-medium">{userInfo.fullName}</p>
          <button
            className="text-sm text-slate-700 underline"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>

        {/* Dropdown for View Profile */}
        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded shadow-md z-50">
            <div
              className="w-full px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm text-left text-slate-950 dark:text-white cursor-pointer"
              onClick={handleProfileClick}
            >
              View Profile
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ProfileInfo;
