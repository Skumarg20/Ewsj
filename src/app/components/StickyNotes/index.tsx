import React, { useState } from "react";

interface Note {
  id: number;
  title: string;
  text: string;
  color: string;
  subject: string;
  timestamp: string;
}

const StickyNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newNote, setNewNote] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("yellow");
  const [selectedSubject, setSelectedSubject] = useState<string>("General");
  const [openSubjects, setOpenSubjects] = useState<Record<string, boolean>>({});

  const subjects = [
    "General",
    "Math",
    "Science",
    "History",
    "English",
    "Programming",
  ];
  const colors = ["yellow", "pink", "green", "blue", "purple", "gray"];

  const addNote = () => {
    if (newTitle.trim() === "" || newNote.trim() === "") return;

    const note: Note = {
      id: Date.now(),
      title: newTitle,
      text: newNote,
      color: selectedColor,
      subject: selectedSubject,
      timestamp: new Date().toLocaleString(),
    };

    setNotes([...notes, note]);
    setNewTitle("");
    setNewNote("");
    setOpenSubjects({ ...openSubjects, [selectedSubject]: true }); // Auto-open folder
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleSubject = (subject: string) => {
    setOpenSubjects((prev) => ({ ...prev, [subject]: !prev[subject] }));
  };

  return (
    <div className="h-auto bg-gray-800 p-4 w-full">
      <h1 className="text-3xl font-bold text-left mb-6">Short Notes</h1>
  
      {/* Add Note Section */}
      <div className="max-w-2xl mx-auto mb-6 flex flex-col">
  <input
    value={newTitle}
    onChange={(e) => setNewTitle(e.target.value)}
    placeholder="Enter note title..."
    className="w-full p-3 border bg-gray-700 text-white rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
  />
  <textarea
    value={newNote}
    onChange={(e) => setNewNote(e.target.value)}
    placeholder="Write your note..."
    className="w-full p-4 border bg-gray-700 text-white rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    style={{
      maxWidth: "100%",
      minHeight: "120px",
      backgroundColor: selectedColor,
      color: selectedColor === "yellow" ? "black" : "white",
    }}
  />

  {/* Subject & Color Selection */}
  <div className="flex flex-wrap justify-end items-center gap-4 mt-4">
    <select
      value={selectedSubject}
      onChange={(e) => setSelectedSubject(e.target.value)}
      className="p-2 border bg-gray-700 text-white rounded-none"
    >
      {subjects.map((subject) => (
        <option key={subject} value={subject}>
          {subject}
        </option>
      ))}
    </select>

    <select
      value={selectedColor}
      onChange={(e) => setSelectedColor(e.target.value)}
      className="p-2 border bg-gray-700 text-white rounded-none"
    >
      {colors.map((color) => (
        <option key={color} value={color}>
          {color}
        </option>
      ))}
    </select>
  </div>

  {/* Add Note Button (Full width on mobile) */}
  <button
    onClick={addNote}
    className="px-6 py-2 mt-3 text-white bg-blue-600 rounded-none hover:bg-blue-700 focus:outline-none w-full sm:w-auto"
  >
    Add Note
  </button>
</div>

  

      <div className="space-y-6">
        {subjects.map((subject) => {
          const subjectNotes = notes
            .filter((note) => note.subject === subject)
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
          if (subjectNotes.length === 0) return null;
  
          return (
            <div key={subject} className="bg-gray-700 shadow-md rounded-lg">
              <div
                className="flex justify-between items-center p-4 bg-gray-900 cursor-pointer rounded-lg"
                onClick={() => toggleSubject(subject)}
              >
                <h2 className="text-lg font-bold">{subject} ({subjectNotes.length})</h2>
                <span className="text-gray-500">{openSubjects[subject] ? "▼" : "►"}</span>
              </div>
  
              {/* Notes Grid (Only Show if Open) */}
              {openSubjects[subject] && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                  {subjectNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-4 rounded-lg shadow-lg relative"
                      style={{
                        backgroundColor: note.color,
                        color: note.color === "yellow" ? "black" : "white",
                        wordWrap: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {/* Title with Delete Button */}
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold flex-1 break-words">{note.title}</h3>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="text-gray-300 hover:text-white"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
  
};

export default StickyNotes;
