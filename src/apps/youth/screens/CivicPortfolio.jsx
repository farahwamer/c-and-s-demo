import { useState } from 'react'
import NavBar from '../components/NavBar.jsx'
import ProfileHeader from '../components/portfolio/ProfileHeader.jsx'
import CivicJourney from '../components/portfolio/CivicJourney.jsx'
import CivicSkills from '../components/portfolio/CivicSkills.jsx'
import RecentActions from '../components/portfolio/RecentActions.jsx'
import NextSteps from '../components/portfolio/NextSteps.jsx'
import Toast from '../components/portfolio/Toast.jsx'
import { profile } from '../data.js'

export default function CivicPortfolio() {
  const [toast, setToast] = useState(null)

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="min-h-screen page-enter" style={{ backgroundColor: '#FAF7F2' }}>
      <NavBar />

      <main className="max-w-5xl mx-auto px-8 pb-24">
        <ProfileHeader profile={profile} />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1A1A1A' }}>
            Civic Journey
          </h2>
          <CivicJourney journey={profile.journey} />
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1A1A1A' }}>
            My Civic Skills
          </h2>
          <CivicSkills skills={profile.skills} />
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1A1A1A' }}>
            Recent Actions
          </h2>
          <RecentActions actions={profile.recent_actions} />
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1A1A1A' }}>
            Recommended Next Steps
          </h2>
          <p className="text-sm mb-8" style={{ color: '#6B7280', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>
            Based on your journey and skills, these opportunities are a strong match.
          </p>
          <NextSteps steps={profile.recommended_next_steps} onAction={showToast} />
        </section>
      </main>

      {toast && <Toast message={toast} />}
    </div>
  )
}
