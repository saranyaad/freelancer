import React from "react";
import "../App.css";

export default function CareersPage() {
  return (
    <section className="careers-page" style={{padding:40,maxWidth:700,margin:"40px auto",background:"#fff",borderRadius:16,boxShadow:"0 2px 16px #eee"}}>
      <h2>Careers at FreelanceHub</h2>
      <p style={{fontSize:17,lineHeight:1.7,marginTop:18}}>
        <b>Join Our Team!</b><br/>
        We are always looking for talented, passionate people to join our growing team. Whether you are a developer, designer, marketer, or customer support specialist, we want to hear from you.<br/><br/>
        <b>Current Openings:</b>
        <ul style={{marginLeft:24}}>
          <li>Frontend Developer (React)</li>
          <li>Backend Developer (Node.js)</li>
          <li>UI/UX Designer</li>
          <li>Marketing Specialist</li>
        </ul>
        <br/>
        <b>How to Apply:</b><br/>
        Email your resume and portfolio to <a href="mailto:careers@freelancehub.com">careers@freelancehub.com</a>.<br/>
        We look forward to working with you!
      </p>
    </section>
  );
}
