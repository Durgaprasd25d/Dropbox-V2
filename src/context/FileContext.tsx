import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: number;
  modified: Date;
  starred?: boolean;
  shared?: boolean;
  versions?: { versionNumber: number; filePath: string; size: number }[];
  owner: string;
  deleted: boolean;
  activityLog: {
    action: string;
    timestamp: Date;
    user: string;
    description: string;
  }[];
}

interface FileContextType {
  files: FileItem[];
  addFile: (response: any) => void;
  toggleStar: (fileId: string) => void;
  toggleShare: (fileId: string) => void;
  fetchFiles: () => Promise<void>;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const { state } = useAuth();
  const { token } = state;

  const fetchFiles = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:5000/api/files", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedFiles = response.data.files.map((file: any) => ({
        id: file._id,
        name: file.filename,
        type: file.versions ? "file" : "folder",
        size: file.size,
        modified: new Date(file.createdAt || file.updatedAt),
        starred: false,
        shared: file.shared && file.shared.length > 0,
        versions: file.versions,
        owner: file.owner,
        deleted: file.deleted,
        activityLog: file.activityLog || [],
      }));
      setFiles(fetchedFiles);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchFiles();
    }
  }, [token, fetchFiles]);

  const addFile = (response: any) => {
    const newFile: FileItem = {
      id: response.file._id,
      name: response.file.filename,
      type: response.file.versions ? "file" : "folder",
      size: response.file.size,
      modified: new Date(response.file.createdAt || response.file.updatedAt),
      starred: false,
      shared: false,
      versions: response.file.versions,
      owner: response.file.owner,
      deleted: response.file.deleted,
      activityLog: response.file.activityLog || [],
    };
    setFiles((prev) => [...prev, newFile]);
  };

  const toggleStar = (fileId: string) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, starred: !file.starred } : file
      )
    );
  };

  const toggleShare = (fileId: string) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, shared: !file.shared } : file
      )
    );
  };

  return (
    <FileContext.Provider
      value={{ files, addFile, toggleStar, toggleShare, fetchFiles }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFiles must be used within a FileProvider");
  }
  return context;
};

