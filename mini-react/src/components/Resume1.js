import React from "react";
import "../App.css";

export default function Resume1() {
  return (
    <section className="resume-page" style={{padding:40,maxWidth:700,margin:"40px auto",background:"#fff",borderRadius:16,boxShadow:"0 2px 16px #eee"}}>
      <h2>Alex Rodriguez</h2>
      <h4>Full Stack Developer</h4>
      <p><b>Email:</b> alex.rodriguez@email.com<br/>
      <b>Phone:</b> +1-555-123-4567</p>
      <hr/>
      <h3>Summary</h3>
      <p>Experienced Full Stack Developer with 6+ years in building scalable web applications using React, Node.js, and MongoDB. Passionate about clean code and modern UI/UX.</p>
      <h3>Skills</h3>
      <ul>
        <li>JavaScript, React, Node.js, Express</li>
        <li>MongoDB, SQL</li>
        <li>REST APIs, GraphQL</li>
        <li>Agile, Git, Docker</li>
      </ul>
      <h3>Experience</h3>
      <ul>
        <li><b>Lead Developer</b> - Webify Inc. (2021-2025)</li>
        <li><b>Frontend Engineer</b> - AppWorks (2018-2021)</li>
      </ul>
      <h3>Education</h3>
      <p>B.Sc. Computer Science, Stanford University</p>
    </section>
  );
}
