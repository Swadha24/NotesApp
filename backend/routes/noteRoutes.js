const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

router.get("/", (req, res) => {
  res.send("Notes API Running");
});

// CREATE
router.post("/notes", async (req, res) => {
  const note = await Note.create({ text: req.body.text });
  res.json(note);
});

// READ
router.get("/notes", async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

// UPDATE
router.put("/notes/:id", async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true }
  );

  res.json(note);
});

// DELETE
router.delete("/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;