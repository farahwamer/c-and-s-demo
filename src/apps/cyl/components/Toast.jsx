import { useEffect } from 'react'

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3200)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 bg-cs-charcoal text-white px-5 py-3.5 rounded-lg shadow-xl text-sm font-semibold fade-in">
      <span className="text-cs-gold text-base">✓</span>
      {message}
    </div>
  )
}
