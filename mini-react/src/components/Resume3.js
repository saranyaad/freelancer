import React from "react";
import "../App.css";

export default function Resume3() {
  return (
    <section className="resume-page" style={{padding:40,maxWidth:700,margin:"40px auto",background:"#fff",borderRadius:16,boxShadow:"0 2px 16px #eee"}}>
      <h2>John Doe</h2>
      <h4>Backend Engineer</h4>
      <p><b>Email:</b> john.doe@email.com<br/>
      <b>Phone:</b> +1-555-222-3333</p>
      <hr/>
      <h3>Summary</h3>
      <p>Backend Engineer with 7+ years of experience building robust APIs and scalable server-side systems. Skilled in Node.js, Python, and cloud infrastructure.</p>
      <h3>Skills</h3>
      <ul>
        <li>Node.js, Python, Express</li>
        <li>SQL, MongoDB, Redis</li>
        <li>API Design, Microservices</li>
        <li>AWS, Docker, CI/CD</li>
      </ul>
      <h3>Experience</h3>
      <ul>
        <li><b>Backend Lead</b> - CloudCore (2020-2025)</li>
        <li><b>Software Engineer</b> - DataWorks (2016-2020)</li>
      </ul>
      <h3>Education</h3>
      <p>M.Sc. in Computer Engineering, Georgia Tech</p>
    </section>
  );
}
