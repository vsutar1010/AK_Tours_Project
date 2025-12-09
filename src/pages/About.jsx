import { useState, useEffect } from 'react'

const services = [
  {
    id: 1,
    title: 'Trained & Polite Drivers',
    description: 'Our professional drivers are well-trained, courteous, and experienced in providing safe transportation services.',
    icon: '👨‍✈️',
    image: '/photos/_DSC0956.JPG'
  },
  {
    id: 2,
    title: 'Clean & Sanitized Vehicles',
    description: 'All our vehicles are regularly cleaned and sanitized to ensure your health and comfort during travel.',
    icon: '🚗',
    image: '/photos/_DSC0957.JPG'
  },
  {
    id: 3,
    title: 'GPS Tracking',
    description: 'Real-time GPS tracking ensures you can monitor your journey and we can provide accurate arrival times.',
    icon: '📍',
    image: '/photos/_DSC0959.JPG'
  }
]

const stats = [
  { target: 500, suffix: '+', label: 'Happy Customers' },
  { target: 1000, suffix: '+', label: 'Successful Trips' },
  { target: 5, suffix: '+', label: 'Years Experience' },
  { target: 24, suffix: '/7', label: 'Customer Support' }
]

export default function About() {
  const [activeTab, setActiveTab] = useState('about')
  const [statCounts, setStatCounts] = useState(() => stats.map(() => 0))

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      let currentValue = 0
      const increment = Math.max(1, Math.round(stat.target / 80))

      const intervalId = setInterval(() => {
        currentValue = Math.min(stat.target, currentValue + increment)
        setStatCounts((prev) => {
          if (prev[index] === currentValue) return prev
          const next = [...prev]
          next[index] = currentValue
          return next
        })

        if (currentValue >= stat.target) {
          clearInterval(intervalId)
        }
      }, 30)

      return intervalId
    })

    return () => intervals.forEach(clearInterval)
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <div
        className="about-hero"
        style={{ backgroundImage: "url('/photos/_DSC0960.JPG')" }}
      >
        <div className="hero-content">
          <h1>About AK Tours & Travels</h1>
          <p>Your trusted partner for safe, reliable, and comfortable transportation services between Pune and Mumbai.</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={stat.label} className="stat-item">
              <div className="stat-number">
                {statCounts[index]}{stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="about-tabs">
        <div className="tab-buttons">
          <button 
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About Us
          </button>
          <button 
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Our Services
          </button>
          <button 
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Info
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'about' && (
            <div className="about-content">
              <div className="content-image">
                <img src="/photos/_DSC0984.JPG" alt="Our Team" />
              </div>
              <div className="content-text">
                <h3>Your Safety is Our Priority</h3>
                <p>At AK Tours & Travels, we are committed to providing exceptional transportation services with a focus on safety, reliability, and customer satisfaction. Our journey began with a simple mission: to make travel between Pune and Mumbai comfortable, safe, and convenient for everyone.</p>
                
                <h4>Why Choose Us?</h4>
                <ul>
                  <li>Professional and experienced drivers</li>
                  <li>Well-maintained and sanitized vehicles</li>
                  <li>Real-time GPS tracking for your peace of mind</li>
                  <li>Competitive pricing with no hidden charges</li>
                  <li>24/7 customer support</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="services-content">
              <div className="services-grid">
                {services.map((service) => (
                  <div key={service.id} className="service-card">
                    <div className="service-image">
                      <img src={service.image} alt={service.title} />
                    </div>
                    <div className="service-content">
                      <div className="service-icon">{service.icon}</div>
                      <h4>{service.title}</h4>
                      <p>{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="route-info">
                <h3>Pune-Mumbai Daily Service</h3>
                <p>We provide daily one-way and round-trip services between Pune and Mumbai with flexible timings to suit your schedule.</p>
                <div className="route-features">
                  <div className="feature">
                    <span className="feature-icon">🕐</span>
                    <span>Flexible Timings</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">💰</span>
                    <span>Competitive Rates</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">🛡️</span>
                    <span>Safe Journey</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="contact-content">
              <div className="contact-info">
                <h3>Get in Touch</h3>
                <div className="contact-details">
                  <div className="contact-item">
                    <div className="contact-icon">👨‍💼</div>
                    <div>
                      <h4>Owner</h4>
                      <p>Akshay Amale</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">📞</div>
                    <div>
                      <h4>Phone</h4>
                      <p><a href="tel:+919730825092">+91 9730825092</a></p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">📍</div>
                    <div>
                      <h4>Location</h4>
                      <p><a href="https://maps.app.goo.gl/K6QtsAfxD9mYKHdK8" target="_blank" rel="noopener noreferrer">View on Google Maps</a></p>
                    </div>
                  </div>
                </div>
                <div className="contact-cta">
                  <p>For any queries, please feel free to call or contact us. We're here to help!</p>
                  <a href="tel:+919730825092" className="btn-primary">Call Now</a>
                </div>
              </div>
              <div className="contact-image">
                <img src="/photos/_DSC0993.JPG" alt="Contact Us" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


