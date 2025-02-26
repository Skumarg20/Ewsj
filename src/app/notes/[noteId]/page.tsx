// components/notes/NoteEditor.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
    content: string; // JSON string from parent
    preview: string;
    date: string;
    lastModified: string;
    tags?: string[];
    folderId?: string;
    folderName?: string;
  };
  onContentChange: (content: JSONContent) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ noteData, onContentChange }) => {
  const router = useRouter();
  const [noteContent, setNoteContent] = useState<JSONContent | null>(null);
  const [title, setTitle] = useState<string>(noteData.title || "");
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    console.log("NoteEditor received noteData:", noteData);
    setTitle(noteData.title || "");
    if (noteData.content) {
      try {
        const parsedContent = JSON.parse(noteData.content); // Parse JSON string to JSONContent
        setNoteContent(JSON.parse(parsedContent));
        console.log("Parsed noteContent:", JSON.parse(parsedContent),parsedContent);
      } catch (error) {
        console.error("Error parsing note content:", error);
        setNoteContent(null);
      }
    } else {
      setNoteContent(null);
    }
  }, [noteData]);

  const handleSaveNote = async () => {
    if (!isEditable) {
      setIsEditable(true);
      return;
    }

    try {
      const payload = {
        title: title || "Untitled",
        content: JSON.stringify(noteContent), // Convert back to JSON string for API
      };

      await axios.patch(
        `${API_BASE_URL}/notes/${noteData.id}`,
        payload,
        { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
      );
      if (noteContent) {
        onContentChange(noteContent); // Pass JSONContent to parent
      }

      router.back();
      setIsEditable(false);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleOnContentChange = (content: JSONContent) => {
    if (isEditable) {
      setNoteContent(content);
      onContentChange(content);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <button
        onClick={() => router.back()}
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

        <div className="space-y-4 rounded-sm">
          {noteContent !== null ? (
            <RichTextEditorDemo
              className="w-full"
              initialContent={noteContent} 
              onContentChange={handleOnContentChange}
            />
          ) : (
            <p className="text-gray-500">No content available</p>
          )}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => isEditable && setTitle(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-500 bg-white text-gray-800"
              disabled={!isEditable}
            />
            <button
              onClick={handleSaveNote}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg"
            >
              {isEditable ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;