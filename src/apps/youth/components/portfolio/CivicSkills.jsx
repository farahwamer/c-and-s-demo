import { useEffect, useRef, useState } from 'react'

const SKILLS = [
  { label: 'Productive Conversations', key: 'productive_conversations', color: '#C8942E', description: 'Dialogue, advocacy, and facilitation' },
  { label: 'Credible Information', key: 'credible_information', color: '#2A7B88', description: 'Research, analysis, and data literacy' },
  { label: 'Collaborating to Create Solutions', key: 'collaborating', color: '#8B6B3D', description: 'Teamwork, co-creation, and project work' },
]

function RadialProgress({ value, color, size = 140, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const targetOffset = circumference - (value / 100) * circumference
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0 }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E8E4DF" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color}
          strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? targetOffset : circumference}
          style={{ transform: 'rotate(-90deg)', transformOrigin: `${size / 2}px ${size / 2}px`, transition: animated ? 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none' }}
        />
      </svg>
      <div className="relative flex flex-col items-center">
        <span className="text-2xl font-bold" style={{ color, fontFamily: 'Source Sans 3, system-ui, sans-serif', lineHeight: 1 }}>{value}%</span>
      </div>
    </div>
  )
}

export default function CivicSkills({ skills }) {
  return (
    <div className="rounded-xl p-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E4DF', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <div className="grid grid-cols-3 gap-8">
        {SKILLS.map((skill) => (
          <div key={skill.key} className="flex flex-col items-center text-center">
            <RadialProgress value={skills[skill.key]} color={skill.color} />
            <p className="mt-4 font-semibold text-sm leading-snug" style={{ color: '#1A1A1A', fontFamily: 'Source Sans 3, system-ui, sans-serif', maxWidth: '160px' }}>
              {skill.label}
            </p>
            <p className="mt-1 text-xs" style={{ color: '#6B7280', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>
              {skill.description}
            </p>
            <div className="mt-3 w-full max-w-40 rounded-full overflow-hidden" style={{ height: '6px', backgroundColor: '#E8E4DF' }}>
              <div className="h-full rounded-full" style={{ width: `${skills[skill.key]}%`, backgroundColor: skill.color, transition: 'width 1.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
