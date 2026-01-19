const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = 5000;

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(
    "process.env.MONGO_URI",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Define User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// ✅ Define Message model
const messageSchema = new mongoose.Schema({
  sender: String,
  text: String,
  timestamp: String,
});
const Message = mongoose.model("Message", messageSchema);

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Root route to confirm backend is alive
app.get("/", (req, res) => {
  res.json({ message: "Backend is running successfully!" });
});

// ✅ Signup route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "Signup successful", username });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// ✅ Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", username });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

// ✅ Get all messages
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// ✅ Save a new message
app.post("/messages", async (req, res) => {
  const { sender, text, timestamp } = req.body;
  try {
    const newMessage = new Message({ sender, text, timestamp });
    await newMessage.save();
    res.status(201).json({ message: "Message saved!" });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ message: "Failed to save message" });
  }
});

// ✅ Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("send_message", async (data) => {
    io.emit("receive_message", data);
    try {
      const newMessage = new Message(data);
      await newMessage.save();
      console.log("💾 Message saved:", data);
    } catch (err) {
      console.error("❌ Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ✅ Start the server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server with Socket.IO running at http://127.0.0.1:${PORT}`);
});
