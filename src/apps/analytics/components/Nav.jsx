import { useNavigate } from 'react-router-dom'

export default function Nav({ screen, setScreen }) {
  const navigate = useNavigate()
  return (
    <nav style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E8E4DF',
      padding: '0 48px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <button onClick={() => navigate('/')} style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        fontSize: '22px',
        fontFamily: "'Source Sans 3', system-ui, sans-serif",
        fontWeight: 700,
        letterSpacing: '-0.02em',
        userSelect: 'none',
      }}>
        <span style={{ color: '#1A1A1A' }}>C</span>
        <span style={{ color: '#C8942E' }}>&amp;</span>
        <span style={{ color: '#1A1A1A' }}>S</span>
        <span style={{
          fontSize: '13px',
          fontWeight: 600,
          color: '#6B7280',
          marginLeft: '10px',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}>Analytics</span>
      </button>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <NavLink
          label="Engagement Dashboard"
          active={screen === 'analytics'}
          onClick={() => setScreen('analytics')}
        />
        <NavLink
          label="Funder Report Builder"
          active={screen === 'funder'}
          onClick={() => setScreen('funder')}
        />
      </div>

      {/* Right: Date context */}
      <div style={{
        fontSize: '13px',
        color: '#6B7280',
        fontFamily: "'Source Sans 3', system-ui, sans-serif",
      }}>
        March 2026 · Live Data
      </div>
    </nav>
  );
}

function NavLink({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        padding: '4px 0',
        cursor: 'pointer',
        fontSize: '15px',
        fontFamily: "'Source Sans 3', system-ui, sans-serif",
        fontWeight: active ? 600 : 400,
        color: active ? '#1A1A1A' : '#6B7280',
        borderBottom: active ? '2px solid #C8942E' : '2px solid transparent',
        transition: 'color 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => {
        if (!active) e.currentTarget.style.color = '#1A1A1A';
      }}
      onMouseLeave={e => {
        if (!active) e.currentTarget.style.color = '#6B7280';
      }}
    >
      {label}
    </button>
  );
}
