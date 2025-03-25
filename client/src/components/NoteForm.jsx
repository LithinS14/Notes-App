"use client"

import { useState, useEffect } from "react"
import "../styles/NoteForm.css"

const NoteForm = ({ onSubmit, initialData = null }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setContent(initialData.content)
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required")
      return
    }

    onSubmit({ title, content })

    if (!initialData) {
      setTitle("")
      setContent("")
    }

    setError("")
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control"
          rows="5"
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        {initialData ? "Update Note" : "Add Note"}
      </button>
    </form>
  )
}

export default NoteForm

