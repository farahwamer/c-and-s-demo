import React from 'react'
import { avatarColors } from '../data.js'

export default function Avatar({ name, size = 40, index = 0 }) {
  const initial = name ? name.charAt(0).toUpperCase() : '?'
  const color = avatarColors[index % avatarColors.length]

  return (
    <div
      className="flex items-center justify-center flex-shrink-0 font-bold text-white"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        fontSize: size * 0.4,
        fontFamily: '"Source Sans 3", system-ui, sans-serif',
        letterSpacing: '0.02em',
      }}
    >
      {initial}
    </div>
  )
}
