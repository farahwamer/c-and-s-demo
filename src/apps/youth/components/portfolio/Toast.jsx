import { useEffect, useState } from 'react'

export default function Toast({ message }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2600)
    return () => clearTimeout(t)
  }, [message])

  return (
    <div style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, animation: visible ? 'toastIn 0.3s ease forwards' : 'toastOut 0.3s ease forwards' }}>
      <div className="flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg" style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF', fontFamily: 'Source Sans 3, system-ui, sans-serif', fontSize: '14px', fontWeight: 600, minWidth: '220px', justifyContent: 'center' }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="9" fill="#4A7C59" />
          <path d="M5.5 9L8 11.5L12.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {message}
      </div>
    </div>
  )
}
