"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { RichTextEditorDemo } from "@/components/tiptap/rich-text-editor";
import axios from "axios";
import { getAuthHeader } from "@/lib/api";
import { JSONContent } from "@tiptap/core";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

interface NoteEditorProps {
  noteData: {
    id: number;
    title: string;
    content: string;
    preview: string;
    date: string;
    lastModified: string;
    tags?: string[];
    folderId?: string;
    folderName?: string;
  };
  onContentChange: (content: JSONContent) => void;
  handleChangeView: (view: "list" | "create" | "notes" | "edit") => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ noteData, onContentChange, handleChangeView }) => {
  const [noteContent, setNoteContent] = useState<JSONContent | null>(null);
  const [title, setTitle] = useState<string>(noteData.title || "");

  useEffect(() => {
    setTitle(noteData.title || "");
    if (noteData.content) {
      try {
        const parsedContent = JSON.parse(noteData.content);
        setNoteContent(parsedContent);
      } catch (error) {
        console.error("Error parsing note content:", error);
        setNoteContent(null);
      }
    } else {
      setNoteContent(null);
    }
  }, [noteData]);

  const handleSaveNote = async () => {
    try {
      const payload = {
        title: title || "Untitled",
        content: JSON.stringify(noteContent),
      };

      await axios.patch(`${API_BASE_URL}/notes/${noteData.id}`, payload, {
        headers: { ...getAuthHeader(), "Content-Type": "application/json" },
      });

      if (noteContent) {
        onContentChange(noteContent);
      }
      handleChangeView("notes");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleOnContentChange = (content: JSONContent) => {
    setNoteContent(content);
    onContentChange(content);
  };

  return (
    <div className="max-w-4xl min-h-[100%] bg-white mx-auto py-8 px-4">
      <button
        onClick={() => handleChangeView("notes")}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Notes
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {noteData.folderName ? `${noteData.folderName} - ${title}` : title || "Untitled"}
        </h2>
        <div className="flex items-center gap-2 text-gray-500 mb-6">
          <Calendar className="w-4 h-4" />
          <span>{noteData.date || new Date().toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-4 mb-5">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-500 bg-white text-gray-800 rounded-r-xl"
          />
          <button
            onClick={handleSaveNote}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl"
          >
            Save
          </button>
        </div>
        <div className="space-y-4 min-h-screen rounded-sm">
          {noteContent !== null ? (
            <RichTextEditorDemo
              className="w-full max-h-full"
              initialContent={noteContent}
              onContentChange={handleOnContentChange}
            />
          ) : (
            <p className="text-gray-500">No content available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;