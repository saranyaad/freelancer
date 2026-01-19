import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './ChatModal.css';

const socket = io('http://localhost:5000');

export default function InlineChat({ username, userId, onClose }) {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/messages')
      .then(res => setChatLog(res.data))
      .catch(err => console.error('Error loading messages:', err));

    socket.on('receive_message', data => {
      setChatLog(prev => [...prev, data]);
    });

    return () => socket.off('receive_message');
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const data = { sender: username || 'Anonymous', text: message, timestamp: new Date().toLocaleTimeString() };
    setChatLog(prev => [...prev, data]);
    socket.emit('send_message', data);
    setMessage('');
    try { await axios.post('http://localhost:5000/messages', data); } catch (err) { console.error(err); }
  };

  return (
    <div className="inline-chat-wrapper">
      <div className="inline-chat">
        <div className="inline-chat-header">
          <strong>Chat with {userId ? `User ${userId}` : 'Support'}</strong>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="chat-window">
          {chatLog.map((m, i) => (
            <div key={i} className={`chat-message ${m.sender === username ? 'sent' : 'received'}`}>
              <strong>{m.sender}</strong>
              <div>{m.text}</div>
              <span className="timestamp">{m.timestamp}</span>
            </div>
          ))}
        </div>
        <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message..." />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
