import React, { useState, useMemo } from 'react'
import NavBar from '../components/NavBar.jsx'
import SkillTag from '../components/SkillTag.jsx'
import Modal from '../components/Modal.jsx'
import { programs, programCategories } from '../data.js'

const STATUS_OPTIONS = ['All Statuses', 'Applications Open', 'Coming Soon']
const FORMAT_OPTIONS = ['All Formats', 'Fully virtual', 'Hybrid', 'In-person']

function statusStyle(status) {
  if (status === 'Applications Open') return { color: '#4A7C59', bg: 'rgba(74,124,89,0.1)' }
  return { color: '#C8942E', bg: 'rgba(200,148,46,0.1)' }
}

export default function Programs() {
  const [categoryFilter, setCategoryFilter] = useState('All Programs')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [selectedProgram, setSelectedProgram] = useState(null)

  const filtered = useMemo(() => {
    return programs.filter(p => {
      const catMatch = categoryFilter === 'All Programs' || p.category === categoryFilter
      const statusMatch = statusFilter === 'All Statuses' || p.status === statusFilter
      return catMatch && statusMatch
    })
  }, [categoryFilter, statusFilter])

  return (
    <div className="min-h-screen page-enter" style={{ backgroundColor: '#FAF7F2' }}>
      <NavBar />

      {/* Hero */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E8E4DF' }}>
        <div className="max-w-7xl mx-auto px-8 py-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C8942E', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
            Opportunities
          </p>
          <h1 className="font-serif text-5xl mb-3" style={{ color: '#1A1A1A' }}>Programs</h1>
          <p className="text-lg max-w-2xl" style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
            Fellowships, grants, training institutes, and skill-building pathways for young people ready to go deeper.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-8 mt-8 pt-8" style={{ borderTop: '1px solid #E8E4DF' }}>
            {[
              { value: programs.length, label: 'programs listed' },
              { value: programs.filter(p => p.status === 'Applications Open').length, label: 'accepting applications' },
              { value: '14–26', label: 'age range served' },
            ].map(stat => (
              <div key={stat.label}>
                <span className="text-2xl font-bold" style={{ color: '#1A1A1A', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>{stat.value}</span>
                <span className="text-sm ml-2" style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Filters */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {programCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className="text-xs font-semibold px-4 py-2 rounded-full"
                style={{
                  backgroundColor: categoryFilter === cat ? '#C8942E' : '#FFFFFF',
                  color: categoryFilter === cat ? '#FFFFFF' : '#6B7280',
                  border: categoryFilter === cat ? '1px solid #C8942E' : '1px solid #E8E4DF',
                  cursor: 'pointer',
                  fontFamily: '"Source Sans 3", system-ui, sans-serif',
                }}
                onMouseEnter={e => { if (categoryFilter !== cat) e.currentTarget.style.borderColor = '#C8942E' }}
                onMouseLeave={e => { if (categoryFilter !== cat) e.currentTarget.style.borderColor = '#E8E4DF' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="text-sm font-semibold rounded-lg px-3 py-2 appearance-none"
            style={{ border: '1px solid #E8E4DF', backgroundColor: '#FFFFFF', color: statusFilter === 'All Statuses' ? '#9CA3AF' : '#1A1A1A', fontFamily: '"Source Sans 3", system-ui, sans-serif', cursor: 'pointer', paddingRight: '28px', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
          >
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm mb-6" style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
          Showing {filtered.length} program{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Program grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>No programs match these filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {filtered.map(program => (
              <ProgramCard key={program.id} program={program} onClick={() => setSelectedProgram(program)} />
            ))}
          </div>
        )}
      </div>

      {selectedProgram && (
        <Modal onClose={() => setSelectedProgram(null)}>
          <ProgramModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />
        </Modal>
      )}
    </div>
  )
}

function ProgramCard({ program, onClick }) {
  const [hovered, setHovered] = useState(false)
  const st = statusStyle(program.status)

  return (
    <div
      className="rounded-xl flex flex-col"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E8E4DF',
        borderColor: hovered ? '#D4A843' : '#E8E4DF',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 6px 20px rgba(0,0,0,0.08)' : 'none',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Top accent */}
      <div style={{ height: '3px', backgroundColor: '#C8942E', flexShrink: 0 }} />

      <div className="p-6 flex flex-col flex-1">
        {/* Category + status */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
            {program.category}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: st.color, backgroundColor: st.bg, fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
            {program.status}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-serif text-xl leading-snug mb-3" style={{ color: '#1A1A1A' }}>
          {program.name}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
          {program.description}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
          {[
            { icon: '👤', label: program.ageRange },
            { icon: '📅', label: program.duration },
            { icon: '📍', label: program.format },
          ].map(m => (
            <span key={m.label} className="text-xs" style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
              {m.icon} {m.label}
            </span>
          ))}
        </div>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {program.skills.map(s => <SkillTag key={s} skill={s} />)}
        </div>

        {/* Deadline + CTA */}
        <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #E8E4DF' }}>
          <span className="text-xs" style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
            {program.deadline}
          </span>
          <span className="text-sm font-semibold" style={{ color: '#C8942E', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
            Learn more →
          </span>
        </div>
      </div>
    </div>
  )
}

function ProgramModal({ program, onClose }) {
  const st = statusStyle(program.status)

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
            {program.category}
          </span>
          <h2 className="font-serif text-3xl mt-1" style={{ color: '#1A1A1A' }}>{program.name}</h2>
        </div>
        <span className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full mt-1" style={{ color: st.color, backgroundColor: st.bg, fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
          {program.status}
        </span>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 gap-3 my-6 p-5 rounded-xl" style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E4DF' }}>
        {[
          { label: 'Age range', value: program.ageRange },
          { label: 'Duration', value: program.duration },
          { label: 'Format', value: program.format },
          { label: 'Cohort size', value: program.cohortSize },
          { label: 'Location', value: program.location },
          { label: 'Deadline', value: program.deadline },
        ].map(m => (
          <div key={m.label}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>{m.label}</p>
            <p className="text-sm font-semibold" style={{ color: '#1A1A1A', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Civic skills */}
      <div className="flex gap-2 mb-5">
        {program.skills.map(s => <SkillTag key={s} skill={s} />)}
      </div>

      {/* Detail text */}
      <p className="text-base leading-relaxed mb-6" style={{ color: '#3D3025', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
        {program.detail}
      </p>

      {/* CTA */}
      <button
        className="w-full py-3 text-base font-semibold text-white rounded-lg"
        style={{ backgroundColor: program.status === 'Applications Open' ? '#C8942E' : '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif', cursor: program.status === 'Applications Open' ? 'pointer' : 'not-allowed', border: 'none' }}
        onMouseEnter={e => { if (program.status === 'Applications Open') e.currentTarget.style.backgroundColor = '#D4A843' }}
        onMouseLeave={e => { if (program.status === 'Applications Open') e.currentTarget.style.backgroundColor = '#C8942E' }}
      >
        {program.status === 'Applications Open' ? 'Start Application' : 'Get Notified When Open'}
      </button>
    </div>
  )
}
