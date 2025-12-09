import { useState } from 'react'

export default function LatestNews() {
  const [activeTab, setActiveTab] = useState('offers')

  // WhatsApp redirection function
  const handleWhatsAppRedirect = (offerTitle) => {
    const phoneNumber = '+919876543210' // Replace with your actual WhatsApp number
    const message = `Hi! I'm interested in booking the "${offerTitle}" offer. Please provide more details.`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const offers = [
    { 
      id: 1, 
      title: 'Monsoon Special', 
      description: 'Get 25% off on all Pune-Mumbai rides during monsoon season. Safe and comfortable travel guaranteed!', 
      image: '/photos/_DSC1060.JPG',
      validUntil: 'Aug 31, 2024',
      discount: '25% OFF'
    },
    { 
      id: 2, 
      title: 'Group Booking Discount', 
      description: 'Book for 4+ passengers and save up to 30% on your journey. Perfect for family trips!', 
      image: '/photos/_DSC1067.JPG',
      validUntil: 'Dec 31, 2024',
      discount: '30% OFF'
    },
    { 
      id: 3, 
      title: 'Frequent Traveler', 
      description: 'Join our loyalty program and earn points on every trip. Redeem points for free rides!', 
      image: '/photos/_DSC1068.JPG',
      validUntil: 'Ongoing',
      discount: 'LOYALTY'
    }
  ]

  const updates = [
    { 
      id: 1, 
      title: 'New Route Added', 
      content: 'We are excited to announce our new Pune-Mumbai Express route with premium vehicles and faster travel times.',
      date: 'Oct 15, 2024',
      image: '/photos/_DSC1070.JPG',
      category: 'Route Update'
    },
    { 
      id: 2, 
      title: 'Fleet Expansion', 
      content: 'Added 5 new luxury vehicles to our fleet including SUVs and sedans for enhanced comfort.',
      date: 'Oct 10, 2024',
      image: '/photos/_DSC1075.JPG',
      category: 'Fleet Update'
    },
    { 
      id: 3, 
      title: 'Safety Certification', 
      content: 'All our drivers have completed advanced safety training and received certification from transport authority.',
      date: 'Oct 5, 2024',
      image: '/photos/_DSC1131.JPG',
      category: 'Safety Update'
    },
    { 
      id: 4, 
      title: 'Mobile App Launch', 
      content: 'Download our new mobile app for easy booking, real-time tracking, and exclusive app-only offers.',
      date: 'Sep 28, 2024',
      image: '/photos/1720554775809.jpg',
      category: 'Technology'
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      location: 'Pune',
      rating: 5,
      comment: 'Excellent service! Clean vehicles and professional drivers. Highly recommended for Pune-Mumbai travel.',
      image: '/photos/1720607725685.jpg'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      comment: 'AK Tours made my daily commute comfortable and safe. Great value for money!',
      image: '/photos/1720609518831.jpg'
    },
    {
      id: 3,
      name: 'Amit Patel',
      location: 'Pune',
      rating: 5,
      comment: 'Reliable service with on-time pickups. The drivers are courteous and the vehicles are well-maintained.',
      image: '/photos/1720629043291.jpg'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <div className="news-hero">
        <h1>Latest News & Updates</h1>
        <p>Stay updated with our latest offers, route updates, and customer testimonials</p>
      </div>

      {/* Tab Navigation */}
      <div className="news-tabs">
        <div className="tab-buttons">
          <button 
            className={`tab-btn ${activeTab === 'offers' ? 'active' : ''}`}
            onClick={() => setActiveTab('offers')}
          >
            Special Offers
          </button>
          <button 
            className={`tab-btn ${activeTab === 'updates' ? 'active' : ''}`}
            onClick={() => setActiveTab('updates')}
          >
            Company Updates
          </button>
          <button 
            className={`tab-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
            onClick={() => setActiveTab('testimonials')}
          >
            Customer Reviews
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'offers' && (
            <div className="offers-section">
              <div className="offers-grid">
                {offers.map((offer) => (
                  <div key={offer.id} className="offer-card">
                    <div className="offer-image">
                      <img src={offer.image} alt={offer.title} />
                      <div className="discount-badge">{offer.discount}</div>
                    </div>
                    <div className="offer-content">
                      <h3>{offer.title}</h3>
                      <p>{offer.description}</p>
                      <div className="offer-footer">
                        <span className="valid-until">Valid until: {offer.validUntil}</span>
                        <button 
                          className="btn-offer" 
                          onClick={() => handleWhatsAppRedirect(offer.title)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'updates' && (
            <div className="updates-section">
              <div className="updates-grid">
                {updates.map((update) => (
                  <div key={update.id} className="update-card">
                    <div className="update-image">
                      <img src={update.image} alt={update.title} />
                      <div className="category-badge">{update.category}</div>
                    </div>
                    <div className="update-content">
                      <div className="update-header">
                        <h3>{update.title}</h3>
                        <span className="update-date">{update.date}</span>
                      </div>
                      <p>{update.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="testimonials-section">
              <div className="testimonials-grid">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="testimonial-card">
                    <div className="testimonial-image">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="testimonial-content">
                      <div className="testimonial-header">
                        <h4>{testimonial.name}</h4>
                        <span className="location">{testimonial.location}</span>
                      </div>
                      <div className="rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="star">⭐</span>
                        ))}
                      </div>
                      <p>"{testimonial.comment}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


