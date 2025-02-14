import React, { useState } from "react";
import { FaFolder } from "react-icons/fa";

interface Note {
  id: number;
  title: string;
  text: string;
  subject: string;
  timestamp: string;
}

const StickyNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newNote, setNewNote] = useState<string>("");
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

  const addNote = () => {
    if (newTitle.trim() === "" || newNote.trim() === "") return;

    const note: Note = {
      id: Date.now(),
      title: newTitle,
      text: newNote,
      subject: selectedSubject,
      timestamp: new Date().toLocaleString(),
    };

    setNotes([...notes, note]);
    setNewTitle("");
    setNewNote("");
    setOpenSubjects({ ...openSubjects, [selectedSubject]: true }); 
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleSubject = (subject: string) => {
    setOpenSubjects((prev) => ({ ...prev, [subject]: !prev[subject] }));
  };

  return (
    <div className="h-auto bg-slate-100 p-4 w-full">
      <h1 className="text-3xl font-bold text-left mb-6">Short Notes</h1>

      <div className="max-w-2xl mx-auto mb-6 flex flex-col">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter note title..."
          className="w-full p-3 border bg-gray-700 text-white rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        />
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note..."
          className="w-full p-4 border bg-gray-700 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          style={{ maxWidth: "100%", minHeight: "120px" }}
        />

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
        </div>

        <button
          onClick={addNote}
          className="px-6 py-2 mt-3 text-white bg-blue-600 rounded-3xl hover:bg-blue-700 focus:outline-none w-full sm:w-auto"
        >
          Add Note
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {subjects.map((subject) => {
          const subjectNotes = notes.filter((note) => note.subject === subject);
          if (subjectNotes.length === 0) return null;

          return (
            <div key={subject} className="text-center">
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => toggleSubject(subject)}
              >
                <FaFolder className="text-yellow-500 text-6xl" />
                <p className="mt-2 text-lg font-bold">{subject}</p>
              </div>
              {openSubjects[subject] && (
                <div className="mt-4 space-y-2">
                  {subjectNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-2 bg-gray-600 text-white rounded-lg shadow-md flex justify-between items-center"
                    >
                      <span className="break-words flex-1">{note.title}</span>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="text-gray-300 hover:text-white ml-2"
                      >
                        🗑️
                      </button>
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
