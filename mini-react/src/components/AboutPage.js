import React from "react";
import "../App.css";

export default function AboutPage() {
  return (
    <section className="about-page" style={{padding:40,maxWidth:700,margin:"40px auto",background:"#fff",borderRadius:16,boxShadow:"0 2px 16px #eee"}}>
      <h2>About FreelanceHub</h2>
      <p style={{fontSize:17,lineHeight:1.7,marginTop:18}}>
        FreelanceHub is a next-generation freelancing platform designed to connect businesses and skilled professionals across the globe. Our mission is to empower freelancers and clients to collaborate efficiently, achieve their goals, and build lasting professional relationships.<br/><br/>
        <b>Our Vision:</b> To be the most trusted and innovative platform for remote work, enabling talent and opportunity to meet seamlessly.<br/><br/>
        <b>What We Offer:</b>
        <ul style={{marginLeft:24}}>
          <li>Easy project posting and bidding</li>
          <li>Secure payments and transparent reviews</li>
          <li>Modern dashboard for tracking work and earnings</li>
          <li>Community support and resources</li>
        </ul>
        <br/>
        <b>Why Choose Us?</b><br/>
        We combine cutting-edge technology with a human touch, ensuring every user has the tools and support they need to succeed in the freelance economy.
      </p>
    </section>
  );
}
