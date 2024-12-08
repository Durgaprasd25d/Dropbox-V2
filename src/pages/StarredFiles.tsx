import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import FileList from '../components/FileList';
import { useFiles } from '../context/FileContext';

const StarredFiles = () => {
  const { files } = useFiles();
  const starredFiles = files.filter(file => file.starred);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto py-6">
            <h2 className="text-2xl font-semibold mb-6">Starred Files</h2>
            <FileList files={starredFiles} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StarredFiles;