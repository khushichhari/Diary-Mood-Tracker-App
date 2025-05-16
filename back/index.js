// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "https://diary-mood-tracker-app.vercel.app/"
}));

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    // these options are not needed in Mongoose 7+, so you can remove them
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Diary Entry Schema & Model
const diarySchema = new mongoose.Schema({
  date: { type: String, required: true },
  emoji: { type: String, required: true },
  text: { type: String, required: true },
});

const DiaryEntry = mongoose.model("DiaryEntry", diarySchema);

// Routes for Diary
app.post("/diary", async (req, res) => {
  const { date, emoji, text } = req.body;

  try {
    const existingEntry = await DiaryEntry.findOne({ date });
    if (existingEntry) {
      existingEntry.emoji = emoji;
      existingEntry.text = text;
      await existingEntry.save();
      return res.status(200).json({ message: "Diary entry updated successfully!" });
    }

    const newEntry = new DiaryEntry({ date, emoji, text });
    await newEntry.save();
    res.status(201).json({ message: "Diary entry saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save diary entry." });
  }
});

app.get("/diary", async (req, res) => {
  try {
    const entries = await DiaryEntry.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch diary entries." });
  }
});

app.get("/diary/:date", async (req, res) => {
  try {
    const entry = await DiaryEntry.find({ date: req.params.date });
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch diary entry." });
  }
});

// Todo Schema & Model
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

// Routes for Todo
app.post("/add", async (req, res) => {
  const { task } = req.body;

  if (!task) return res.status(400).json({ error: "Task is required" });

  try {
    const todo = new Todo({ task });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: "Error creating todo", details: err });
  }
});

app.get("/get", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos." });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, { done: true }, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating todo." });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ error: "Error deleting todo." });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("✅ Server is running. Use /diary for diary and /get or /add for todos.");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
