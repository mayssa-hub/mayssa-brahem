import { useState } from "react";
import { Container, Button } from "react-bootstrap";
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
import ReviewForm from './components/ReviewForm';
import UserProfile from './components/UserProfile';

export default function App() {
  const [view, setView] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("owner");
  
  // State for data needed by child components
  const [currentBooking, setCurrentBooking] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Mock data for demonstration
  const mockBooking = {
    id: 'booking-123',
    sitterName: 'Sophie Pet-Sitter',
    sitterAvatar: '👩‍🦰',
    service: 'Garde à domicile',
    bookingDate: '15-20 Octobre 2023',
    petName: 'Rex',
    petType: '🐕'
  };

  const handleViewChange = (newView) => {
    // If navigating to owner/sitter dashboards, set authenticated state and user data
    if (newView === "owner" || newView === "sitter") {
      setIsAuthenticated(true);
      setUserType(newView);
      // Simulate setting user data on login
      setCurrentUser({
        name: 'Jean Martin',
        email: 'jean.martin@email.com',
        userType: newView,
        avatar: newView === 'owner' ? '👨' : '👩‍🦰',
        memberSince: 'Janvier 2024'
      });
    }
    // If navigating to home from authenticated state, log out and clear data
    else if (newView === "home" && isAuthenticated) {
      setIsAuthenticated(false);
      setUserType("owner");
      setCurrentUser(null); // Clear user data on logout
    }
    setView(newView); 
  };

  // Function to set the booking and navigate to the review form
  const handleNavigateToReview = (booking) => {
    setCurrentBooking(booking);
    setView('review');
  }

  return (
    <>
      {/* Conditional header based on authentication */}
      {isAuthenticated ? (
        <AuthenticatedHeader onNavigate={handleViewChange} userType={userType} />
      ) : (
        <Header onNavigate={handleViewChange} />
      )}

      <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
        {view === "home" && (
          <>
            <Home onNavigate={handleViewChange} />
            <div className="text-center mt-3">
                <Button variant="primary" onClick={() => handleNavigateToReview(mockBooking)}>
                    Test Review Form
                </Button>
            </div>
          </>
        )}
        {view === "login" && <Login onNavigate={handleViewChange} />}
        {view === "signup" && <Signup onNavigate={handleViewChange} />}
        {view === "owner" && <OwnerDashboard onNavigate={handleViewChange} />}
        {view === "pet-management" && <PetManagementApp onNavigate={handleViewChange} />}
        {view === "sitter" && <SitterDashboard onNavigate={handleViewChange} />}
        
        {view === "review" && (
          <ReviewForm 
            onNavigate={handleViewChange} 
            booking={currentBooking} 
          />
        )}

        {view === "user-profile" && (
          <UserProfile 
            onNavigate={handleViewChange} 
            currentUser={currentUser} 
          />
        )}

        {view === "profile" && <ProfileSettings onNavigate={handleViewChange} />}
        {view === "notifications" && (
          <NotificationsCenter 
            onNavigate={handleViewChange} 
            userType={userType}
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