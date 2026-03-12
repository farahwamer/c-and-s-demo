import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import SkillTag from '../components/SkillTag.jsx'
import Avatar from '../components/Avatar.jsx'
import { peerPosts, peers } from '../data.js'

export default function PostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [connected, setConnected] = useState(false)

  const post = peerPosts.find(p => p.id === Number(id))
  if (!post) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
        <NavBar />
        <div className="max-w-3xl mx-auto px-8 py-24 text-center">
          <p style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>Post not found.</p>
          <button onClick={() => navigate(-1)} className="mt-4 text-sm font-semibold" style={{ color: '#C8942E', background: 'none', border: 'none', cursor: 'pointer' }}>← Go back</button>
        </div>
      </div>
    )
  }

  const peer = peers.find(p => p.id === post.peerId)
  const peerIndex = peers.findIndex(p => p.id === post.peerId)
  const skillLabel = post.skill === 'Collaborating' ? 'Collaborating to Create Solutions' : post.skill
  const peerSkillLabel = peer?.skill === 'Collaborating' ? 'Collaborating to Create Solutions' : peer?.skill

  return (
    <div className="min-h-screen page-enter" style={{ backgroundColor: '#FAF7F2' }}>
      <NavBar />

      <div className="max-w-3xl mx-auto px-8 py-12">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold mb-10 group"
          style={{ color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"Source Sans 3", system-ui, sans-serif', padding: 0 }}
          onMouseEnter={e => { e.currentTarget.style.color = '#C8942E' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#6B7280' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Find Peers
        </button>

        {/* Article header */}
        <div
          className="rounded-xl p-10 mb-8"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E4DF' }}
        >
          {/* Skill + read time row */}
          <div className="flex items-center justify-between mb-5">
            <SkillTag skill={skillLabel} />
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold" style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
                🕐 {post.readTime}
              </span>
              <span className="text-xs" style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
                {post.date}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl leading-tight mb-6" style={{ color: '#1A1A1A' }}>
            {post.title}
          </h1>

          {/* Author byline */}
          {peer && (
            <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid #E8E4DF' }}>
              <Avatar name={peer.name} size={40} index={peerIndex} />
              <div>
                <p className="text-sm font-semibold" style={{ color: '#1A1A1A', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
                  {peer.name}
                </p>
                <p className="text-xs" style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
                  Age {peer.age} · {peer.location}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Article body */}
        <div
          className="rounded-xl px-10 py-8 mb-8"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E4DF' }}
        >
          {/* Excerpt / lede */}
          <p
            className="text-lg leading-relaxed mb-8 pb-8 font-semibold"
            style={{ color: '#3D3025', fontFamily: '"Source Sans 3", system-ui, sans-serif', borderBottom: '1px solid #E8E4DF' }}
          >
            {post.excerpt}
          </p>

          {/* Body paragraphs */}
          {post.body.split('\n\n').map((para, i) => (
            <p
              key={i}
              className="text-base leading-relaxed mb-5"
              style={{ color: '#3D3025', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Author card */}
        {peer && (
          <div
            className="rounded-xl p-8"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E4DF' }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
              About the author
            </p>

            <div className="flex items-start gap-5">
              <Avatar name={peer.name} size={56} index={peerIndex} />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl mb-0.5" style={{ color: '#1A1A1A' }}>{peer.name}</h3>
                    <p className="text-sm" style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
                      Age {peer.age} · {peer.location}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <SkillTag skill={peerSkillLabel} />
                  </div>
                </div>

                <p className="text-sm leading-relaxed mt-3" style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
                  {peer.bio}
                </p>

                <div
                  className="mt-4 pt-4 flex items-center justify-between"
                  style={{ borderTop: '1px solid #E8E4DF' }}
                >
                  <div>
                    <p className="text-xs font-semibold" style={{ color: '#1A1A1A', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
                      Current project
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
                      {peer.project}
                    </p>
                  </div>

                  <button
                    onClick={() => setConnected(c => !c)}
                    className="flex-shrink-0 ml-6 px-5 py-2 text-sm font-semibold rounded-lg transition-colors duration-150"
                    style={{
                      backgroundColor: connected ? 'rgba(74,124,89,0.10)' : '#C8942E',
                      color: connected ? '#4A7C59' : '#FFFFFF',
                      border: connected ? '1px solid rgba(74,124,89,0.3)' : '1px solid transparent',
                      fontFamily: '"Source Sans 3", system-ui, sans-serif',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => { if (!connected) e.currentTarget.style.backgroundColor = '#D4A843' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = connected ? 'rgba(74,124,89,0.10)' : '#C8942E' }}
                  >
                    {connected ? `Connected with ${peer.name.split(' ')[0]} ✓` : `Connect with ${peer.name.split(' ')[0]}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
