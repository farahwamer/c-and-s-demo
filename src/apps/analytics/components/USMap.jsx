import { useState } from 'react';
import { topStates } from '../data';

// Simplified US state paths (abbreviated SVG)
// Each state is a rough polygon at correct relative position
const STATE_PATHS = {
  WA: "M 62 45 L 115 45 L 115 78 L 62 78 Z",
  OR: "M 62 78 L 115 78 L 115 118 L 62 118 Z",
  CA: "M 62 118 L 108 118 L 108 195 L 75 215 L 62 200 Z",
  NV: "M 108 118 L 140 118 L 140 178 L 108 195 Z",
  ID: "M 115 45 L 155 45 L 155 118 L 108 118 L 108 78 Z",
  MT: "M 115 20 L 220 20 L 220 65 L 115 65 Z",
  WY: "M 155 65 L 220 65 L 220 118 L 155 118 Z",
  UT: "M 140 118 L 185 118 L 185 168 L 140 168 Z",
  AZ: "M 140 168 L 190 168 L 190 220 L 140 220 Z",
  CO: "M 185 118 L 240 118 L 240 168 L 185 168 Z",
  NM: "M 185 168 L 240 168 L 240 218 L 185 218 Z",
  ND: "M 220 20 L 295 20 L 295 65 L 220 65 Z",
  SD: "M 220 65 L 295 65 L 295 110 L 220 110 Z",
  NE: "M 220 110 L 305 110 L 305 148 L 220 148 Z",
  KS: "M 220 148 L 308 148 L 308 185 L 220 185 Z",
  OK: "M 220 185 L 315 185 L 315 220 L 270 220 L 240 230 L 220 220 Z",
  TX: "M 220 220 L 315 220 L 315 305 L 270 315 L 220 290 Z",
  MN: "M 295 20 L 360 20 L 360 90 L 295 90 Z",
  IA: "M 295 90 L 365 90 L 365 128 L 295 128 Z",
  MO: "M 295 128 L 365 128 L 370 175 L 305 175 Z",
  AR: "M 305 175 L 375 175 L 370 215 L 305 215 Z",
  LA: "M 305 215 L 370 215 L 365 258 L 305 250 Z",
  WI: "M 340 45 L 395 45 L 395 90 L 340 90 Z",
  IL: "M 360 90 L 400 90 L 405 155 L 360 155 Z",
  MI: "M 390 45 L 440 45 L 445 88 L 390 88 Z",
  IN: "M 400 90 L 435 90 L 438 148 L 400 148 Z",
  OH: "M 435 90 L 475 90 L 478 148 L 435 148 Z",
  KY: "M 400 148 L 478 148 L 480 185 L 400 185 Z",
  TN: "M 400 185 L 480 185 L 478 215 L 400 215 Z",
  MS: "M 365 215 L 400 215 L 400 258 L 365 255 Z",
  AL: "M 400 215 L 430 215 L 430 262 L 400 258 Z",
  GA: "M 430 215 L 470 215 L 468 270 L 430 262 Z",
  FL: "M 430 262 L 468 270 L 478 315 L 440 325 L 415 300 Z",
  SC: "M 468 185 L 500 185 L 505 215 L 468 215 Z",
  NC: "M 460 160 L 530 155 L 532 185 L 460 185 Z",
  VA: "M 455 138 L 530 130 L 535 158 L 460 163 Z",
  WV: "M 440 130 L 468 128 L 468 160 L 440 160 Z",
  PA: "M 468 108 L 530 105 L 532 135 L 468 140 Z",
  NY: "M 510 75 L 570 70 L 575 108 L 510 112 Z",
  VT: "M 570 68 L 588 65 L 590 90 L 570 90 Z",
  NH: "M 588 60 L 605 58 L 608 90 L 588 90 Z",
  ME: "M 595 40 L 620 38 L 622 65 L 595 68 Z",
  MA: "M 570 90 L 620 88 L 622 105 L 570 105 Z",
  RI: "M 608 105 L 620 103 L 622 115 L 608 115 Z",
  CT: "M 580 105 L 608 103 L 608 118 L 580 118 Z",
  NJ: "M 540 108 L 565 105 L 568 128 L 540 130 Z",
  DE: "M 547 128 L 565 126 L 565 142 L 547 142 Z",
  MD: "M 510 130 L 548 128 L 548 148 L 510 148 Z",
  DC: "M 530 143 L 538 141 L 538 148 L 530 148 Z",
  AK: "M 62 268 L 130 268 L 130 318 L 62 318 Z",
  HI: "M 148 295 L 195 295 L 195 318 L 148 318 Z",
};

const stateParticipantMap = {};
topStates.forEach(s => { stateParticipantMap[s.state] = s.participants; });

const maxParticipants = Math.max(...topStates.map(s => s.participants));

function getStateColor(stateAbbr) {
  const count = stateParticipantMap[stateAbbr];
  if (!count) return '#E8E4DF';
  const intensity = count / maxParticipants;
  if (intensity > 0.8) return '#C8942E';
  if (intensity > 0.6) return '#D4A843';
  if (intensity > 0.4) return '#E8C56A';
  if (intensity > 0.2) return '#F0D99A';
  return '#F7ECC8';
}

export default function USMap() {
  const [tooltip, setTooltip] = useState(null);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg
        viewBox="0 0 680 340"
        style={{ width: '100%', height: 'auto' }}
      >
        {Object.entries(STATE_PATHS).map(([abbr, path]) => {
          const count = stateParticipantMap[abbr];
          return (
            <path
              key={abbr}
              d={path}
              fill={getStateColor(abbr)}
              stroke="#FFFFFF"
              strokeWidth="1.5"
              style={{ cursor: count ? 'pointer' : 'default', transition: 'fill 0.15s' }}
              onMouseEnter={e => {
                if (count) {
                  const rect = e.currentTarget.closest('svg').getBoundingClientRect();
                  const svgX = e.clientX - rect.left;
                  const svgY = e.clientY - rect.top;
                  setTooltip({ abbr, count, x: svgX, y: svgY });
                  e.currentTarget.style.fill = '#1A1A1A';
                  e.currentTarget.style.opacity = '0.85';
                }
              }}
              onMouseMove={e => {
                if (count) {
                  const rect = e.currentTarget.closest('svg').getBoundingClientRect();
                  setTooltip(prev => ({ ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top }));
                }
              }}
              onMouseLeave={e => {
                setTooltip(null);
                e.currentTarget.style.fill = getStateColor(abbr);
                e.currentTarget.style.opacity = '1';
              }}
            />
          );
        })}
        {/* State labels for top states */}
        {topStates.map(({ state }) => {
          const path = STATE_PATHS[state];
          if (!path) return null;
          // Parse rough center from path
          const nums = path.match(/[\d.]+/g)?.map(Number) || [];
          const xs = [], ys = [];
          for (let i = 0; i < nums.length - 1; i += 2) { xs.push(nums[i]); ys.push(nums[i + 1]); }
          const cx = xs.reduce((a, b) => a + b, 0) / xs.length;
          const cy = ys.reduce((a, b) => a + b, 0) / ys.length;
          return (
            <text
              key={state}
              x={cx}
              y={cy + 4}
              textAnchor="middle"
              style={{
                fontSize: '8px',
                fontFamily: "'Source Sans 3', system-ui",
                fontWeight: 700,
                fill: '#FFFFFF',
                pointerEvents: 'none',
              }}
            >
              {state}
            </text>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: 'absolute',
          left: tooltip.x + 10,
          top: tooltip.y - 36,
          backgroundColor: '#1A1A1A',
          color: '#FFFFFF',
          padding: '6px 12px',
          borderRadius: '6px',
          fontSize: '13px',
          fontFamily: "'Source Sans 3', system-ui",
          fontWeight: 600,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 50,
        }}>
          {tooltip.abbr} · {tooltip.count.toLocaleString()} participants
        </div>
      )}

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '12px', color: '#6B7280', fontFamily: "'Source Sans 3', system-ui" }}>Fewer</span>
        {['#F7ECC8', '#F0D99A', '#E8C56A', '#D4A843', '#C8942E'].map(c => (
          <div key={c} style={{ width: '20px', height: '10px', backgroundColor: c, borderRadius: '2px' }} />
        ))}
        <span style={{ fontSize: '12px', color: '#6B7280', fontFamily: "'Source Sans 3', system-ui" }}>More</span>
      </div>
    </div>
  );
}
