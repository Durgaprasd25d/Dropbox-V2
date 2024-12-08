import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Upload, CheckCircle, XCircle } from 'lucide-react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const { state } = useAuth();
  const { token } = state;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("No file selected");
      return;
    }

    if (!token) {
      setUploadStatus("Authentication required. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploadStatus("Uploading...");
      const response = await fetch("http://localhost:5000/api/files/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("File uploaded successfully!");
      } else {
        const errorData = await response.json();
        setUploadStatus(`Upload failed: ${errorData.message || "Error"}`);
      }
    } catch (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-2xl border border-gray-200">
      <div
        className={`relative overflow-hidden border-2 ${
          isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300"
        } border-dashed rounded-xl p-8 text-center transition-all duration-300 ease-in-out transform hover:scale-[1.02]`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-indigo-50 opacity-50" />
        <div className="relative z-10">
          <Upload className="mx-auto h-12 w-12 text-blue-500 mb-4" />
          <p className="text-gray-700 mb-4">
            {selectedFile ? (
              <>
                Selected File:{" "}
                <span className="font-semibold text-blue-600">{selectedFile.name}</span>
              </>
            ) : (
              "Drag & drop a file here or click to select one"
            )}
          </p>
          <input
            type="file"
            className="hidden"
            id="file-upload"
            onChange={handleFileSelect}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            Browse Files
          </label>
        </div>
      </div>

      <button
        onClick={handleUpload}
        className="w-full mt-6 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Upload
      </button>

      {uploadStatus && (
        <div
          className={`mt-6 p-4 rounded-lg flex items-center justify-center ${
            uploadStatus.includes("successfully")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {uploadStatus.includes("successfully") ? (
            <CheckCircle className="h-5 w-5 mr-2" />
          ) : (
            <XCircle className="h-5 w-5 mr-2" />
          )}
          <p>{uploadStatus}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

