import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const NAV = [
  { label: 'Dashboard',     path: '.',              icon: DashIcon    },
  { label: 'Applications',  path: 'applications',   icon: AppIcon     },
  { label: 'Teams',         path: 'teams',          icon: TeamsIcon   },
  { label: 'Reports',       path: 'reports',        icon: ReportIcon  },
]

export default function Layout() {
  const location = useLocation()
  const mainRef  = useRef(null)

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      {/* Top nav */}
      <header className="flex items-center justify-between px-8 h-[60px] border-b border-cs-border shrink-0 bg-white z-20">
        <div className="flex items-center gap-4">
          {/* C&S Logo */}
          <Link to="/" className="font-playfair font-bold text-xl tracking-tight select-none no-underline">
            <span className="text-cs-charcoal">C</span>
            <span className="text-cs-gold">&amp;</span>
            <span className="text-cs-charcoal">S</span>
          </Link>
          <span className="w-px h-5 bg-cs-border" />
          <div className="flex flex-col justify-center">
            <span className="text-sm font-semibold text-cs-charcoal tracking-wide uppercase leading-tight">
              Program Management
            </span>
            <span className="text-xs text-cs-gold font-semibold leading-tight">
              Carnegie Young Leaders
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-cs-cream border border-cs-border flex items-center justify-center text-xs font-bold text-cs-charcoal">
            AW
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[220px] shrink-0 border-r border-cs-border bg-white flex flex-col py-6 z-10">
          <nav className="flex flex-col gap-1 px-3">
            {NAV.map(({ label, path, icon: Icon }) =>
              path ? (
                <NavLink
                  key={label}
                  to={path}
                  end={path === '.'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                      isActive
                        ? 'bg-cs-cream text-cs-gold'
                        : 'text-cs-charcoal hover:bg-cs-cream hover:text-cs-gold'
                    }`
                  }
                >
                  <Icon />
                  {label}
                </NavLink>
              ) : (
                <button
                  key={label}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-cs-charcoal hover:bg-cs-cream hover:text-cs-gold transition-colors duration-150"
                >
                  <Icon />
                  {label}
                </button>
              )
            )}
          </nav>

          <div className="mt-auto px-4 pb-2">
            <div className="border-t border-cs-border pt-4">
              <p className="text-[10px] text-cs-gray leading-relaxed">
                Q1 2026 · Cohort 12<br />
                <span className="text-cs-gold font-semibold">Active Program</span>
              </p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main ref={mainRef} className="flex-1 overflow-y-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

function DashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  )
}

function AppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  )
}

function TeamsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

function ReportIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  )
}
