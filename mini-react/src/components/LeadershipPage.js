import React from "react";
import "../App.css";

export default function LeadershipPage() {
  return (
    <section className="leadership-page" style={{padding:40,maxWidth:700,margin:"40px auto",background:"#fff",borderRadius:16,boxShadow:"0 2px 16px #eee"}}>
      <h2>Our Leadership</h2>
      <p style={{fontSize:17,lineHeight:1.7,marginTop:18}}>
        <b>Meet the Team:</b><br/>
        Our leadership team brings decades of experience in technology, freelancing, and business management. We are passionate about empowering freelancers and clients worldwide.<br/><br/>
        <b>CEO:</b> Priya Sharma<br/>
        <b>CTO:</b> Arjun Patel<br/>
        <b>COO:</b> Sneha Reddy<br/>
        <br/>
        Together, we are committed to building a transparent, innovative, and supportive platform for the freelance community.
      </p>
    </section>
  );
}
