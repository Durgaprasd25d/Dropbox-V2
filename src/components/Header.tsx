import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Search, Upload, Plus, Loader, X } from "lucide-react";
import FileUpload from "../components/FileUpload.jsx";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const { state } = useAuth();
  const { user } = state;

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleUploadModal = () => setUploadModalOpen((prev) => !prev);

  return (
    <>
      <header className="h-16 border-b border-gray-200 px-6 flex items-center justify-between bg-white">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search files and folders..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 relative">
          <button
            onClick={toggleUploadModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="h-5 w-5" />
            <span>Upload</span>
          </button>

          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Plus className="h-5 w-5" />
          </button>

          <div className="relative">
            {user ? (
              <>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                    <div className="px-4 py-2 text-sm">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                    <div className="border-t border-gray-200"></div>
                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                      onClick={() => alert("View Profile clicked")}
                    >
                      View Profile
                    </button>
                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                      onClick={() => alert("Logout clicked")}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-600">
                <Loader />
              </p>
            )}
          </div>
        </div>
      </header>

      {isUploadModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={toggleUploadModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 relative transform transition-all duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
            style={{
              opacity: isUploadModalOpen ? 1 : 0,
              transform: isUploadModalOpen ? "scale(1)" : "scale(0.95)",
            }}
          >
            <button
              onClick={toggleUploadModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <FileUpload />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
