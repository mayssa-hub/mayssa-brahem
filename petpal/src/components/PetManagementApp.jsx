// Composant pour afficher un élément de détail
const DetailItem = ({ label, value }) => (
  <div style={{ marginBottom: '1rem' }}>
    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6B7280' }}>{label}:</span>
    <p style={{ margin: '0.25rem 0 0 0', color: '#1F2937' }}>{value || 'Non spécifié'}</p>
  </div>
);

// Composant pour les champs de formulaire
const FormField = ({ label, name, value, onChange, type = 'text', textarea = false, required = false }) => (
  <div>
    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
      {label} {required && <span style={{ color: '#DC2626' }}>*</span>}
    </label>
    {textarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows="3"
        style={{
          width: '100%',
          padding: '0.5rem 1rem',
          border: '1px solid #D1D5DB',
          borderRadius: '0.5rem',
          fontSize: '1rem',
          outline: 'none',
          resize: 'vertical'
        }}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          padding: '0.5rem 1rem',
          border: '1px solid #D1D5DB',
          borderRadius: '0.5rem',
          fontSize: '1rem',
          outline: 'none'
        }}
      />
    )}
  </div>
);

// Application principale de gestion des animaux de compagnie
const PetManagementApp = () => {
  const [pets, setPets] = useState(initialPets);
  const [currentView, setCurrentView] = useState('list');
  const [selectedPet, setSelectedPet] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const getPetIcon = (type) => {
    switch(type) {
      case 'dog': return <Dog className="w-8 h-8" />;
      case 'cat': return <Cat className="w-8 h-8" />;
      case 'bird': return <Bird className="w-8 h-8" />;
      case 'fish': return <Fish className="w-8 h-8" />;
      default: return <Dog className="w-8 h-8" />;
    }
  };

  // Composant PetList
  const PetList = () => (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #EBF4FF, #E0E7FF)' }}>
      <style>{styles}</style>
      <AuthenticatedHeader onNavigate={(page) => console.log('Navigate to:', page)} userType="owner" />
      
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1F2937' }}>Mes Animaux</h1>
          <button
            onClick={() => {
              setEditMode(false);
              setSelectedPet(null);
              setCurrentView('form');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#667eea',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#5568d3'}
            onMouseOut={(e) => e.currentTarget.style.background = '#667eea'}
          >
            <PlusCircle className="w-5 h-5" />
            Ajouter un Animal
          </button>
        </div>

        {pets.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '1rem', padding: '3rem', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <Dog className="w-24 h-24" style={{ margin: '0 auto 1rem', color: '#D1D5DB' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#6B7280', marginBottom: '0.5rem' }}>Aucun animal pour le moment</h2>
            <p style={{ color: '#9CA3AF' }}>Ajoutez votre premier animal pour commencer</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {pets.map((pet) => (
              <div
                key={pet.id}
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.15)'}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
                onClick={() => {
                  setSelectedPet(pet);
                  setCurrentView('details');
                }}
              >
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ color: '#667eea' }}>
                      {getPetIcon(pet.type)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1F2937' }}>{pet.name}</h3>
                      <p style={{ fontSize: '0.875rem', color: '#6B7280', textTransform: 'capitalize' }}>{pet.breed}</p>
                    </div>
                  </div>
                </div>
                
                <div style={{ fontSize: '0.875rem', color: '#4B5563' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '500' }}>Type:</span>
                    <span style={{ textTransform: 'capitalize' }}>
                      {pet.type === 'dog' ? 'Chien' : pet.type === 'cat' ? 'Chat' : pet.type === 'bird' ? 'Oiseau' : 'Poisson'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '500' }}>Âge:</span>
                    <span>{pet.age} ans</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: '500' }}>Poids:</span>
                    <span>{pet.weight} kg</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPet(pet);
                      setEditMode(true);
                      setCurrentView('form');
                    }}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      background: '#EFF6FF',
                      color: '#2563EB',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#DBEAFE'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#EFF6FF'}
                  >
                    <Edit2 className="w-4 h-4" />
                    Modifier
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${pet.name}?`)) {
                        setPets(pets.filter(p => p.id !== pet.id));
                      }
                    }}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      background: '#FEF2F2',
                      color: '#DC2626',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#FEE2E2'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#FEF2F2'}
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Composant PetDetails
  const PetDetails = () => (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #EBF4FF, #E0E7FF)' }}>
      <style>{styles}</style>
      <AuthenticatedHeader onNavigate={(page) => console.log('Navigate to:', page)} userType="owner" />
      
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <button
          onClick={() => setCurrentView('list')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#4B5563',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '1.5rem',
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#1F2937'}
          onMouseOut={(e) => e.currentTarget.style.color = '#4B5563'}
        >
          <ArrowLeft className="w-5 h-5" />
          Retour à mes animaux
        </button>

        <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {getPetIcon(selectedPet.type)}
              <div>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{selectedPet.name}</h1>
                <p style={{ color: '#E0E7FF', textTransform: 'capitalize', margin: '0.25rem 0 0 0' }}>{selectedPet.breed}</p>
              </div>
            </div>
          </div>

          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <DetailItem label="Type" value={selectedPet.type === 'dog' ? 'Chien' : selectedPet.type === 'cat' ? 'Chat' : selectedPet.type === 'bird' ? 'Oiseau' : 'Poisson'} />
              <DetailItem label="Race" value={selectedPet.breed} />
              <DetailItem label="Âge" value={`${selectedPet.age} ans`} />
              <DetailItem label="Poids" value={`${selectedPet.weight} kg`} />
              <DetailItem label="Sexe" value={selectedPet.gender === 'male' ? 'Mâle' : 'Femelle'} />
              <DetailItem label="Couleur" value={selectedPet.color} />
            </div>

            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1F2937', marginBottom: '0.5rem' }}>Identification</h3>
                <DetailItem label="Puce électronique" value={selectedPet.microchip} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1F2937', marginBottom: '0.5rem' }}>Informations vétérinaires</h3>
                <DetailItem label="Vétérinaire" value={selectedPet.vetName} />
                <DetailItem label="Téléphone du vétérinaire" value={selectedPet.vetPhone} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1F2937', marginBottom: '0.5rem' }}>Informations de santé</h3>
                <DetailItem label="Médicaments" value={selectedPet.medications} />
                <DetailItem label="Allergies" value={selectedPet.allergies} />
                <DetailItem label="Besoins spéciaux" value={selectedPet.specialNeeds} />
              </div>

              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1F2937', marginBottom: '0.5rem' }}>Instructions de soins</h3>
                <DetailItem label="Alimentation" value={selectedPet.feedingInstructions} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #E5E7EB' }}>
              <button
                onClick={() => {
                  setEditMode(true);
                  setCurrentView('form');
                }}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: '#667eea',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#5568d3'}
                onMouseOut={(e) => e.currentTarget.style.background = '#667eea'}
              >
                <Edit2 className="w-5 h-5" />
                Modifier
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedPet.name}?`)) {
                    setPets(pets.filter(p => p.id !== selectedPet.id));
                    setCurrentView('list');
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#FEF2F2',
                  color: '#DC2626',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#FEE2E2'}
                onMouseOut={(e) => e.currentTarget.style.background = '#FEF2F2'}
              >
                <Trash2 className="w-5 h-5" />
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Composant PetForm
  const PetForm = () => {
    const [formData, setFormData] = useState(
      editMode && selectedPet
        ? { ...selectedPet }
        : {
            name: '',
            type: 'dog',
            breed: '',
            age: '',
            weight: '',
            gender: 'male',
            color: '',
            microchip: '',
            vetName: '',
            vetPhone: '',
            medications: '',
            allergies: '',
            specialNeeds: '',
            feedingInstructions: ''
          }
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (editMode) {
        setPets(pets.map(p => p.id === selectedPet.id ? { ...formData, id: selectedPet.id } : p));
      } else {
        setPets([...pets, { ...formData, id: Date.now() }]);
      }
      
      setCurrentView('list');
      setSelectedPet(null);
      setEditMode(false);
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #EBF4FF, #E0E7FF)' }}>
        <style>{styles}</style>
        <AuthenticatedHeader onNavigate={(page) => console.log('Navigate to:', page)} userType="owner" />
        
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <button
            onClick={() => setCurrentView('list')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#4B5563',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              marginBottom: '1.5rem',
              transition: 'color 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#1F2937'}
            onMouseOut={(e) => e.currentTarget.style.color = '#4B5563'}
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à mes animaux
          </button>

          <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '2rem' }}>
              {editMode ? 'Modifier l\'animal' : 'Ajouter un animal'}
            </h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <FormField
                  label="Nom de l'animal"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Type d'animal <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.5rem 1rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  >
                    <option value="dog">Chien</option>
                    <option value="cat">Chat</option>
                    <option value="bird">Oiseau</option>
                    <option value="fish">Poisson</option>
                  </select>
                </div>

                <FormField
                  label="Race"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  required
                />

                <FormField
                  label="Âge (années)"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />

                <FormField
                  label="Poids (kg)"
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Sexe <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.5rem 1rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  >
                    <option value="male">Mâle</option>
                    <option value="female">Femelle</option>
                  </select>
                </div>

                <FormField
                  label="Couleur"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                />

                <FormField
                  label="Numéro de puce"
                  name="microchip"
                  value={formData.microchip}
                  onChange={handleChange}
                />
              </div>

              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1F2937', marginBottom: '1rem' }}>Informations vétérinaires</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  <FormField
                    label="Nom du vétérinaire"
                    name="vetName"
                    value={formData.vetName}
                    onChange={handleChange}
                  />

                  <FormField
                    label="Téléphone du vétérinaire"
                    name="vetPhone"
                    type="tel"
                    value={formData.vetPhone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1F2937', marginBottom: '1rem' }}>Santé et soins</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <FormField
                    label="Médicaments"
                    name="medications"
                    value={formData.medications}
                    onChange={handleChange}
                    textarea
                  />

                  <FormField
                    label="Allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    textarea
                  />

                  <FormField
                    label="Besoins spéciaux"
                    name="specialNeeds"
                    value={formData.specialNeeds}
                    onChange={handleChange}
                    textarea
                  />

                  <FormField
                    label="Instructions d'alimentation"
                    name="feedingInstructions"
                    value={formData.feedingInstructions}
                    onChange={handleChange}
                    textarea
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', paddingTop: '1.5rem' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    background: '#667eea',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#5568d3'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#667eea'}
                >
                  {editMode ? 'Mettre à jour' : 'Ajouter'}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('list')}
                  style={{
                    background: '#F3F4F6',
                    color: '#4B5563',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#E5E7EB'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#F3F4F6'}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Rendu conditionnel selon la vue actuelle
  return (
    <>
      {currentView === 'list' && <PetList />}
      {currentView === 'details' && <PetDetails />}
      {currentView === 'form' && <PetForm />}
    </>
  );
};

export default PetManagementApp;