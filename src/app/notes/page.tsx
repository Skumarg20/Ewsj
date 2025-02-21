"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  FolderOpen,
  Plus,
  Book,
  Notebook,
  FlaskConical,
  Calculator,
  FileText,
  Calendar,
  Clock,
  ChevronRight,
  Search,
  ArrowLeft,
  FolderPlus,
  Settings,
  Edit2,
  Trash2,
  X,
} from "lucide-react";
import { RichTextEditorDemo } from "@/components/tiptap/rich-text-editor";
import axios from "axios";
import { getAuthHeader } from "@/lib/api";

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// Define interfaces
interface CreateFolder {
  name: string;
  color: string;
  description?: string;
}

interface Note {
  id: number;
  title: string;
  preview: string;
  date: string;
  lastModified: string;
  tags?: string[];
}

interface FolderData {
  id: string;
  name: string;
  color: string;
  description?: string;
  notes: Note[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

function CreateFolderModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (name: string, color: string, description?: string) => void;
}) {
  const [folderName, setFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState("indigo");
  const [description, setDescription] = useState("");

  const colors = [
    { name: "indigo", class: "from-indigo-500 to-indigo-600" },
    { name: "blue", class: "from-blue-500 to-cyan-500" },
    { name: "purple", class: "from-purple-500 to-pink-500" },
    { name: "green", class: "from-green-500 to-emerald-500" },
    { name: "red", class: "from-red-500 to-rose-500" },
    { name: "orange", class: "from-orange-500 to-amber-500" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Create New Folder</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Folder Name
            </label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Color
            </label>
            <div className="grid grid-cols-6 gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-lg bg-gradient-to-r ${color.class} 
                    ${selectedColor === color.name ? "ring-2 ring-offset-2 ring-indigo-600" : ""}`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (folderName.trim()) {
                  onCreate(folderName, selectedColor, description);
                  onClose();
                }
              }}
              disabled={!folderName.trim()}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 
                text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 
                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Folder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubjectFolder({
  subject,
  folderData,
  onViewNotes,
  onEditFolder,
  onDeleteFolder,
}: {
  subject: string;
  folderData: FolderData;
  onViewNotes: (subject: string) => void; // Changed to view notes
  onEditFolder: (folder: CreateFolder) => void;
  onDeleteFolder: (folder: CreateFolder) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group"
    >
      <button
        onClick={() => onViewNotes(subject)} // Changed to view notes
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full p-4 flex flex-col items-center justify-center gap-3
          bg-white rounded-xl shadow-sm hover:shadow-md transition-all
          border-2 border-transparent hover:border-indigo-100"
      >
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          className={`w-20 h-20 rounded-2xl flex items-center justify-center
            shadow-lg ${folderData.color}`}
        >
          <Folder className="w-8 h-8 text-white" />
        </motion.div>
        <span className="font-medium text-gray-800 text-center">{subject}</span>
        <span className="text-sm text-gray-500">
          {folderData.notes.length} notes
        </span>
      </button>

      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEditFolder({ name: subject, color: folderData.color, description: folderData.description });
          }}
          className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm
            hover:bg-indigo-50 text-gray-500 hover:text-indigo-600"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteFolder({ name: subject, color: folderData.color, description: folderData.description });
          }}
          className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm
            hover:bg-red-50 text-gray-500 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function Notes() {
  const [view, setView] = useState<"list" | "create" | "notes">("list"); // Added "notes" view
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [folders, setFolders] = useState<Record<string, FolderData>>({});
  const [noteContent, setNoteContent] = useState("");
  const [noteTags, setNoteTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/notesfolder`, {
        headers: getAuthHeader(),
      });
      const folderData = response.data.reduce(
        (acc: Record<string, FolderData>, folder: any) => {
          acc[folder.name] = {
            id: folder.id,
            name: folder.name,
            color: folder.color,
            description: folder.description,
            notes: folder.notes || [],
          };
          return acc;
        },
        {}
      );
      setFolders(folderData);
    } catch (error) {
      console.error("Error fetching folders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFolder = async (name: string, color: string, description?: string) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/notesfolder`,
        { name, color, description },
        { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
      );
      setFolders((prev) => ({
        ...prev,
        [name]: {
          id: response.data.id,
          name,
          color,
          description,
          notes: [],
        },
      }));
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const handleEditFolder = async ({ name, color, description }: CreateFolder) => {
    try {
      const newName = prompt("Enter new folder name:", name);
      if (newName && newName !== name) {
        const folderId = folders[name].id;
        await axios.put(
          `${API_BASE_URL}/notesfolder/${folderId}`,
          { name: newName, color, description },
          { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
        );
        setFolders((prev) => {
          const newFolders = { ...prev };
          newFolders[newName] = { ...newFolders[name], name: newName };
          delete newFolders[name];
          return newFolders;
        });
      }
    } catch (error) {
      console.error("Error editing folder:", error);
      throw error;
    }
  };

  const handleDeleteFolder = async ({ name, color, description }: CreateFolder) => {
    if (window.confirm(`Are you sure you want to delete "${name}" and all its contents?`)) {
      setIsDeleting(true);
      try {
        const folderId = folders[name].id;
        await axios.delete(`${API_BASE_URL}/notesfolder/${folderId}`, {
          headers: { ...getAuthHeader(), "Content-Type": "application/json" } },
        );
        setFolders((prev) => {
          const newFolders = { ...prev };
          delete newFolders[name];
          return newFolders;
        });
      } catch (error) {
        console.error("Error deleting folder:", error);
        throw error;
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleViewNotes = (subject: string) => {
    setSelectedSubject(subject);
    setView("notes");
  };

  const handleCreateNote = (subject: string) => {
    setSelectedSubject(subject);
    setView("create");
    setNoteContent("");
    setNoteTags("");
  };

  const handleSaveNote = async () => {
    if (!selectedSubject || !noteContent) return;

    try {
      const folderId = folders[selectedSubject].id;
      const response = await axios.post(
        `${API_BASE_URL}/notesfolder/${folderId}/notes`,
        {
          title: noteContent.substring(0, 30) + "...",
          content: noteContent,
          tags: noteTags.split(",").map((tag) => tag.trim()),
        },
        { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
      );

      setFolders((prev) => ({
        ...prev,
        [selectedSubject]: {
          ...prev[selectedSubject],
          notes: [
            ...prev[selectedSubject].notes,
            {
              id: response.data.id,
              title: response.data.title,
              preview: response.data.content.substring(0, 50) + "...",
              date: new Date().toISOString().split("T")[0],
              lastModified: "Just now",
            },
          ],
        },
      }));
      setView("notes"); // Return to notes view after saving
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {showCreateFolder && (
        <CreateFolderModal
          onClose={() => setShowCreateFolder(false)}
          onCreate={handleCreateFolder}
        />
      )}

      {view === "list" ? (
        <div className="max-w-6xl mx-auto py-8 px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FolderOpen className="text-indigo-600 w-6 h-6" />
                Study Notes
              </h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowCreateFolder(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm"
              >
                <FolderPlus className="w-5 h-5" />
                New Folder
              </motion.button>
            </div>

            {loading ? (
              <div>Loading folders...</div>
            ) : (
              <AnimatePresence>
                <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.entries(folders).map(([subject, folderData]) => (
                    <SubjectFolder
                      key={folderData.id}
                      subject={subject}
                      folderData={folderData}
                      onViewNotes={handleViewNotes} // Updated prop
                      onEditFolder={handleEditFolder}
                      onDeleteFolder={handleDeleteFolder}
                    />
                  ))}
                  <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCreateFolder(true)}
                  className="w-full p-4 flex flex-col items-center justify-center gap-3
                    bg-white/50 rounded-xl shadow-sm hover:shadow-md transition-all
                    border-2 border-dashed border-gray-300 hover:border-indigo-300
                    text-gray-500 hover:text-indigo-600"
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center
                    bg-gradient-to-r from-gray-100 to-gray-200"
                  >
                    <FolderPlus className="w-8 h-8 text-gray-400" />
                  </div>
                  <span className="font-medium">New Folder</span>
                </motion.button>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      ) : view === "notes" && selectedSubject ? (
        <div className="max-w-4xl mx-auto py-8 px-4">
          <button
            onClick={() => setView("list")}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Folders
          </button>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Notes in {selectedSubject}
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCreateNote(selectedSubject)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                <Plus className="w-5 h-5" />
                Create New Note
              </motion.button>
            </div>

            {folders[selectedSubject].notes.length > 0 ? (
              <div className="space-y-4">
                {folders[selectedSubject].notes.map((note) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <h3 className="text-lg font-medium text-gray-800">{note.title}</h3>
                    <p className="text-sm text-gray-600">{note.preview}</p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                      <Calendar className="w-4 h-4" />
                      <span>{note.date}</span>
                      <Clock className="w-4 h-4 ml-2" />
                      <span>{note.lastModified}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No notes in this folder yet.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto py-8 px-4">
          <button
            onClick={() => setView("notes")}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Notes
          </button>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Create New Note - {selectedSubject}
            </h2>
            <div className="flex items-center gap-2 text-gray-500 mb-6">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>

            <div className="space-y-4">
              <RichTextEditorDemo
                className="w-full"
                value={noteContent}
                onChange={setNoteContent}
              />
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Add tags (comma separated)"
                  value={noteTags}
                  onChange={(e) => setNoteTags(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200"
                />
                <button
                  onClick={handleSaveNote}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getColorClass(color: string) {
  const colors = {
    blue: "from-blue-400 to-blue-600",
    purple: "from-purple-400 to-purple-600",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    orange: "from-orange-400 to-orange-600",
    indigo: "from-indigo-400 to-indigo-600",
  };
  return colors[color as keyof typeof colors] || "from-indigo-400 to-indigo-600";
}

export default Notes;