// src/components/Freelancers.js
import React, { useState } from "react";

const sampleFreelancers = [
  {
    id: 1,
    name: "Alex Rodriguez",
    title: "Full Stack Developer",
    rate: "$65/hr",
    rating: 4.9,
    skills: ["JavaScript","React","Node.js"],
    resume: "https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0J/view",
    review: "Alex delivered a fantastic resume and portfolio website for me. Highly recommended!",
    projects: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: 2,
    name: "Emma Thompson",
    title: "UI/UX Designer",
    rate: "$45/hr",
    rating: 4.8,
    skills: ["Figma","Design","UX"],
    resume: "https://drive.google.com/file/d/2B3C4D5E6F7G8H9I0J1A/view",
    review: "Emma's design skills are top-notch. She created a beautiful portfolio and resume for me.",
    projects: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: 3,
    name: "John Doe",
    title: "Backend Engineer",
    rate: "$55/hr",
    rating: 4.7,
    skills: ["Node.js","APIs","Databases"],
    resume: "https://drive.google.com/file/d/3C4D5E6F7G8H9I0J1A2B/view",
    review: "John optimized my LinkedIn and delivered a great backend for my site.",
    projects: [
      "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
    ]
  },
];

function Freelancers({ initiateHire, openChatModal, navigateTo }) {
  const [skillFilter, setSkillFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  const filtered = sampleFreelancers.filter(f =>
    f.skills.join(" ").toLowerCase().includes(skillFilter.toLowerCase())
  );

  // Map freelancer id to resume page
  const resumePages = {
    1: () => navigateTo && navigateTo("resume1"),
    2: () => navigateTo && navigateTo("resume2"),
    3: () => navigateTo && navigateTo("resume3"),
  };

  const handleHire = (id) => {
    setSelectedFreelancer(id);
    setShowModal(true);
  };

  const handleAccept = () => {
    setShowModal(false);
    if (selectedFreelancer) openChatModal(selectedFreelancer);
    setSelectedFreelancer(null);
  };

  const handleDeny = () => {
    setShowModal(false);
    setSelectedFreelancer(null);
    // Optionally, navigate away or just close modal
  };

  return (
    <section id="freelancers" className="freelancers-section">
      <div className="container">
        <div className="section-header">
          <h2>Top Freelancers</h2>
          <div className="section-actions">
            <select className="filter-select" value={skillFilter} onChange={(e) => setSkillFilter(e.target.value)}>
              <option value="">All Skills</option>
              <option value="javascript">JavaScript</option>
              <option value="react">React</option>
              <option value="design">Design</option>
            </select>
          </div>
        </div>

        <div className="freelancers-grid" id="freelancersGrid">
          {filtered.map(f => (
            <div className="freelancer-card" key={f.id}>
              <div className="freelancer-name">{f.name}</div>
              <div className="freelancer-title">{f.title}</div>
              <div className="freelancer-rating"><span className="stars">★★★★★</span> <span>{f.rating}/5</span></div>
              <div className="freelancer-description">Experienced {f.title}.</div>
              <div className="freelancer-skills">{f.skills.map((s,i) => <span className="skill-tag" key={i}>{s}</span>)}</div>
              <div className="freelancer-meta"><span>{f.rate}</span> <span>{Math.floor(Math.random()*100)} projects</span></div>
              <div style={{marginTop:10}}>
                <b>Resume:</b> <button className="btn btn-link" style={{color:'#6c63ff',textDecoration:'underline',background:'none',border:'none',cursor:'pointer',padding:0}} onClick={resumePages[f.id]}>View Resume</button>
              </div>
              <div style={{marginTop:10}}>
                <b>Review:</b> <span style={{color:'#444'}}>{f.review}</span>
              </div>
              <div style={{marginTop:10}}>
                <b>Project Gallery:</b>
                <div style={{display:'flex',gap:8,marginTop:6}}>
                  {f.projects.map((img,idx) => (
                    <img key={idx} src={img} alt="Project" style={{width:60,height:60,borderRadius:8,objectFit:'cover',border:'1px solid #eee'}} />
                  ))}
                </div>
              </div>
              <div className="freelancer-actions" style={{marginTop:12}}>
                <button className="btn btn-primary" onClick={() => handleHire(f.id)}>Hire Now</button>
              </div>
            </div>
          ))}
        </div>
        {showModal && (
          <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.3)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#fff',padding:32,borderRadius:16,boxShadow:'0 4px 24px #888',maxWidth:340,textAlign:'center'}}>
              <h3 style={{color:'#6c63ff'}}>Accept Hire?</h3>
              <p style={{fontSize:16,margin:'18px 0'}}>Do you want to accept this project and start chatting with the client?</p>
              <button style={{margin:'0 12px',padding:'8px 24px',borderRadius:8,border:'none',background:'#6c63ff',color:'#fff',fontWeight:600,cursor:'pointer'}} onClick={handleAccept}>Accept</button>
              <button style={{margin:'0 12px',padding:'8px 24px',borderRadius:8,border:'none',background:'#eee',color:'#444',fontWeight:600,cursor:'pointer'}} onClick={handleDeny}>Deny</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Freelancers;
