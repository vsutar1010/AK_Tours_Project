import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const heroImages = [
    '/photos/_DSC0956.JPG',
    '/photos/_DSC0993.JPG',
    '/photos/_DSC1011.JPG',
    '/photos/_DSC1053.JPG',
    '/photos/_DSC1067.JPG',
    '/photos/1720554775809.jpg',
    '/photos/IMG_7896.JPEG.jpg',
    '/photos/IMG_7905.JPEG.jpg'
  ]

  const infoCards = [
    {
      id: 1,
      title: 'Professional Services',
      description: 'Expert solutions tailored to your needs with the highest quality standards.',
      icon: '⚡',
      image: '/photos/_DSC1011.JPG'
    },
    {
      id: 2,
      title: '24/7 Support',
      description: 'Round-the-clock assistance whenever you need help or have questions.',
      icon: '🛠️',
      image: '/photos/_DSC1012.JPG'
    },
    {
      id: 3,
      title: 'Premium Quality',
      description: 'Top-notch services delivered with attention to detail and excellence.',
      icon: '⭐',
      image: '/photos/_DSC1014.JPG'
    }
  ]

  const newsItems = [
    {
      id: 1,
      title: 'New Service Launch',
      description: 'We are excited to announce our latest premium service package.',
      icon: '📢',
      image: '/photos/_DSC1053.JPG'
    },
    {
      id: 2,
      title: 'Company Expansion',
      description: 'Opening new branches in three major cities this quarter.',
      icon: '🏢',
      image: '/photos/_DSC1054.JPG'
    },
    {
      id: 3,
      title: 'Award Recognition',
      description: 'Proud to receive the Best Service Provider award for 2024.',
      icon: '🏆',
      image: '/photos/_DSC1059.JPG'
    }
  ]

  const galleryImages = [
    '/photos/_DSC0993.JPG',
    '/photos/_DSC0995.JPG',
    '/photos/_DSC1011.JPG',
    '/photos/_DSC1012.JPG',
    '/photos/_DSC1014.JPG',
    '/photos/_DSC1053.JPG',
    '/photos/_DSC1054.JPG',
    '/photos/_DSC1059.JPG',
    '/photos/_DSC1060.JPG',
    '/photos/_DSC1067.JPG',
    '/photos/_DSC1068.JPG',
    '/photos/_DSC1070.JPG',
    '/photos/_DSC1075.JPG',
    '/photos/_DSC1131.JPG'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const navigate = useNavigate()

  return (
    <div>
      {/* Hero Slider */}
      <div className="hero-slider">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      {/* Hero caption and CTAs */}
      <div className="hero-caption">
        <div className="hero-caption-inner">
          <h1>Explore Unforgettable Journeys</h1>
          <p>Travel with AK Tours &amp; Travels — memories made easy. Lorem ipsum dolor sit amet consectetur 
            adipisicing elit. Blanditiis minus in, voluptatibus assumenda beatae asperiores tenetur, odit,
             eveniet quo corporis aperiam distinctio. Vel esse nobis, pariatur quaerat voluptatem molestiae
             </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => navigate('/feedback')}>Feedback</button>
            <button className="btn-whatsapp" onClick={() => window.open('https://wa.me/919730825092', '_blank', 'noopener')}>Book via WhatsApp</button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <div className="services-header">
          <h2>Our Services</h2>
        </div>
        <div className="info-cards">
          {infoCards.map((card) => (
            <div key={card.id} className="info-card">
              <div className="info-card-image">
                <img src={card.image} alt={card.title} />
              </div>
              <div className="info-card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="services-view-more">
          <a href="/services" className="btn-secondary">View More</a>
        </div>
      </div>

      {/* Latest News */}
      <div className="news-section news-section-tight">
        <div className="news-header">
          <h2>Latest News</h2>
        </div>
        <div className="news-cards">
          {newsItems.map((news) => (
            <div key={news.id} className="news-card">
              <div className="news-image">
                <img src={news.image} alt={news.title} />
              </div>
              <div className="news-content">
                <h3>{news.title}</h3>
                <p>{news.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="news-view-more">
          <a href="/latest-news" className="btn-secondary">View All</a>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="gallery-section">
        <div className="gallery-header">
          <h2>Gallery</h2>
        </div>
        <div className="image-slider-container">
          <div className="image-slider">
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <div key={index} className="slider-image">
                <img src={image} alt={`Gallery image ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="gallery-cta">
          <button className="btn-secondary" onClick={() => navigate('/gallery')}>Explore More</button>
        </div>
      </div>
    </div>
  )
}


