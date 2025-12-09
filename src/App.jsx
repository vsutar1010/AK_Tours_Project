import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import PageLoader from './components/PageLoader.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import LatestNews from './pages/LatestNews.jsx'
import Feedback from './pages/Feedback.jsx'
import About from './pages/About.jsx'
import Gallery from './pages/Gallery.jsx'
import Contact from './pages/Contact.jsx'
import Services from './pages/Services.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <PageLoader isLoading={initialLoading}>
      <div className="app">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/latest-news" element={<LatestNews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feedback" element={<Feedback />} />
            
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </PageLoader>
  )
}


