import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [bio, setBio] = useState("");

  // Fetch user data from backend
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/get-user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data.user);
      setBio(response.data.user.bio || "");  // ✅ initialize bio properly
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  fetchUserData();
}, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading user data...</p>
      </div>
    );
  }

  const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.put(
      "/update-user",
      {
        fullName: userData.fullName,
        bio: bio,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.data.error) {
      alert("Profile updated successfully!");
      navigate("/dashboard");
    } else {
      alert("Failed to update profile. Try again.");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("An error occurred while saving changes.");
  }
};

  return (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300 flex flex-col items-center justify-center px-4 py-8 font-sans">
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 w-full max-w-md transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-4 text-center text-slate-800 dark:text-white">
        Your Profile
      </h2>

      {/* Profile Picture */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xl font-bold text-slate-800 dark:text-white">
          {getInitials(userData.fullName)}
        </div>
      </div>

      {/* Email */}
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        Email
      </label>
      <input
        type="text"
        value={userData.email}
        disabled
        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded mb-4 
        bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 cursor-not-allowed"
      />

      {/* Joined Date */}
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        Joined Date
      </label>
      <input
        type="text"
        value={new Date(userData.createdOn).toLocaleDateString()}
        disabled
        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded mb-4 
        bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 cursor-not-allowed"
      />

      {/* Full Name */}
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        Full Name
      </label>
      <input
        type="text"
        value={userData.fullName}
        onChange={(e) =>
          setUserData({ ...userData, fullName: e.target.value })
        }
        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded mb-4 
        bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 
        focus:outline-none focus:ring focus:border-slate-400"
      />

      {/* Bio */}
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        Bio
      </label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded mb-4 
        bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 
        focus:outline-none focus:ring focus:border-slate-400"
      />

      <button
        onClick={handleSave}
        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 rounded transition"
      >
        Save Changes
      </button>

      <p
        className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300 underline cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </p>
    </div>
  </div>
);

};

export default Profile;
