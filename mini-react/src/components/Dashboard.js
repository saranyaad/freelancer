// src/components/Dashboard.js
import React, { useState, useEffect } from "react";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [amount, setAmount] = useState(100); // INR by default
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // success | error | null
  const [successPopup, setSuccessPopup] = useState(false);
  // Reviews & ratings
  const [rating, setRating] = useState(4);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  // Real platform/demo links
  const links = [
    'https://www.figma.com/', // Figma homepage
    'https://www.google.com/docs/about/', // Google Docs public landing page
    'https://www.google.com/drive/', // Google Drive public landing page
    'https://www.canva.com/',
    'https://github.com/'
  ];

    const RAZORPAY_TEST_KEY = "rzp_test_1DP5mmOlF5G5ag";

    useEffect(() => {
      try {
        const raw = localStorage.getItem('reviews_v1');
        if (raw) setReviews(JSON.parse(raw));
      } catch (e) { /* ignore */ }
    }, []);

    useEffect(() => {
      try {
        localStorage.setItem('reviews_v1', JSON.stringify(reviews));
      } catch (e) { /* ignore */ }
    }, [reviews]);

    const averageRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : rating;
    const handleBarClick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, x / rect.width));
      const newRating = Math.ceil(ratio * 5) || 1;
      setRating(newRating);
    };

    const submitReview = () => {
      if (!reviewText.trim()) return;
      const newRev = {
        id: Date.now(),
        rating,
        text: reviewText.trim(),
        name: localStorage.getItem('username') || 'Guest',
        date: new Date().toISOString()
      };
      setReviews([newRev, ...reviews]);
      setReviewText('');
      setRating(5);
    };

  return (
    <section id="dashboard" className="dashboard-section">
      <div className="container">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="dashboard-tabs">
            <button className={`tab-btn ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>Overview</button>
            <button className={`tab-btn ${activeTab === "projects" ? "active" : ""}`} onClick={() => setActiveTab("projects")}>My Projects</button>
            <button className={`tab-btn ${activeTab === "messages" ? "active" : ""}`} onClick={() => setActiveTab("messages")}>Messages</button>
            <button className={`tab-btn ${activeTab === "payments" ? "active" : ""}`} onClick={() => setActiveTab("payments")}>Payments</button>
            <button className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`} onClick={() => setActiveTab("reviews")}>Reviews</button>
            <button className={`tab-btn ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>Profile</button>
          </div>
        </div>

        <div className="dashboard-content">
          {activeTab === "overview" && (
            <div id="overview" className="tab-content active">
              <div className="stats-overview">
                <div className="stat-card" style={{cursor:'pointer'}} onClick={() => window.open(links[0], '_blank')}><h3>12</h3><p>Total Projects</p></div>
                <div className="stat-card" style={{cursor:'pointer'}} onClick={() => window.open(links[1], '_blank')}><h3>3</h3><p>Active Projects</p></div>
                <div className="stat-card" style={{cursor:'pointer'}} onClick={() => window.open(links[2], '_blank')}><h3>$5,420</h3><p>Total Earnings</p></div>
                <div className="stat-card" style={{cursor:'pointer'}} onClick={() => setSuccessPopup(true)}><h3>96%</h3><p>Success Rate</p></div>
              </div>
              {successPopup && (
                <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.3)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setSuccessPopup(false)}>
                  <div style={{background:'#fff',padding:32,borderRadius:16,boxShadow:'0 4px 24px #888',maxWidth:400,textAlign:'center'}} onClick={e=>e.stopPropagation()}>
                    <h3 style={{color:'#6c63ff'}}>96% Success Rate</h3>
                    <p style={{fontSize:16,margin:'18px 0'}}>Our freelancers maintain a 96% project success rate!<br/>This means almost every project is completed to the client's satisfaction.<br/><br/>We value quality, communication, and timely delivery.</p>
                    <button style={{marginTop:10,padding:'8px 24px',borderRadius:8,border:'none',background:'#6c63ff',color:'#fff',fontWeight:600,cursor:'pointer'}} onClick={()=>setSuccessPopup(false)}>Close</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "projects" && (
            <div id="my-projects" className="tab-content active">
              <div style={{display:'flex',gap:24,flexWrap:'wrap',justifyContent:'center'}}>
                <div style={{width:220,background:'#f8f8fa',borderRadius:12,padding:16,boxShadow:'0 2px 8px #eee'}}>
                  <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80" alt="Project 1" style={{width:'100%',borderRadius:8,marginBottom:10}} />
                  <h4 style={{margin:'8px 0 4px'}}>E-Commerce Website</h4>
                  <p style={{fontSize:14,color:'#666'}}>A modern online store built with React and Node.js. <br/>Delivered to a US-based client.</p>
                </div>
                <div style={{width:220,background:'#f8f8fa',borderRadius:12,padding:16,boxShadow:'0 2px 8px #eee'}}>
                  <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Project 2" style={{width:'100%',borderRadius:8,marginBottom:10}} />
                  <h4 style={{margin:'8px 0 4px'}}>Mobile App</h4>
                  <p style={{fontSize:14,color:'#666'}}>A cross-platform app for freelancers and clients.<br/>Rated 5 stars by users.</p>
                </div>
                <div style={{width:220,background:'#f8f8fa',borderRadius:12,padding:16,boxShadow:'0 2px 8px #eee'}}>
                  <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" alt="Project 3" style={{width:'100%',borderRadius:8,marginBottom:10}} />
                  <h4 style={{margin:'8px 0 4px'}}>Landing Page</h4>
                  <p style={{fontSize:14,color:'#666'}}>A high-converting landing page for a SaaS product.<br/>Helped increase signups by 40%.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div id="messages" className="tab-content active">
              <div style={{padding:24,fontSize:17,lineHeight:1.7,color:'#444'}}>
                <b>About FreelanceHub:</b><br/>
                FreelanceHub is a modern freelancing platform connecting businesses and skilled professionals worldwide. Post projects, hire top talent, and manage your work all in one place. Our mission is to empower freelancers and clients to collaborate efficiently and achieve success together.<br/><br/>
                <b>Why Freelancing?</b><br/>
                Freelancing offers flexibility, diverse opportunities, and the ability to work from anywhere. Join our platform to experience the future of work!
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div id="payments" className="tab-content active" style={{textAlign:'center'}}>
              <div style={{margin:'0 auto',padding:24,maxWidth:520}}>
                <h3 style={{marginBottom:8}}>Payments</h3>
                <p style={{fontWeight:600,fontSize:16,marginBottom:12}}>Pay securely using Razorpay (test mode)</p>

                <div style={{display:'flex',justifyContent:'center',gap:12,alignItems:'center',flexWrap:'wrap'}}>
                  <label style={{fontSize:14,color:'#444'}}>Amount (INR)</label>
                  <input
                    type="number"
                    min={1}
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                    style={{width:120,padding:8,borderRadius:8,border:'1px solid #ddd',textAlign:'center'}}
                  />
                  <button
                    className="pay-btn"
                    disabled={isProcessing || amount <= 0}
                    onClick={async () => {
                      setPaymentStatus(null);
                      setIsProcessing(true);
                      try {
                        // Dynamically load Razorpay checkout script
                        await new Promise((resolve, reject) => {
                          if (window.Razorpay) return resolve();
                          const script = document.createElement('script');
                          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                          script.onload = () => resolve();
                          script.onerror = () => reject(new Error('Razorpay SDK failed to load'));
                          document.body.appendChild(script);
                        });

                        const options = {
                          key: RAZORPAY_TEST_KEY,
                          amount: amount * 100, // amount in paise
                          currency: 'INR',
                          name: 'FreelanceHub (Test)',
                          description: 'Test Payment',
                          image: 'https://www.canva.com/static/images/canva-logo.png',
                          handler: function (response) {
                            // response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature
                            setPaymentStatus('success');
                            setIsProcessing(false);
                            alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
                          },
                          modal: {
                            ondismiss: function() {
                              setIsProcessing(false);
                              setPaymentStatus('cancelled');
                            }
                          },
                          prefill: {
                            name: localStorage.getItem('username') || 'Guest',
                            email: '',
                            contact: ''
                          }
                        };

                        const rzp = new window.Razorpay(options);
                        rzp.open();
                      } catch (err) {
                        console.error('Payment initiation failed', err);
                        setPaymentStatus('error');
                        setIsProcessing(false);
                        alert('Failed to start payment: ' + (err && err.message ? err.message : err));
                      }
                    }}
                    style={{padding:'10px 18px',borderRadius:8,border:'none',background:'#6c63ff',color:'#fff',fontWeight:700,cursor:'pointer'}}
                  >
                    {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
                  </button>
                </div>

                <div style={{marginTop:14}}>
                  {paymentStatus === 'success' && <div style={{color:'green',fontWeight:600}}>Payment completed (test)</div>}
                  {paymentStatus === 'error' && <div style={{color:'red',fontWeight:600}}>Error starting payment. Check console.</div>}
                  {paymentStatus === 'cancelled' && <div style={{color:'#666',fontWeight:600}}>Payment dialog closed.</div>}
                </div>

                
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div id="reviews" className="tab-content active" style={{textAlign:'center',padding:20}}>
              <div style={{maxWidth:760,margin:'0 auto',padding:18,background:'#fff',borderRadius:12,boxShadow:'0 6px 24px rgba(0,0,0,0.06)'}}>
                <h3 style={{margin:0}}>How do you like our service?</h3>
                <p style={{color:'#666',marginTop:6}}>Tap an emoji or click the bar to set a rating, then leave a short review.</p>

                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,marginTop:12}}>
                  {['😡','😕','😐','😊','😍'].map((emo, i) => {
                    const idx = i+1;
                    const isActive = rating === idx;
                    return (
                      <div key={emo} onClick={()=>setRating(idx)} style={{cursor:'pointer',textAlign:'center',flex:1}}>
                        <div style={{fontSize:28,opacity:isActive?1:0.6,transform:isActive?'scale(1.12)':'none'}}>{emo}</div>
                        <div style={{fontSize:12,color:'#666',marginTop:6}}>{idx < 10 ? `0${idx}` : idx}</div>
                      </div>
                    )
                  })}
                </div>

                <div style={{marginTop:18,position:'relative'}}>
                  <div onClick={handleBarClick} style={{height:16,borderRadius:12,background:'linear-gradient(90deg,#e53e3e 0%,#f59e0b 25%,#f6e05e 50%,#48bb78 75%,#60a5fa 100%)',cursor:'pointer'}} />
                  {/* knob */}
                  <div style={{position:'absolute',left:`${((rating-1)/4)*100}%`,top:-8,transform:'translateX(-50%)'}}>
                    <div style={{width:24,height:24,borderRadius:'50%',background:'#fff',border:'4px solid #fff',boxShadow:'0 2px 8px rgba(0,0,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <div style={{width:12,height:12,borderRadius:'50%',background:'#222'}} />
                    </div>
                  </div>
                </div>

                <div style={{display:'flex',gap:12,marginTop:16,alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>
                  <textarea value={reviewText} onChange={e=>setReviewText(e.target.value)} placeholder={'Write a short review...'} style={{flex:1,minWidth:240,maxWidth:520,padding:10,borderRadius:8,border:'1px solid #ddd'}} />
                  <button onClick={submitReview} style={{padding:'10px 18px',borderRadius:8,border:'none',background:'#6c63ff',color:'#fff',fontWeight:700,cursor:'pointer'}}>Submit</button>
                </div>

                <div style={{marginTop:18,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontSize:28,fontWeight:700}}>{averageRating.toFixed(1)}</div>
                    <div style={{color:'#666'}}>{reviews.length} review{reviews.length!==1?'s':''}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:14,color:'#666'}}>Overall satisfaction</div>
                  </div>
                </div>

                <div style={{marginTop:18,maxHeight:240,overflowY:'auto',paddingRight:6}}>
                  {reviews.length === 0 && <div style={{color:'#888'}}>No reviews yet — be the first to share feedback.</div>}
                  {reviews.map(r => (
                    <div key={r.id} style={{padding:12,borderRadius:10,background:'#fafafa',marginBottom:10,display:'flex',gap:12}}>
                      <div style={{width:48,height:48,borderRadius:8,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>{['😡','😕','😐','😊','😍'][r.rating-1]}</div>
                      <div style={{flex:1}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                          <div style={{fontWeight:700}}>{r.name}</div>
                          <div style={{fontSize:12,color:'#999'}}>{new Date(r.date).toLocaleString()}</div>
                        </div>
                        <div style={{marginTop:6,color:'#333'}}>{r.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div id="profile" className="tab-content active" style={{textAlign:'center'}}>
              <div style={{padding:24}}>
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" style={{width:90,height:90,borderRadius:'50%',marginBottom:12}} />
                <h4 style={{margin:'8px 0 4px'}}>John Doe</h4>
                <p style={{fontSize:15,color:'#666'}}>Full Stack Developer | React & Node.js</p>
                <button style={{marginTop:18,padding:'10px 28px',borderRadius:8,border:'none',background:'#6c63ff',color:'#fff',fontWeight:600,cursor:'pointer'}} onClick={()=>window.open('https://www.linkedin.com/', '_blank')}>View LinkedIn Profile</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
