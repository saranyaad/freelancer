import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./App.css";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Freelancers from "./components/Freelancers";
import Resume1 from "./components/Resume1";
import Resume2 from "./components/Resume2";
import Resume3 from "./components/Resume3";
import SuccessStories from "./components/SuccessStories";

import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import ChatButton from "./components/ChatButton";
import Modals from "./components/Modals";
import ChatModal from "./components/ChatModal";
import InlineChat from "./components/InlineChat";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import LeadershipPage from "./components/LeadershipPage";
import CareersPage from "./components/CareersPage";

const socket = io("http://localhost:5000");

function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);
  const [isProposalOpen, setProposalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const [backendMessage, setBackendMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [loginResponse, setLoginResponse] = useState("");
  const [signupResponse, setSignupResponse] = useState("");

  const [currentPage, setCurrentPage] = useState("home"); // ✅ New state

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setLoggedInUsername(savedUsername);
    }

    axios
      .get("http://localhost:5000")
      .then((response) => {
        setBackendMessage(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error connecting to backend:", error);
        setBackendMessage("Error connecting to backend");
        setLoading(false);
      });
  }, []);

  const navigateTo = (page) => setCurrentPage(page); // ✅ New function

  const openLoginModal = () => setLoginOpen(true);

  // Close login modal and return to home page
  const closeLoginModal = () => {
    setLoginOpen(false);
    if (currentPage === "login") setCurrentPage("home");
  };
  const openSignupModal = () => setSignupOpen(true);
  const [inlineChatOpen, setInlineChatOpen] = useState(false);

  // openChatModal can open either the floating modal (default) or an inline chat if inline=true
  const openChatModal = (userId, inline = false) => {
    setSelectedUser(userId);
    if (inline) {
      setInlineChatOpen(true);
      setChatOpen(false);
    } else {
      setChatOpen(true);
      setInlineChatOpen(false);
    }
  };
  const openProposalModal = (projectId) => {
    setSelectedProject(projectId);
    setProposalOpen(true);
  };
  const initiateHire = (freelancerId) => {
    alert(`Initiating hire for freelancer ${freelancerId}`);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username: usernameInput,
        password,
      });

      if (res.status === 200 && res.data.message) {
        alert(res.data.message);
        setLoginResponse(res.data.message);
        localStorage.setItem("username", usernameInput);
        setLoggedInUsername(usernameInput);
      } else {
        alert("Unexpected response from server.");
      }

      setSignupResponse("");
      setUsernameInput("");
      setPassword("");
      setLoginOpen(false);
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      alert(message);
      setLoginResponse(message);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        username: usernameInput,
        password,
      });

      if ((res.status === 201 || res.status === 200) && res.data.message) {
        alert(res.data.message);
        setSignupResponse(res.data.message);
        localStorage.setItem("username", usernameInput);
        setLoggedInUsername(usernameInput);
      } else {
        alert("Unexpected response from server.");
      }

      setLoginResponse("");
      setUsernameInput("");
      setPassword("");
      setSignupOpen(false);
    } catch (err) {
      const message =
        err.response?.data?.message || "Signup failed. Please try again.";
      alert(message);
      setSignupResponse(message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setLoggedInUsername("");
  };

  return (
    <div className="App">
      <Header
        openLogin={openLoginModal}
        openSignup={openSignupModal}
        navigateTo={navigateTo} // ✅ Pass navigation
      />

      <div
        className="backend-message"
        style={{
          backgroundColor: backendMessage.includes("Error") ? "red" : "gold",
          color: backendMessage.includes("Error") ? "white" : "black",
          padding: "15px",
          fontWeight: "bold",
          textAlign: "center",
          margin: "10px 0",
          borderRadius: "5px",
        }}
      >
        {loading ? "Loading backend message..." : backendMessage}
      </div>

      {loggedInUsername && (
        <div
          style={{
            backgroundColor: "#6c63ff",
            color: "white",
            padding: "12px",
            textAlign: "center",
            fontWeight: "bold",
            borderRadius: "6px",
            margin: "10px auto",
            width: "300px",
          }}
        >
          Welcome, {loggedInUsername}!
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "10px",
              padding: "6px 12px",
              backgroundColor: "#ffffff",
              color: "#6c63ff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      )}


      <main className="main-content">
        {currentPage === "home" && <Hero navigateTo={navigateTo} />}
        {currentPage === "findWork" && (
          <Projects
            openProposalModal={openProposalModal}
            openChatModal={openChatModal}
          />
        )}
        {currentPage === "findTalent" && (
          <Freelancers
            initiateHire={initiateHire}
            openChatModal={openChatModal}
            navigateTo={navigateTo}
          />
        )}
        {currentPage === "successStories" && <SuccessStories />}
        {currentPage === "dashboard" && <Dashboard />}
    {currentPage === "about" && <AboutPage />}
    {currentPage === "contact" && <ContactPage />}
    {currentPage === "leadership" && <LeadershipPage />}
    {currentPage === "careers" && <CareersPage />}
    {currentPage === "resume1" && <Resume1 />}
    {currentPage === "resume2" && <Resume2 />}
    {currentPage === "resume3" && <Resume3 />}
        {/* Show login/signup modal if currentPage is 'login' */}
        {currentPage === "login" && (
          <React.Fragment>
            {/* Open login modal by default */}
            {!isLoginOpen && setLoginOpen(true)}
          </React.Fragment>
        )}
      </main>

  <Footer navigateTo={navigateTo} />   

      <Modals
        isLoginOpen={isLoginOpen}
        setLoginOpen={closeLoginModal}
        isSignupOpen={isSignupOpen}
        setSignupOpen={setSignupOpen}
        isChatOpen={isChatOpen}
        setChatOpen={setChatOpen}
        isProposalOpen={isProposalOpen}
        setProposalOpen={setProposalOpen}
        selectedUser={selectedUser}
        selectedProject={selectedProject}
        username={usernameInput}
        password={password}
        setUsername={setUsernameInput}
        setPassword={setPassword}
        handleLoginSubmit={handleLoginSubmit}
        handleSignupSubmit={handleSignupSubmit}
      />

      {isChatOpen && (
        <ChatModal
          username={loggedInUsername}
          onClose={() => setChatOpen(false)}
        />
      )}

      {/* Inline chat rendered inside pages (e.g., Find Talent) */}
      {inlineChatOpen && currentPage === "findTalent" && (
        <InlineChat
          username={loggedInUsername}
          userId={selectedUser}
          onClose={() => setInlineChatOpen(false)}
        />
      )}

      <ChatButton openChatModal={openChatModal} />
    </div>
  );
}

export default App;
