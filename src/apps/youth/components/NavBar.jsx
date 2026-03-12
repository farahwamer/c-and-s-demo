import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'

const navItems = [
  { label: 'Explore', path: '/youth/feed?tab=explore', id: 'explore' },
  { label: 'Find Peers', path: '/youth/peers', id: 'peers' },
  { label: 'Programs', path: '/youth/programs', id: 'programs' },
]

export default function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const tab = params.get('tab')

  const getIsActive = (item) => {
    if (item.id === 'peers') return location.pathname === '/youth/peers'
    if (item.id === 'programs') return location.pathname === '/youth/programs'
    if (location.pathname !== '/youth/feed') return false
    if (item.id === 'explore') return tab === 'explore'
    return false
  }

  const isPortfolioActive = location.pathname === '/youth/portfolio'

  return (
    <nav
      className="w-full bg-white sticky top-0 z-40"
      style={{ borderBottom: '1px solid #E8E4DF' }}
    >
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="focus:outline-none">
          <Logo size="md" />
        </button>

        <div className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = getIsActive(item)
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="relative text-sm font-semibold tracking-wide group"
                style={{ color: '#1A1A1A', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 w-full h-0.5 origin-left group-hover:scale-x-100 transition-transform duration-200"
                  style={{
                    backgroundColor: '#C8942E',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                  }}
                />
              </button>
            )
          })}

          {/* Profile avatar */}
          <button
            onClick={() => navigate('/youth/portfolio')}
            title="My Civic Portfolio"
            className="flex items-center justify-center rounded-full text-white text-sm font-bold flex-shrink-0"
            style={{
              width: 34,
              height: 34,
              background: isPortfolioActive
                ? 'linear-gradient(135deg, #C8942E 0%, #D4A843 100%)'
                : 'linear-gradient(135deg, #C8942E 0%, #D4A843 100%)',
              fontFamily: '"Source Sans 3", system-ui, sans-serif',
              boxShadow: isPortfolioActive ? '0 0 0 2px #FFFFFF, 0 0 0 4px #C8942E' : 'none',
              cursor: 'pointer',
              border: 'none',
              transition: 'box-shadow 0.15s ease, transform 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            AJ
          </button>
        </div>
      </div>
    </nav>
  )
}
