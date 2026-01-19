// src/components/PostProject.js
import React, { useState } from "react";
import axios from "axios";
import "./PostProject.css";

function PostProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const project = { title, description, budget, category };

    try {
      await axios.post("http://localhost:5000/projects", project);
      setSuccess(true);
      setTitle("");
      setDescription("");
      setBudget("");
      setCategory("");
    } catch (err) {
      console.error("Error posting project:", err);
    }
  };

  return (
    <div className="post-project">
      <h2>Post a New Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />
        <input
          type="number"
          placeholder="Budget (USD)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category (e.g. Web Dev, Design)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit">Submit Project</button>
      </form>
      {success && <p className="success-msg">✅ Project posted successfully!</p>}
    </div>
  );
}

export default PostProject;
