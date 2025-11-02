import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  color,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div
      className="border rounded p-4 hover:shadow-xl transition-all ease-in-out 
      bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 
      text-slate-800 dark:text-slate-100"
      style={{
        backgroundColor:
          color && color !== "#ffffff"
            ? color
            : document.documentElement.classList.contains("dark")
            ? "#1e293b"
            : "#ffffff",
      }}
    >
      {/* --- Header Section --- */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${
            isPinned ? "text-primary" : "text-slate-300 dark:text-slate-500"
          }`}
          onClick={onPinNote}
        />
      </div>

      {/* --- Render Formatted Note Content --- */}
      <div
        className="text-xs text-slate-700 dark:text-slate-300 mt-2 prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{
          __html:
            content?.length > 100
              ? `${content.slice(0, 100)}...`
              : content || "",
        }}
      ></div>

      {/* --- Tags & Actions --- */}
      <div className="flex items-center justify-between mt-3">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {tags.map((item, index) => (
            <span key={index}>#{item} </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600 dark:hover:text-green-400"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500 dark:hover:text-red-400"
            onClick={() => {
              const confirmDelete = window.confirm(
                "Are you sure you want to delete this note?"
              );
              if (confirmDelete) {
                onDelete();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
