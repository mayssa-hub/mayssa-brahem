import React, { useState } from 'react';


const initialPets = [
  {
    id: 1,
    name: 'Max',
    type: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    weight: 30,
    gender: 'male',
    color: 'Golden',
    microchip: 'MC123456789',
    vetName: 'Dr. Smith',
    vetPhone: '555-0100',
    medications: 'Aucun',
    allergies: 'Aucune',
    specialNeeds: 'Aime les caresses',
    feedingInstructions: '2 fois par jour, 2 tasses'
  }
];

function AuthenticatedHeader({ onNavigate, userType }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand" onClick={() => onNavigate(userType)}>
          <div className="logo">🐶</div>
          <span className="brand-title">PetPal</span>
        </div>

        <nav className="nav">
          <a onClick={() => onNavigate(userType)} className="nav-item">📊 Dashboard</a>
          <a onClick={() => onNavigate("bookings")} className="nav-item">📅 Réservations</a>
          <a onClick={() => onNavigate("pets")} className="nav-item active">🐾 Mes Animaux</a>
          <a onClick={() => onNavigate("messages")} className="nav-item">💬 Messages</a>
          <a onClick={() => onNavigate("notifications")} className="nav-item">🔔 Notifications</a>
          <a onClick={() => onNavigate("profile")} className="nav-item">👤 Mon Profil</a>
          <a onClick={() => onNavigate("home")} className="nav-item">🚪 Déconnexion</a>
        </nav>
      </div>
    </header>
  );
}

// Replace pet icons with emojis
const getIconEmoji = (type) => {
  switch (type) {
    case "dog": return "🐶";
    case "cat": return "🐱";
    case "bird": return "🐦";
    case "fish": return "🐟";
    default: return "🐾";
  }
};

const PetManagementApp = () => {
  const [pets, setPets] = useState(initialPets);
  const [currentView, setCurrentView] = useState('list');
  const [selectedPet, setSelectedPet] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const PetList = () => (
    <div className="pets-container">
      <AuthenticatedHeader onNavigate={(page) => console.log('Navigate to:', page)} userType="owner" />

      <div className="container">
        <div className="pets-page-header">
          <h1 className="pets-page-title">Mes Animaux</h1>

          {/* ➕ Add Pet */}
          <button
            onClick={() => {
              setEditMode(false);
              setSelectedPet(null);
              setCurrentView('form');
            }}
            className="btn-primary"
          >
            ➕ Ajouter un Animal
          </button>
        </div>

        {/* Empty State */}
        {pets.length === 0 ? (
          <div className="empty-pets-state">
            <span className="empty-icon">🐶</span>
            <h2>Aucun animal pour le moment</h2>
            <p>Ajoutez votre premier animal pour commencer</p>
          </div>
        ) : (
          <div className="pets-grid">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="pet-card"
                onClick={() => {
                  setSelectedPet(pet);
                  setCurrentView('details');
                }}
              >
                <div className="pet-card-header">
                  <div className="pet-icon-wrapper">
                    <span className="pet-type-icon">{getIconEmoji(pet.type)}</span>
                  </div>

                  <div className="pet-basic-info">
                    <h3 className="pet-name">{pet.name}</h3>
                    <p className="pet-breed">{pet.breed}</p>
                  </div>
                </div>

                <div className="pet-details-summary">
                  <div className="pet-info-row">
                    <span className="info-label">Type:</span>
                    <span className="info-value">
                      {pet.type === 'dog' ? 'Chien' :
                        pet.type === 'cat' ? 'Chat' :
                        pet.type === 'bird' ? 'Oiseau' : 'Poisson'}
                    </span>
                  </div>

                  <div className="pet-info-row">
                    <span className="info-label">Âge:</span>
                    <span className="info-value">{pet.age} ans</span>
                  </div>

                  <div className="pet-info-row">
                    <span className="info-label">Poids:</span>
                    <span className="info-value">{pet.weight} kg</span>
                  </div>
                </div>

                {/* Edit & Delete */}
                <div className="pet-card-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPet(pet);
                      setEditMode(true);
                      setCurrentView('form');
                    }}
                    className="btn-edit"
                  >
                    ✏️ Modifier
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Voulez-vous supprimer ${pet.name} ?`)) {
                        setPets(pets.filter(p => p.id !== pet.id));
                      }
                    }}
                    className="btn-delete"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const PetDetails = () => (
    <div className="pets-container">
      <AuthenticatedHeader onNavigate={(page) => console.log(page)} userType="owner" />

      <div className="container">
        <button onClick={() => setCurrentView('list')} className="back-to-list">
          ← Retour
        </button>

        <div className="pet-details-card">
          <div className="pet-details-header">
            <div className="pet-header-content">
              <span className="pet-type-icon">{getIconEmoji(selectedPet.type)}</span>
              <div>
                <h1>{selectedPet.name}</h1>
                <p>{selectedPet.breed}</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="pet-details-body">
            <div className="details-grid">
              <div className="detail-item"><span>Type:</span> {getIconEmoji(selectedPet.type)}</div>
              <div className="detail-item"><span>Race:</span> {selectedPet.breed}</div>
              <div className="detail-item"><span>Âge:</span> {selectedPet.age} ans</div>
              <div className="detail-item"><span>Poids:</span> {selectedPet.weight} kg</div>
              <div className="detail-item"><span>Sexe:</span> {selectedPet.gender === 'male' ? 'Mâle' : 'Femelle'}</div>
              <div className="detail-item"><span>Couleur:</span> {selectedPet.color}</div>
            </div>

            <div className="details-actions">
              <button
                onClick={() => {
                  setEditMode(true);
                  setCurrentView('form');
                }}
                className="btn-primary btn-full"
              >
                ✏️ Modifier
              </button>

              <button
                onClick={() => {
                  if (window.confirm(`Supprimer ${selectedPet.name}?`)) {
                    setPets(pets.filter(p => p.id !== selectedPet.id));
                    setCurrentView('list');
                  }
                }}
                className="btn-delete-large"
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PetForm = () => {
    const [formData, setFormData] = useState(
      editMode && selectedPet ? { ...selectedPet } : {
        name: '', type: 'dog', breed: '', age: '', weight: '',
        gender: 'male', color: '', microchip: '', vetName: '',
        vetPhone: '', medications: '', allergies: '',
        specialNeeds: '', feedingInstructions: ''
      }
    );

    const handleSubmit = () => {
      if (!formData.name || !formData.breed || !formData.age || !formData.weight || !formData.color) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
      }

      if (editMode) {
        setPets(pets.map(p => p.id === selectedPet.id ? { ...formData, id: selectedPet.id } : p));
      } else {
        setPets([...pets, { ...formData, id: Date.now() }]);
      }

      setCurrentView('list');
    };

    return (
      <div className="pets-container">
        <AuthenticatedHeader onNavigate={() => {}} userType="owner" />

        <div className="container">
          <button onClick={() => setCurrentView('list')} className="back-to-list">
            ← Retour
          </button>

          <div className="pet-form-card">
            <h1>{editMode ? "Modifier l'animal" : "Ajouter un animal"}</h1>

            <div className="form-section">
              {/* General Inputs */}
              <label>Nom*</label>
              <input name="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />

              <label>Type*</label>
              <select name="type" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="dog">Chien</option>
                <option value="cat">Chat</option>
                <option value="bird">Oiseau</option>
                <option value="fish">Poisson</option>
              </select>

              <label>Race*</label>
              <input name="breed" value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} />

              <label>Âge*</label>
              <input name="age" type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />

              <label>Poids*</label>
              <input name="weight" type="number" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />

              <label>Couleur*</label>
              <input name="color" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} />

            </div>

            <button onClick={handleSubmit} className="btn-primary btn-full">
              {editMode ? "Enregistrer" : "Ajouter"}
            </button>

            <button onClick={() => setCurrentView('list')} className="btn-ghost">
              Annuler
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {currentView === "list" && <PetList />}
      {currentView === "details" && <PetDetails />}
      {currentView === "form" && <PetForm />}
    </>
  );
};

export default PetManagementApp;
