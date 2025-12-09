import { Button } from "react-bootstrap";

export default function AuthenticatedHeader({ onNavigate, userType }) {
  return (
    <header className="site-header">
      <div className="container header-inner">

        {/* Logo + Brand */}
        <div
          className="brand"
          style={{ cursor: "pointer" }}
          onClick={() => onNavigate(userType)}
        >
          <div className="logo">🐶</div>
          <span className="brand-title">PetPal</span>
        </div>

        {/* Navigation for authenticated users */}
        <nav className="nav">
          <button onClick={() => onNavigate(userType)} className="nav-item nav-link">
            <span className="emoji">📊</span> Dashboard
          </button>

          <button onClick={() => onNavigate("bookings")} className="nav-item nav-link">
            <span className="emoji">📅</span> Réservations
          </button>

          <button onClick={() => onNavigate("messages")} className="nav-item nav-link">
            <span className="emoji">💬</span> Messages
          </button>

          <button onClick={() => onNavigate("notifications")} className="nav-item nav-link">
            <span className="emoji">🔔</span> Notifications
          </button>

          <button onClick={() => onNavigate("profile")} className="nav-item nav-link">
            <span className="emoji">👤</span> Mon Profil
          </button>

          <button onClick={() => onNavigate("home")} className="nav-item nav-link">
            <span className="emoji">🚪</span> Déconnexion
          </button>

          <Button variant="primary" onClick={() => onNavigate("pet-management")}>
            Manage Pets
          </Button>
        </nav>
      </div>
    </header>
  );
}
