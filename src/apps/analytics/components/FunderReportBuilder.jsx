import { useState, useEffect, useRef } from 'react';
import { funderData, reportSectionKeys } from '../data';
import ReportChart from './ReportCharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const FUNDERS = [
  { key: 'carnegie_corporation', label: 'Carnegie Corporation of New York' },
  { key: 'hewlett_foundation', label: 'William and Flora Hewlett Foundation' },
  { key: 'einhorn_collaborative', label: 'Einhorn Collaborative' },
  { key: 'tepper_foundation', label: 'The Tepper Foundation' },
];

export default function FunderReportBuilder() {
  const [selectedFunder, setSelectedFunder] = useState('carnegie_corporation');
  const [enabledSections, setEnabledSections] = useState(
    Object.fromEntries(reportSectionKeys.map(s => [s.key, true]))
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef(null);
  const prevFunder = useRef(selectedFunder);

  // Reset generated state when funder changes
  useEffect(() => {
    if (prevFunder.current !== selectedFunder) {
      setIsGenerated(false);
      prevFunder.current = selectedFunder;
    }
  }, [selectedFunder]);

  const funder = funderData[selectedFunder];

  const toggleSection = (key) => {
    setEnabledSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    setIsGenerated(false);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setIsGenerated(true);
          return 100;
        }
        return prev + 4;
      });
    }, 80);
  };

  const handleDownload = async () => {
    if (!reportRef.current || isDownloading) return;
    setIsDownloading(true);
    setNotification('Generating PDF…');

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFFFF',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');

      // A4 width in mm; height scaled proportionally so content is never cut
      const a4Width = 210;
      const imgHeightMm = (canvas.height * a4Width) / canvas.width;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [a4Width, imgHeightMm],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, a4Width, imgHeightMm);

      const filename = `CS_ImpactReport_${funder.label.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().getFullYear()}.pdf`;
      pdf.save(filename);
      setNotification('PDF downloaded.');
    } catch (err) {
      setNotification('Download failed — try again.');
    } finally {
      setIsDownloading(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 48px 80px' }}>

      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '28px',
          fontWeight: 700,
          color: '#1A1A1A',
          margin: 0,
          marginBottom: '6px',
        }}>
          Funder Report Builder
        </h1>
        <p style={{
          fontFamily: "'Source Sans 3', system-ui",
          fontSize: '15px',
          color: '#6B7280',
          margin: 0,
        }}>
          Generate tailored impact reports mapped to each funder's requirements — in one click.
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '28px', alignItems: 'start' }}>

        {/* LEFT PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Funder selector */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8E4DF',
            borderRadius: '8px',
            padding: '24px',
          }}>
            <label style={{
              display: 'block',
              fontSize: '11px',
              fontFamily: "'Source Sans 3', system-ui",
              fontWeight: 600,
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '10px',
            }}>
              Select Funder
            </label>
            <select
              value={selectedFunder}
              onChange={e => setSelectedFunder(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #E8E4DF',
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: "'Source Sans 3', system-ui",
                fontWeight: 600,
                color: '#1A1A1A',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                paddingRight: '36px',
              }}
            >
              {FUNDERS.map(f => (
                <option key={f.key} value={f.key}>{f.label}</option>
              ))}
            </select>
          </div>

          {/* Section checkboxes */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8E4DF',
            borderRadius: '8px',
            padding: '24px',
          }}>
            <div style={{
              fontSize: '11px',
              fontFamily: "'Source Sans 3', system-ui",
              fontWeight: 600,
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '16px',
            }}>
              Report Sections
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {reportSectionKeys.map(section => (
                <label
                  key={section.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    transition: 'background 0.12s',
                    backgroundColor: enabledSections[section.key] ? 'rgba(200,148,46,0.06)' : 'transparent',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={enabledSections[section.key]}
                    onChange={() => toggleSection(section.key)}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: '#C8942E',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{
                    fontSize: '14px',
                    fontFamily: "'Source Sans 3', system-ui",
                    fontWeight: enabledSections[section.key] ? 600 : 400,
                    color: enabledSections[section.key] ? '#1A1A1A' : '#6B7280',
                    transition: 'color 0.12s, font-weight 0.12s',
                  }}>
                    {section.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Generate button + progress */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8E4DF',
            borderRadius: '8px',
            padding: '24px',
          }}>
            {isGenerating ? (
              <div>
                <div style={{
                  fontSize: '13px',
                  fontFamily: "'Source Sans 3', system-ui",
                  fontWeight: 600,
                  color: '#C8942E',
                  marginBottom: '10px',
                }}>
                  Compiling report…
                </div>
                <div style={{
                  height: '6px',
                  backgroundColor: '#FAF7F2',
                  borderRadius: '999px',
                  border: '1px solid #E8E4DF',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: '#C8942E',
                    borderRadius: '999px',
                    transition: 'width 0.08s linear',
                  }} />
                </div>
                <div style={{
                  fontSize: '12px',
                  fontFamily: "'Source Sans 3', system-ui",
                  color: '#6B7280',
                  marginTop: '8px',
                }}>
                  Mapping data to funder framework…
                </div>
              </div>
            ) : (
              <button
                onClick={handleGenerate}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#C8942E',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '15px',
                  fontFamily: "'Source Sans 3', system-ui",
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#D4A843'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#C8942E'}
              >
                Generate Report
              </button>
            )}

            {isGenerated && !isGenerating && (
              <div style={{ marginTop: '12px' }}>
                <button
                  onClick={handleDownload}
                  style={{
                    width: '100%',
                    padding: '9px',
                    backgroundColor: '#FFFFFF',
                    color: '#C8942E',
                    border: '1px solid #C8942E',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontFamily: "'Source Sans 3', system-ui",
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => { if (!isDownloading) e.currentTarget.style.backgroundColor = 'rgba(200,148,46,0.06)'; }}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  disabled={isDownloading}
                >
                  {isDownloading ? 'Generating…' : 'Download PDF'}
                </button>
              </div>
            )}
          </div>

          {/* Notification toast */}
          {notification && (
            <div style={{
              backgroundColor: '#1A1A1A',
              color: '#FFFFFF',
              borderRadius: '6px',
              padding: '12px 16px',
              fontSize: '13px',
              fontFamily: "'Source Sans 3', system-ui",
              fontWeight: 600,
              animation: 'fadeIn 0.2s ease',
            }}>
              {notification}
            </div>
          )}
        </div>

        {/* RIGHT PANEL: Report Preview */}
        <div ref={reportRef} style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8E4DF',
          borderRadius: '8px',
          minHeight: '600px',
          overflow: 'hidden',
        }}>

          {/* Document header */}
          <div style={{
            backgroundColor: '#1A1A1A',
            padding: '32px 40px 28px',
          }}>
            <div style={{
              fontSize: '11px',
              fontFamily: "'Source Sans 3', system-ui",
              fontWeight: 600,
              color: '#C8942E',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '6px',
            }}>
              Impact Report · {today}
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '24px',
              fontWeight: 700,
              color: '#FFFFFF',
              margin: '0 0 4px 0',
            }}>
              {funder.label}
            </h2>
            <div style={{
              fontSize: '14px',
              fontFamily: "'Source Sans 3', system-ui",
              color: 'rgba(255,255,255,0.55)',
            }}>
              Program: {funder.program}
            </div>
          </div>

          {/* Document body */}
          <div style={{ padding: '36px 40px' }}>
            {reportSectionKeys.map(section => {
              const sectionData = funder.sections[section.key];
              const enabled = enabledSections[section.key];

              return (
                <ReportSection
                  key={`${selectedFunder}-${section.key}`}
                  title={sectionData.title}
                  content={sectionData.content}
                  visible={enabled}
                  sectionKey={section.key}
                  funderKey={selectedFunder}
                />
              );
            })}

            {Object.values(enabledSections).every(v => !v) && (
              <div style={{
                padding: '60px 0',
                textAlign: 'center',
                fontFamily: "'Source Sans 3', system-ui",
                fontSize: '15px',
                color: '#9CA3AF',
              }}>
                Select at least one section to preview the report.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportSection({ title, content, visible, sectionKey, funderKey }) {
  const [mounted, setMounted] = useState(visible);
  const [show, setShow] = useState(visible);
  const timerRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      requestAnimationFrame(() => setShow(true));
    } else {
      setShow(false);
      timerRef.current = setTimeout(() => setMounted(false), 280);
    }
    return () => clearTimeout(timerRef.current);
  }, [visible]);

  if (!mounted) return null;

  return (
    <div style={{
      marginBottom: '32px',
      opacity: show ? 1 : 0,
      transform: show ? 'translateY(0)' : 'translateY(-6px)',
      transition: 'opacity 0.28s ease, transform 0.28s ease',
    }}>
      <div style={{
        fontFamily: "'Source Sans 3', system-ui",
        fontSize: '13px',
        fontWeight: 600,
        color: '#C8942E',
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        lineHeight: '18px',
        marginBottom: '12px',
      }}>
        {title}
      </div>
      <div style={{ paddingLeft: '15px' }}>
        {content.split('\n\n').map((para, i) => (
          <p key={i} style={{
            fontFamily: "'Source Sans 3', system-ui",
            fontSize: '15px',
            color: '#1A1A1A',
            lineHeight: 1.7,
            margin: '0 0 12px 0',
          }}>
            {para}
          </p>
        ))}
        <ReportChart sectionKey={sectionKey} funderKey={funderKey} />
      </div>
      <div style={{
        height: '1px',
        backgroundColor: '#E8E4DF',
        marginTop: '20px',
      }} />
    </div>
  );
}
