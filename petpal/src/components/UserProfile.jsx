import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Bell, Lock, LogOut, Trash2, Check, Edit2 } from 'lucide-react';

export default function UserProfile({ onNavigate, currentUser }) {
  const [user, setUser] = useState(currentUser || {
    name: 'Jean Martin',
    email: 'jean.martin@email.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de Paris, 75001 Paris',
    userType: 'owner',
    avatar: '👨',
    memberSince: 'Janvier 2024',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...user });

  const handleSave = () => {
    setUser(editData);
    setIsEditing(false);
    
    // TODO: Save to backend API
    // await api.updateUserProfile(editData);
    
    alert('Profil mis à jour avec succès!');
  };

  const handleCancel = () => {
    setEditData({ ...user });
    setIsEditing(false);
  };

  const handleNotificationToggle = (type) => {
    const updatedNotifications = {
      ...user.notifications,
      [type]: !user.notifications[type]
    };
    
    setUser({
      ...user,
      notifications: updatedNotifications
    });

    // TODO: Save to backend API
    // await api.updateNotificationSettings(updatedNotifications);
  };

  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter?')) {
      // TODO: Clear user session
      // localStorage.removeItem('userToken');
      onNavigate('home');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('⚠️ ATTENTION: Cette action est irréversible. Voulez-vous vraiment supprimer votre compte?')) {
      // TODO: Delete account via API
      // await api.deleteUserAccount();
      alert('Votre compte a été supprimé.');
      onNavigate('home');
    }
  };

  const handleChangePassword = () => {
    // TODO: Implement password change modal
    alert('Fonctionnalité de changement de mot de passe à venir');
  };

  const handlePhotoChange = () => {
    // TODO: Implement photo upload
    alert('Fonctionnalité de changement de photo à venir');
  };

  return (
    <div className="profile-container">
      <div className="container">
        <div className="profile-content">
          {/* Profile Banner */}
          <div className="profile-banner">
            <div className="profile-photo-section">
              <div className="profile-photo-wrapper">
                <div className="profile-photo-large">{user.avatar}</div>
                <button className="photo-edit-btn" onClick={handlePhotoChange}>
                  <Camera className="camera-icon" />
                </button>
              </div>
              <div className="profile-info-main">
                <h1 className="profile-name">{user.name}</h1>
                <p className="profile-type">
                  {user.userType === 'owner' ? '🐾 Propriétaire' : '💼 Pet Sitter'}
                </p>
                <p className="member-since">Membre depuis {user.memberSince}</p>
              </div>
            </div>
          </div>

          {/* Personal Information Card */}
          <div className="settings-card">
            <div className="card-header">
              <div className="card-title">
                <User className="card-icon" />
                <h2>Informations personnelles</h2>
              </div>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  <Edit2 className="edit-icon" />
                  Modifier
                </button>
              ) : (
                <button onClick={handleSave} className="save-btn">
                  <Check className="check-icon" />
                  Enregistrer
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <User className="info-icon" />
                  </div>
                  <div>
                    <p className="info-label">Nom complet</p>
                    <p className="info-value">{user.name}</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <Mail className="info-icon" />
                  </div>
                  <div>
                    <p className="info-label">Email</p>
                    <p className="info-value">{user.email}</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <Phone className="info-icon" />
                  </div>
                  <div>
                    <p className="info-label">Téléphone</p>
                    <p className="info-value">{user.phone}</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <MapPin className="info-icon" />
                  </div>
                  <div>
                    <p className="info-label">Adresse</p>
                    <p className="info-value">{user.address}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="edit-form">
                <div className="form-group">
                  <label className="form-label">Nom complet</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Téléphone</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={editData.phone}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Adresse</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editData.address}
                    onChange={(e) => setEditData({...editData, address: e.target.value})}
                  />
                </div>

                <div className="edit-actions">
                  <button onClick={handleSave} className="btn-primary">
                    Enregistrer
                  </button>
                  <button onClick={handleCancel} className="btn-ghost">
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Card */}
          <div className="settings-card">
            <div className="card-header">
              <div className="card-title">
                <Bell className="card-icon" />
                <h2>Notifications</h2>
              </div>
            </div>

            <div className="notification-settings">
              <div className="notification-item">
                <div className="notification-info">
                  <p className="notification-label">Notifications par email</p>
                  <p className="notification-desc">Recevez des mises à jour par email</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={user.notifications.email}
                    onChange={() => handleNotificationToggle('email')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="notification-item">
                <div className="notification-info">
                  <p className="notification-label">Notifications push</p>
                  <p className="notification-desc">Recevez des alertes sur votre appareil</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={user.notifications.push}
                    onChange={() => handleNotificationToggle('push')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="notification-item">
                <div className="notification-info">
                  <p className="notification-label">Notifications SMS</p>
                  <p className="notification-desc">Recevez des SMS pour les urgences</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={user.notifications.sms}
                    onChange={() => handleNotificationToggle('sms')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="settings-card">
            <div className="card-header">
              <div className="card-title">
                <Lock className="card-icon" />
                <h2>Sécurité</h2>
              </div>
            </div>

            <div className="security-settings">
              <button className="security-btn" onClick={handleChangePassword}>
                <Lock className="security-icon" />
                <div className="security-text">
                  <p className="security-label">Changer le mot de passe</p>
                  <p className="security-desc">Dernière modification il y a 3 mois</p>
                </div>
              </button>
            </div>
          </div>

          {/* Account Actions */}
          <div className="account-actions">
            <button onClick={handleLogout} className="btn-logout">
              <LogOut className="btn-icon" />
              Se déconnecter
            </button>
            
            <button onClick={handleDeleteAccount} className="btn-delete-account">
              <Trash2 className="btn-icon" />
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
