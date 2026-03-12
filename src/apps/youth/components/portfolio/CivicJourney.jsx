import { useState, useEffect } from 'react'

export default function CivicJourney({ journey }) {
  const [visibleNodes, setVisibleNodes] = useState([])
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    journey.forEach((_, i) => {
      setTimeout(() => setVisibleNodes(prev => [...prev, i]), i * 200 + 100)
    })
  }, [])

  return (
    <div className="rounded-xl p-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E4DF', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <div className="relative flex items-start justify-between">
        <div className="absolute top-5 left-0 right-0 h-px" style={{ backgroundColor: '#E8E4DF', zIndex: 0, margin: '0 32px' }} />

        {journey.map((milestone, i) => (
          <div key={i} className="relative flex flex-col items-center flex-1" onMouseEnter={() => setTooltip(i)} onMouseLeave={() => setTooltip(null)}>
            <div
              className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-default hover:scale-110"
              style={milestone.completed
                ? { backgroundColor: '#4A7C59', border: '2px solid #4A7C59', opacity: visibleNodes.includes(i) ? 1 : 0, transition: 'opacity 0.3s ease, transform 0.15s ease' }
                : { backgroundColor: '#FFFFFF', border: '2px dashed #C8942E', opacity: visibleNodes.includes(i) ? 1 : 0, transition: 'opacity 0.3s ease, transform 0.15s ease' }
              }
            >
              {milestone.completed ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L6.5 11.5L13 5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L9.5 6H14L10.5 8.5L11.5 13L8 10.5L4.5 13L5.5 8.5L2 6H6.5L8 2Z" fill="#C8942E" opacity="0.8" />
                </svg>
              )}
            </div>

            <div className="mt-3 text-center px-1">
              <p className="text-xs font-semibold leading-tight" style={{ color: milestone.completed ? '#1A1A1A' : '#C8942E', fontFamily: 'Source Sans 3, system-ui, sans-serif', maxWidth: '100px' }}>
                {milestone.stage}
              </p>
              <p className="text-xs mt-1" style={{ color: '#6B7280', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>
                {milestone.date}
              </p>
            </div>

            {tooltip === i && (
              <div className="absolute z-50 bottom-full mb-3 left-1/2 rounded-lg p-3 text-sm shadow-lg" style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF', width: '220px', transform: 'translateX(-50%)', fontFamily: 'Source Sans 3, system-ui, sans-serif', pointerEvents: 'none' }}>
                <p className="font-semibold text-xs mb-1" style={{ color: '#C8942E' }}>{milestone.stage}</p>
                <p className="text-xs leading-relaxed">{milestone.action}</p>
                <div style={{ position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #1A1A1A' }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6 mt-8 pt-5" style={{ borderTop: '1px solid #E8E4DF' }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4A7C59' }} />
          <span className="text-xs" style={{ color: '#6B7280', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ border: '2px dashed #C8942E', backgroundColor: 'transparent' }} />
          <span className="text-xs" style={{ color: '#6B7280', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>Upcoming</span>
        </div>
        <div className="ml-auto">
          <span className="text-xs font-semibold" style={{ color: '#4A7C59', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>4 of 5 stages complete</span>
        </div>
      </div>
    </div>
  )
}
