require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// *** Diary Functionality ***

// Diary Entry Schema
const diarySchema = new mongoose.Schema({
  date: { type: String, required: true },
  emoji: { type: String, required: true },
  text: { type: String, required: true },
});

// Diary Model
const DiaryEntry = mongoose.model("DiaryEntry", diarySchema);

// Add a new diary entry
app.post("/diary", async (req, res) => {
  const { date, emoji, text } = req.body;

  try {
    const existingEntry = await DiaryEntry.findOne({ date });
    if (existingEntry) {
      existingEntry.emoji = emoji;
      existingEntry.text = text;
      await existingEntry.save();
      res.status(200).json({ message: "Diary entry updated successfully!" });
    } else {
      const newEntry = new DiaryEntry({ date, emoji, text });
      await newEntry.save();
      res.status(201).json({ message: "Diary entry saved successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to save diary entry." });
  }
});

// Get all diary entries
app.get("/diary", async (req, res) => {
  try {
    const entries = await DiaryEntry.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch diary entries." });
  }
});

// Get diary entries by date
app.get("/diary/:date", async (req, res) => {
  const { date } = req.params;

  try {
    const entries = await DiaryEntry.find({ date });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch diary entries for the date." });
  }
});

// *** Todo Functionality ***

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const TodoModel = mongoose.model("Todo", todoSchema);

// Add a new todo
app.post("/add", async (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }

  try {
    const newTodo = await TodoModel.create({ task });
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Error creating todo", details: err });
  }
});

// Get all todos
app.get("/get", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos." });
  }
});

// Update todo status
app.put("/update/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { done: true },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Error updating todo." });
  }
});

// Delete todo
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    res.status(200).json(deletedTodo);
  } catch (err) {
    res.status(500).json({ error: "Error deleting todo." });
  }
});

// Default Route
app.get("/", (req, res) => {
  res.send("Server is running. Use /diary for diary and /get or /add for todos.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
