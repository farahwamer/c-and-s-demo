import { useState } from 'react';
import Nav from './components/Nav';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import FunderReportBuilder from './components/FunderReportBuilder';
import './index.css';

export default function App() {
  const [screen, setScreen] = useState('analytics');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2' }}>
      <Nav screen={screen} setScreen={setScreen} />
      {screen === 'analytics' ? (
        <AnalyticsDashboard />
      ) : (
        <FunderReportBuilder />
      )}
    </div>
  );
}
