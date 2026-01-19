import React from "react";
import "../App.css";

export default function Resume2() {
  return (
    <section className="resume-page" style={{padding:40,maxWidth:700,margin:"40px auto",background:"#fff",borderRadius:16,boxShadow:"0 2px 16px #eee"}}>
      <h2>Emma Thompson</h2>
      <h4>UI/UX Designer</h4>
      <p><b>Email:</b> emma.thompson@email.com<br/>
      <b>Phone:</b> +1-555-987-6543</p>
      <hr/>
      <h3>Summary</h3>
      <p>Creative UI/UX Designer with 5+ years of experience designing engaging digital products. Expert in Figma, Adobe XD, and user research.</p>
      <h3>Skills</h3>
      <ul>
        <li>Figma, Adobe XD, Sketch</li>
        <li>User Research, Wireframing, Prototyping</li>
        <li>Design Systems, Branding</li>
        <li>HTML, CSS, Basic JavaScript</li>
      </ul>
      <h3>Experience</h3>
      <ul>
        <li><b>Senior Designer</b> - PixelCraft (2022-2025)</li>
        <li><b>UX Designer</b> - DesignHub (2019-2022)</li>
      </ul>
      <h3>Education</h3>
      <p>B.Des. in Communication Design, RISD</p>
    </section>
  );
}
