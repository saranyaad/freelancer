// src/components/Hero.js
import React from "react";
// Horizontal gallery removed


function Hero({ navigateTo }) {
  const goToLogin = () => {
    if (navigateTo) navigateTo("login");
  };
  const goToProjects = () => {
    if (navigateTo) navigateTo("findWork");
  };
  const goToFreelancers = () => {
    if (navigateTo) navigateTo("findTalent");
  };
  const goToSuccess = () => {
    if (navigateTo) navigateTo("successStories");
  };

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Find the Perfect Freelancer for Your Project</h1>
          <p className="hero-subtitle">Connect with skilled professionals from around the world</p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={goToLogin}>Get Started</button>
            <button className="btn btn-outline btn-lg" onClick={goToProjects}>Browse Projects</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-item" style={{cursor:'pointer'}} onClick={goToProjects}><h3>50K+</h3><p>Active Projects</p></div>
          <div className="stat-item" style={{cursor:'pointer'}} onClick={goToFreelancers}><h3>25K+</h3><p>Freelancers</p></div>
          <div className="stat-item" style={{cursor:'pointer'}} onClick={goToSuccess}><h3>98%</h3><p>Success Rate</p></div>
        </div>
        {/* gallery removed */}
      </div>
    </section>
  );
}

export default Hero;
