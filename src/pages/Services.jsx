import { useState } from 'react'

export default function Services() {
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    {
      id: 1,
      name: 'Pune-Mumbai Daily Service',
      description: 'Reliable daily transportation between Pune and Mumbai with comfortable vehicles and professional drivers.',
      features: ['Daily departures', 'Multiple timings', 'Comfortable seating', 'GPS tracking'],
      image: '/photos/_DSC0956.JPG',
      price: 'Starting from ₹800',
      duration: '3-4 hours',
      icon: '🚗'
    },
    {
      id: 2,
      name: 'Airport Transfers',
      description: 'Convenient airport pickup and drop services to and from Mumbai and Pune airports.',
      features: ['Flight tracking', 'Meet & greet', 'Luggage assistance', 'Flight delay coverage'],
      image: '/photos/_DSC0957.JPG',
      price: 'Starting from ₹1200',
      duration: '2-3 hours',
      icon: '✈️'
    },
    {
      id: 3,
      name: 'Corporate Travel',
      description: 'Professional transportation solutions for business travelers with premium vehicles.',
      features: ['Executive vehicles', 'WiFi enabled', 'Professional drivers', 'Flexible scheduling'],
      image: '/photos/_DSC0959.JPG',
      price: 'Starting from ₹1500',
      duration: 'As required',
      icon: '💼'
    },
    {
      id: 4,
      name: 'Group Bookings',
      description: 'Perfect for family trips, corporate outings, and group travel with spacious vehicles.',
      features: ['Large capacity vehicles', 'Group discounts', 'Customized routes', 'Experienced drivers'],
      image: '/photos/_DSC0960.JPG',
      price: 'Starting from ₹2000',
      duration: 'Full day',
      icon: '👥'
    },
    {
      id: 5,
      name: 'Luxury Vehicles',
      description: 'Premium travel experience with luxury sedans and SUVs for special occasions.',
      features: ['Luxury vehicles', 'Premium amenities', 'Chauffeur service', 'Complimentary refreshments'],
      image: '/photos/_DSC0984.JPG',
      price: 'Starting from ₹2500',
      duration: 'As required',
      icon: '⭐'
    },
    {
      id: 6,
      name: 'Emergency Service',
      description: '24/7 emergency transportation service for urgent travel needs.',
      features: ['24/7 availability', 'Quick response', 'Emergency vehicles', 'Immediate booking'],
      image: '/photos/_DSC0993.JPG',
      price: 'Starting from ₹3000',
      duration: 'Immediate',
      icon: '🚨'
    }
  ]

  const whyChooseUs = [
    {
      title: 'Safety First',
      description: 'All drivers are trained and certified with clean driving records',
      icon: '🛡️'
    },
    {
      title: 'Clean Vehicles',
      description: 'Regular sanitization and maintenance of all vehicles',
      icon: '🧽'
    },
    {
      title: 'GPS Tracking',
      description: 'Real-time tracking for your peace of mind',
      icon: '📍'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer support and assistance',
      icon: '📞'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <div className="services-hero">
        <h1>Our Services</h1>
        <p>Professional transportation solutions for all your travel needs between Pune and Mumbai</p>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {services.map((service) => (
          <div 
            key={service.id} 
            className={`service-card ${selectedService === service.id ? 'selected' : ''}`}
            onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
          >
            <div className="service-image">
              <img src={service.image} alt={service.name} />
              <div className="service-icon">{service.icon}</div>
            </div>
            <div className="service-content">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="service-details">
                <div className="detail-item">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value">{service.price}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">{service.duration}</span>
                </div>
              </div>
              {selectedService === service.id && (
                <div className="service-features">
                  <h4>Features:</h4>
                  <ul>
                    {service.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <button className="btn-book">Book Now</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <div className="why-choose-section">
        <h2>Why Choose AK Tours & Travels?</h2>
        <div className="features-grid">
          {whyChooseUs.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking CTA */}
      <div className="booking-cta">
        <div className="cta-content">
          <h2>Ready to Book Your Journey?</h2>
          <p>Contact us now for reliable and comfortable transportation services</p>
          <div className="cta-actions">
            <a href="tel:+919730825092" className="btn-call">
              📞 Call: +91 9730825092
            </a>
            <a href="https://wa.me/919730825092" className="btn-whatsapp" target="_blank" rel="noopener noreferrer">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


