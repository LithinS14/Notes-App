"use client"

import { useState } from "react"
import "../styles/NoteItem.css"

const NoteItem = ({ note, onDelete, onEdit }) => {
  const [expanded, setExpanded] = useState(false)

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="note-item">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button className="action-btn expand-btn" onClick={() => setExpanded(!expanded)}>
            {expanded ? "▲" : "▼"}
          </button>
          <button className="action-btn edit-btn" onClick={() => onEdit(note)}>
            ✏️
          </button>
          <button className="action-btn delete-btn" onClick={() => onDelete(note._id)}>
            🗑️
          </button>
        </div>
      </div>

      {expanded && (
        <div className="note-content">
          <p>{note.content}</p>
          <div className="note-footer">
            <span className="note-date">Created: {formatDate(note.createdAt)}</span>
            {note.updatedAt !== note.createdAt && (
              <span className="note-date">Updated: {formatDate(note.updatedAt)}</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NoteItem

