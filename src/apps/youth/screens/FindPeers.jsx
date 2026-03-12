import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import SkillTag from '../components/SkillTag.jsx'
import Avatar from '../components/Avatar.jsx'
import Modal from '../components/Modal.jsx'
import { peers, peerPosts } from '../data.js'

const TAG_COLORS = [
  { bg: '#FEF3C7', text: '#92400E' }, // amber
  { bg: '#DBEAFE', text: '#1E40AF' }, // blue
  { bg: '#D1FAE5', text: '#065F46' }, // green
  { bg: '#EDE9FE', text: '#5B21B6' }, // purple
  { bg: '#FCE7F3', text: '#9D174D' }, // pink
  { bg: '#FFEDD5', text: '#9A3412' }, // orange
]

const SKILL_OPTIONS = ['All Skills', 'Productive Conversations', 'Credible Information', 'Collaborating']
const STATE_OPTIONS = ['All States', 'AZ', 'CA', 'FL', 'GA', 'MA', 'MI', 'MN', 'TX']
const TOPIC_OPTIONS = [
  'All Topics',
  'Voter Registration',
  'Food Access',
  'Disaster Preparedness',
  'Civic Tech',
  'Multilingual Access',
  'Housing',
  'Youth Engagement',
  'Accountability',
]

export default function FindPeers() {
  const navigate = useNavigate()
  const [skillFilter, setSkillFilter] = useState('All Skills')
  const [stateFilter, setStateFilter] = useState('All States')
  const [topicFilter, setTopicFilter] = useState('All Topics')
  const [selectedPeer, setSelectedPeer] = useState(null)
  const [filterKey, setFilterKey] = useState(0)
  const [connected, setConnected] = useState(new Set())

  const handleConnect = (peerId) => {
    setConnected(prev => {
      const next = new Set(prev)
      next.has(peerId) ? next.delete(peerId) : next.add(peerId)
      return next
    })
  }

  const filtered = useMemo(() => {
    return peers.filter((p) => {
      const skillMatch =
        skillFilter === 'All Skills' || p.skill === skillFilter
      const stateMatch =
        stateFilter === 'All States' || p.state === stateFilter
      const topicMatch =
        topicFilter === 'All Topics' ||
        p.project.toLowerCase().includes(topicFilter.toLowerCase().split(' ')[0])
      return skillMatch && stateMatch && topicMatch
    })
  }, [skillFilter, stateFilter, topicFilter])

  const handleFilter = (setter) => (val) => {
    setter(val)
    setFilterKey((k) => k + 1)
  }

  return (
    <div className="min-h-screen page-enter" style={{ backgroundColor: '#FFFFFF' }}>
      <NavBar />

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: '#C8942E', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
          >
            Peer Discovery
          </p>
          <h1 className="font-serif text-4xl mb-2" style={{ color: '#1A1A1A' }}>
            Find Peers
          </h1>
          <p className="text-base" style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
            Young people doing real civic work — find collaborators, get inspired, build community.
          </p>
        </div>

        {/* Filter bar */}
        <div
          className="flex items-center gap-4 mb-8 p-5 rounded-xl"
          style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E4DF' }}
        >
          <span className="text-sm font-semibold" style={{ color: '#1A1A1A', fontFamily: '"Source Sans 3", system-ui, sans-serif', flexShrink: 0 }}>
            Filter by:
          </span>

          <FilterSelect
            label="Civic Skill"
            options={SKILL_OPTIONS}
            value={skillFilter}
            onChange={handleFilter(setSkillFilter)}
          />
          <FilterSelect
            label="State"
            options={STATE_OPTIONS}
            value={stateFilter}
            onChange={handleFilter(setStateFilter)}
          />
          <FilterSelect
            label="Project Topic"
            options={TOPIC_OPTIONS}
            value={topicFilter}
            onChange={handleFilter(setTopicFilter)}
          />

          {(skillFilter !== 'All Skills' || stateFilter !== 'All States' || topicFilter !== 'All Topics') && (
            <button
              onClick={() => {
                setSkillFilter('All Skills')
                setStateFilter('All States')
                setTopicFilter('All Topics')
                setFilterKey((k) => k + 1)
              }}
              className="text-sm font-semibold ml-auto"
              style={{ color: '#C8942E', background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
            >
              Clear filters
            </button>
          )}

          <span
            className="text-sm ml-auto"
            style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif', flexShrink: 0 }}
          >
            {filtered.length} peer{filtered.length !== 1 ? 's' : ''} found
          </span>
        </div>

        {/* Peer grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-base" style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
              No peers match these filters. Try broadening your search.
            </p>
          </div>
        ) : (
          <div key={filterKey} className="grid grid-cols-3 gap-5">
            {filtered.map((peer, i) => (
              <PeerCard
                key={peer.id}
                peer={peer}
                index={peers.findIndex(p => p.id === peer.id)}
                delay={i * 60}
                onClick={() => setSelectedPeer(peer)}
                isConnected={connected.has(peer.id)}
                onConnect={() => handleConnect(peer.id)}
              />
            ))}
          </div>
        )}

        {/* Peer Posts feed */}
        <div className="mt-16 mb-4">
          <div style={{ borderTop: '1px solid #E8E4DF', paddingTop: '48px' }}>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-1"
              style={{ color: '#C8942E', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
            >
              From the community
            </p>
            <h2 className="font-serif text-3xl mb-2" style={{ color: '#1A1A1A' }}>
              What peers are writing about
            </h2>
            <p className="text-base mb-8" style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
              Updates, reflections, and lessons from young people doing civic work.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {peerPosts.map((post) => {
                const peer = peers.find(p => p.id === post.peerId)
                const peerIndex = peers.findIndex(p => p.id === post.peerId)
                return (
                  <PostCard
                    key={post.id}
                    post={post}
                    peer={peer}
                    peerIndex={peerIndex}
                    onClick={() => navigate(`/youth/posts/${post.id}`)}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {selectedPeer && (
        <Modal onClose={() => setSelectedPeer(null)}>
          <FullPeerModal
            peer={selectedPeer}
            index={peers.findIndex(p => p.id === selectedPeer.id)}
            isConnected={connected.has(selectedPeer.id)}
            onConnect={() => handleConnect(selectedPeer.id)}
          />
        </Modal>
      )}
    </div>
  )
}

function FilterSelect({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm font-semibold rounded-lg px-3 py-2 appearance-none"
        style={{
          border: '1px solid #E8E4DF',
          backgroundColor: '#FFFFFF',
          color: value.startsWith('All') ? '#9CA3AF' : '#1A1A1A',
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
          cursor: 'pointer',
          paddingRight: '28px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 8px center',
        }}
        onFocus={(e) => { e.target.style.borderColor = '#C8942E' }}
        onBlur={(e) => { e.target.style.borderColor = '#E8E4DF' }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

function PeerCard({ peer, index, delay, onClick, isConnected, onConnect }) {
  const navigate = useNavigate()
  const skillLabel =
    peer.skill === 'Collaborating' ? 'Collaborating to Create Solutions' : peer.skill
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="peer-card-enter rounded-xl p-6 flex flex-col"
      style={{
        border: '1px solid #E8E4DF',
        backgroundColor: '#FFFFFF',
        animationDelay: `${delay}ms`,
        opacity: 0,
        animationFillMode: 'forwards',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 6px 20px rgba(0,0,0,0.08)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row */}
      <div className="flex items-start gap-3 mb-4">
        <Avatar name={peer.name} size={44} index={index} />
        <div className="min-w-0">
          <p
            className="font-semibold text-base leading-tight"
            style={{ color: '#1A1A1A', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
          >
            {peer.name}
          </p>
          <p
            className="text-sm mt-0.5"
            style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
          >
            Age {peer.age} · {peer.location}
          </p>
        </div>
      </div>

      {/* Bio */}
      <p
        className="text-sm leading-relaxed mb-3"
        style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
      >
        {peer.bio}
      </p>

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/youth/peers/${peer.id}`)}
          className="flex-1 py-2 text-sm font-semibold rounded-lg"
          style={{
            border: '1px solid #C8942E',
            color: '#C8942E',
            backgroundColor: 'transparent',
            fontFamily: '"Source Sans 3", system-ui, sans-serif',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(200,148,46,0.06)' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          View Profile
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onConnect() }}
          className="flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-150"
          style={{
            backgroundColor: isConnected ? 'rgba(74,124,89,0.10)' : '#C8942E',
            color: isConnected ? '#4A7C59' : '#FFFFFF',
            border: isConnected ? '1px solid rgba(74,124,89,0.3)' : '1px solid transparent',
            fontFamily: '"Source Sans 3", system-ui, sans-serif',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            if (!isConnected) e.currentTarget.style.backgroundColor = '#D4A843'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isConnected ? 'rgba(74,124,89,0.10)' : '#C8942E'
          }}
        >
          {isConnected ? 'Connected ✓' : 'Connect'}
        </button>
      </div>
    </div>
  )
}

function PostCard({ post, peer, peerIndex, onClick }) {
  const [hovered, setHovered] = useState(false)
  const skillLabel = post.skill === 'Collaborating' ? 'Collaborating to Create Solutions' : post.skill

  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl p-6 flex flex-col w-full"
      style={{
        border: '1px solid #E8E4DF',
        backgroundColor: '#FFFFFF',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 6px 20px rgba(0,0,0,0.08)' : 'none',
        borderColor: hovered ? '#D4A843' : '#E8E4DF',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Author row */}
      {peer && (
        <div className="flex items-center gap-2.5 mb-4">
          <Avatar name={peer.name} size={28} index={peerIndex} />
          <span
            className="text-sm font-semibold"
            style={{ color: '#1A1A1A', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
          >
            {peer.name}
          </span>
          <span style={{ color: '#E8E4DF' }}>·</span>
          <span
            className="text-sm"
            style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
          >
            {post.date}
          </span>
        </div>
      )}

      {/* Title */}
      <h3
        className="font-serif text-xl leading-snug mb-3"
        style={{ color: '#1A1A1A' }}
      >
        {post.title}
      </h3>

      {/* Excerpt */}
      <p
        className="text-sm leading-relaxed flex-1 mb-4"
        style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
      >
        {post.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <SkillTag skill={skillLabel} />
        <span
          className="text-xs font-semibold"
          style={{ color: '#C8942E', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
        >
          {post.readTime} →
        </span>
      </div>
    </button>
  )
}

function PostModal({ post, peer, peerIndex, onViewProfile }) {
  const skillLabel = post.skill === 'Collaborating' ? 'Collaborating to Create Solutions' : post.skill

  return (
    <div>
      {/* Author */}
      {peer && (
        <button
          onClick={onViewProfile}
          className="flex items-center gap-3 mb-6 group"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <Avatar name={peer.name} size={40} index={peerIndex} />
          <div className="text-left">
            <p
              className="text-sm font-semibold group-hover:underline"
              style={{ color: '#1A1A1A', fontFamily: '"Source Sans 3", system-ui, sans-serif', textDecorationColor: '#C8942E' }}
            >
              {peer.name}
            </p>
            <p
              className="text-xs"
              style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
            >
              {peer.location} · {post.date}
            </p>
          </div>
        </button>
      )}

      <div className="mb-3">
        <SkillTag skill={skillLabel} />
      </div>

      <h2
        className="font-serif text-3xl leading-tight mb-6"
        style={{ color: '#1A1A1A' }}
      >
        {post.title}
      </h2>

      <div style={{ borderTop: '1px solid #E8E4DF', paddingTop: '24px' }}>
        {post.body.split('\n\n').map((para, i) => (
          <p
            key={i}
            className="text-base leading-relaxed mb-4"
            style={{ color: '#3D3025', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
          >
            {para}
          </p>
        ))}
      </div>

      {peer && (
        <div
          className="flex items-center justify-between mt-6 p-4 rounded-xl"
          style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E4DF' }}
        >
          <div className="flex items-center gap-3">
            <Avatar name={peer.name} size={32} index={peerIndex} />
            <div>
              <p className="text-sm font-semibold" style={{ color: '#1A1A1A', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
                {peer.name}
              </p>
              <p className="text-xs" style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
                {peer.project}
              </p>
            </div>
          </div>
          <button
            onClick={onViewProfile}
            className="text-sm font-semibold"
            style={{ color: '#C8942E', background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#D4A843' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#C8942E' }}
          >
            View Profile →
          </button>
        </div>
      )}
    </div>
  )
}

function FullPeerModal({ peer, index, isConnected, onConnect }) {
  const navigate = useNavigate()
  const skillLabel =
    peer.skill === 'Collaborating' ? 'Collaborating to Create Solutions' : peer.skill

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Avatar name={peer.name} size={64} index={index} />
        <div>
          <h2 className="font-serif text-3xl" style={{ color: '#1A1A1A' }}>{peer.name}</h2>
          <p className="text-sm mt-1" style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
            Age {peer.age} · {peer.location}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <SkillTag skill={skillLabel} />
      </div>

      <h3
        className="font-semibold text-base mb-3"
        style={{ color: '#1A1A1A', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
      >
        {peer.project}
      </h3>

      <p
        className="text-base leading-relaxed mb-6"
        style={{ color: '#3D3025', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
      >
        {peer.bio}
      </p>

      <div
        className="flex items-center gap-3 p-4 rounded-xl mb-6"
        style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8E4DF' }}
      >
        <span className="text-xl">💡</span>
        <p className="text-sm" style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
          You and {peer.name.split(' ')[0]} both care about{' '}
          <strong style={{ color: '#1A1A1A' }}>{skillLabel}</strong> skills.
          Connection features launch with the full platform.
        </p>
      </div>

      <button
        onClick={() => navigate(`/youth/peers/${peer.id}`)}
        className="w-full py-2.5 text-sm font-semibold rounded-lg mb-2.5 transition-colors duration-150"
        style={{
          backgroundColor: 'transparent',
          color: '#C8942E',
          border: '1px solid #C8942E',
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
          cursor: 'pointer',
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(200,148,46,0.06)' }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
      >
        View Full Profile →
      </button>

      <button
        onClick={onConnect}
        className="w-full py-3 text-base font-semibold rounded-lg transition-colors duration-150"
        style={{
          backgroundColor: isConnected ? 'rgba(74,124,89,0.10)' : '#C8942E',
          color: isConnected ? '#4A7C59' : '#FFFFFF',
          border: isConnected ? '1px solid rgba(74,124,89,0.3)' : '1px solid transparent',
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          if (!isConnected) e.currentTarget.style.backgroundColor = '#D4A843'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isConnected ? 'rgba(74,124,89,0.10)' : '#C8942E'
        }}
      >
        {isConnected ? `Connected with ${peer.name.split(' ')[0]} ✓` : `Connect with ${peer.name.split(' ')[0]}`}
      </button>
    </div>
  )
}
