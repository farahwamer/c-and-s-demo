import { useState } from 'react'
import { portfolioSkillColors } from '../../data.js'

function SkillTag({ skill }) {
  const color = portfolioSkillColors[skill] || '#6B7280'
  return (
    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: color + '22', color, fontFamily: 'Source Sans 3, system-ui, sans-serif', whiteSpace: 'nowrap' }}>
      {skill}
    </span>
  )
}

function ActionItem({ action }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #E8E4DF' }}>
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left focus:outline-none" style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '20px 0' }}>
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-28 pt-0.5">
            <span className="text-xs font-semibold" style={{ color: '#6B7280', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>{action.date}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <p className="font-semibold text-base leading-snug" style={{ color: '#1A1A1A', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>{action.title}</p>
              <SkillTag skill={action.skill} />
            </div>
          </div>
          <div className="flex-shrink-0 mt-0.5 ml-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease', color: '#6B7280' }}>
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </button>
      <div style={{ overflow: 'hidden', maxHeight: expanded ? '200px' : '0', opacity: expanded ? 1 : 0, transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease' }}>
        <div style={{ paddingLeft: '136px', paddingBottom: '20px' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#3D3D3D', fontFamily: 'Source Sans 3, system-ui, sans-serif', backgroundColor: '#FAF7F2', borderLeft: '3px solid #E8E4DF', padding: '12px 16px', borderRadius: '0 6px 6px 0' }}>
            {action.detail}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function RecentActions({ actions }) {
  return (
    <div className="rounded-xl px-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E4DF', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      {actions.map((action, i) => <ActionItem key={i} action={action} />)}
    </div>
  )
}
