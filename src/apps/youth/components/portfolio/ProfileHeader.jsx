export default function ProfileHeader({ profile }) {
  return (
    <div
      className="mt-10 rounded-xl p-8 flex items-start gap-8"
      style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E4DF', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
    >
      <div
        className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold select-none"
        style={{ background: 'linear-gradient(135deg, #C8942E 0%, #D4A843 100%)', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}
      >
        {profile.initials}
      </div>

      <div className="flex-1">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1A1A1A' }}>
            {profile.display_name}
          </h1>
          <span className="text-sm font-semibold" style={{ color: '#6B7280', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>Age {profile.age}</span>
          <span className="text-sm" style={{ color: '#6B7280' }}>·</span>
          <span className="text-sm" style={{ color: '#6B7280', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>{profile.location}</span>
        </div>

        <p className="mt-3 text-base leading-relaxed max-w-xl" style={{ color: '#3D3D3D', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>
          {profile.bio}
        </p>

        <div className="mt-4 flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(74,124,89,0.12)', color: '#4A7C59', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: '#4A7C59' }} />
            Active Contributor
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(200,148,46,0.12)', color: '#C8942E', fontFamily: 'Source Sans 3, system-ui, sans-serif' }}>
            Food Justice Focus
          </span>
        </div>
      </div>
    </div>
  )
}
