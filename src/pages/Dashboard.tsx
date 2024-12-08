import React, { useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import FileList from "../components/FileList";
import { useFiles } from "../context/FileContext";

const Dashboard: React.FC = () => {
  const { files, fetchFiles } = useFiles();

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto py-6">
            <FileList files={files} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

