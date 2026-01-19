// src/components/Footer.js


import React, { useState } from "react";

function Footer({ navigateTo }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>FreelanceHub</h3>
            <p>Connecting businesses with talented freelancers worldwide.</p>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#" onClick={e => {e.preventDefault(); navigateTo && navigateTo("about");}}>About Us</a></li>
              <li><a href="#" onClick={e => {e.preventDefault(); navigateTo && navigateTo("leadership");}}>Leadership</a></li>
              <li><a href="#" onClick={e => {e.preventDefault(); navigateTo && navigateTo("careers");}}>Careers</a></li>
              <li><a href="#" onClick={e => {e.preventDefault(); navigateTo && navigateTo("contact");}}>Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} FreelanceHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
