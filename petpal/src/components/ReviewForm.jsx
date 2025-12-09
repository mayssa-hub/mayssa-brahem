import React, { useState } from 'react';
import { ArrowLeft, Star, Send } from 'lucide-react';

export default function ReviewForm({ onNavigate, booking }) {
  const [rating, setRating] = useState(0);
  const [reviewData, setReviewData] = useState({
    cleanliness: 0,
    communication: 0,
    reliability: 0,
    comment: ''
  });

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Veuillez donner une note globale');
      return;
    }

    const review = {
      bookingId: booking?.id,
      overallRating: rating,
      detailedRatings: reviewData,
      date: new Date().toISOString()
    };

    console.log('Review submitted:', review);
    // TODO: Send to backend API
    // await api.submitReview(review);

    alert('Merci pour votre avis!');
    onNavigate('bookings');
  };

  const StarRating = ({ value, onChange, size = 'large' }) => {
    const [hovered, setHovered] = useState(0);
    
    return (
      <div className={`star-rating ${size}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`star ${star <= (hovered || value) ? 'filled' : ''}`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          />
        ))}
      </div>
    );
  };

  const getRatingText = (rating) => {
    switch(rating) {
      case 5: return 'Excellent!';
      case 4: return 'Très bien!';
      case 3: return 'Bien';
      case 2: return 'Moyen';
      case 1: return 'Décevant';
      default: return '';
    }
  };

  return (
    <div className="review-container">
      <div className="container">
        <button onClick={() => onNavigate('bookings')} className="back-to-list">
          <ArrowLeft className="back-icon" />
          Retour aux réservations
        </button>

        <div className="review-card">
          <div className="review-header">
            <div className="review-header-icon">✍️</div>
            <div>
              <h1 className="review-title">Évaluer votre expérience</h1>
              <p className="review-subtitle">Aidez la communauté en partageant votre avis</p>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="booking-summary">
            <div className="summary-left">
              <div className="sitter-avatar-large">{booking?.sitterAvatar || '👤'}</div>
              <div>
                <h3 className="sitter-name">{booking?.sitterName || 'Nom du sitter'}</h3>
                <p className="booking-details">
                  {booking?.service || 'Service'} • {booking?.bookingDate || 'Date'}
                </p>
                <p className="pet-info">
                  <span className="pet-icon">{booking?.petType || '🐾'}</span>
                  {booking?.petName || 'Animal'}
                </p>
              </div>
            </div>
          </div>

          {/* Overall Rating */}
          <div className="rating-section">
            <h3 className="section-label">Note globale *</h3>
            <StarRating value={rating} onChange={setRating} size="large" />
            {rating > 0 && (
              <p className="rating-text">{getRatingText(rating)}</p>
            )}
          </div>

          {/* Detailed Ratings */}
          <div className="detailed-ratings">
            <h3 className="section-label">Évaluations détaillées</h3>
            
            <div className="rating-item">
              <div className="rating-item-header">
                <span className="rating-icon">✨</span>
                <span className="rating-label">Propreté</span>
              </div>
              <StarRating 
                value={reviewData.cleanliness}
                onChange={(val) => setReviewData({...reviewData, cleanliness: val})}
                size="small"
              />
            </div>

            <div className="rating-item">
              <div className="rating-item-header">
                <span className="rating-icon">💬</span>
                <span className="rating-label">Communication</span>
              </div>
              <StarRating 
                value={reviewData.communication}
                onChange={(val) => setReviewData({...reviewData, communication: val})}
                size="small"
              />
            </div>

            <div className="rating-item">
              <div className="rating-item-header">
                <span className="rating-icon">⏰</span>
                <span className="rating-label">Fiabilité</span>
              </div>
              <StarRating 
                value={reviewData.reliability}
                onChange={(val) => setReviewData({...reviewData, reliability: val})}
                size="small"
              />
            </div>
          </div>

          {/* Comment Section */}
          <div className="comment-section">
            <h3 className="section-label">Votre commentaire</h3>
            <textarea
              className="review-textarea"
              placeholder="Partagez votre expérience avec cette personne... (optionnel)"
              value={reviewData.comment}
              onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
              rows="5"
              maxLength="500"
            />
            <p className="character-count">{reviewData.comment.length} / 500 caractères</p>
          </div>

          {/* Submit Button */}
          <div className="review-actions">
            <button onClick={handleSubmit} className="btn-primary btn-full">
              <Send className="btn-icon" />
              Publier mon avis
            </button>
            <button onClick={() => onNavigate('bookings')} className="btn-ghost">
              Plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}