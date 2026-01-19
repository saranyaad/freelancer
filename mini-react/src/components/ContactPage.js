import React from "react";
import "../App.css";

export default function ContactPage() {
  return (
    <section className="contact-page" style={{padding:40,maxWidth:700,margin:"40px auto",background:"#fff",borderRadius:16,boxShadow:"0 2px 16px #eee"}}>
      <h2>Contact Us</h2>
      <p style={{fontSize:17,lineHeight:1.7,marginTop:18}}>
        <b>Phone:</b> +91-9876543210<br/>
        <b>Email:</b> support@freelancehub.com<br/>
        <b>Address:</b> 123, FreelanceHub Lane, Chennai, India<br/><br/>
        <b>Contact Form:</b>
      </p>
      <form style={{marginTop:18}} onSubmit={e => {e.preventDefault(); alert('Thank you for contacting us! We will get back to you soon.')}}>
        <input type="text" placeholder="Your Name" required style={{width:'100%',padding:10,marginBottom:12,borderRadius:6,border:'1px solid #ccc'}} />
        <input type="email" placeholder="Your Email" required style={{width:'100%',padding:10,marginBottom:12,borderRadius:6,border:'1px solid #ccc'}} />
        <textarea placeholder="Your Message" required style={{width:'100%',padding:10,marginBottom:12,borderRadius:6,border:'1px solid #ccc',minHeight:80}} />
        <button type="submit" style={{padding:'10px 28px',borderRadius:8,border:'none',background:'#6c63ff',color:'#fff',fontWeight:600,cursor:'pointer'}}>Send Message</button>
      </form>
    </section>
  );
}
