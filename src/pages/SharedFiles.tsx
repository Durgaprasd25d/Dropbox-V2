import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import FileList from '../components/FileList';
import { useFiles } from '../context/FileContext';

const SharedFiles = () => {
  const { files } = useFiles();
  const sharedFiles = files.filter(file => file.shared);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto py-6">
            <h2 className="text-2xl font-semibold mb-6">Shared Files</h2>
            <FileList files={sharedFiles} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SharedFiles;