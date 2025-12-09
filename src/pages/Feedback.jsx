import { useEffect, useMemo, useState } from 'react'
import SectionLoader from '../components/SectionLoader.jsx'
import '../styles/feedback.css'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function loadApproved() {
  try {
    const rawA = localStorage.getItem('ak_approved_feedbacks')
    const rawB = localStorage.getItem('ak_feedbacks')
    const a = rawA ? JSON.parse(rawA) : []
    const b = rawB ? JSON.parse(rawB) : []
    // show approved first, then recent feedbacks
    return [...a, ...b]
  } catch (e) { return [] }
}

export default function Feedback() {
  const sample = [
    { id: 1, name: 'Asha R.', date: '2025-11-28T09:20:00Z', rating: 5, message: 'Amazing service — everything was on time and clearly explained.', tags: ['verified'] },
    { id: 2, name: 'Rahul K.', date: '2025-11-25T14:05:00Z', rating: 4, message: 'Good experience overall but pickup was 10 minutes late.', tags: [] },
  ]

  const [isLoading, setIsLoading] = useState(true)
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    const t = setTimeout(() => {
      const approved = loadApproved()
      setFeedbacks([...approved, ...sample]) // approved first, fallback to sample
      setIsLoading(false)
    }, 450)
    return () => clearTimeout(t)
  }, [])

  const stats = useMemo(() => {
    if (!feedbacks.length) return { avg: 0, total: 0 }
    const total = feedbacks.length
    const avg = feedbacks.reduce((s, f) => s + (Number(f.rating) || 0), 0) / total
    return { avg: Math.round(avg * 10) / 10, total }
  }, [feedbacks])

  return (
    <SectionLoader isLoading={isLoading} height="640px">
      <div className="feedback-page container">
        <div className="page-head centered">
          <h1 className="page-title">Reviews</h1>
          <p className="page-sub">Customer reviews and shared photos/videos from past customers.</p>
        </div>

        <div className="fb-grid">
          <aside className="fb-left">
            <div className="sticky-filter">
              <div className="stats-compact">
                <div className="avg">
                  <div className="avg-number">{stats.avg || 0}</div>
                  <div className="avg-label">Avg Rating</div>
                </div>
                <div className="count">
                  <div className="count-big">{stats.total}</div>
                  <div className="count-label">Total reviews</div>
                </div>
              </div>
            </div>
          </aside>

          <main className="fb-right">
            <section className="feedback-list" aria-live="polite">
              {feedbacks.length === 0 && <div className="empty">No reviews available.</div>}
              {feedbacks.map(item => (
                <article key={item.id} className="feedback-card">
                  <div className="card-left">
                    <div className="avatar large">{item.name?.split(' ').map(n => n[0]).slice(0,2).join('')}</div>
                  </div>

                  <div className="card-body">
                    <div className="card-header">
                      <div className="card-name">{item.name}</div>
                      <div className="card-meta">
                        <span className="card-rating" aria-label={`${item.rating} star`}>{'★'.repeat(item.rating)}</span>
                        <span className="card-date">{formatDate(item.date)}</span>
                      </div>
                    </div>

                    <div className="card-message">{item.message}</div>

                    {item.media && (
                      <div style={{ marginTop: 10 }}>
                        {String(item.media).startsWith('data:video') ? (
                          <video src={item.media} controls style={{ maxWidth: '100%', borderRadius: 8 }} />
                        ) : (
                          <img src={item.media} alt="attachment" style={{ maxWidth: '420px', borderRadius: 8 }} />
                        )}
                      </div>
                    )}

                    <div className="card-footer">
                      <div className="card-tags">
                        {item.tags?.map(t => <span key={t} className="tag pill">{t}</span>)}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </main>
        </div>
      </div>
    </SectionLoader>
  )
}
