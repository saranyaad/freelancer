// src/components/ChatButton.js
import React from "react";

function ChatButton({ openChatModal }) {
  return (
    <div className="floating-chat">
      <button className="chat-toggle" onClick={() => openChatModal(0)} title="Open chat">
        💬
        <span className="notification-badge">3</span>
      </button>
    </div>
  );
}

export default ChatButton;
