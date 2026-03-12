import { Routes, Route, Link } from 'react-router-dom'
import ScrollToTop from './ScrollToTop.jsx'
import AnalyticsApp from './apps/analytics/App.jsx'
import CYLApp from './apps/cyl/App.jsx'
import YouthApp from './apps/youth/App.jsx'

function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FAF7F2',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2.5rem',
      fontFamily: '"Source Sans 3", system-ui, sans-serif',
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#1A1A1A',
          margin: '0 0 0.5rem',
        }}>
          C<span style={{ color: '#C8942E' }}>&amp;</span>S Platform
        </h1>
        <p style={{ color: '#6B7280', margin: 0, fontSize: '1rem' }}>
          Select a project to get started
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <AppCard to="/cyl" title="CYL Dashboard" desc="Carnegie Young Leaders program management" />
        <AppCard to="/youth" title="Youth Home Feed" desc="Youth civic engagement platform" />
        <AppCard to="/analytics" title="Analytics" desc="Program analytics & funder reports" />
      </div>
    </div>
  )
}

function AppCard({ to, title, desc }) {
  return (
    <Link
      to={to}
      style={{
        display: 'block',
        padding: '1.75rem 2rem',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E8E4DF',
        borderRadius: '12px',
        textDecoration: 'none',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        width: '220px',
        transition: 'box-shadow 0.15s ease, transform 0.15s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={{
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: '1.125rem',
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: '0.5rem',
      }}>
        {title}
      </div>
      <div style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.5' }}>
        {desc}
      </div>
    </Link>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics/*" element={<AnalyticsApp />} />
        <Route path="/cyl/*" element={<CYLApp />} />
        <Route path="/youth/*" element={<YouthApp />} />
      </Routes>
    </>
  )
}
