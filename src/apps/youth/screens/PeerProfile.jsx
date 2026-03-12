import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import Avatar from '../components/Avatar.jsx'
import SkillTag from '../components/SkillTag.jsx'
import { peers, peerPosts, avatarColors } from '../data.js'

export default function PeerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const peer = peers.find(p => p.id === Number(id))
  const peerIndex = peers.findIndex(p => p.id === Number(id))

  if (!peer) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
        <NavBar />
        <div className="max-w-3xl mx-auto px-8 py-16 text-center">
          <p style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}>
            Peer not found.
          </p>
        </div>
      </div>
    )
  }

  const posts = peerPosts.filter(p => p.peerId === peer.id)
  const skillLabel = peer.skill === 'Collaborating' ? 'Collaborating to Create Solutions' : peer.skill
  const accentColor = avatarColors[peerIndex % avatarColors.length]

  return (
    <div className="min-h-screen page-enter" style={{ backgroundColor: '#FFFFFF' }}>
      <NavBar />

      <div className="max-w-3xl mx-auto px-8 py-10">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold mb-8"
          style={{ color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#C8942E' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#6B7280' }}
        >
          ← Back to Find Peers
        </button>

        {/* Profile header */}
        <div
          className="rounded-2xl p-8 mb-8"
          style={{ border: '1px solid #E8E4DF', backgroundColor: '#FAF7F2' }}
        >
          <div className="flex items-start gap-6">
            <Avatar name={peer.name} size={72} index={peerIndex} />
            <div className="flex-1 min-w-0">
              <h1
                className="font-serif text-3xl mb-1"
                style={{ color: '#1A1A1A' }}
              >
                {peer.name}
              </h1>
              <p
                className="text-sm mb-3"
                style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
              >
                Age {peer.age} · {peer.location}
              </p>
              <SkillTag skill={skillLabel} />
            </div>
          </div>

          <p
            className="text-base leading-relaxed mt-6"
            style={{ color: '#3D3025', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
          >
            {peer.bio}
          </p>
        </div>

        {/* Project */}
        <section className="mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#C8942E', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
          >
            Current Project
          </p>
          <div
            className="rounded-xl p-6"
            style={{ border: '1px solid #E8E4DF', backgroundColor: '#FFFFFF' }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-base font-bold"
                style={{ backgroundColor: accentColor }}
              >
                ◆
              </div>
              <div>
                <p
                  className="text-base font-semibold leading-snug"
                  style={{ color: '#1A1A1A', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
                >
                  {peer.project}
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
                >
                  {peer.location}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Posts */}
        <section>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#C8942E', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
          >
            Posts
          </p>

          {posts.length === 0 ? (
            <p
              className="text-sm"
              style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
            >
              No posts yet.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {posts.map(post => (
                <PostRow
                  key={post.id}
                  post={post}
                  onClick={() => navigate(`/youth/posts/${post.id}`)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function PostRow({ post, onClick }) {
  const [hovered, setHovered] = React.useState(false)
  const skillLabel = post.skill === 'Collaborating' ? 'Collaborating to Create Solutions' : post.skill

  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl p-6 w-full"
      style={{
        border: '1px solid #E8E4DF',
        backgroundColor: '#FFFFFF',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 6px 20px rgba(0,0,0,0.08)' : 'none',
        borderColor: hovered ? '#D4A843' : '#E8E4DF',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3
            className="font-serif text-xl leading-snug mb-2"
            style={{ color: '#1A1A1A' }}
          >
            {post.title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-3"
            style={{ color: '#6B7280', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
          >
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3">
            <SkillTag skill={skillLabel} />
            <span
              className="text-xs"
              style={{ color: '#9CA3AF', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
            >
              {post.date}
            </span>
          </div>
        </div>
        <span
          className="text-xs font-semibold flex-shrink-0 mt-1"
          style={{ color: '#C8942E', fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
        >
          {post.readTime} →
        </span>
      </div>
    </button>
  )
}
