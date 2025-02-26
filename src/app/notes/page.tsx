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
import { useRouter } from "next/navigation";
import { RichTextEditorDemo } from "@/components/tiptap/rich-text-editor";
import axios from "axios";
import { getAuthHeader } from "@/lib/api";
import { JSONContent } from "@tiptap/core";
import {CreateFolder,Note,FolderData} from '@/interface/notesinterface'
import NoteEditor from "./[noteId]/page";
const spring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};




const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

function CreateFolderModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (name: string, color: string, description?: string) => void;
}) {
  const [folderName, setFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#4F46E5"); // Default to indigo
  const [description, setDescription] = useState("");

  const colors = [
    { color: "#4F46E5" }, // Indigo
    { color: "#3B82F6" }, // Blue
    { color: "#8B5CF6" }, // Purple
    { color: "#10B981" }, // Green
    { color: "#EF4444" }, // Red
    { color: "#F59E0B" }, // Orange
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
              {colors.map((item) => (
                <button
                  key={item.color}
                  onClick={() => setSelectedColor(item.color)}
                  style={{ backgroundColor: item.color }}
                  className={`w-8 h-8 rounded-lg
                    ${selectedColor === item.color ? "ring-2 ring-offset-2 ring-indigo-600" : ""}`}
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
  // onDeleteFolder,
}: {
  subject: string;
  folderData: FolderData;
  onViewNotes: (subject: string) => void;
  onEditFolder: (folder: CreateFolder) => void;
  // onDeleteFolder: (folder: CreateFolder) => void;
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
        onClick={() => onViewNotes(subject)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full p-4 flex flex-col items-center justify-center gap-3
          bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300
          border-2 border-transparent hover:border-indigo-200 relative overflow-hidden"
      >
        {/* Static Folder Design */}
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 2 : 0 }}
          className="w-20 h-20 rounded-2xl flex items-center justify-center
            relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
            shadow-lg overflow-hidden"
        >
          {/* Subtle overlay pattern */}
          <div
  className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2220%22%20height=%2220%22%20viewBox=%220%200%2020%2020%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22%233B82F6%22%20fill-opacity=%220.2%22%3E%3Ccircle%20cx=%223%22%20cy=%223%22%20r=%221%22/%3E%3Ccircle%20cx=%2210%22%20cy=%2210%22%20r=%221%22/%3E%3Ccircle%20cx=%2217%22%20cy=%2217%22%20r=%221%22/%3E%3C/g%3E%3C/svg%3E')] animate-pulse-slow"
/>
          
          {/* Folder Icon */}
          <Folder className="w-8 h-8 text-white z-10" />

          {/* Glowing effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: [-100, 100] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </motion.div>

        {/* Subject Name */}
        <span className="font-semibold text-gray-800 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {subject}
        </span>

        {/* Notes Count */}
        <span className="text-sm text-gray-500 font-medium">
          {folderData.notes.length} notes
        </span>

        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-20px] left-[-20px] w-16 h-16 bg-indigo-300/20 rounded-full animate-pulse" />
          <div className="absolute bottom-[-20px] right-[-20px] w-16 h-16 bg-purple-300/20 rounded-full animate-pulse" />
        </div>
      </button>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEditFolder({ name: subject, color: folderData.color, description: folderData.description });
          }}
          className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm
            hover:bg-indigo-100 hover:shadow-md text-indigo-500 hover:text-indigo-700
            transition-all duration-200"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteFolder({ name: subject, color: folderData.color, description: folderData.description });
          }}
          className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm
            hover:bg-red-100 hover:shadow-md text-red-500 hover:text-red-700
            transition-all duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </button> */}
      </div>
    </motion.div>
  );
}

function Notes() {
  const [view, setView] = useState<"list" | "create" | "notes" | "edit">("list"); // Added "notes" view
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [folders, setFolders] = useState<Record<string, FolderData>>({});
  const [noteContent, setNoteContent] = useState<JSONContent|null>(null);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  console.log(selectedNote,"this is notes content selected note need to submit");
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

  const handleViewNote = (note: Note) => {
    console.log(note,"this is not in handleview note")
    setSelectedNote(note);
    setView("edit");
  };
  
  // const handleDeleteFolder = async ({ name, color, description }: CreateFolder) => {
  //   if (window.confirm(`Are you sure you want to delete "${name}" and all its contents?`)) {
  //     setIsDeleting(true);
  //     try {
  //       const folderId = folders[name].id;
  //       await axios.delete(`${API_BASE_URL}/notesfolder/${folderId}`, {
  //         headers: { ...getAuthHeader(), "Content-Type": "application/json" } },
  //       );
  //       setFolders((prev) => {
  //         const newFolders = { ...prev };
  //         delete newFolders[name];
  //         return newFolders;
  //       });
  //     } catch (error) {
  //       console.error("Error deleting folder:", error);
  //       throw error;
  //     } finally {
  //       setIsDeleting(false);
  //     }
  //   }
  // };

  const handleViewNotes = (subject: string) => {
    setSelectedSubject(subject);
    setView("notes");
  };

  const handleCreateNote = (subject: string) => {
    setSelectedSubject(subject);
    setView("create");
    setNoteContent(null);
    setTitle("");
  };

  const handleSaveNote = async () => {
    console.log("Selected Subject:", selectedSubject, "Note Content:", noteContent, "this is for save notes api");
    if (!selectedSubject || !noteContent) {
      console.log("Missing required fields - selectedSubject or noteContent is undefined");
      return;
    }
  
    try {
      const folderId = folders[selectedSubject].id;
      console.log("Folder ID:", folderId, "Title:", title,JSON.stringify(noteContent)); 
      const payload = {
        title: title || "Untitled",
        content: JSON.stringify(noteContent || ""), // Ensure content is always a string
      };
      console.log(payload,"this is payload");
      const response = await axios.post(
        `${API_BASE_URL}/notes/${folderId}/note`,
        payload,
        { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
      );
  
      console.log("API Response:", response.data); // Log response for debugging
  
      setFolders((prev) => ({
        ...prev,
        [selectedSubject]: {
          ...prev[selectedSubject],
          notes: [
            ...prev[selectedSubject].notes,
            {
              id: response.data.id,
              title: response.data.title,
              preview: response.data.content.substring(0, 50) + "..." || "No preview",
              date: new Date().toISOString().split("T")[0],
              lastModified: "Just now",
            },
          ],
        },
      }));
      setView("notes");
      setNoteContent(null);
      setTitle(""); // Clear title after saving
    } catch (error) {
      console.error("Error saving note:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response?.data);
      }
    }
  };
  const handleOnContentChange = (content: JSONContent) => {
    console.log("Content changed:", content);
    setNoteContent(content);
    if (selectedNote && selectedSubject) {
      setFolders((prev) => ({
        ...prev,
        [selectedSubject]: {
          ...prev[selectedSubject],
          notes: prev[selectedSubject].notes.map((n) =>
            n.id === selectedNote.id
              ? {
                  ...n,
                  content: JSON.stringify(content), // Store as JSON string
                  preview: content.content?.[0]?.content?.[0]?.text?.substring(0, 50) + "..." || "No preview",
                  lastModified: "Just now",
                }
              : n
          ),
        },
      }));
    }
  };
if (view === "edit" && selectedNote) {
  console.log(selectedNote,"this is selected note");
  return (
    <NoteEditor
      noteData={selectedNote}
      onContentChange={handleOnContentChange}
    />
  );
}
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
                    onClick={() => handleViewNote(note)}
                  >
                    <h3 className="text-lg font-medium text-gray-800">{note.title}</h3>
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

            <div className="space-y-4 rounded-sm">
              <RichTextEditorDemo
                className="w-full"
                initialContent={noteContent}
               onContentChange={handleOnContentChange}
              />
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-500 bg-white text-gray-800"
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


export default Notes;