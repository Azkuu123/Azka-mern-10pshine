require("dotenv").config();
require("dns").setDefaultResultOrder("ipv4first");

const config = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const User = require("./models/user.model");
const Note = require("./models/note.model");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./logger");
const pinoHttp = require("pino-http");

const app = express();

// ✅ MongoDB connection
mongoose
  .connect(config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info("✅ MongoDB connected successfully"))
  .catch((err) => logger.error("❌ MongoDB connection error:", err));

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(pinoHttp({ logger }));

// ✅ Root route
app.get("/", (req, res) => {
  logger.info("Root route accessed");
  res.json({ data: "hello" });
});

// =================== AUTH ROUTES =================== //

// ✅ Create Account
app.post("/create-account", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      const err = new Error("All fields are required");
      err.statusCode = 400;
      throw err;
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
      const err = new Error("User already exists");
      err.statusCode = 409;
      throw err;
    }

    const user = new User({ fullName, email, password });
    await user.save();

    logger.info(`🆕 New user registered: ${email}`);

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    res.json({
      error: false,
      user,
      accessToken,
      message: "Registration Successful",
    });
  } catch (error) {
    logger.error("❌ Error in /create-account:", error.message);
    next(error);
  }
});

// ✅ Login
app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("Email and password are required");
      err.statusCode = 400;
      throw err;
    }

    const userInfo = await User.findOne({ email });
    if (!userInfo) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    if (userInfo.password !== password) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      throw err;
    }

    logger.info(`✅ User logged in: ${email}`);

    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } catch (error) {
    logger.error("❌ Error in /login:", error.message);
    next(error);
  }
});

// ✅ Get User
app.get("/get-user", authenticateToken, async (req, res, next) => {
  try {
    const { user } = req.user;
    const isUser = await User.findOne({ _id: user._id });

    if (!isUser) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    logger.info(`👤 User info fetched: ${isUser.email}`);

    res.json({
      user: {
        fullName: isUser.fullName,
        email: isUser.email,
        _id: isUser._id,
        createdOn: isUser.createdOn,
        bio: isUser.bio || "",
      },
    });
  } catch (error) {
    logger.error("❌ Error in /get-user:", error.message);
    next(error);
  }
});

// ✅ Update User Details
app.put("/update-user", authenticateToken, async (req, res, next) => {
  try {
    const { user } = req.user;
    const { fullName, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { fullName, bio },
      { new: true }
    );

    if (!updatedUser) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    logger.info(`✏️ User updated: ${updatedUser.email}`);

    res.json({
      error: false,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    logger.error("❌ Error in /update-user:", error.message);
    next(error);
  }
});

// =================== NOTES ROUTES =================== //

// ✅ Add Note
app.post("/add-note", authenticateToken, async (req, res, next) => {
  try {
    const { title, content, tags, color } = req.body;
    const { user } = req.user;

    if (!title || !content) {
      const err = new Error("Title and content are required");
      err.statusCode = 400;
      throw err;
    }

    const note = new Note({
      title,
      content,
      tags: tags || [],
      color: color || "#ffffff",
      userId: user._id,
    });

    await note.save();

    logger.info(`📝 Note created by ${user._id}: "${title}"`);

    res.json({
      error: false,
      note,
      message: "Note added successfully",
    });
  } catch (error) {
    logger.error("❌ Error in /add-note:", error.message);
    next(error);
  }
});

// ✅ Edit Note
app.put("/edit-note/:noteId", authenticateToken, async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { title, content, tags, isPinned, color } = req.body;
    const { user } = req.user;

    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      const err = new Error("Note not found");
      err.statusCode = 404;
      throw err;
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned !== undefined) note.isPinned = isPinned;
    if (color) note.color = color;

    await note.save();

    logger.info(`✏️ Note updated: ${noteId} by user ${user._id}`);

    res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    logger.error("❌ Error in /edit-note:", error.message);
    next(error);
  }
});

// ✅ Get All Notes
app.get("/get-all-notes", authenticateToken, async (req, res, next) => {
  try {
    const { user } = req.user;
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

    logger.info(`📄 All notes fetched for user ${user._id}`);

    res.json({
      error: false,
      notes,
      message: "All notes retrieved successfully",
    });
  } catch (error) {
    logger.error("❌ Error in /get-all-notes:", error.message);
    next(error);
  }
});

// ✅ Delete Note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { user } = req.user;

    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      const err = new Error("Note not found");
      err.statusCode = 404;
      throw err;
    }

    await Note.deleteOne({ _id: noteId, userId: user._id });

    logger.info(`🗑️ Note deleted: ${noteId} by user ${user._id}`);

    res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    logger.error("❌ Error in /delete-note:", error.message);
    next(error);
  }
});

// ✅ Update isPinned
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { isPinned } = req.body;
    const { user } = req.user;

    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      const err = new Error("Note not found");
      err.statusCode = 404;
      throw err;
    }

    note.isPinned = isPinned;
    await note.save();

    logger.info(`📌 Note pin updated: ${noteId} by user ${user._id}`);

    res.json({
      error: false,
      note,
      message: "Note pinned state updated",
    });
  } catch (error) {
    logger.error("❌ Error in /update-note-pinned:", error.message);
    next(error);
  }
});

// ✅ Search Notes
app.get("/search-notes", authenticateToken, async (req, res, next) => {
  try {
    const { user } = req.user;
    const { query } = req.query;

    if (!query) {
      const err = new Error("Search query is required");
      err.statusCode = 400;
      throw err;
    }

    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
        { tags: { $elemMatch: { $regex: new RegExp(query, "i") } } },
      ],
    });

    logger.info(`🔍 Notes searched by ${user._id}: query="${query}"`);

    res.json({
      error: false,
      notes: matchingNotes,
      message: "Search successful",
    });
  } catch (error) {
    logger.error("❌ Error in /search-notes:", error.message);
    next(error);
  }
});

// ✅ Global Error Handler
app.use(errorHandler);

// ✅ Server Start
app.listen(8000, () => logger.info("🚀 Server running on port 8000"));

module.exports = app;
