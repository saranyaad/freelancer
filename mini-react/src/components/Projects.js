// src/components/Projects.js
import React, { useState } from "react";

const sampleProjects = [
  {
    id: 1,
    title: "Create a Professional Resume",
    budget: "$150",
    skills: ["Resume Writing", "Design", "Word"],
    posted: "2 days ago",
    proposals: 9,
    scenario: "Client: I need a resume for a Full Stack, UI/UX, Cloud role. Freelancer: What are your skills? Client: Full Stack, UI, UX, Cloud. Freelancer: I will create your resume and share the link for review."
  },
  {
    id: 2,
    title: "Design a Portfolio Website",
    budget: "$400",
    skills: ["Web Design", "HTML", "CSS", "React"],
    posted: "4 days ago",
    proposals: 14,
    scenario: "Client: I want a personal portfolio website to showcase my projects. Freelancer: Please share your project details and preferred style. Client: Modern, clean, with project gallery. Freelancer: I will design and share the link."
  },
  {
    id: 3,
    title: "LinkedIn Profile Optimization",
    budget: "$100",
    skills: ["LinkedIn", "Profile Writing", "Branding"],
    posted: "1 day ago",
    proposals: 7,
    scenario: "Client: I want to improve my LinkedIn profile for job search. Freelancer: What roles are you targeting? Client: Software Engineer. Freelancer: I will optimize your profile and send you the updated link."
  },
];

function Projects({ openProposalModal, openChatModal }) {
  const [category, setCategory] = useState("");

  const filtered = sampleProjects.filter((p) => {
    if (!category) return true;
    return p.skills.join(" ").toLowerCase().includes(category.toLowerCase());
  });

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2>Latest Projects</h2>
          <div className="section-actions">
            <button
              className="btn btn-primary"
              onClick={() => openProposalModal(null)}
            >
              Post a Project
            </button>
            <select
              className="filter-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="web">Web Development</option>
              <option value="react">React</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
        </div>

        <div className="projects-grid" id="projectsGrid">
          {filtered.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-title">{project.title}</div>
              <div className="project-budget">{project.budget}</div>
              <div className="project-description">
                <b>Scenario:</b> {project.scenario}
              </div>
              <div className="project-skills">
                {project.skills.map((s, i) => (
                  <span className="skill-tag" key={i}>
                    {s}
                  </span>
                ))}
              </div>
              <div className="project-meta">
                <span>Posted: {project.posted}</span>{" "}
                <span>{project.proposals} proposals</span>
              </div>
              <div className="project-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => openProposalModal(project.id)}
                >
                  Submit Proposal (Share Resume/Link)
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => openChatModal(project.id)}
                >
                  <i className="fas fa-comment" /> Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
