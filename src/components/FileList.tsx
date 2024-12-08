import React from 'react';
import { FileItem } from '../context/FileContext';
import { File, Folder, Star, Share2, MoreVertical, Trash2 } from 'lucide-react';
import { useFiles } from '../context/FileContext';

interface FileListProps {
  files: FileItem[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  const { toggleStar, toggleShare } = useFiles();

  return (
    <div className="w-full">
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-6 py-3 text-sm font-medium text-gray-500 border-b">
        <div className="w-8"></div>
        <div>Name</div>
        <div>Modified</div>
        <div>Size</div>
        <div>Owner</div>
        <div>Actions</div>
      </div>
      
      <div className="divide-y">
        {files.map((file) => (
          <div
            key={file.id}
            className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-6 py-3 hover:bg-gray-50 items-center"
          >
            <div className="w-8">
              {file.type === 'folder' ? (
                <Folder className="h-5 w-5 text-gray-400" />
              ) : (
                <File className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{file.name}</span>
              {file.versions && file.versions.length > 1 && (
                <span className="text-xs text-gray-500">({file.versions.length} versions)</span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {file.modified.toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-500">
              {file.size ? `${Math.round(file.size / 1024)} KB` : '--'}
            </div>
            <div className="text-sm text-gray-500">
              {file.owner}
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => toggleStar(file.id)}
                className="hover:bg-gray-100 p-1 rounded-full"
              >
                <Star 
                  className={`h-4 w-4 ${file.starred ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                />
              </button>
              <button 
                onClick={() => toggleShare(file.id)}
                className="hover:bg-gray-100 p-1 rounded-full"
              >
                <Share2 
                  className={`h-4 w-4 ${file.shared ? 'text-blue-500' : 'text-gray-400'}`} 
                />
              </button>
              {file.deleted && (
                <Trash2 className="h-4 w-4 text-red-500" />
              )}
              <button className="hover:bg-gray-100 p-1 rounded-full">
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;

