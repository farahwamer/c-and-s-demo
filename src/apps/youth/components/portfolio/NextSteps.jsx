import { portfolioSkillColors } from '../../data.js'

function SkillTag({ skill }) {
  const color = portfolioSkillColors[skill] || '#4A7C59'
  return (
    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: color + '22', color, fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>
      {skill}
    </span>
  )
}

function StepCard({ step, onAction }) {
  const isProgram = step.type === 'program'
  const handleClick = () => onAction(step.button_text === 'Start Planning' ? 'Added to your queue' : 'Application started')

  return (
    <div className="rounded-xl p-6 flex flex-col gap-4" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E4DF', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: isProgram ? '#4A7C59' : '#C8942E' }} />
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: isProgram ? '#4A7C59' : '#C8942E', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>
          {isProgram ? 'Program Opportunity' : 'Next Action'}
        </span>
        <SkillTag skill={step.skill} />
      </div>
      <h3 className="text-lg font-semibold leading-snug" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1A1A1A' }}>{step.title}</h3>
      <p className="text-sm leading-relaxed flex-1" style={{ color: '#3D3D3D', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>{step.description}</p>
      <button
        onClick={handleClick}
        className="self-start text-sm font-semibold px-5 py-2 rounded"
        style={{ backgroundColor: isProgram ? '#4A7C59' : '#C8942E', color: '#FFFFFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
      >
        {step.button_text}
      </button>
    </div>
  )
}

export default function NextSteps({ steps, onAction }) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {steps.map((step, i) => <StepCard key={i} step={step} onAction={onAction} />)}
    </div>
  )
}
