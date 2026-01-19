import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "./ChatModal.css";

const socket = io("http://localhost:5000");

function ChatModal({ username, onClose }) {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  // Load chat history from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/messages")
      .then((res) => setChatLog(res.data))
      .catch((err) => console.error("Error loading messages:", err));
  }, []);

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChatLog((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const chatWindow = document.querySelector(".chat-window");
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }, [chatLog]);

  // Send message to backend and broadcast via socket
  const sendMessage = async () => {
    if (message.trim() === "") return;

    const data = {
      sender: username || "Anonymous",
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    // ✅ Show message immediately in sender's chat window
    setChatLog((prev) => [...prev, data]);

    socket.emit("send_message", data);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/messages", data);
    } catch (err) {
      console.error("Error saving message:", err);
    }
  };

  return (
    <div className="chat-modal">
      <h3>Chat</h3>
      <div className="chat-window">
        {chatLog.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === username ? "sent" : "received"
            }`}
          >
            <strong>{msg.sender}</strong>
            <div>{msg.text}</div>
            <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ChatModal;
