import React, { useState } from "react";
import Modal from "../modal";
import { Button } from "@mui/material";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';

import 'froala-editor/css/froala_style.css'; // Optional for additional styling
import 'froala-editor/js/froala_editor.pkgd.min.js';


const AllNotes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]); // Holds all notes
  const [singleNote, setSingleNote] = useState(""); // Holds the note being written

  const handleSubmitNote = () => {
    if (singleNote.trim()) {
      setNotes([...notes, singleNote]); 
      setSingleNote(""); 
      setIsModalOpen(false); 
    }
  };

  const options = {
    // Toolbar buttons
    toolbarButtons: [
      'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 
      'fontSize', 'fontFamily', 'color', 'alignLeft', 'alignCenter', 'alignRight', 
      'alignJustify', 'outdent', 'indent', 'insertOrderedList', 'insertUnorderedList', 
      'quote', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html', 'fullscreen'
    ],
  
    // Plugins enabled (only free ones)
    pluginsEnabled: [
      'align', 'charCounter', 'lists', 'link', 'image', 'file', 'help', 'emoji'
    ],
  
    // Character counter options
    charCounterMax: 1400,
  
    // Link options
    linkInsertButtons: ['linkBack', 'linkRemove'],
  
    // File upload options (ensure you handle the upload logic separately)
    fileUpload: true,
    fileMaxSize: 10 * 1024 * 1024, // 10MB max file size
  
    // Image options
    imageMaxSize: 5 * 1024 * 1024, // 5MB max image size
    imageUpload: true,
    imageAllowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
    
    // Table options (free version allows only basic table functionality)
    tableStyles: {
      table: 'table table-bordered', 
      th: 'th-class', 
      td: 'td-class'
    },
  
    // Font size and family customization
    fontFamily: ['Arial', 'Times New Roman', 'Verdana'],
    fontSize: ['8', '10', '12', '14', '16', '18', '24', '36'],
  
    // Customize the toolbar color
    // toolbarInline: true,
    // toolbarSticky: true, // Keeps the toolbar visible when scrolling
    
    // Focus settings
    focus: true, // Auto-focus the editor on page load
  
    // Placeholder text
    placeholderText: 'Start typing...',
  
    // Theme settings
    theme: 'royal', // Choose from 'royal', 'gray', 'bootstrap' or custom themes
  
    // Additional options
    // enter: $.FroalaEditor.ENTER_P, // Determines how the editor handles the Enter key
  };
  

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth={350}
      >
        <div className="mt-6 space-y-3">
          <hr />
          <div className="text-black mb-5 text-[16px] text-center font-semibold px-10">
            <FroalaEditorComponent
              tag="textarea"
              model={singleNote}
              onModelChange={setSingleNote}
              config={options}
            />
          </div>
          <hr />
          <div className="float-right space-x-3">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmitNote}
            >
              Add Note
            </Button>
          </div>
        </div>
      </Modal>

      {/* Notes header */}
      <div className="flex justify-between items-center bg-gray-200 px-4 py-2 rounded-md">
        <h1 className="font-bold text-2xl text-black">Notes</h1>
        <button
          type="button"
          className="px-4 py-2 rounded-md bg-blue-800 text-white"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Add Notes
        </button>
      </div>

      {/* Listing all notes */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.length === 0 ? (
          <p className="text-center col-span-full">No notes added yet.</p>
        ) : (
          notes.map((note, index) => (
            <NoteListingCard key={index} note={note} index={index} />
          ))
        )}
      </div>
    </div>
  );
};


const NoteListingCard = ({ note, index }:any) => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="font-medium text-xl text-gray-800 mb-3">Note #{index + 1}</div>
      <div className="text-gray-700 text-base" dangerouslySetInnerHTML={{ __html: note }} />
    </div>
  );
};

export default AllNotes;
