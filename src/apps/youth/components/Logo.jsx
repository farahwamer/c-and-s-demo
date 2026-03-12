import React from 'react'

export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  }
  return (
    <span className={`font-serif font-bold tracking-tight ${sizes[size]}`}>
      <span style={{ color: '#1A1A1A' }}>C</span>
      <span style={{ color: '#C8942E' }}>&amp;</span>
      <span style={{ color: '#1A1A1A' }}>S</span>
    </span>
  )
}
