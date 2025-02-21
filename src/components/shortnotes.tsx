import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaStickyNote } from "react-icons/fa";

// Mock data for notes
const initialNotes = [
  {
    id: "1",
    subject: "Mathematics",
    title: "Quadratic Equations",
    content: "Quadratic equations are of the form ax² + bx + c = 0.",
  },
  {
    id: "2",
    subject: "Physics",
    title: "Newton's Laws",
    content: "Newton's first law is about inertia.",
  },
];

// Note Card Component
const NoteCard = ({ note, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
        <p className="text-sm text-gray-600">{note.subject}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(note.id)}
          className="text-blue-500 hover:text-blue-600"
        >
          <FaEdit className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-500 hover:text-red-600"
        >
          <FaTrash className="w-5 h-5" />
        </button>
      </div>
    </div>
    <p className="text-gray-700 mt-2">{note.content}</p>
  </div>
);

// Add/Edit Note Form Component
const NoteForm = ({ newNote, setNewNote, isEditing, handleSaveNote }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <FaStickyNote className="text-blue-500" />
      {isEditing ? "Edit Note" : "Add New Note"}
    </h2>
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Subject"
        value={newNote.subject}
        onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })}
        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="text"
        placeholder="Title"
        value={newNote.title}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <textarea
        placeholder="Content"
        value={newNote.content}
        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        rows={4}
      />
      <button
        onClick={handleSaveNote}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center gap-2"
      >
        <FaPlus className="w-4 h-4" />
        {isEditing ? "Update Note" : "Add Note"}
      </button>
    </div>
  </div>
);

// Main Notes App Component
const NotesApp = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState({
    subject: "",
    title: "",
    content: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);

  const handleSaveNote = () => {
    if (isEditing && editNoteId) {
      // Update existing note
      const updatedNotes = notes.map((note) =>
        note.id === editNoteId ? { ...note, ...newNote } : note
      );
      setNotes(updatedNotes);
      setIsEditing(false);
      setEditNoteId(null);
    } else {
      // Add new note
      const note = { ...newNote, id: String(notes.length + 1) };
      setNotes([...notes, note]);
    }
    setNewNote({ subject: "", title: "", content: "" });
  };

  const handleEditNote = (id: string) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setNewNote({
        subject: noteToEdit.subject,
        title: noteToEdit.title,
        content: noteToEdit.content,
      });
      setIsEditing(true);
      setEditNoteId(id);
    }
  };

  const handleDeleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <FaStickyNote className="text-blue-500" />
            Short Notes
          </h1>
          <p className="text-gray-600">Organize your notes efficiently.</p>
        </div>

        {/* Add/Edit Note Form */}
        <NoteForm
          newNote={newNote}
          setNewNote={setNewNote}
          isEditing={isEditing}
          handleSaveNote={handleSaveNote}
        />

        {/* Notes List */}
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesApp;