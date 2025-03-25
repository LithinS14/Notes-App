"use client"

import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import NoteForm from "../components/NoteForm"
import NoteItem from "../components/NoteItem"
import Modal from "../components/Modal"
import { api } from "../services/api"
import "../styles/Dashboard.css"

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentNote, setCurrentNote] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("updatedAt")
  const [sortOrder, setSortOrder] = useState("desc")

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      setLoading(true)
      const response = await api.get("/api/notes")
      setNotes(response.data)
      setError("")
    } catch (error) {
      setError("Failed to fetch notes")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddNote = async (noteData) => {
    try {
      const response = await api.post("/api/notes", noteData)
      setNotes([response.data, ...notes])
    } catch (error) {
      setError("Failed to add note")
      console.error(error)
    }
  }

  const handleUpdateNote = async (noteData) => {
    try {
      const response = await api.put(`/api/notes/${currentNote._id}`, noteData)
      setNotes(notes.map((note) => (note._id === currentNote._id ? response.data : note)))
      setIsModalOpen(false)
      setCurrentNote(null)
    } catch (error) {
      setError("Failed to update note")
      console.error(error)
    }
  }

  const handleDeleteNote = async (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await api.delete(`/api/notes/${noteId}`)
        setNotes(notes.filter((note) => note._id !== noteId))
      } catch (error) {
        setError("Failed to delete note")
        console.error(error)
      }
    }
  }

  const handleEditClick = (note) => {
    setCurrentNote(note)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentNote(null)
  }

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1
    }
  })

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Notes</h1>
        <p>Welcome back, {user?.name}!</p>
      </div>

      <div className="dashboard-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="sort-container">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="updatedAt">Last Updated</option>
            <option value="createdAt">Created Date</option>
            <option value="title">Title</option>
          </select>

          <button className="sort-order-btn" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      <div className="note-form-container">
        <h2>Add a New Note</h2>
        <NoteForm onSubmit={handleAddNote} />
      </div>

      {error && <div className="error">{error}</div>}

      <div className="notes-container">
        <h2>Your Notes ({filteredNotes.length})</h2>

        {loading ? (
          <div className="loading">Loading notes...</div>
        ) : sortedNotes.length > 0 ? (
          <div className="notes-grid">
            {sortedNotes.map((note) => (
              <NoteItem key={note._id} note={note} onDelete={handleDeleteNote} onEdit={handleEditClick} />
            ))}
          </div>
        ) : (
          <div className="no-notes">
            {searchTerm ? "No notes match your search" : "You have no notes yet. Create one!"}
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit Note">
        <NoteForm onSubmit={handleUpdateNote} initialData={currentNote} />
      </Modal>
    </div>
  )
}

export default Dashboard

