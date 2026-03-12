import React from 'react'
import { skillColors } from '../data.js'

export default function SkillTag({ skill }) {
  const colors = skillColors[skill] || { text: '#6B7280', bgLight: 'rgba(107,114,128,0.12)' }
  return (
    <span
      className="inline-block text-xs font-semibold"
      style={{
        color: colors.text,
        backgroundColor: colors.bgLight,
        borderRadius: '999px',
        padding: '3px 10px',
        fontFamily: '"Source Sans 3", system-ui, sans-serif',
        fontSize: '11px',
        letterSpacing: '0.02em',
      }}
    >
      {skill}
    </span>
  )
}
