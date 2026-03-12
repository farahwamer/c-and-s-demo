import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { timeRangeData, skillsData, programsData, metricCardDetails, programDetails } from '../data';
import MetricCard from './MetricCard';
import SlidePanel from './SlidePanel';
import ProgramPanel from './ProgramPanel';
import USMap from './USMap';

const TIME_RANGES = ['month', 'quarter', 'year'];

export default function AnalyticsDashboard() {
  const [range, setRange] = useState('month');
  const [activePanel, setActivePanel] = useState(null); // metricCardDetails key
  const [activeProgram, setActiveProgram] = useState(null);

  const data = timeRangeData[range];

  const handleMetricClick = (key) => {
    setActivePanel(prev => prev === key ? null : key);
    setActiveProgram(null);
  };

  const handleProgramClick = (name) => {
    setActiveProgram(prev => prev === name ? null : name);
    setActivePanel(null);
  };

  const panelDetail = activePanel ? metricCardDetails[activePanel] : null;
  const programDetail = activeProgram ? { name: activeProgram, ...programDetails[activeProgram] } : null;

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 48px 80px' }}>

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px' }}>
        <div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '28px',
            fontWeight: 700,
            color: '#1A1A1A',
            margin: 0,
            marginBottom: '6px',
          }}>
            Civic Engagement Dashboard
          </h1>
          <p style={{
            fontFamily: "'Source Sans 3', system-ui",
            fontSize: '15px',
            color: '#6B7280',
            margin: 0,
          }}>
            Real-time impact across all C&S programs
          </p>
        </div>

        {/* Time range selector */}
        <div style={{
          display: 'flex',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8E4DF',
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          {TIME_RANGES.map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              style={{
                padding: '8px 20px',
                border: 'none',
                background: range === r ? '#C8942E' : 'transparent',
                color: range === r ? '#FFFFFF' : '#6B7280',
                fontSize: '14px',
                fontFamily: "'Source Sans 3', system-ui",
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
                borderRight: r !== 'year' ? '1px solid #E8E4DF' : 'none',
              }}
            >
              {timeRangeData[r].label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '36px' }}>
        <MetricCard
          title="Active Participants"
          value={data.activeParticipants}
          change={data.activeChange}
          onClick={() => handleMetricClick('activeParticipants')}
          isActive={activePanel === 'activeParticipants'}
        />
        <MetricCard
          title="Civic Actions This Month"
          value={data.civicActions}
          change={data.actionsChange}
          onClick={() => handleMetricClick('civicActions')}
          isActive={activePanel === 'civicActions'}
        />
        <MetricCard
          title="Communities Reached"
          value={data.communities}
          change={data.communitiesChange}
          onClick={() => handleMetricClick('communities')}
          isActive={activePanel === 'communities'}
        />
        <MetricCard
          title="Programs Active"
          value={data.programsActive}
          onClick={() => handleMetricClick('programs')}
          isActive={activePanel === 'programs'}
        />
      </div>

      {/* Middle section: Skills + Map */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '24px', marginBottom: '36px' }}>

        {/* Civic Skill Development */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8E4DF',
          borderRadius: '8px',
          padding: '28px 32px',
        }}>
          <h3 style={{
            fontFamily: "'Source Sans 3', system-ui",
            fontSize: '16px',
            fontWeight: 600,
            color: '#1A1A1A',
            margin: '0 0 6px 0',
          }}>
            Civic Skill Development
          </h3>
          <p style={{
            fontFamily: "'Source Sans 3', system-ui",
            fontSize: '13px',
            color: '#6B7280',
            margin: '0 0 28px 0',
          }}>
            Portfolio-wide proficiency · Cumulative
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {skillsData.map(skill => (
              <div key={skill.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '14px',
                    fontFamily: "'Source Sans 3', system-ui",
                    fontWeight: 600,
                    color: '#1A1A1A',
                  }}>
                    {skill.name}
                  </span>
                  <span style={{
                    fontSize: '16px',
                    fontFamily: "'Source Sans 3', system-ui",
                    fontWeight: 700,
                    color: skill.color,
                  }}>
                    {skill.value}%
                  </span>
                </div>
                <div style={{
                  height: '8px',
                  backgroundColor: '#FAF7F2',
                  borderRadius: '999px',
                  overflow: 'hidden',
                  border: '1px solid #E8E4DF',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${skill.value}%`,
                    backgroundColor: skill.color,
                    borderRadius: '999px',
                    transition: 'width 0.8s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid #E8E4DF',
            fontSize: '13px',
            fontFamily: "'Source Sans 3', system-ui",
            color: '#6B7280',
            lineHeight: 1.5,
          }}>
            Proficiency scores reflect cumulative development across all programs. Baseline measurements taken at program entry.
          </div>
        </div>

        {/* US Map */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8E4DF',
          borderRadius: '8px',
          padding: '28px 32px',
        }}>
          <h3 style={{
            fontFamily: "'Source Sans 3', system-ui",
            fontSize: '16px',
            fontWeight: 600,
            color: '#1A1A1A',
            margin: '0 0 6px 0',
          }}>
            Geographic Reach
          </h3>
          <p style={{
            fontFamily: "'Source Sans 3', system-ui",
            fontSize: '13px',
            color: '#6B7280',
            margin: '0 0 20px 0',
          }}>
            Active participants by state · Hover for detail
          </p>
          <USMap />
        </div>
      </div>

      {/* Engagement by Program */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E8E4DF',
        borderRadius: '8px',
        padding: '28px 32px',
      }}>
        <h3 style={{
          fontFamily: "'Source Sans 3', system-ui",
          fontSize: '16px',
          fontWeight: 600,
          color: '#1A1A1A',
          margin: '0 0 6px 0',
        }}>
          Engagement by Program
        </h3>
        <p style={{
          fontFamily: "'Source Sans 3', system-ui",
          fontSize: '13px',
          color: '#6B7280',
          margin: '0 0 24px 0',
        }}>
          Active participants per program · Click any bar for details
        </p>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={programsData}
            layout="vertical"
            margin={{ top: 0, right: 60, left: 8, bottom: 0 }}
            barSize={18}
          >
            <XAxis
              type="number"
              tick={{ fontFamily: "'Source Sans 3', system-ui", fontSize: 12, fill: '#6B7280' }}
              tickFormatter={v => v.toLocaleString()}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={210}
              tick={{ fontFamily: "'Source Sans 3', system-ui", fontSize: 13, fill: '#1A1A1A' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => [value.toLocaleString(), 'Participants']}
              contentStyle={{
                fontFamily: "'Source Sans 3', system-ui",
                fontSize: '13px',
                border: '1px solid #E8E4DF',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
              }}
              cursor={{ fill: 'rgba(200,148,46,0.06)' }}
            />
            <Bar
              dataKey="participants"
              radius={[0, 4, 4, 0]}
              onClick={(d) => handleProgramClick(d.name)}
              style={{ cursor: 'pointer' }}
            >
              {programsData.map((entry, i) => (
                <Cell
                  key={entry.name}
                  fill={activeProgram === entry.name ? '#1A1A1A' : entry.color}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Slide panels */}
      <SlidePanel detail={panelDetail} onClose={() => setActivePanel(null)} />
      <ProgramPanel program={programDetail} onClose={() => setActiveProgram(null)} />
    </div>
  );
}
