import React from "react";

function Modals({
  isLoginOpen,
  setLoginOpen,
  isSignupOpen,
  setSignupOpen,
  username,
  password,
  setUsername,
  setPassword,
  handleLoginSubmit,
  handleSignupSubmit,
  isChatOpen,
  setChatOpen,
  isProposalOpen,
  setProposalOpen,
  selectedUser,
  selectedProject,
}) {
  return (
    <>
      {isLoginOpen && (
        <div className="modal">
          <button type="button" className="modal-close-btn" onClick={() => setLoginOpen(false)} title="Close" style={{position:'absolute',top:18,right:22,background:'none',border:'none',fontSize:22,cursor:'pointer',color:'#aaa'}}>&times;</button>
          <h3>LOGIN</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="modal-label-group">
              <label htmlFor="login-username">Username<span style={{color:'#7c5cff',marginLeft:2}}>: </span></label>
              <input
                id="login-username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="modal-label-group">
              <label htmlFor="login-password">Password<span style={{color:'#7c5cff',marginLeft:2}}>: </span></label>
              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="modal-options">
              <label style={{fontWeight:500}}>
                <input type="checkbox" style={{marginRight:4}} /> Remember me?
              </label>
              <a href="#" style={{fontWeight:400}}>Forgot Password?</a>
            </div>
            <button type="submit" className="modal-main-btn">LOGIN</button>
            <div className="modal-or-divider">
              <span>OR</span>
            </div>
            <div className="modal-social-row">
              <button type="button" className="modal-social-btn google" title="Login with Google" onClick={() => window.open('https://accounts.google.com/', '_blank')}>G</button>
              <button type="button" className="modal-social-btn facebook" title="Login with Facebook" onClick={() => window.open('https://facebook.com/', '_blank')}>f</button>
              <button type="button" className="modal-social-btn linkedin" title="Login with LinkedIn" onClick={() => window.open('https://linkedin.com/', '_blank')}>in</button>
            </div>
            <div className="modal-footer">
              Need an account?
              <a href="#" onClick={e => { e.preventDefault(); setLoginOpen(false); setSignupOpen(true); }}> SIGN UP</a>
            </div>
          </form>
        </div>
      )}

      {isSignupOpen && (
        <div className="modal">
          <button type="button" className="modal-close-btn" onClick={() => setSignupOpen(false)} title="Close" style={{position:'absolute',top:18,right:22,background:'none',border:'none',fontSize:22,cursor:'pointer',color:'#aaa'}}>&times;</button>
          <h3>SIGN UP</h3>
          <form onSubmit={handleSignupSubmit}>
            <div className="modal-label-group">
              <label htmlFor="signup-username">Username<span style={{color:'#7c5cff',marginLeft:2}}>: </span></label>
              <input
                id="signup-username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="modal-label-group">
              <label htmlFor="signup-password">Password<span style={{color:'#7c5cff',marginLeft:2}}>: </span></label>
              <input
                id="signup-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="modal-main-btn">SIGN UP</button>
            <div className="modal-or-divider">
              <span>OR</span>
            </div>
            <div className="modal-social-row">
              <button type="button" className="modal-social-btn google" title="Sign up with Google">G</button>
              <button type="button" className="modal-social-btn facebook" title="Sign up with Facebook">f</button>
              <button type="button" className="modal-social-btn linkedin" title="Sign up with LinkedIn">in</button>
            </div>
            <div className="modal-footer">
              Already a user?
              <a href="#" onClick={e => { e.preventDefault(); setSignupOpen(false); setLoginOpen(true); }}> LOGIN</a>
            </div>
          </form>
        </div>
      )}

      {isProposalOpen && (
        <div className="modal">
          <h3>Submit Proposal</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                `Proposal submitted for project ID: ${selectedProject || "New"}`
              );
              setProposalOpen(false);
            }}
          >
            <textarea
              placeholder="Write your proposal here..."
              rows={5}
              style={{ width: "100%", marginBottom: "10px" }}
              required
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setProposalOpen(false)}>
              Close
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Modals;
