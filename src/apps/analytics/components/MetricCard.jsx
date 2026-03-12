import { useTransitionTo } from '../hooks/useCountUp';

export default function MetricCard({ title, value, change, suffix = '', onClick, isActive }) {
  const animatedValue = useTransitionTo(value, 700);

  const isPositive = change && change.startsWith('+');

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#FFFFFF',
        border: `1px solid ${isActive ? '#C8942E' : '#E8E4DF'}`,
        borderRadius: '8px',
        padding: '28px 32px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        boxShadow: isActive ? '0 0 0 3px rgba(200,148,46,0.12)' : 'none',
        flex: '1',
        minWidth: 0,
      }}
      onMouseEnter={e => {
        if (onClick) {
          e.currentTarget.style.borderColor = '#C8942E';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(200,148,46,0.10)';
        }
      }}
      onMouseLeave={e => {
        if (onClick && !isActive) {
          e.currentTarget.style.borderColor = '#E8E4DF';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      <div style={{
        fontSize: '13px',
        fontFamily: "'Source Sans 3', system-ui, sans-serif",
        fontWeight: 600,
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '12px',
      }}>
        {title}
      </div>

      <div style={{
        fontSize: '40px',
        fontFamily: "'Source Sans 3', system-ui, sans-serif",
        fontWeight: 700,
        color: '#1A1A1A',
        lineHeight: 1,
        marginBottom: '10px',
      }}>
        {animatedValue.toLocaleString()}{suffix}
      </div>

      {change && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '13px',
          fontFamily: "'Source Sans 3', system-ui, sans-serif",
          fontWeight: 600,
          color: isPositive ? '#4A7C59' : '#DC2626',
          backgroundColor: isPositive ? 'rgba(74,124,89,0.10)' : 'rgba(220,38,38,0.10)',
          borderRadius: '999px',
          padding: '3px 10px',
        }}>
          {change} vs last period
        </div>
      )}

      {!change && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          fontSize: '13px',
          fontFamily: "'Source Sans 3', system-ui, sans-serif",
          fontWeight: 600,
          color: '#4A7C59',
          backgroundColor: 'rgba(74,124,89,0.10)',
          borderRadius: '999px',
          padding: '3px 10px',
        }}>
          All active
        </div>
      )}
    </div>
  );
}
