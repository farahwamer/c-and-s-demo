import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { applicationTeams } from '../data'
import Toast from './Toast'

const SKILL_COLOR = {
  'Collaborating':            { bg: 'rgba(139,107,61,0.12)',  text: '#8B6B3D' },
  'Credible Information':     { bg: 'rgba(42,123,136,0.12)',  text: '#2A7B88' },
  'Productive Conversations': { bg: 'rgba(200,148,46,0.12)',  text: '#C8942E' },
}

const VIEWS = ['Pending Review', 'Advanced', 'Declined']

// ─── Score row ────────────────────────────────────────────────────────────────
function ScoreRow({ label, value, rationale, color }) {
  const pct = Math.round((value / 5) * 100)
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-semibold text-cs-charcoal">{label}</span>
        <span className="text-lg font-bold" style={{ color }}>{value.toFixed(1)}</span>
      </div>
      <div className="relative h-2 bg-cs-cream rounded-full overflow-hidden mb-2">
        <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
        {[20, 40, 60, 80].map(p => (
          <div key={p} className="absolute top-0 h-full w-px bg-white/60" style={{ left: `${p}%` }} />
        ))}
      </div>
      <p className="text-xs text-cs-gray leading-relaxed">{rationale}</p>
    </div>
  )
}

// ─── Row status badge ─────────────────────────────────────────────────────────
function RowBadge({ advanced, declined, id }) {
  if (advanced.has(id)) return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
      style={{ backgroundColor: 'rgba(74,124,89,0.12)', color: '#4A7C59' }}>
      ✓ Advanced
    </span>
  )
  if (declined.has(id)) return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
      style={{ backgroundColor: 'rgba(107,114,128,0.12)', color: '#6B7280' }}>
      ✕ Declined
    </span>
  )
  return (
    <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: 'rgba(200,148,46,0.12)', color: '#C8942E' }}>
      Pending
    </span>
  )
}

// ─── Applications list ────────────────────────────────────────────────────────
function ApplicationsList({ onSelect, advanced, declined }) {
  const [view, setView] = useState('Pending Review')

  const underReview = applicationTeams.filter(a => a.status === 'Under Review')

  const pendingCount  = underReview.filter(a => !advanced.has(a.id) && !declined.has(a.id)).length
  const advancedCount = underReview.filter(a => advanced.has(a.id)).length
  const declinedCount = underReview.filter(a => declined.has(a.id)).length

  const counts = { 'Pending Review': pendingCount, 'Advanced': advancedCount, 'Declined': declinedCount }

  const visible = underReview.filter(a => {
    if (view === 'Pending Review') return !advanced.has(a.id) && !declined.has(a.id)
    if (view === 'Advanced')       return advanced.has(a.id)
    if (view === 'Declined')       return declined.has(a.id)
    return true
  })

  const isActionable = (app) => !advanced.has(app.id) && !declined.has(app.id)

  const emptyMessages = {
    'Pending Review': 'All applications have been reviewed.',
    'Advanced':       'No applications have been advanced yet.',
    'Declined':       'No applications have been declined.',
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <nav className="text-xs text-cs-gray mb-1 flex items-center gap-1.5">
          <Link to="/" className="hover:text-cs-gold transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-cs-charcoal font-semibold">Applications</span>
        </nav>
        <h1 className="font-playfair text-2xl font-bold text-cs-charcoal">Applications</h1>
        <p className="text-sm text-cs-gray mt-1">
          {pendingCount} pending · {advancedCount} advanced · {declinedCount} declined
        </p>
      </div>

      <div className="bg-white border border-cs-border rounded-lg shadow-card overflow-hidden">
        {/* Tab toolbar */}
        <div className="px-6 border-b border-cs-border bg-cs-cream flex items-center justify-between">
          <div className="flex items-center gap-1 -mb-px">
            {VIEWS.map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`flex items-center gap-2 px-4 py-3.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  view === v
                    ? 'border-cs-gold text-cs-gold'
                    : 'border-transparent text-cs-gray hover:text-cs-charcoal'
                }`}
              >
                {v}
                <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                  view === v ? 'bg-cs-gold text-white' : 'bg-cs-border text-cs-gray'
                }`}>
                  {counts[v]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <table className="w-full">
          <thead className="border-b border-cs-border">
            <tr>
              {['Team', 'Location', 'Project Title', 'SDG Focus', 'Civic Skill', 'AI Score', 'Status', ''].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-cs-gray uppercase tracking-wider py-3 px-5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={8} className="py-12 text-center text-sm text-cs-gray">
                  {emptyMessages[view]}
                </td>
              </tr>
            )}
            {visible.map((app, i) => {
              const sc          = app.ai_scores
              const avg         = ((sc.community_impact + sc.feasibility + sc.civic_skill_alignment) / 3).toFixed(1)
              const skillColors = SKILL_COLOR[app.civic_skill] || { bg: '#eee', text: '#333' }
              const actionable  = isActionable(app)
              const realIdx     = applicationTeams.indexOf(app)

              return (
                <tr
                  key={app.id}
                  onClick={() => actionable && onSelect(realIdx)}
                  className={`border-b border-cs-border last:border-0 transition-colors duration-150 ${
                    actionable ? 'cursor-pointer hover:bg-amber-50' : 'opacity-50 cursor-default'
                  } ${i % 2 === 0 ? 'bg-white' : 'bg-cs-cream/40'}`}
                >
                  <td className="py-4 px-5">
                    <span className="text-sm font-semibold text-cs-charcoal">{app.team_name}</span>
                  </td>
                  <td className="py-4 px-5 text-sm text-cs-gray">{app.location}</td>
                  <td className="py-4 px-5">
                    <span className="text-sm text-cs-charcoal max-w-[240px] block truncate" title={app.project_title}>
                      {app.project_title}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-sm text-cs-gray">{app.sdg_focus}</td>
                  <td className="py-4 px-5">
                    <span
                      className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap text-center min-w-[190px]"
                      style={{ backgroundColor: skillColors.bg, color: skillColors.text }}
                    >
                      {app.civic_skill}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-0.5">
                        {[sc.community_impact, sc.feasibility, sc.civic_skill_alignment].map((v, j) => (
                          <div key={j} className="w-16 h-1.5 rounded-full bg-cs-cream overflow-hidden">
                            <div className="h-full rounded-full"
                              style={{ width: `${(v / 5) * 100}%`, backgroundColor: ['#C8942E', '#2A7B88', '#8B6B3D'][j] }} />
                          </div>
                        ))}
                      </div>
                      <span className="text-sm font-bold text-cs-charcoal">{avg}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <RowBadge advanced={advanced} declined={declined} id={app.id} />
                  </td>
                  <td className="py-4 px-5">
                    {actionable && (
                      <button
                        onClick={e => { e.stopPropagation(); onSelect(realIdx) }}
                        className="text-xs font-semibold text-cs-gold hover:underline whitespace-nowrap"
                      >
                        Review →
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Confirmation overlay ─────────────────────────────────────────────────────
function Confirmation({ type, teamName }) {
  const isAdvance = type === 'advance'
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/95 fade-in">
      <div className="text-center max-w-sm">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: isAdvance ? 'rgba(74,124,89,0.12)' : 'rgba(107,114,128,0.10)' }}
        >
          {isAdvance ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4A7C59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>
        <h2 className="font-playfair text-2xl font-bold text-cs-charcoal mb-2">
          {isAdvance ? 'Advanced to Next Round' : 'Application Declined'}
        </h2>
        <p className="text-sm text-cs-gray leading-relaxed">
          <span className="font-semibold text-cs-charcoal">{teamName}</span>{' '}
          {isAdvance ? 'has been advanced.' : 'has been declined.'}<br />
          Moving to the next application…
        </p>
      </div>
    </div>
  )
}

// ─── Single application review ────────────────────────────────────────────────
function ApplicationDetail({ startIdx, onBack, advanced, declined, onAdvance, onDecline }) {
  const [idx,         setIdx]         = useState(startIdx)
  const [animClass,   setAnimClass]   = useState('')
  const [notes,       setNotes]       = useState({})
  const [toast,       setToast]       = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [confirming,  setConfirming]  = useState(null) // null | 'advance' | 'decline'

  const app = applicationTeams[idx]

  const slideToNext = () => {
    setIsAnimating(true)
    setAnimClass('anim-slide-out-left')
    setTimeout(() => {
      setIdx(i => (i + 1) % applicationTeams.length)
      setAnimClass('anim-slide-in-right')
      setTimeout(() => { setAnimClass(''); setIsAnimating(false) }, 280)
    }, 220)
  }

  const navigate = (direction) => {
    if (isAnimating) return
    setIsAnimating(true)
    setAnimClass(direction === 'next' ? 'anim-slide-out-left' : 'anim-slide-out-right')
    setTimeout(() => {
      setIdx(i => direction === 'next'
        ? (i + 1) % applicationTeams.length
        : (i - 1 + applicationTeams.length) % applicationTeams.length
      )
      setAnimClass(direction === 'next' ? 'anim-slide-in-right' : 'anim-slide-in-left')
      setTimeout(() => { setAnimClass(''); setIsAnimating(false) }, 280)
    }, 220)
  }

  const triggerConfirmation = (type, callback) => {
    callback(app.id)
    setConfirming(type)
    setTimeout(() => {
      setConfirming(null)
      slideToNext()
    }, 1800)
  }

  const isAdvanced = advanced.has(app.id)
  const isDeclined = declined.has(app.id)
  const isReviewed = isAdvanced || isDeclined
  const busy       = isAnimating || confirming !== null

  return (
    <div className="h-full flex flex-col">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="px-8 py-5 border-b border-cs-border bg-white shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <nav className="text-xs text-cs-gray mb-1 flex items-center gap-1.5">
              <Link to="/" className="hover:text-cs-gold transition-colors">Dashboard</Link>
              <span>/</span>
              <button onClick={onBack} className="hover:text-cs-gold transition-colors">Applications</button>
              <span>/</span>
              <span className="text-cs-charcoal font-semibold">{app.team_name}</span>
            </nav>
            <h1 className="font-playfair text-2xl font-bold text-cs-charcoal">Application Review</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-sm font-semibold text-cs-gray hover:text-cs-gold transition-colors">
              ← All Applications
            </button>
            <span className="w-px h-5 bg-cs-border" />
            <span className="text-sm text-cs-gray font-medium">{idx + 1} of {applicationTeams.length}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => navigate('prev')} disabled={busy}
                className="w-9 h-9 flex items-center justify-center border border-cs-border rounded-lg text-cs-charcoal hover:border-cs-gold hover:text-cs-gold transition-colors disabled:opacity-40">←</button>
              <button onClick={() => navigate('next')} disabled={busy}
                className="w-9 h-9 flex items-center justify-center border border-cs-border rounded-lg text-cs-charcoal hover:border-cs-gold hover:text-cs-gold transition-colors disabled:opacity-40">→</button>
            </div>
          </div>
        </div>
      </div>

      {/* AI banner */}
      <div className="px-8 py-3 bg-[#FBF6EC] border-b border-[#EDD99A] flex items-center gap-3 shrink-0">
        <span className="text-cs-gold text-sm">⚠</span>
        <p className="text-sm font-semibold text-[#7A5A10]">AI scores are recommendations. You make the decision.</p>
      </div>

      {/* Split pane */}
      <div className="flex flex-1 overflow-hidden relative">
        {confirming && <Confirmation type={confirming} teamName={app.team_name} />}

        <div className={`flex w-full h-full overflow-hidden ${animClass}`}>
          {/* Left pane */}
          <div className="flex-1 overflow-y-auto px-8 py-7 border-r border-cs-border">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-2">
                <h2 className="font-playfair text-2xl font-bold text-cs-charcoal leading-tight">{app.team_name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <RowBadge advanced={advanced} declined={declined} id={app.id} />
                </div>
              </div>
              <p className="text-sm text-cs-gray">{app.location}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {app.members.map(m => (
                  <span key={m} className="text-xs bg-cs-cream text-cs-charcoal px-2.5 py-1 rounded-full font-medium border border-cs-border">{m}</span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-1.5 block">Project Title</label>
              <p className="text-base font-semibold text-cs-charcoal leading-snug">{app.project_title}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-1.5 block">SDG Focus</label>
                <p className="text-sm text-cs-charcoal font-medium">{app.sdg_focus}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-1.5 block">Primary Civic Skill</label>
                <p className="text-sm text-cs-charcoal font-medium">{app.civic_skill_full}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-1.5 block">Project Description</label>
              <p className="text-sm text-cs-charcoal leading-relaxed bg-cs-cream/50 rounded-lg p-4 border border-cs-border">{app.description}</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-1.5 block">Budget Overview</label>
              <div className="bg-cs-cream rounded-lg p-4 border border-cs-border">
                {app.budget_breakdown.split(' · ').map((line, i) => (
                  <p key={i} className="text-sm text-cs-charcoal py-1.5 border-b border-cs-border/60 last:border-0 last:pb-0 first:pt-0">{line}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Right pane */}
          <div className="w-[400px] shrink-0 flex flex-col overflow-y-auto">
            <div className="px-7 py-7 border-b border-cs-border">
              <h3 className="font-playfair text-lg font-bold text-cs-charcoal mb-1">AI Scoring</h3>
              <p className="text-xs text-cs-gray mb-5">Scores on a 1–5 scale based on application text analysis</p>
              <ScoreRow label="Community Impact"     value={app.ai_scores.community_impact}     rationale={app.ai_scores.impact_rationale}     color="#C8942E" />
              <ScoreRow label="Feasibility"           value={app.ai_scores.feasibility}           rationale={app.ai_scores.feasibility_rationale} color="#2A7B88" />
              <ScoreRow label="Civic Skill Alignment" value={app.ai_scores.civic_skill_alignment} rationale={app.ai_scores.skill_rationale}       color="#8B6B3D" />
            </div>

            <div className="px-7 py-6 border-b border-cs-border">
              <label className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-2 block">Reviewer Notes</label>
              <textarea
                value={notes[app.id] || ''}
                onChange={e => setNotes(n => ({ ...n, [app.id]: e.target.value }))}
                placeholder="Add your notes here…"
                rows={4}
                className="w-full text-sm text-cs-charcoal bg-cs-cream border border-cs-border rounded-lg p-3 resize-none focus:outline-none focus:border-cs-gold transition-colors placeholder:text-cs-gray/60"
              />
            </div>

            <div className="px-7 py-6 space-y-2.5">
              <label className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-3 block">Decision</label>

              {isAdvanced && (
                <div className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-center"
                  style={{ backgroundColor: 'rgba(74,124,89,0.12)', color: '#4A7C59' }}>
                  ✓ Advanced to Next Round
                </div>
              )}
              {isDeclined && (
                <div className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-center"
                  style={{ backgroundColor: 'rgba(107,114,128,0.10)', color: '#6B7280' }}>
                  ✕ Application Declined
                </div>
              )}
              {!isReviewed && (
                <>
                  <button
                    onClick={() => triggerConfirmation('advance', onAdvance)}
                    disabled={busy}
                    className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-60"
                    style={{ backgroundColor: '#C8942E' }}
                    onMouseEnter={e => !busy && (e.target.style.backgroundColor = '#D4A843')}
                    onMouseLeave={e => e.target.style.backgroundColor = '#C8942E'}
                  >
                    Advance to Next Round
                  </button>
                  <button
                    onClick={() => setToast('Info request sent to the team.')}
                    disabled={busy}
                    className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold border border-cs-gold text-cs-gold bg-white hover:bg-cs-cream transition-colors disabled:opacity-60"
                  >
                    Request More Info
                  </button>
                  <button
                    onClick={() => triggerConfirmation('decline', onDecline)}
                    disabled={busy}
                    className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold border border-cs-border text-cs-gray bg-white hover:bg-cs-cream transition-colors disabled:opacity-60"
                  >
                    Decline
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Root — owns shared state ─────────────────────────────────────────────────
export default function ApplicationReview() {
  const location = useLocation()
  const teamId   = location.state?.teamId ?? null
  const initIdx  = teamId !== null ? applicationTeams.findIndex(a => a.id === teamId) : null

  const [selectedIdx, setSelectedIdx] = useState(initIdx !== -1 ? initIdx : null)
  const [advanced,    setAdvanced]    = useState(new Set())
  const [declined,    setDeclined]    = useState(new Set())

  const handleAdvance = (id) => setAdvanced(prev => new Set([...prev, id]))
  const handleDecline = (id) => setDeclined(prev => new Set([...prev, id]))

  if (selectedIdx !== null) {
    return (
      <ApplicationDetail
        startIdx={selectedIdx}
        onBack={() => setSelectedIdx(null)}
        advanced={advanced}
        declined={declined}
        onAdvance={handleAdvance}
        onDecline={handleDecline}
      />
    )
  }

  return (
    <ApplicationsList
      onSelect={setSelectedIdx}
      advanced={advanced}
      declined={declined}
    />
  )
}
