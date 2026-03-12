import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Cell, LabelList,
} from 'recharts';
import { reportChartData } from '../data';

// Returns the right chart for a given sectionKey + funderKey, or null if none
export default function ReportChart({ sectionKey, funderKey }) {
  if (sectionKey === 'civic_skills') {
    return <SkillsComparisonChart />;
  }
  if (sectionKey === 'participation_data') {
    const cfg = reportChartData.participation[funderKey];
    return cfg ? <HorizontalBarChart config={cfg} /> : null;
  }
  if (sectionKey === 'geographic') {
    const cfg = reportChartData.geographic[funderKey];
    return cfg ? <HorizontalBarChart config={cfg} /> : null;
  }
  return null;
}

// CSS-based skills chart — avoids Recharts grouped-bar label bugs entirely
function SkillsComparisonChart() {
  const data = reportChartData.civic_skills;

  return (
    <ChartWrapper label="Skill Proficiency: Baseline vs. Current">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {data.map((skill, i) => (
          <div key={i}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '6px',
            }}>
              <span style={{
                fontSize: '12px',
                fontFamily: "'Source Sans 3', system-ui",
                fontWeight: 600,
                color: '#1A1A1A',
              }}>
                {skill.skill.replace('\n', ' ')}
              </span>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'baseline' }}>
                <span style={{
                  fontSize: '11px',
                  fontFamily: "'Source Sans 3', system-ui",
                  color: '#9CA3AF',
                }}>
                  Baseline {skill.baseline}%
                </span>
                <span style={{
                  fontSize: '13px',
                  fontFamily: "'Source Sans 3', system-ui",
                  fontWeight: 700,
                  color: skill.color,
                }}>
                  {skill.current}%
                </span>
              </div>
            </div>
            {/* Track */}
            <div style={{
              position: 'relative',
              height: '8px',
              backgroundColor: '#EDEDEC',
              borderRadius: '999px',
              overflow: 'visible',
            }}>
              {/* Current bar */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: `${skill.current}%`,
                height: '100%',
                backgroundColor: skill.color,
                borderRadius: '999px',
                opacity: 0.25,
              }} />
              {/* Baseline tick */}
              <div style={{
                position: 'absolute',
                left: `${skill.baseline}%`,
                top: '-4px',
                bottom: '-4px',
                width: '2px',
                backgroundColor: '#9CA3AF',
                borderRadius: '1px',
                transform: 'translateX(-50%)',
              }} />
              {/* Current tick / filled portion */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: `${skill.current}%`,
                height: '100%',
                backgroundColor: skill.color,
                borderRadius: '999px',
              }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '20px', marginTop: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '16px', height: '2px', backgroundColor: '#9CA3AF', borderRadius: '1px' }} />
          <span style={{ fontSize: '11px', fontFamily: "'Source Sans 3', system-ui", color: '#6B7280' }}>
            Baseline (program entry)
          </span>
        </div>
        <LegendDot color="#C8942E" label="Current proficiency" />
      </div>
    </ChartWrapper>
  );
}

// Generic funder-specific horizontal bar chart
function HorizontalBarChart({ config }) {
  const { data, label, unit, note } = config;
  const maxVal = Math.max(...data.map(d => d.value));
  const domain = [0, Math.ceil(maxVal * 1.15)];

  return (
    <ChartWrapper label={label}>
      <ResponsiveContainer width="100%" height={data.length * 36 + 20}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 2, right: 56, left: 8, bottom: 2 }}
          barSize={14}
        >
          <XAxis
            type="number"
            domain={domain}
            tick={{ fontFamily: "'Source Sans 3', system-ui", fontSize: 11, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => unit.startsWith('%') || unit === 'pt gap (urban vs rural)' ? `${v}` : v.toLocaleString()}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={175}
            tick={{ fontFamily: "'Source Sans 3', system-ui", fontSize: 12, fill: '#1A1A1A' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={v => [`${v.toLocaleString()} ${unit}`, '']}
            contentStyle={{
              fontFamily: "'Source Sans 3', system-ui",
              fontSize: '12px',
              border: '1px solid #E8E4DF',
              borderRadius: '6px',
              backgroundColor: '#FFFFFF',
            }}
            cursor={{ fill: 'rgba(200,148,46,0.04)' }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              formatter={v => unit.startsWith('%') || unit === 'pt gap (urban vs rural)' ? `${v}%` : v.toLocaleString()}
              style={{ fontSize: '12px', fontWeight: 700, fill: '#1A1A1A', fontFamily: "'Source Sans 3', system-ui" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {note && (
        <p style={{
          margin: '6px 0 0 0',
          fontSize: '12px',
          fontFamily: "'Source Sans 3', system-ui",
          color: '#6B7280',
          fontStyle: 'italic',
        }}>
          {note}
        </p>
      )}
    </ChartWrapper>
  );
}

function ChartWrapper({ label, children }) {
  return (
    <div style={{
      backgroundColor: '#FAF7F2',
      border: '1px solid #E8E4DF',
      borderRadius: '6px',
      padding: '16px 20px 14px',
      marginTop: '16px',
      marginBottom: '4px',
    }}>
      <div style={{
        fontSize: '11px',
        fontFamily: "'Source Sans 3', system-ui",
        fontWeight: 600,
        color: '#9CA3AF',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: '12px',
      }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: color, flexShrink: 0 }} />
      <span style={{ fontSize: '11px', fontFamily: "'Source Sans 3', system-ui", color: '#6B7280' }}>{label}</span>
    </div>
  );
}
