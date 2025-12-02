import { useState } from "react";
import { Container } from "react-bootstrap";
import OwnerDashboard from "./components/OwnerDashboard";
import SitterDashboard from "./components/SitterDashboard";
import ProfileSettings from "./components/ProfileSettings";
import NotificationsCenter from "./components/NotificationsCenter";
import MessagesInterface from "./components/Messages";
import "./App.css";

import PetManagementApp from './components/PetManagementApp'; 

import Header from "./components/Header";
import AuthenticatedHeader from "./components/AuthenticatedHeader";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
  const [view, setView] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("owner");

  const handleViewChange = (newView) => {
    // If navigating to owner/sitter dashboards, set authenticated state
    if (newView === "owner" || newView === "sitter") {
      setIsAuthenticated(true);
      setUserType(newView);
    }
    // If navigating to home from authenticated state, log out
    else if (newView === "home" && isAuthenticated) {
      setIsAuthenticated(false);
      setUserType("owner");
    }
    setView(newView);
  };

  return (
    <>
      {/* Conditional header based on authentication */}
      {isAuthenticated ? (
        <AuthenticatedHeader onNavigate={handleViewChange} userType={userType} />
      ) : (
        <Header onNavigate={handleViewChange} />
      )}

      <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
        {view === "home" && <Home onNavigate={handleViewChange} />}
        {view === "login" && <Login onNavigate={handleViewChange} />}
        {view === "signup" && <Signup onNavigate={handleViewChange} />}
        {view === "owner" && <OwnerDashboard onNavigate={handleViewChange} />}
        {view === "sitter" && <SitterDashboard onNavigate={handleViewChange} />}
        {view === "profile" && <ProfileSettings onNavigate={handleViewChange} />}
        {view === "notifications" && (
          <NotificationsCenter 
            onNavigate={handleViewChange} 
            userType={userType} // Pass userType here
          />
        )}
        {view === "messages" && (
  <MessagesInterface 
    onNavigate={handleViewChange} 
    userType={userType}
  />
)}
      </Container>
    </>
  );
}