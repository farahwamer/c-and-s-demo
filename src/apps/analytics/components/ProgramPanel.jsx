export default function ProgramPanel({ program, onClose }) {
  if (!program) return null;

  const statusColors = {
    Active: { bg: 'rgba(74,124,89,0.12)', text: '#4A7C59' },
  };
  const sc = statusColors[program.status] || statusColors.Active;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(26,26,26,0.15)',
          zIndex: 200,
        }}
      />
      <div
        className="panel-enter"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '420px',
          backgroundColor: '#FFFFFF',
          borderLeft: '1px solid #E8E4DF',
          zIndex: 201,
          overflowY: 'auto',
          padding: '40px 36px',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
            color: '#6B7280',
            padding: '4px 8px',
          }}
        >
          ×
        </button>

        <div style={{
          fontSize: '11px',
          fontFamily: "'Source Sans 3', system-ui",
          fontWeight: 600,
          color: '#C8942E',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '8px',
        }}>
          Program Detail
        </div>

        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '20px',
          fontWeight: 700,
          color: '#1A1A1A',
          margin: '0 0 8px 0',
          lineHeight: 1.3,
        }}>
          {program.name}
        </h3>

        <div style={{ marginBottom: '24px' }}>
          <span style={{
            fontSize: '12px',
            fontFamily: "'Source Sans 3', system-ui",
            fontWeight: 600,
            color: sc.text,
            backgroundColor: sc.bg,
            borderRadius: '999px',
            padding: '3px 10px',
          }}>
            {program.status}
          </span>
        </div>

        <p style={{
          fontSize: '15px',
          fontFamily: "'Source Sans 3', system-ui",
          color: '#4B5563',
          lineHeight: 1.6,
          marginBottom: '28px',
        }}>
          {program.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'Active Participants', value: program.participants.toLocaleString() },
            { label: 'Active Teams', value: program.teams.toLocaleString() },
            { label: 'Avg. Civic Skill Score', value: `${program.avgScore}%` },
            { label: 'States Represented', value: '30+' },
          ].map(({ label, value }) => (
            <div key={label} style={{
              backgroundColor: '#FAF7F2',
              border: '1px solid #E8E4DF',
              borderRadius: '8px',
              padding: '16px',
            }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', fontFamily: "'Source Sans 3', system-ui" }}>
                {label}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1A1A', fontFamily: "'Source Sans 3', system-ui" }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid #E8E4DF',
          paddingTop: '20px',
          fontSize: '13px',
          fontFamily: "'Source Sans 3', system-ui",
          color: '#6B7280',
          lineHeight: 1.5,
        }}>
          Data reflects current month activity. Civic skill score is the average across all three domains.
        </div>
      </div>
    </>
  );
}
