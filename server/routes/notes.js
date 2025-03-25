const express = require("express")
const Note = require("../models/Note")
const auth = require("../middleware/auth")
const router = express.Router()

// Get all notes for current user
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ updatedAt: -1 })
    res.json(notes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get a specific note
router.get("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId })

    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    res.json(note)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create a new note
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body

    const newNote = new Note({
      title,
      content,
      user: req.userId,
    })

    const note = await newNote.save()
    res.status(201).json(note)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update a note
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, content } = req.body

    // Find note and check ownership
    const note = await Note.findOne({ _id: req.params.id, user: req.userId })

    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    // Update note
    note.title = title
    note.content = content

    await note.save()
    res.json(note)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete a note
router.delete("/:id", auth, async (req, res) => {
  try {
    // Find note and check ownership
    const note = await Note.findOne({ _id: req.params.id, user: req.userId })

    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    await note.remove()
    res.json({ message: "Note removed" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router

