import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import { interestCategories, ageBrackets } from '../data.js'

export default function Landing({ setUserPrefs }) {
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])
  const [location, setLocation] = useState('')
  const [age, setAge] = useState('')
  const [loading, setLoading] = useState(false)

  const toggleInterest = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleCTA = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setUserPrefs({
        interests: selected,
        location: location.trim() || 'Phoenix, AZ',
        ageBracket: age || '16–17',
      })
      navigate('/youth/feed')
    }, 900)
  }

  return (
    <div className="min-h-screen flex flex-col page-enter">
      {/* Hero */}
      <div
        className="relative flex flex-col items-center justify-center text-center px-8 py-20"
        style={{
          background: 'linear-gradient(145deg, #FAF7F2 0%, #F5EDD8 40%, #EDD9A3 70%, #E8C96A 100%)',
          minHeight: '480px',
        }}
      >
        {/* Logo top left */}
        <div className="absolute top-6 left-8">
          <Logo size="md" />
        </div>

        <div className="max-w-2xl">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#8B6B3D', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
          >
            Civic &amp; Social — Youth Platform
          </p>
          <h1
            className="font-serif text-5xl leading-tight mb-5"
            style={{ color: '#1A1A1A' }}
          >
            What matters to you?
          </h1>
          <p
            className="text-xl leading-relaxed"
            style={{ color: '#3D3025', fontFamily: '"Source Sans 3", system-ui, sans-serif', fontWeight: 400 }}
          >
            Tell us what you care about and we'll find civic actions near you.
          </p>
        </div>
      </div>

      {/* Assessment card */}
      <div
        className="flex-1 flex flex-col items-center px-8 py-16"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="w-full max-w-3xl">

          {/* Interest tiles */}
          <div className="mb-12">
            <h2
              className="font-semibold text-base mb-2"
              style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '12px' }}
            >
              Select your interests
            </h2>
            <p
              className="text-sm mb-6"
              style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
            >
              Choose as many as you like — no right answers.
            </p>
            <div className="grid grid-cols-4 gap-4">
              {interestCategories.map((cat) => {
                const isSelected = selected.includes(cat.id)
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleInterest(cat.id)}
                    className="relative flex flex-col items-center justify-center py-6 px-4 rounded-lg text-center"
                    style={{
                      border: isSelected ? '2px solid #C8942E' : '1px solid #E8E4DF',
                      backgroundColor: isSelected ? 'rgba(200,148,46,0.06)' : '#FFFFFF',
                      transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 2px 8px rgba(200,148,46,0.15)' : '0 1px 3px rgba(0,0,0,0.06)',
                    }}
                  >
                    {isSelected && (
                      <span
                        className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full text-white text-xs font-bold"
                        style={{ backgroundColor: '#C8942E', fontSize: '10px' }}
                      >
                        ✓
                      </span>
                    )}
                    <span className="text-2xl mb-2">{cat.icon}</span>
                    <span
                      className="text-sm font-semibold"
                      style={{
                        color: isSelected ? '#C8942E' : '#1A1A1A',
                        fontFamily: '"Source Sans 3", system-ui, sans-serif',
                      }}
                    >
                      {cat.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Location + Age */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
              >
                Your location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your city or zip code"
                className="w-full px-4 py-3 text-sm rounded-lg focus:outline-none"
                style={{
                  border: '1px solid #E8E4DF',
                  fontFamily: '"Source Sans 3", system-ui, sans-serif',
                  color: '#1A1A1A',
                  backgroundColor: '#FFFFFF',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#C8942E' }}
                onBlur={(e) => { e.target.style.borderColor = '#E8E4DF' }}
              />
            </div>

            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
              >
                Your age bracket
              </label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-lg focus:outline-none appearance-none"
                style={{
                  border: '1px solid #E8E4DF',
                  fontFamily: '"Source Sans 3", system-ui, sans-serif',
                  color: age ? '#1A1A1A' : '#9CA3AF',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#C8942E' }}
                onBlur={(e) => { e.target.style.borderColor = '#E8E4DF' }}
              >
                <option value="" disabled>Select your age bracket</option>
                {ageBrackets.map((b) => (
                  <option key={b} value={b} style={{ color: '#1A1A1A' }}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleCTA}
              disabled={loading}
              className="w-full max-w-sm py-4 text-base font-semibold text-white rounded-lg relative overflow-hidden"
              style={{
                backgroundColor: loading ? '#D4A843' : '#C8942E',
                fontFamily: '"Source Sans 3", system-ui, sans-serif',
                borderRadius: '8px',
                cursor: loading ? 'default' : 'pointer',
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = '#D4A843' }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = '#C8942E' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <LoadingDots />
                  Finding your civic actions…
                </span>
              ) : (
                'Show me what I can do →'
              )}
            </button>
            <p
              className="text-xs mt-3"
              style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
            >
              No account required. Your information is never shared.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function LoadingDots() {
  return (
    <span className="flex gap-1 items-center">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block w-1.5 h-1.5 rounded-full bg-white"
          style={{
            animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes pulse { 0%,80%,100%{opacity:0.3} 40%{opacity:1} }`}</style>
    </span>
  )
}
