import { useState, useEffect } from 'react'
import '../styles/loading.css'

export default function PageLoader({ isLoading, children }) {
  const [showLoader, setShowLoader] = useState(isLoading)

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true)
    } else {
      const timer = setTimeout(() => setShowLoader(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  return (
    <>
      {showLoader && (
        <div className={`page-loader ${!isLoading ? 'fade-out' : ''}`}>
          <div className="loader-content">
            <div className="loader-spinner">
              <svg viewBox="0 0 50 50" className="loader-svg">
                <circle cx="25" cy="25" r="20" />
              </svg>
            </div>
            <h2 className="loader-text">Loading...</h2>
            <p className="loader-subtext">Please wait while we prepare your experience</p>
          </div>
        </div>
      )}
      <div className={`page-content ${showLoader ? 'loading' : ''}`}>
        {children}
      </div>
    </>
  )
}
