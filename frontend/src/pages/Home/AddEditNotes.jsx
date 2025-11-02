import React, { useState } from "react";
import Modal from "react-modal";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import ColorPicker from "../../components/ColorPicker";

const AddEditNotes = ({
  noteData,
  type,
  getAllNotes,
  onClose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [color, setColor] = useState(noteData?.color || "#ffffff");

  const [error, setError] = useState(null);

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
        color,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // Edit Note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
        color,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 dark:text-white bg-transparent outline-none transition-colors duration-300"
          placeholder="Write your note title here..."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>

        <div className="bg-white dark:bg-slate-800 rounded-md overflow-visible relative transition-colors duration-300">
          {/* React Quill Editor */}
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Write your note here..."
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "clean"],
              ],
            }}
            className="editor-no-scroll"
          />

          {/* Circular color picker beside toolbar */}
          <div className="absolute top-2 right-3 flex items-center gap-2">
            <ColorPicker color={color} setColor={setColor} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && (
        <p className="text-red-400 dark:text-red-300 text-xs pt-4">{error}</p>
      )}

      <button
        className="btn-primary font-medium mt-5 p-3 bg-primary text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors duration-300"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
