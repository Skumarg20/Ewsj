'use client'
import React, { useState } from 'react';
import { 
  FolderOpen, 
  Plus, 
  Book, 
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
  X
} from 'lucide-react';
import { RichTextEditorDemo } from '@/components/tiptap/rich-text-editor';

// Sample data structure with custom folders support
const sampleNotes = {
  Physics: {
    id: 'physics-001',
    color: 'blue',
    notes: [
      {
        id: 1,
        title: "Electromagnetism Core Concepts",
        preview: "Key principles of electromagnetic induction and its applications...",
        date: "2025-02-18",
        lastModified: "2 hours ago",
        tags: ["electromagnetics", "induction", "important"]
      },
      {
        id: 2,
        title: "Wave Optics Notes",
        preview: "Detailed explanation of interference, diffraction, and polarization...",
        date: "2025-02-17",
        lastModified: "1 day ago",
        tags: ["optics", "waves"]
      }
    ]
  },
  Chemistry: {
    id: 'chemistry-001',
    color: 'purple',
    notes: [
      {
        id: 3,
        title: "Organic Chemistry Mechanisms",
        preview: "SN1 and SN2 reaction mechanisms with detailed examples...",
        date: "2025-02-18",
        lastModified: "5 hours ago",
        tags: ["organic", "reactions", "mechanisms"]
      }
    ]
  },
  Mathematics: {
    id: 'math-001',
    color: 'green',
    notes: [
      {
        id: 4,
        title: "Integration Techniques",
        preview: "Advanced methods of integration including parts and substitution...",
        date: "2025-02-16",
        lastModified: "3 days ago",
        tags: ["calculus", "integration"]
      }
    ]
  }
};

interface FolderData {
  id: string;
  color: string;
  notes: Array<{
    id: number;
    title: string;
    preview: string;
    date: string;
    lastModified: string;
    tags: string[];
  }>;
}

function CreateFolderModal({ onClose, onCreate }: { 
  onClose: () => void;
  onCreate: (name: string, color: string) => void;
}) {
  const [folderName, setFolderName] = useState('');
  const [selectedColor, setSelectedColor] = useState('indigo');
  
  const colors = [
    { name: 'indigo', class: 'from-indigo-500 to-indigo-600' },
    { name: 'blue', class: 'from-blue-500 to-cyan-500' },
    { name: 'purple', class: 'from-purple-500 to-pink-500' },
    { name: 'green', class: 'from-green-500 to-emerald-500' },
    { name: 'red', class: 'from-red-500 to-rose-500' },
    { name: 'orange', class: 'from-orange-500 to-amber-500' },
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
              Choose Color
            </label>
            <div className="grid grid-cols-6 gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-lg bg-gradient-to-r ${color.class} 
                    ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-indigo-600' : ''}`}
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
                  onCreate(folderName, selectedColor);
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

function SubjectFolder({ subject, folderData, onNoteClick, onCreateNote, onEditFolder, onDeleteFolder }: {
  subject: string;
  folderData: FolderData;
  onNoteClick: (note: any) => void;
  onCreateNote: (subject: string) => void;
  onEditFolder: (subject: string) => void;
  onDeleteFolder: (subject: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const getSubjectColor = (color: string) => {
    const colors = {
      'blue': 'from-blue-500 to-cyan-500 shadow-blue-200',
      'purple': 'from-purple-500 to-pink-500 shadow-purple-200',
      'green': 'from-green-500 to-emerald-500 shadow-green-200',
      'red': 'from-red-500 to-rose-500 shadow-red-200',
      'orange': 'from-orange-500 to-amber-500 shadow-orange-200',
    };
    return colors[color as keyof typeof colors] || 'from-indigo-500 to-violet-500 shadow-indigo-200';
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
          className={`w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200
            flex items-center justify-between group mb-2`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getSubjectColor(folderData.color)} 
              flex items-center justify-center shadow-lg`}>
              <Book className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-800">{subject}</span>
            <span className="text-sm text-gray-500">({folderData.notes.length} notes)</span>
          </div>
          <div className="flex items-center gap-2">
            {showActions && (
              <div className="flex items-center gap-2 mr-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditFolder(subject);
                  }}
                  className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteFolder(subject);
                  }}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-200
              ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
          </div>
        </button>
      </div>
      
      {isOpen && (
        <div className="pl-4 space-y-3">
          {folderData.notes.map(note => (
            <div 
              key={note.id}
              onClick={() => onNoteClick(note)}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-4 cursor-pointer
                hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">{note.title}</h3>
                <span className="text-xs text-gray-500">{note.lastModified}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{note.preview}</p>
              <div className="flex items-center gap-2">
                {note.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={() => onCreateNote(subject)}
            className="w-full bg-white/40 backdrop-blur-sm rounded-xl p-4 
              border border-dashed border-gray-300 hover:border-indigo-300
              hover:bg-white/60 transition-all duration-200
              flex items-center justify-center gap-2 text-gray-600 hover:text-indigo-600"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Note</span>
          </button>
        </div>
      )}
    </div>
  );
}

function Notes() {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [folders, setFolders] = useState<Record<string, FolderData>>(sampleNotes);

  const handleCreateFolder = (name: string, color: string) => {
    setFolders(prev => ({
      ...prev,
      [name]: {
        id: `folder-${Date.now()}`,
        color,
        notes: []
      }
    }));
  };

  const handleEditFolder = (subject: string) => {
    // Implement folder editing logic
    console.log('Edit folder:', subject);
  };

  const handleDeleteFolder = (subject: string) => {
    // Implement folder deletion logic with confirmation
    if (window.confirm(`Are you sure you want to delete the folder "${subject}" and all its notes?`)) {
      const newFolders = { ...folders };
      delete newFolders[subject];
      setFolders(newFolders);
    }
  };

  const handleCreateNote = (subject: string) => {
    setSelectedSubject(subject);
    setView('create');
  };

  const handleNoteClick = (note: any) => {
    // Handle note click - you can implement note viewing/editing here
    console.log('Note clicked:', note);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {showCreateFolder && (
        <CreateFolderModal
          onClose={() => setShowCreateFolder(false)}
          onCreate={handleCreateFolder}
        />
      )}

      {view === 'list' ? (
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                from-indigo-600 to-purple-600">
                Your Study Notes
              </h1>
              <button
                onClick={() => setShowCreateFolder(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm
                  hover:shadow-md transition-all duration-200 text-indigo-600 hover:text-indigo-700"
              >
                <FolderPlus className="w-5 h-5" />
                <span>New Folder</span>
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search your notes..."
                className="w-full px-4 py-3 pl-12 rounded-xl bg-white/80 backdrop-blur-sm
                  border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500
                  focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {Object.entries(folders).map(([subject, folderData]) => (
              <SubjectFolder
                key={folderData.id}
                subject={subject}
                folderData={folderData}
                onNoteClick={handleNoteClick}
                onCreateNote={handleCreateNote}
                onEditFolder={handleEditFolder}
                onDeleteFolder={handleDeleteFolder}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto py-8 px-4">
          <button
            onClick={() => setView('list')}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 
              transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Notes</span>
          </button>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Create New Note - {selectedSubject}
              </h2>
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{new Date().toLocaleDateString()}</span>
                <Clock className="w-4 h-4 ml-4" />
                <span className="text-sm">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="space-y-4">
            <RichTextEditorDemo className="w-full rounded-xl bg-white text-gray-800"/>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Add tags (comma separated)"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 
                  text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 
                  transition-all duration-200 shadow-md hover:shadow-lg">
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