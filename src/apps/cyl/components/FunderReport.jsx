import { useState, useCallback } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import {
  ComposableMap, Geographies, Geography, Marker,
} from 'react-simple-maps'
import { funderReports, teamLocations } from '../data'
import { useCountUp } from '../hooks/useCountUp'
import Toast from './Toast'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

const FUNDER_OPTIONS = [
  { id: 'carnegie', label: 'Carnegie Corporation of New York' },
  { id: 'hewlett',  label: 'William and Flora Hewlett Foundation' },
  { id: 'einhorn',  label: 'Einhorn Collaborative' },
]

// ─── Stat card inside report ──────────────────────────────────────────────────
function ReportStat({ label, value }) {
  const count = useCountUp(value)
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-cs-charcoal">{count.toLocaleString()}</div>
      <div className="text-xs text-cs-gray font-semibold mt-1 uppercase tracking-wide">{label}</div>
    </div>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function SkillBar({ skill, color, value, note }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-semibold text-cs-charcoal">{skill}</span>
        <div className="flex items-center gap-2">
          {note && <span className="text-xs text-cs-gray">{note}</span>}
          <span className="text-sm font-bold" style={{ color }}>{value}%</span>
        </div>
      </div>
      <div className="h-2 rounded-full bg-cs-cream overflow-hidden">
        <div
          className="h-full rounded-full progress-bar-fill"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

// ─── Custom tooltip for chart ─────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-cs-border rounded-lg shadow-card px-3 py-2 text-sm">
      <p className="font-semibold text-cs-charcoal">{label}</p>
      <p className="text-cs-gold font-bold">{payload[0].value}%</p>
    </div>
  )
}

// ─── Loading spinner ──────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-cs-border border-t-cs-gold rounded-full"
        style={{ animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

// ─── Funder Report ────────────────────────────────────────────────────────────
export default function FunderReport() {
  const [funderId, setFunderId]   = useState('carnegie')
  const [loading,  setLoading]    = useState(false)
  const [reportKey, setReportKey] = useState(0)
  const [toast,    setToast]      = useState(null)

  const report = funderReports[funderId]

  const handleFunderChange = useCallback((id) => {
    if (id === funderId) return
    setLoading(true)
    setTimeout(() => {
      setFunderId(id)
      setReportKey(k => k + 1)
      setLoading(false)
    }, 480)
  }, [funderId])

  const handleGenerate = () => {
    setLoading(true)
    setTimeout(() => {
      setReportKey(k => k + 1)
      setLoading(false)
    }, 900)
  }

  const handleDownload = () => {
    setToast('Report downloaded as PDF.')
  }

  const handleShare = () => {
    setToast('Draft link copied to clipboard.')
  }

  return (
    <div className="h-full flex flex-col">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Toolbar */}
      <div className="px-8 py-5 border-b border-cs-border bg-white flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-cs-charcoal">Funder Report Generator</h1>
          <p className="text-sm text-cs-gray mt-0.5">Generate a tailored quarterly report for each funding partner.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={funderId}
            onChange={e => handleFunderChange(e.target.value)}
            className="text-sm font-medium text-cs-charcoal border border-cs-border rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:border-cs-gold cursor-pointer hover:border-cs-gold transition-colors min-w-[280px]"
          >
            {FUNDER_OPTIONS.map(f => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-60"
            style={{ backgroundColor: '#C8942E' }}
            onMouseEnter={e => !loading && (e.target.style.backgroundColor = '#D4A843')}
            onMouseLeave={e => e.target.style.backgroundColor = '#C8942E'}
          >
            {loading ? 'Generating…' : 'Generate Report'}
          </button>
        </div>
      </div>

      {/* Report area */}
      <div className="flex-1 overflow-y-auto bg-[#F0EDE8] px-8 py-8">
        {loading ? (
          <div className="bg-white rounded-lg border border-cs-border shadow-card" style={{ minHeight: 600 }}>
            <Spinner />
          </div>
        ) : (
          <div key={reportKey} className="bg-white rounded-lg border border-cs-border shadow-card report-fade">
            {/* Report header */}
            <div className="px-10 py-8 border-b border-cs-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-cs-gold uppercase tracking-widest mb-2">
                    Prepared by C<span className="text-cs-gold">&amp;</span>S
                  </p>
                  <h1 className="font-playfair text-2xl font-bold text-cs-charcoal leading-tight">
                    {report.header}
                  </h1>
                  <p className="text-sm text-cs-gray mt-1">{report.subheader}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-cs-gray uppercase tracking-wide">Q1 2026</span>
                  <p className="text-xs text-cs-gray mt-1">Generated {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="px-10 py-8 border-b border-cs-border">
              <h2 className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-6">
                Program Overview
              </h2>
              <div className={`grid gap-8 mb-6 ${report.stats.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                {report.stats.map(s => (
                  <ReportStat key={s.label} label={s.label} value={s.value} />
                ))}
              </div>
              <p className="text-sm text-cs-charcoal leading-relaxed bg-cs-cream rounded-lg p-4 border border-cs-border">
                {report.summaryText}
              </p>
            </div>

            {/* Two-column: chart + map */}
            <div className="px-10 py-8 grid grid-cols-2 gap-10 border-b border-cs-border">
              {/* Bar chart */}
              <div>
                <h2 className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-5">
                  Projects by Focus Area
                </h2>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={report.sdgData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: '#6B7280', fontFamily: '"Source Sans 3", sans-serif' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#6B7280', fontFamily: '"Source Sans 3", sans-serif' }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={v => `${v}%`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(200,148,46,0.06)' }} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {report.sdgData.map((entry, i) => (
                        <Cell key={i} fill={i === 0 ? '#C8942E' : i === 1 ? '#D4A843' : i === 2 ? '#2A7B88' : '#8B6B3D'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* US Map */}
              <div>
                <h2 className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-5">
                  Team Locations
                </h2>
                <div className="rounded-lg overflow-hidden border border-cs-border">
                  <ComposableMap
                    projection="geoAlbersUsa"
                    style={{ width: '100%', height: 210 }}
                  >
                    <Geographies geography={GEO_URL}>
                      {({ geographies }) =>
                        geographies.map(geo => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#E8E4DF"
                            stroke="#FAF7F2"
                            strokeWidth={0.5}
                            style={{
                              default: { outline: 'none' },
                              hover:   { outline: 'none', fill: '#D4C9B8' },
                              pressed: { outline: 'none' },
                            }}
                          />
                        ))
                      }
                    </Geographies>
                    {teamLocations.map(({ name, coordinates }) => (
                      <Marker key={name} coordinates={coordinates}>
                        {/* Pulse ring */}
                        <circle r={12} fill="#C0392B" fillOpacity={0.18} />
                        {/* Solid dot */}
                        <circle r={7} fill="#C0392B" stroke="#fff" strokeWidth={2} />
                        <title>{name}</title>
                      </Marker>
                    ))}
                  </ComposableMap>
                  {/* Legend */}
                  <div className="flex items-center gap-4 px-4 py-2.5 border-t border-cs-border bg-cs-cream">
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="6" fill="#C0392B" fillOpacity={0.18} />
                        <circle cx="8" cy="8" r="4" fill="#C0392B" stroke="#fff" strokeWidth="1.5" />
                      </svg>
                      <span className="text-xs text-cs-gray font-medium">CYL Team location</span>
                    </div>
                    <span className="text-xs text-cs-gray">·</span>
                    <span className="text-xs text-cs-gray font-medium">{teamLocations.length} teams across {report.stats.find(s => s.label.includes('State'))?.value ?? 34} states</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Civic skill development */}
            <div className="px-10 py-8 border-b border-cs-border">
              <h2 className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-6">
                Civic Skill Development
              </h2>
              <div className="max-w-xl">
                {report.skillProgress.map(s => (
                  <SkillBar key={s.skill} {...s} />
                ))}
              </div>
            </div>

            {/* Featured stories */}
            <div className="px-10 py-8">
              <h2 className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-6">
                Featured Stories
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {report.featuredTeams.map(t => (
                  <div
                    key={t.name}
                    className="bg-cs-cream rounded-lg p-5 border border-cs-border"
                  >
                    <h3 className="text-sm font-bold text-cs-charcoal mb-2 leading-snug">
                      {t.name}
                    </h3>
                    <p className="text-sm text-cs-charcoal leading-relaxed">{t.story}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Report footer */}
            <div className="px-10 py-5 border-t border-cs-border bg-cs-cream rounded-b-lg flex items-center justify-between">
              <p className="text-xs text-cs-gray">
                Confidential · C<span className="text-cs-gold font-bold">&amp;</span>S Program Management · {report.program}
              </p>
              <p className="text-xs text-cs-gray">Q1 2026 · Page 1 of 1</p>
            </div>
          </div>
        )}

        {/* Download / share */}
        {!loading && (
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={handleDownload}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: '#C8942E' }}
              onMouseEnter={e => e.target.style.backgroundColor = '#D4A843'}
              onMouseLeave={e => e.target.style.backgroundColor = '#C8942E'}
            >
              Download PDF
            </button>
            <button
              onClick={handleShare}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-white border border-cs-gold text-cs-gold hover:bg-cs-cream transition-colors"
            >
              Share Draft
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
