export default function SlidePanel({ detail, onClose }) {
  if (!detail) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(26,26,26,0.15)',
          zIndex: 200,
        }}
      />
      {/* Panel */}
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
            lineHeight: 1,
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
          Breakdown
        </div>
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '22px',
          fontWeight: 700,
          color: '#1A1A1A',
          margin: '0 0 28px 0',
        }}>
          {detail.title}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {detail.breakdown.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 0',
                borderBottom: '1px solid #E8E4DF',
                backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#FAF7F2',
              }}
            >
              <span style={{
                fontSize: '15px',
                fontFamily: "'Source Sans 3', system-ui",
                color: '#1A1A1A',
              }}>
                {item.label}
              </span>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {item.value && (
                  <span style={{
                    fontSize: '15px',
                    fontFamily: "'Source Sans 3', system-ui",
                    fontWeight: 700,
                    color: '#1A1A1A',
                  }}>
                    {item.value}
                  </span>
                )}
                {item.pct && (
                  <span style={{
                    fontSize: '12px',
                    fontFamily: "'Source Sans 3', system-ui",
                    fontWeight: 600,
                    color: '#C8942E',
                    backgroundColor: 'rgba(200,148,46,0.10)',
                    borderRadius: '999px',
                    padding: '2px 8px',
                  }}>
                    {item.pct}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {detail.note && (
          <p style={{
            marginTop: '24px',
            fontSize: '14px',
            fontFamily: "'Source Sans 3', system-ui",
            color: '#6B7280',
            lineHeight: 1.6,
          }}>
            {detail.note}
          </p>
        )}
      </div>
    </>
  );
}
